/*
 * @Date: 2022-01-17 17:39:11
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-17 18:50:03
 * @FilePath: \noelle-core-v2\src\modules\Buff\index.ts
 */
import { Atom} from "../Atom"
import { DamageModel } from "../Damage"
import { Molecule } from "../Molecule"

export namespace BuffModel {
    export type ModifyCommand = ""
    export type Type = "teamBase" | "teamNow" | "object"

    export class Control {
        role: Molecule.CharacterBase
        teamBase: Buff[] = []
        teamNow: Buff[] = []
        object: Buff[] = []
        constructor(role: Molecule.CharacterBase) {
            this.role = role
        }
        nextFrame(frame: number) {
            this.object = this.object.filter(item => { return !!item.nextFrame(frame) })
            this.teamBase = this.teamBase.filter(item => { return !!item.nextFrame(frame) })
            this.teamNow = this.teamNow.filter(item => { return !!item.nextFrame(frame) })
        }

    }
    export class Buff {
        /**标签 */
        tag: string = "未知来源"
        /**Buff类型 */
        type: Type
        /**激活时间 */
        private StartFrame: number = 0
        /**结束时间 */
        private DeadTime: number = 0
        /**属性加成 */
        target: Atom.ObjectBase = new Atom.ObjectBase()
        /**
         * 
         * @param c 指令
         * @param DMG 伤害实例
         * @returns 
         */
        modifyDMG(c: ModifyCommand, DMG?: DamageModel.Damage) {
            return DMG
        }
        /**
         * 帧位触发函数
         * @param frame 帧位置
         * @returns 
         */
        frameFnc(frame: number) {
            return
        }
        /**
         * 尝试调用帧函数并返回是否销毁该buff
         * @param frame 帧位置
         * @returns 
         */
        nextFrame(frame: number) {
            if (frame < this.DeadTime || this.DeadTime < 0) {
                this.frameFnc(frame)
                return true
            } else {
                return false
            }

        }
        constructor(target: Molecule.CharacterBase, type: BuffModel.Type, init = (buff: Buff) => { }) {
            this.target = target
            this.type = type
            init(this)
        }
    }
}