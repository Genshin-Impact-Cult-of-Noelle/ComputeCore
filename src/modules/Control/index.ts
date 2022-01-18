/*
 * @Date: 2022-01-18 10:09:50
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 18:28:40
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
    type DataBase<T> = T extends Molecule.BaseObjectdata | SkillModel.SkillData<Control> ? {
        [key in T["name"]]: T
    } : never
    type Part<C, S> = {
        buff: BuffModel.Control
        core: C,
        skill: S
    }
    type PartName = "Character"|"Artifact"|"Weapon"
    export class Control {
        static WeaponData: DataBase<WeaponModel.DataType>
        static CharacterData: DataBase<CharacterModel.DataType>
        static ArtifactSetData: DataBase<ArtifactModel.DataType>
        static SkillData: DataBase<SkillModel.SkillData<Control>>
        static CharacterSkillData: DataBase<SkillModel.CharacterSkillControl<Control>>

        character: Part<CharacterModel.Character, SkillModel.CharacterSkillControl<Control>>
        weapon: Part<WeaponModel.Weapon, SkillModel.EquipSkill<Control>>
        artifact: Part<ArtifactModel.ArtifactControl, SkillModel.EquipSkill<Control>>
        team: TeamModel.Team = new TeamModel.Team()

        get Last() {
            const base = new Atom.ObjectBase().add(this.character.core.Last).add(this.weapon.core.Last).add(this.artifact.core.Last)

            return base
        }
        constructor(characterName: string, weapon: string) {
            const characterData = Control.CharacterData[characterName]
            if (characterData) {
                this.character = {
                    core: new CharacterModel.Character(characterData),
                    buff: new BuffModel.Control(),
                    skill: new SkillModel.CharacterSkillControl()
                }
                this.team.append(this.character.core)
            } else {
                throw new Error("找不到角色")
            }
            this.artifact = {
                core: new ArtifactModel.ArtifactControl(),
                buff: new BuffModel.Control(),
                skill: new SkillModel.EquipSkill()
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
        }
        isReady() {
            // if(this.character.core)
        }
        loadCharacter(name: string) {
            const characterData = Control.CharacterData[name]
            if (characterData) {
                this.character.core = new CharacterModel.Character(characterData)
                this.team.append(this.character.core)
            } else {
                throw new Error("找不到角色")
            }
            return this
        }
        loadCharacterSkill(name: string) {
            const characterData = Control.CharacterData[name]
            if (characterData) {
                this.character.core = new CharacterModel.Character(characterData)
                this.team.append(this.character.core)
            } else {
                throw new Error("找不到技能组")
            }
            return this
        }
        loadArtifact() {

        }
        private loadArtifactSet() {

        }
        loadWeapon() {

        }
        loadWeaponSkill() {

        }
        pushBuff(part:PartName,buff:BuffModel.Buff){
            switch (part) {
                case "Artifact":
                    break;
            
                default:
                    break;
            }
        }
    }
}