/*
 * @Date: 2022-01-16 09:18:52
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 16:26:55
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
        export type Character = ControlModel.CharacterRoleData
        /**武器数据类型 */
        export type Weapon = ControlModel.WeaponData
        /**圣遗物套装数据类型 */
        export type ArtifactSet = ControlModel.ArtifactData
        
    }
    export namespace Class{
        /**BUFF类 */
        export class Buff extends BuffModel.Buff{}
        /**原子属性 */
        export class Prop extends Atom.Prop{}
    }
    export namespace Tools{
        /**
         * 生成延时配置对象
         * @param start 起始帧
         * @param time 持续时间
         * @returns 
         */
        export function getFrame(start:number, time:number){
            const end = start +Math.floor(time*60)
            return {
                start,
                end
            } 
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


import {诺艾尔}  from "./testDB"
ControlModel.Control.loadData(诺艾尔)
const x= new ControlModel.Control("诺艾尔")
x.Q(x,1)
x.Q(x,2)
x.Q(x,903)
console.log(x.Last.atk);


