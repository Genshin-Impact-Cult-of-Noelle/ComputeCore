/*
 * @Date: 2022-01-17 17:38:54
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 11:37:55
 * @FilePath: \noelle-core-v2\src\modules\Weapon\index.ts
 */

import { Molecule } from "../Molecule"

export namespace WeaponModel {
    /**
     * @param sword 单手剑
     * @param claymore 双手剑
     * @param polearm 长柄武器
     * @param bow 弓箭
     * @param catalyst 法器
     */
    export type Type = "sword" | "claymore" | "polearm" | "bow" | "catalyst"
    type ExtraStar = 1 | 2 | 3 | 4 | 5
    export type DataType = {
        weaponType: Type
    } & Molecule.BaseObjectdata
    export class Weapon extends Molecule.WeaponBase {
        /**武器类型 */
        weaponType: Type
        /**武器精炼等级 */
        extarStar: ExtraStar = 1
        constructor(data: DataType) {
            super(data)
            this.weaponType = data.weaponType
        }
    }
}