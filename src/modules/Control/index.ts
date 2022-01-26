/*
 * @Date: 2022-01-18 10:09:50
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-26 18:29:35
 * @FilePath: \ComputeCore\src\modules\Control\index.ts
 */

import { ObjectThin } from "../../common/function";
import { Common } from "../../common/typeTool";
import { ArtifactModel } from "../Artifact";
import { Atom } from "../Atom";
import { BuffModel } from "../Buff";
import { CharacterModel } from "../Character";
import { DamageModel } from "../Damage";
import { Molecule } from "../Molecule";
import { SkillModel } from "../Skill";
import { TeamModel } from "../Team";
import { WeaponModel } from "../Weapon";

export namespace ControlModel {
    interface x {
        [key: string]: number
    }
    let p: keyof x = 0
    type Level = Common.LinkStr<"", "", ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]>
    function limit(val: number, min: number, max: number) {
        return Math.min(Math.max(val, min), max)
    }
    const LevelMap = {
        "1": 0,
        "20": 1,
        "20+": 2,
        "40": 3,
        "40+": 4,
        "50": 5,
        "50+": 6,
        "60": 7,
        "60+": 8,
        "70": 9,
        "70+": 10,
        "80": 11,
        "80+": 12,
        "90": 13
    }
    function formatLevel(level: Level) {
        return LevelMap[level]
    }
    type LevelOpt = {
        extra?: number,
        level?: Level,
    }
    type SkillLevelOpt = {
        Q?: number,
        E?: number,
        A?: number,
    }
    type LoadDataPart = ArtifactData | CharacterRoleData | WeaponData
    type DataBase<T> = {
        [key: symbol]: T
    }
    type Part<C, S> = {
        buff: BuffModel.Control<Control>
        core: C,
        skill: S
    }
    type PartName = "character" | "artifact" | "weapon"
    type Doc = {
        doc: string
    }
    export type CharacterRoleData = {
        type: "character",
        character: CharacterModel.DataType,
        skill: SkillModel.CharacterSkillData<Control>
    } & Doc
    export type WeaponData = {
        type: "weapon",
        weapon: WeaponModel.DataType,
        skill: SkillModel.SkillData<Control>
    } & Doc
    export type ArtifactData = {
        type: "artifact",
        artifactSet: ArtifactModel.ArtifactSetData,
        skill: SkillModel.SkillData<Control>
    } & Doc
    export class Control {
        private static WeaponData: DataBase<WeaponModel.DataType> = {}
        private static CharacterData: DataBase<CharacterModel.DataType> = {}
        private static ArtifactSetData: DataBase<ArtifactModel.ArtifactSetData> = {}
        private static SkillData: DataBase<SkillModel.SkillData<Control>> = {}
        private static CharacterSkillData: DataBase<SkillModel.CharacterSkillData<Control>> = {}
        DMGHistroy: DamageModel.DMGResult[] = []
        get ID() {
            return this.character.core.ID
        }
        get elementType() {
            return this.character.core.elementType
        }
        get tag() {
            return this.character.core.tag
        }
        get isNow() {
            return this.ID === this.team.nowCharacter
        }
        private get AllBuff() {
            return [...this.BaseBuff, ...this.team.BuffNow]
        }
        private get BaseBuff() {
            return [...this.getBuffArr("object"), ...this.team.Buffbase]
        }
        private modifyDMG(DMG: DamageModel.Damage<Control>, frameTime: number, CMD: BuffModel.ModifyCommand, buffList: BuffModel.Buff<Control>[]) {
            buffList.map(item => {
                item.modifyDMG(CMD, frameTime, DMG)
            })
        }
        modifyDamage(DMG: DamageModel.Damage<Control>, frameTime: number, CMD: BuffModel.ModifyCommand) {
            this.modifyDMG(DMG, frameTime, CMD, this.BaseBuff)
            if (this.isNow) {
                this.modifyDMG(DMG, frameTime, CMD, this.team.BuffNow)
            }
        }
        pushDamage(DMG: DamageModel.Damage<Control>, frameTime: number) {
            this.modifyDMG(DMG, frameTime, "BEDMG", this.AllBuff)
            const res = DMG.Last
            res.data = ObjectThin(res.data)
            this.DMGHistroy.push(res)
        }
        character: Part<CharacterModel.Character, SkillModel.CharacterSkillControl<Control>>
        weapon: Part<WeaponModel.Weapon, SkillModel.EquipSkill<Control>>
        artifact: Part<ArtifactModel.ArtifactControl, SkillModel.EquipSkill<Control>>
        team: TeamModel.Team = new TeamModel.Team()
        static loadData(data: LoadDataPart[] | LoadDataPart) {
            if (data instanceof Array) {
                data.map(item => {
                    Control.loadData(item)
                })
            } else if (data) {
                switch (data.type) {
                    case "character":
                        Control.CharacterData[Symbol.for(data.character.name)] = data.character
                        Control.CharacterSkillData[Symbol.for(data.character.name)] = data.skill
                        break;
                    case "weapon":
                        Control.WeaponData[Symbol.for(data.weapon.name)] = data.weapon
                        Control.SkillData[Symbol.for(data.weapon.name)] = data.skill
                        break;
                    case "artifact":
                        Control.ArtifactSetData[Symbol.for(data.artifactSet.name)] = data.artifactSet
                        Control.SkillData[Symbol.for(data.artifactSet.name)] = data.skill
                        break;
                }
            }

        }
        get Last() {
            const base = new Atom.ObjectBase()
            base.add(this.character.core.Last).add(this.weapon.core.Last).add(this.artifact.core.Last)
            if (this.isNow) {
                base.add(this.getBuffProps(this.AllBuff))
            } else {
                base.add(this.getBuffProps(this.BaseBuff))
            }
            return base
        }
        private getBuffProps(buffArr: BuffModel.Buff<Control>[]) {
            const base = new Atom.ObjectBase()
            buffArr.map(item => {
                base.add(item.target)
            })
            return base
        }
        getBuffArr(type: BuffModel.Type) {
            switch (type) {
                case "object":
                    return [...this.character.buff.Object, ...this.weapon.buff.Object, ...this.artifact.buff.Object]
                case "teamBase":
                    return [...this.character.buff.Team, ...this.weapon.buff.Team, ...this.artifact.buff.Team]
                case "teamNow":
                    return [...this.character.buff.Now, ...this.weapon.buff.Now, ...this.artifact.buff.Now]
                default:
                    return []
            }
        }
        constructor(characterName: string) {
            const characterData = Control.CharacterData[Symbol.for(characterName)]
            const characterSkill = Control.CharacterSkillData[Symbol.for(characterName)]
            if (characterData && characterSkill) {
                this.character = {
                    core: new CharacterModel.Character(characterData),
                    buff: new BuffModel.Control(),
                    skill: new SkillModel.CharacterSkillControl(characterSkill)
                }
                this.team.append(this)
            } else {
                throw new Error("找不到角色")
            }
            this.weapon = {
                core: new WeaponModel.Weapon({
                    name: "默认武器",
                    levelData: {},
                    star: 1,
                    weaponType: this.character.core.weaponType
                }),
                buff: new BuffModel.Control(),
                skill: new SkillModel.EquipSkill()
            }
            this.artifact = {
                core: new ArtifactModel.ArtifactControl(),
                buff: new BuffModel.Control(),
                skill: new SkillModel.EquipSkill()
            }

        }
        get CJAUXAMITXEHDCFH() {
            const { loadCharacterSkill } = this
            return {
                loadCharacterSkill
            }
        }
        private loadCharacterSkill(name: string) {
            const characterData = Control.CharacterData[Symbol.for(name)]
            if (characterData) {
                this.character.core = new CharacterModel.Character(characterData)
                this.team.append(this)
            } else {
                throw new Error("找不到技能组")
            }
        }
        /**
         * 添加buff
         * @param part buff归属
         * @param buff buff实例
         */
        pushBuff(part: PartName, buff: BuffModel.Buff<Control>) {
            switch (part) {
                case "artifact":
                    this.artifact.buff.pushBuff(buff)
                    break;
                case "character":
                    this.character.buff.pushBuff(buff)
                    break;
                case "weapon":
                    this.weapon.buff.pushBuff(buff)
                    break;

                default:
                    break;
            }
        }
        delay(frame: number) {
            this.refreshAll(frame)
        }
        Q(to: Control, frameTime: number) {
            this.refreshMSG(frameTime)
            return this.character.skill.Burst(this, to, frameTime, 1)
        }
        E(to: Control, frameTime: number) {
            this.refreshMSG(frameTime)
            return this.character.skill.Skill(this, to, frameTime, 1)
        }
        A(to: Control, frameTime: number) {
            this.refreshMSG(frameTime)
            return this.character.skill.Atk(this, to, frameTime, 1)
        }
        setArtifact(data?: ArtifactModel.DataType) {
            this.artifact.skill.clean()
            this.artifact.buff.clean()
            if (data)
                this.artifact.core.setArtifact(data)
            const SetCount = this.artifact.core.SetCount
            Object.keys(SetCount).map(item => {
                const SkillData = Control.SkillData[Symbol.for(item)]
                if (SkillData) {
                    const skill = new SkillModel.Skill(SkillData)
                    this.artifact.skill.push(skill)
                    skill.fnc(this, this, 0, SetCount[item])
                }
            })
            return this
        }
        private refreshMSG(frameTime: number) {
            this.team.refresh(frameTime)
        }
        refreshAll(frameTime: number) {
            this.character.buff.nextFrame(frameTime)
            this.weapon.buff.nextFrame(frameTime)
            this.artifact.buff.nextFrame(frameTime)
        }
        /**
         * 加载已经存入缓存区的武器
         * @param name 武器名
         * @returns 
         */
        setWeapon(name?: string, opt?: LevelOpt) {
            const { buff, core, skill } = this.weapon
            buff.clean()
            skill.clean()
            if (name) {
                const key = Symbol.for(name)
                const weaponData = Control.WeaponData[key]
                const weaponSkill = Control.SkillData[key]               

                if (weaponData && weaponSkill) {
                    core.load(weaponData)
                    skill.push(new SkillModel.Skill(weaponSkill))
                }
                if (opt) {
                    this.setWeaponOpt(opt)
                }
            }
            skill.getBuff(this, core.extraStar)
            return this
        }
        setWeaponOpt(opt: LevelOpt) {
            const { extra, level } = opt
            const weapon = this.weapon.core
            extra && (weapon.extraStar = limit(extra, 1, 5))
            level && (weapon.level = formatLevel(level))
            return this
        }
        setCharacterOpt(opt: LevelOpt) {
            const { extra, level } = opt
            const character = this.character.core
            extra && (character.extraStar = limit(extra, 1, 6))
            level && (character.level = formatLevel(level))
            return this

        }
        setCharacterSkill(opt: SkillLevelOpt) {
            const { Q, E, A } = opt
            const character = this.character.core
            Q && (character.skillLevel.q = Q)
            E && (character.skillLevel.e = E)
            A && (character.skillLevel.a = A)
            return this

        }
        cleanAll() {
            this.setWeapon().setArtifact().character.buff.clean()
        }
    }
}