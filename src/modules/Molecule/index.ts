/*
 * @Date: 2022-01-17 18:21:27
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 16:31:35
 * @FilePath: \noelle-core-v2\src\modules\Molecule\index.ts
 */

import { Common } from "../../common/typeTool";
import { LevelArr } from "../../enum";
import { Atom } from "../Atom";

export namespace Molecule {
    type LevelData = {
        [key in Common.Keys<Atom.ObjectProps>]?: Atom.PropType<number[], "Yes">
    }
    /**等级属性 */
    export type BaseObjectdata = {
        name: string
        levelData: LevelData
        star:Star
    }
    type Star = 1|2|3|4|5 
    class Base extends Atom.ObjectBase {
        private _level: number = 0;
        /**名称 */
        name: string = "未知";
        /**等级数据 */
        levelData: LevelData;
        /**星级 */
        star:Star=1
        constructor(data: BaseObjectdata) {
            super()
            this.name = data.name
            this.levelData = data.levelData
            this.level = 1
            this.star=data.star
        }
        get Last() {
            const tempBase = new Atom.ObjectBase().add(this)
            return tempBase
        }
        set level(val: number) {
            this._level = LevelArr[val]
            for (const key in this.levelData) {
                const asKey = <Common.Keys<LevelData>>key
                const prop = this.levelData[asKey]
                if (prop) {
                    for (const type in prop) {
                        const asType = <Common.Keys<Atom.PropType>>type
                        const propData = prop[asType]
                        if (propData) {
                            this[asKey][asType] = propData[val]
                        }
                    }
                }
            }
        }
        get level() {
            return this._level
        }

    }
    export class CharacterBase extends Base { }
    export class WeaponBase extends Base { }
    export class ArtifactBase extends Atom.ObjectBase { }
}