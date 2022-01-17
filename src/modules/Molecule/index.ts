/*
 * @Date: 2022-01-17 18:21:27
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-17 18:41:30
 * @FilePath: \noelle-core-v2\src\modules\Molecule\index.ts
 */

import { Keys } from "../../common/typeTool";
import { LevelArr } from "../../enum";
import { Atom } from "../Atom";
import { BuffModel } from "../Buff";

export namespace Molecule {
    type LevelData = {
        [key in Keys<Atom.ObjectProps>]?: Atom.PropType<number[], "Yes">
    }
    /**等级属性 */
    export type BaseObjectdata = {
        name: string
        levelData: LevelData
    }
    class Base extends Atom.ObjectBase {
        private _level: number = 0;
        name: string = "未知";
        levelData: LevelData
        constructor(data: BaseObjectdata) {
            super()
            this.name = data.name
            this.levelData = data.levelData
            this.level = 1
        }
        get Last() {
            const tempBase = new Atom.ObjectBase()
            return tempBase
        }
        set level(val: number) {
            this._level = LevelArr[val]
            for (const key in this.levelData) {
                const asKey = <Keys<LevelData>>key
                const prop = this.levelData[asKey]
                if (prop) {
                    for (const type in prop) {
                        const asType = <Keys<Atom.PropType>>type
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