/*
 * @Date: 2022-01-17 17:39:11
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-24 15:05:56
 * @FilePath: \noelle-core-v2\src\modules\Buff\index.ts
 */
import { Atom } from "../Atom"
import { DamageModel } from "../Damage"
import { Molecule } from "../Molecule"

export namespace BuffModel {
    export type ModifyCommand = "BEDMG" | "A" | "Q" | "E" | "Shift" | "Jump"
    export type Type = "teamBase" | "teamNow" | "object"
    type BuffObject<Target> = {
        [key: symbol]: Buff<Target>
    }
    type OutTime = {
        start: number,
        end: number,
    } | "never"
    export class Control<Target>  {
        private teamBase: BuffObject<Target> = {}
        private teamNow: BuffObject<Target> = {}
        private object: BuffObject<Target> = {}
        constructor() {

        }
        nextFrame(frame: number) {
            this.partNext(this.object, frame)
            this.partNext(this.teamBase, frame)
            this.partNext(this.teamNow, frame)
        }        
        clean() {
            this.teamBase = {}
            this.teamBase = {}
            this.object = {}
        }        
        private partNext(part: BuffObject<Target>, frame: number) {
            Object.getOwnPropertySymbols(part).map(item => {
                if (!part[item].nextFrame(frame)) {
                    delete part[item]
                }
            })
        }
        private partBuffList(part: BuffObject<Target>) {
            const base: Buff<Target>[] = []
            Object.getOwnPropertySymbols(part).map(item => {
                base.push(part[item])
            })
            return base
        }
        pushBuff(buff: Buff<Target>) {
            this[buff.type][buff.ID] = buff

        }
        findBuff(tag: string) {
            const ID = Symbol.for(tag)
            const [objectBuff, teamBaseBuff, teamNowBuff] = [this.object[ID], this.teamBase[ID], this.object[ID]]
            return {
                objectBuff, teamBaseBuff, teamNowBuff
            }

        }
        get Object() {
            return this.partBuffList(this.object)
        }
        get Now() {
            return this.partBuffList(this.teamNow)
        }
        get Team() {
            return this.partBuffList(this.teamBase)
        }

    }
    export class Buff<Target> {
        ID: symbol = Symbol()
        /**?????? */
        tag: string = "????????????"
        /**Buff?????? */
        type: Type
        /**???????????? */
        StartFrame: number = 0
        /**???????????? */
        DeadTime: number = 0
        /**???????????? */
        target: Atom.ObjectBase = new Atom.ObjectBase()
        /**
         * 
         * @param cmd ??????
         * @param DMG ????????????
         * @returns 
         */
        modifyDMG(cmd: ModifyCommand, frameTime: number, DMG?: DamageModel.Damage<Target>) {
            return DMG
        }
        /**
         * ??????????????????
         * @param frame ?????????
         * @returns 
         */
        frameFnc(frame: number) {
            return
        }
        /**
         * ?????????????????????????????????????????????buff
         * @param frame ?????????
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
        constructor(tag: string, type: BuffModel.Type, outTime: OutTime, init = (buff: Buff<Target>) => { }) {
            this.ID = Symbol.for(tag)
            this.tag = tag
            this.type = type
            if (outTime === "never") {
                this.StartFrame = 0
                this.DeadTime = -1
            } else {
                this.StartFrame = outTime.start
                this.DeadTime = outTime.end
            }

            init(this)
        }
    }
}