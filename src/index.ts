/*
 * @Date: 2022-01-16 09:18:52
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-24 16:58:29
 * @FilePath: \noelle-core-v2\src\index.ts
 */
import { Atom } from "./modules/Atom"
import { BuffModel } from "./modules/Buff"
import { ControlModel } from "./modules/Control"
import { DamageModel } from "./modules/Damage"
import { SkillModel } from "./modules/Skill"
import {ActionModel } from  "./modules/Action"
import * as Enum from "./enum"
export namespace Types {    
    export type Character = ControlModel.CharacterRoleData
    export type Skill = SkillModel.SkillData<ControlModel.Control>
    export type Weapon = ControlModel.WeaponData
    export type ArtifactSet = ControlModel.ArtifactData
    export type SkillRate = SkillModel.DMGRateDetail
}
export const Classes = {
    /**基础属性类 */
    Prop: Atom.Prop,
    /**Buff类 */
    Buff: BuffModel.Buff,
    /**伤害类 */
    Damage: DamageModel.Damage
}
export const Tools = {
    /**
     * 取得帧间隔对象
     * @param start 开始帧位
     * @param time 耗时
     * @returns 帧间隔对象
     */
    getFrame(start: number, time: number) {
        const end = start + Math.floor(time * 60)
        return {
            start,
            end
        }
    },
    /**
     * 通过技能等级命中技能倍率中的数据
     * @param data 倍率数据
     * @param lv 技能等级
     * @returns 
     */
    DMGRate(data:Types.SkillRate,lv:number): DamageModel.Rate[] {
        const result:DamageModel.Rate[] =[]
        data.row.map(item=>{
            result.push({
                prop:item.use,
                rate:item.rate[lv-1]
            })
        })
        return result
    }
}
export namespace Noelle {
    /**类型结构 */
    export namespace Type {
        /**角色数据结构 */
        export type Character = Types.Character
        /**技能数据结构 */
        export type Skill = Types.Skill
        /**武器数据结构 */
        export type Weapon = Types.Weapon
        /**圣遗物套装数据结构 */
        export type ArtifactSet = Types.ArtifactSet
        /**技能倍率数据结构 */
        export type SkillRate = Types.SkillRate
    }
    /**类 */
    export const Class = Classes
    /**工具区 */
    export const Tool = Tools
    /**挂载数据 */
    export const load = ControlModel.Control.loadData
    /**常量 */
    export const ConstData = Enum
    /**控制器类 */
    export const Control = ControlModel.Control
    /**流程 */
    export const Action = ActionModel.Action
}
export default Noelle
