/*
 * @Date: 2022-01-18 10:16:56
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-26 09:55:32
 * @FilePath: \ComputeCore\src\modules\Team\index.ts
 */

import { Atom } from "../Atom";
import { BuffModel } from "../Buff";
import { ControlModel } from "../Control";

export namespace TeamModel {
    type CharacterMap = {
        [key: symbol]: ControlModel.Control
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
        nowCharacter: symbol = Symbol();
        /**添加角色 */
        append(control: ControlModel.Control) {
            this._characterList[control.ID] = control
        }
        getTeamBase() {
        }
        /**移除角色 */
        remove(control: ControlModel.Control) {
            delete this._characterList[control.ID]
        }
        /**切换驻场角色 */
        change(control: ControlModel.Control) {
            this.nowCharacter = control.ID
        }
        /**是否在队伍中 */
        inTeam(key: symbol) {
            return !!this._characterList[key]
        }
        refresh(frame: number) {
            Object.getOwnPropertySymbols(this._characterList).map(item => {
                this._characterList[item].refreshAll(frame)
            })
        }
        /**
         * 全局buff数组
         */
        get Buffbase() {
            const arr: BuffModel.Buff<ControlModel.Control>[] = [this.ElementBuff]
            Object.getOwnPropertySymbols(this._characterList).map(item => {
                arr.push(...this._characterList[item].getBuffArr("teamBase"))
            })
            return arr
        }
        /**
         * 驻场buff数组
         */
        get BuffNow() {
            const arr: BuffModel.Buff<ControlModel.Control>[] = []
            Object.getOwnPropertySymbols(this._characterList).map(item => {
                this._characterList[item].getBuffArr("teamBase")
            })
            return arr
        }
        /**公用数据 */
        get data() {
            const data: TeamData = {
                elementCount: {}
            }
            const characterList = this._characterList
            Object.getOwnPropertySymbols(this._characterList).map(item => {
                const elementType = characterList[item].elementType
                if (data.elementCount[elementType]) {
                    data.elementCount[elementType]!++
                } else {
                    data.elementCount[elementType] = 0
                }
            })
            return data
        }
        private get ElementBuff() {
            const buff = new BuffModel.Buff("元素共鸣", "teamBase", "never")
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
        init(){
            Object.getOwnPropertySymbols(this._characterList).map(item => {
                this._characterList[item].cleanAll()
            })
        }
    }
}