/*
 * @Date: 2022-01-18 10:09:50
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 17:01:30
 * @FilePath: \noelle-core-v2\src\modules\Control\index.ts
 */

import { ArtifactModel } from "../Artifact";
import { Atom } from "../Atom";
import { BuffModel } from "../Buff";
import { CharacterModel } from "../Character";
import { Molecule } from "../Molecule";
import { SkillModel } from "../Skill";
import { TeamModel } from "../Team";
import { WeaponModel } from "../Weapon";

export namespace ControlModel {
    type DataBase<T> = {
        [key: symbol]: T
    }
    type Part<C, S> = {
        buff: BuffModel.Control
        core: C,
        skill: S
    }
    type PartName = "character" | "artifact" | "weapon"
    export type CharacterRoleData = {
        type: "character",
        character: CharacterModel.DataType,
        skill: SkillModel.CharacterSkillData<Control>
    }
    export type WeaponData = {
        type: "weapon",
        weapon: WeaponModel.DataType,
        skill: SkillModel.SkillData<Control>
    }
    export type ArtifactData = {
        type: "artifact",
        artifactSet: ArtifactModel.DataType,
        skill: SkillModel.SkillData<Control>
    }
    export class Control {
        private static WeaponData: DataBase<WeaponModel.DataType> = {}
        private static CharacterData: DataBase<CharacterModel.DataType> = {}
        private static ArtifactSetData: DataBase<ArtifactModel.DataType> = {}
        private static SkillData: DataBase<SkillModel.SkillData<Control>> = {}
        private static CharacterSkillData: DataBase<SkillModel.CharacterSkillData<Control>> = {}
        get ID(){
            return this.character.core.ID
        }
        get elementType(){
            return this.character.core.elementType
        }
        character: Part<CharacterModel.Character, SkillModel.CharacterSkillControl<Control>>
        weapon: Part<WeaponModel.Weapon, SkillModel.EquipSkill<Control>>
        artifact: Part<ArtifactModel.ArtifactControl, SkillModel.EquipSkill<Control>>
        team: TeamModel.Team = new TeamModel.Team()
        static loadData(data: ArtifactData | WeaponData | CharacterRoleData) {
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
        get Last() {
            const base = new Atom.ObjectBase()
            base.add(this.weapon.core.Last).add(this.artifact.core.Last).add(this.character.core.Last)

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
        pushBuff(part: PartName, buff: BuffModel.Buff) {
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
        Q(to: Control, frameTime: number) {
            this.character.skill.Burst(this, to, frameTime, 1)
        }
        E(to: Control, frameTime: number) {
            this.character.skill.Burst(this, to, frameTime, 1)
        }
        A(to: Control, frameTime: number) {
            this.character.skill.Burst(this, to, frameTime, 1)
        }
    }
}