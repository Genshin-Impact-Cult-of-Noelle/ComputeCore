/*
 * @Date: 2022-01-17 18:23:27
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-25 16:10:07
 * @FilePath: \noelle-core-v2\src\modules\Damage\index.ts
 */

import { Atom } from "../Atom";
import { CharacterModel } from "../Character";
import { ControlModel } from "../Control";
import { SkillModel } from "../Skill";
import { ObjectThin } from "../../common/function"
export namespace DamageModel {
    type DMGModifyType = "倍率增幅" | "额外伤害" | "普通增伤"
    type DMGModifyHistroy = {
        type: DMGModifyType,
        val: number,
        label: string
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
    export type DamageType = "ATKNORMAL" | "ATKBASH" | "ATKDOWN" | "ESKILL" | "QSKILL" | "OTHER"
    export type Rate = {
        prop?: keyof Atom.ObjectProps,
        rate: number
    }
    export class Damage<Target> {
        /**来源角色 */
        from: ControlModel.Control
        /**目标角色 */
        to: ControlModel.Control;
        /**来源固化 */
        fromRole: Atom.ObjectBase = new Atom.ObjectBase();
        /**伤害目标 */
        toRole: Atom.ObjectBase = new Atom.ObjectBase();
        /**伤害技能KEY */
        ID: Symbol;
        /**伤害表达式 */
        compute: Rate[] = []
        /**跟随伤害 */
        other: Damage<Target>[] = []
        /**伤害属性 */
        ElementType: Atom.ElementType
        /**伤害类型 */
        DMGType: DamageType
        /**伤害标签 */
        tag: string
        /**增伤 */
        DMGRate: DMGModifyHistroy[] = []
        /**额外伤害 */
        DMGExtra: DMGModifyHistroy[] = []
        /**倍率提升 */
        DMGRateRate: DMGModifyHistroy[] = []

        /**
         * 
         * @param from 伤害来源
         * @param skill 伤害技能
         * @param to 伤害目标
         */
        constructor(from: ControlModel.Control, skill: SkillModel.Skill<Target>, to: ControlModel.Control, compute: Rate[], DMGType: DamageType = "OTHER", ElementType: Atom.ElementType = "Physical") {
            this.ID = skill.ID
            this.from = from
            this.to = to
            this.tag = skill.name
            this.compute = compute
            this.DMGType = DMGType
            this.ElementType = ElementType
        }
        private get CPULastRole() {
            return this.from.Last.add(this.fromRole)
        }
        /**累加增伤 */
        private get CPUExtraRate() {
            return this.DMGRate.reduce((p, c) => p + c.val, 1) + (this.fromRole.getElementDMG(this.ElementType).Last || 0)
        }
        /**防御比率 */
        private get CPUDEFRate() {
            const toDef = this.CPUToRole.def.Last
            const fromLevel = this.from.character.core.level
            return 1 - Math.max(0, toDef / (toDef + 5 * fromLevel + 500))
        }
        /**抗性比率 */
        private get CPUElementDEFRate() {
            const elementDEFRate = this.CPUToRole.getElementDEF(this.ElementType).Last
            let rate = 0
            if (elementDEFRate < 0) {
                rate = elementDEFRate / 2
            } else if (elementDEFRate < 0.75) {
                rate = elementDEFRate
            } else {
                rate = 1 / (1 + 4 * elementDEFRate)
            }
            return 1 - rate
        }
        private get CPURateRate() {
            return this.DMGRateRate.reduce((p, c) => p + c.val, 1)
        }
        private get CPUToRole() {
            return this.to.Last.add(this.toRole)
        }
        private computeBase() {
            const { CPURateRate, CPUExtraRate, CPUDEFRate, CPUElementDEFRate, CPULastRole } = this
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
            if (CPURateRate > 1) {
                result.computeStr += `倍率倍率${(CPURateRate * 100).toFixed(2)}% `
            }

            this.compute.map(item => {
                result.computeStr += `倍率${(item.prop || "") + (item.rate * 100).toFixed(2)}% `
                result.min += item.rate * CPURateRate * (item.prop ? CPULastRole[item.prop].Last : 1)
            })
            if (this.DMGExtra.length) {
                this.DMGExtra.map(item => {
                    result.computeStr += `${item.label}额外伤害${item.val} `
                    result.min += item.val
                })
            }
            if (CPUExtraRate > 1) {
                result.computeStr += `增伤${(CPUExtraRate * 100).toFixed(2)}% `
                result.min *= CPUExtraRate
            }
            result.computeStr += `防御结算${(CPUDEFRate * 100).toFixed(2)}% `
            result.min *= CPUDEFRate
            result.computeStr += `抗性结算${(CPUElementDEFRate * 100).toFixed(2)}% `
            result.min *= CPUElementDEFRate
            result.max = result.min * (CPULastRole.critDamage.Last + 1)
            result.avg = (result.max - result.min) * (Math.min(1, CPULastRole.critRate.Last)) + result.min
            result.computeResult.avg = result.avg
            result.computeResult.max = result.max
            result.computeResult.min = result.min
            return result
        }
        private get result() {
            const computeBase = this.computeBase()
            computeBase.other = this.other.map(item => {
                computeBase.avg = item.result.avg
                computeBase.max = item.result.max
                computeBase.min = item.result.min
                return item.result
            })
            return computeBase
        }
        get Last(): DMGResult {
            const data = JSON.parse(JSON.stringify(this))
            const result = this.result
            return {
                data,
                result
            }
        }

    }
    export type DMGResult = {
        data: Object,
        result: DamageResult
    }
}