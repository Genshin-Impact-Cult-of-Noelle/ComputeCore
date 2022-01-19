/*
 * @Date: 2022-01-17 18:23:27
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 16:06:30
 * @FilePath: \noelle-core-v2\src\modules\Damage\index.ts
 */

import { Atom } from "../Atom";
import { CharacterModel } from "../Character";
import { ControlModel } from "../Control";
import { SkillModel } from "../Skill";

export namespace DamageModel {
    type DMGModifyType = "倍率增幅"|"额外伤害"|"普通增伤"
    type DMGModifyHistroy={
        type:DMGModifyType,
        val:number,
        label:string
    }
    type ResultProp = {
        avg: number,
        max: number,
        min: number,
    }
    type DamageResult = {
        computeResult: ResultProp
        computeStr: string,
        other: DamageResult[],
    } & ResultProp
    type DamageModifyItem = "DMGRate" | "DMGExtra" | "RateRate"
    export type DamageType = "ATKNORMAL" | "ATKBASH" | "ATKDOWN" | "ESKILL" | "QSKILL"
    export class Damage {
        /**来源角色 */
        from: ControlModel.Control
        /**目标角色 */
        to: ControlModel.Control;
        /**来源固化 */
        fromRole: Atom.ObjectBase;
        /**伤害目标 */
        toRole: Atom.ObjectBase;
        /**伤害技能KEY */
        ID: Symbol;
        /**伤害表达式 */
        compute: { use: keyof Atom.ObjectProps, val: number }[] = []
        /**跟随伤害 */
        other: Damage[] = []
        /**伤害属性 */
        ElementType: Atom.ElementType | undefined = undefined
        /**伤害类型 */
        DMGType: DamageType | undefined = undefined
        /**伤害标签 */
        tag: string
        /**增伤 */
        DMGRate:DMGModifyHistroy[] =[]
        /**额外伤害 */
        DMGExtra:DMGModifyHistroy[] =[]
        /**倍率提升 */
        DMGRateRate:DMGModifyHistroy[] =[]

        /**
         * 
         * @param from 伤害来源
         * @param skill 伤害技能
         * @param to 伤害目标
         */
        constructor(from: ControlModel.Control, skill: SkillModel.Skill<Damage | CharacterModel.Character>, to: ControlModel.Control) {
            this.ID = skill.ID
            this.from = from
            this.to = to
            this.fromRole = from.Last
            this.toRole = to.Last
            this.tag = skill.name
        }
        get Last() {
            const result: DamageResult = {
                max: 0,
                avg: 0,
                min: 0,
                other: [],
                computeStr: "",
                computeResult: {
                    max: 0,
                    avg: 0,
                    min: 0,
                }
            }
            return result
        }
    }
}