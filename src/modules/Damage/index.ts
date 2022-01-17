/*
 * @Date: 2022-01-17 18:23:27
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-17 19:12:47
 * @FilePath: \noelle-core-v2\src\modules\Damage\index.ts
 */

import { Atom } from "../Atom";
import { CharacterModel } from "../Character";
import { SkillModel } from "../Skill";

export namespace DamageModel{
    export type DamageType = "ATKNORMAL" | "ATKBASH" | "ATKDOWN" | "ESKILL" | "QSKILL"
    export class Damage {
        /**来源角色 */
        from: CharacterModel.Character;
        /**目标角色 */
        to: CharacterModel.Character;
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
        constructor(from: CharacterModel.Character, skill: SkillModel.Skill<Damage|CharacterModel.Character>, to: CharacterModel.Character) {
            this.ID = skill.ID
            this.from = from
            this.to = to
            this.fromRole = from.Last
            this.toRole = to.Last
            this.tag = skill.label
        }

    }
}