/*
 * @Date: 2022-01-17 17:40:29
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-25 16:24:07
 * @FilePath: \noelle-core-v2\src\modules\Character\index.ts
 */

import { Atom } from "../Atom"
import { Molecule } from "../Molecule"
import { WeaponModel } from "../Weapon"

export namespace CharacterModel {
    type Group = "Tivat" | "Abyss"
    type Gender = "boy" | "girl" | "unknown"
    type SkillLevelObj = {
        /**普通攻击 */
        a: number,
        /**元素战技 */
        e: number,
        /**元素爆发 */
        q: number
    }
    export type DataType = {
        /**神之眼属性 */
        elementType: Atom.ElementType,
        /**势力 */
        tag: Group
        /**性别 */
        gender: Gender
        /**武器类型 */
        weaponType: WeaponModel.Type
        init?: (character: Character) => void
    } & Molecule.BaseObjectdata
    export class Character extends Molecule.CharacterBase {
        /**神之眼属性 */
        elementType: Atom.ElementType
        /**当前生命值 */
        healthNow = 0;
        /**势力 */
        tag: Group = "Tivat"
        /**命座 */
        extraStar: number = 0
        /**性别 */
        gender: Gender = "unknown";
        /**武器附魔 */
        nowBaseAtkElement: Atom.ElementType = "Physical"
        /**技能等级 */
        skillLevel: SkillLevelObj = { a: 1, e: 1, q: 1 }
        /**武器类型 */
        weaponType: WeaponModel.Type
        /**
         * 构造角色实例
         * @param data 角色数据
         */
        constructor(data: DataType) {
            super(data)
            this.tag = data.tag
            this.healthNow = this.health.Last
            this.star
            this.elementType = data.elementType
            this.weaponType = data.weaponType
            this.critRate.push("角色类基础", 0.05, "base")
            this.critDamage.push("角色类基础", 0.5, "base")
            if (data.init) {
                data.init(this)
            }
        }
        /**
         * 设置技能等级
         * @param obj 技能等级对象
         */
        setSkillLevel(obj: Partial<SkillLevelObj>) {
            const { a, e, q } = obj
            a && (this.skillLevel.a = a)
            e && (this.skillLevel.e = e)
            q && (this.skillLevel.q = q)
        }

    }
}