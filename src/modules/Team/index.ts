/*
 * @Date: 2022-01-18 10:16:56
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 17:12:18
 * @FilePath: \noelle-core-v2\src\modules\Team\index.ts
 */

import { Atom } from "../Atom";
import { BuffModel } from "../Buff";
import { CharacterModel } from "../Character";

export namespace TeamModel {
    type CharacterMap = {
        [key: symbol]: CharacterModel.Character
    }
    /**队伍公用数据 */
    type TeamData = {
        /**队伍中神之眼计数 */
        elementCount: {
            [key in Atom.ElementType]?: number
        }
    }
    export class Team {
        private _characterList: CharacterMap = {};
        /**添加角色 */
        append(character: CharacterModel.Character) {
            this._characterList[character.ID] = character
        }
        /** */
        remove(character: CharacterModel.Character) {
            delete this._characterList[character.ID]
        }
        get data() {
            const data: TeamData = {
                elementCount: {}
            }
            const characterList = this._characterList
            Object.getOwnPropertySymbols(this._characterList).map(item => {
                const elementType = characterList[item].elementType
                if(data.elementCount[elementType]){
                    data.elementCount[elementType]!++
                }else{
                    data.elementCount[elementType] = 0
                }
            })
            return data
        }
        private get ElementBuff() {
            const buff = new BuffModel.Buff("元素共鸣", "teamBase", 0, -1)
            const { elementCount: ElementCount } = this.data
            if ((ElementCount["Geo"] || 0) > 1) {
                // buff.commandFnc = (f, c, t) => {
                //     if (t) {
                //         t.DMGtoRole.elementDEFGeo -= 0.2
                //         t.DMGExtraRate.push({label:"岩属性共鸣",val:0.15})
                //     }
                //     return t
                // }
            }
            if ((ElementCount["Pyro"] || 0) > 1) {
                const prop = new Atom.Prop().push("火属性共鸣", 0.25, "rate")
                buff.target["atk"].add(prop)
            }
            return buff
        }
    }
}