/*
 * @Date: 2022-01-17 18:24:58
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 16:34:08
 * @FilePath: \noelle-core-v2\src\modules\Skill\index.ts
 */
import { Molecule } from "../Molecule"
import { CharacterModel } from "../Character"
import { BuffModel } from "../Buff"
import { DamageModel } from "../Damage"
export namespace SkillModel {
    type SkillOutput = {
        delay?: {
            must: number,
            last: number
        }
        result?: DamageModel.Damage
    }
    type SkillFnc<FncTarget> = {
        (from: FncTarget, to: FncTarget, frameTime: number, lv?: number): SkillOutput
    }
    export type SkillData<FncTarget> = {
        /**技能名 */
        name: string,
        /**技能函数 */
        fnc: SkillFnc<FncTarget>
    }
    export class Skill<Target> implements SkillData<Target> {
        ID: symbol = Symbol()
        name: string = "未知技能"
        fnc: SkillFnc<Target> = (f, t, l?) => { return {} }
        constructor(data?: SkillData<Target>) {
            if (data) {
                this.name = data.name
                this.fnc = data.fnc
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
    export class CharacterSkillControl<Target> implements CharacterSkillData<Target>{
        normalAttack: Skill<Target> = new Skill()
        elementSkill: Skill<Target> = new Skill()
        elementBurst: Skill<Target> = new Skill()
        constructor(data?: CharacterSkillData<Target>) {
            if (data) {
                const { normalAttack, elementSkill, elementBurst } = data
                this.normalAttack = new Skill<Target>(normalAttack)
                this.elementSkill = new Skill<Target>(elementSkill)
                this.elementBurst = new Skill<Target>(elementBurst)
            }
        }
        Atk() { }
        AtkCharged() { }
        AtkJumpLow() { }
        AtkJumpHigh() { }
        Skill() { }
        SkillLong() { }
        Burst(from:Target, target:Target,frameTime:number,lv:number) {
            return this.elementBurst.fnc(from,target,frameTime,lv)
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
            const result: BuffModel.Buff[] = []
            SkillResult.map(item => {
                if (item.result instanceof BuffModel.Buff) {
                    result.push(item.result)
                }
            })
            return result
        }
    }
}