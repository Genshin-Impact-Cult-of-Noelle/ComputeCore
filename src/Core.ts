/*
 * @Date: 2022-01-16 09:18:52
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 09:26:03
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
        /**技能数据类型 */
        export type Skill = SkillModel.SkillData<ControlModel.Control>
        /**角色数据类型 */
        export type Character = CharacterModel.DataType
        /**武器数据类型 */
        export type Weapon = WeaponModel.DataType
        /**圣遗物套装数据类型 */
        export type ArtifactSet = ArtifactModel.SetDataType<ControlModel.Control>
        
    }
    export namespace Class{
        /**BUFF类 */
        export class Buff extends BuffModel.Buff{}
        /**原子属性 */
        export class Prop extends Atom.Prop{}
    }
    export namespace Tools{
        /**
         * 取得总帧数
         * @param time 秒
         * @returns 
         */
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
