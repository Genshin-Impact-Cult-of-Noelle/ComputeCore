/*
 * @Date: 2022-01-17 18:24:58
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 14:52:20
 * @FilePath: \noelle-core-v2\src\modules\Skill\index.ts
 */
import { Molecule } from "../Molecule"
import { CharacterModel } from "../Character"
import { BuffModel } from "../Buff"
import { DamageModel } from "../Damage"
import { Atom } from "../Atom"
export namespace SkillModel {
    export type DMGRateDetail = {
        row: {
            use: keyof Atom.ObjectProps | undefined,
            rate: number[]
        }[],
        delay: { must: number, last: number }
    }
    type SkillOutput = {
        delay?: {
            must: number,
            last: number
        }
        result?: DamageModel.Damage<unknown>
    }
    type SkillFnc<FncTarget> = {
        (from: FncTarget, to: FncTarget, frameTime: number, lv?: number): SkillOutput
    }
    interface ControlFnc<Target>{
        (from: Target, target: Target, frameTime: number, lv: number):void|SkillOutput
    }
    export type SkillData<FncTarget> = {
        /**技能名 */
        name: string,
        /**技能初始函数 */
        init(skill: Skill<FncTarget>): void
    }
    export class Skill<Target>{
        ID: symbol = Symbol()
        name: string = "未知技能"
        fnc: SkillFnc<Target> = (f, t,time, l?) => { return {} }
        constructor(data?: SkillData<Target>) {
            if (data) {
                this.name = data.name
                data.init(this)
            }
        }
    }
    export type CharacterSkillData<Target> = {
        /**普通攻击 */
        normalAttack: SkillData<Target>
        /**元素战技 */
        elementSkill: SkillData<Target>
        /**元素爆发 */
        elementBurst: SkillData<Target>
    }
    /**角色技能模组 */
    export class CharacterSkillControl<Target>{
        private _normalAttack: Skill<Target> = new Skill()
        private _elementSkill: Skill<Target> = new Skill()
        private _elementBurst: Skill<Target> = new Skill()
        constructor(data?: CharacterSkillData<Target>) {
            if (data) {
                const { normalAttack, elementSkill, elementBurst } = data
                this._normalAttack = new Skill<Target>(normalAttack)
                this._elementSkill = new Skill<Target>(elementSkill)
                this._elementBurst = new Skill<Target>(elementBurst)
            }
        }
        Atk:ControlFnc<Target>=(from, target, frameTime, lv)=> {
            return this._normalAttack.fnc(from,target,frameTime,lv)
        }
        AtkCharged:ControlFnc<Target>=(from, target, frameTime, lv)=> {
        }
        AtkJumpLow:ControlFnc<Target>=(from, target, frameTime, lv)=> {
        }
        AtkJumpHigh:ControlFnc<Target>=(from, target, frameTime, lv)=> {
        }
        Skill:ControlFnc<Target>=(from, target, frameTime, lv)=> {
        }
        SkillLong:ControlFnc<Target>=(from, target, frameTime, lv)=> {
        }
        Burst:ControlFnc<Target>=(from, target, frameTime, lv)=> {
            return this._elementBurst.fnc(from, target, frameTime, lv)
        }
    }
    type EquipSkillObject<T> = {
        [key: symbol]: Skill<T>
    }
    /**装备技能模组 */
    export class EquipSkill<T>{
        skillList: EquipSkillObject<T> = {}
        constructor() {
        }
        clear() {
            this.skillList = {}
        }
        push(skill: Skill<T>) {
            this.skillList[skill.ID] = skill
        }
        getBuff(target: T) {
            const SkillResult = Object.getOwnPropertySymbols(this.skillList).map(item => {
                return this.skillList[item].fnc(target, target, 0)
            })
            const result: BuffModel.Buff<T>[] = []
            SkillResult.map(item => {
                if (item.result instanceof BuffModel.Buff) {
                    result.push(item.result)
                }
            })
            return result
        }
    }
}