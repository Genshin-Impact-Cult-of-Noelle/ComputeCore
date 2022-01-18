/*
 * @Date: 2022-01-16 09:18:52
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 18:23:43
 * @FilePath: \noelle-core-v2\src\Core.ts
 */
import { ArtifactModel } from "./modules/Artifact"
import { Atom } from "./modules/Atom"
import { BuffModel } from "./modules/Buff"
import { CharacterModel } from "./modules/Character"
import { ControlModel } from "./modules/Control"
import { SkillModel } from "./modules/Skill"
import { WeaponModel } from "./modules/Weapon"
export const Core = ControlModel
export namespace Noelle{
    export namespace Type {
        export type Skill = SkillModel.SkillData<ControlModel.Control>
        export type Character = CharacterModel.DataType
        export type Weapon = WeaponModel.DataType
        export type ArtifactSet = ArtifactModel.SetDataType<ControlModel.Control>
        
    }
    export namespace Class{
        export class Buff extends BuffModel.Buff{}
        export class Prop extends Atom.Prop{}
    }
    export namespace Tools{
        export function getFrame(time:number){
            return Math.floor(time*60)
        }
    }
}
export type CharacterData = Noelle.Type.Character
export type SkillData = Noelle.Type.Skill
export type WeaponData = Noelle.Type.Weapon
export type ArtifactSetData = Noelle.Type.ArtifactSet
export class Prop extends Noelle.Class.Prop{}
export class Buff extends  Noelle.Class.Buff{}
export const getFrame = Noelle.Tools.getFrame
