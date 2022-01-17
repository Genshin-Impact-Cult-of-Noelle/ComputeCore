/*
 * @Date: 2022-01-17 17:40:29
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-17 18:52:57
 * @FilePath: \noelle-core-v2\src\modules\Role\index.ts
 */

import { GROUP } from "../../enum"
import { Atom } from "../Atom"
import { Molecule } from "../Molecule"

export namespace CharacterModel {
    export type CharacterData = {
        elementType: Atom.ElementType,
        tag:GROUP
    } & Molecule.BaseObjectdata
    export class Character extends Molecule.CharacterBase {
        healthNow = 0;
        /**势力 */
        tag: GROUP = GROUP.Tivat
        /**受到的伤害数组 */
        constructor(data: CharacterData) {
            super(data)
            this.tag = data.tag
            this.healthNow=this.health.Last
        }
    }
}