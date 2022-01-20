/*
 * @Date: 2022-01-17 17:39:11
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 14:07:43
 * @FilePath: \noelle-core-v2\src\modules\Buff\index.ts
 */
import { Atom } from "../Atom"
import { DamageModel } from "../Damage"
import { Molecule } from "../Molecule"

export namespace BuffModel {
    export type ModifyCommand = "BEDMG"|"A"|"Q"|"E"|"Shift"|"Jump"
    export type Type = "teamBase" | "teamNow" | "object"
    type BuffObject<Target> = {
        [key: symbol]: Buff<Target> 
    }
    type OutTime={
        start:number,
        end:number,
    } | "never"
    export class Control<Target>  {
        teamBase: BuffObject<Target>  = {}
        teamNow: BuffObject<Target>  = {}
        object: BuffObject<Target>  = {}
        constructor() {

        }
        nextFrame(frame: number) {
            this.partNext(this.object, frame)
            this.partNext(this.teamBase, frame)
            this.partNext(this.teamNow, frame)
        }
        private partNext(part: BuffObject<Target> , frame: number) {
            Object.getOwnPropertySymbols(part).map(item => {
                if (!part[item].nextFrame(frame)) {
                    delete part[item]
                }
            })
        }
        private partBuffList(part: BuffObject<Target> ) {
            const base:Buff<Target> [] = []
            Object.getOwnPropertySymbols(part).map(item => {
                base.push(part[item])
            })
            return base
        }
        pushBuff(buff: Buff<Target> ) {
            this[buff.type][buff.ID] = buff

        }
        findBuff(tag: string) {
            const ID = Symbol.for(tag)
            const [objectBuff,teamBaseBuff,teamNowBuff] = [this.object[ID],this.teamBase[ID],this.object[ID]]
            return {
                objectBuff,teamBaseBuff,teamNowBuff
            }
            
        }
        get Object() {
            return this.partBuffList(this.object)
        }
        get Now() {
            return this.partBuffList(this.teamNow)
        }
        get Team(){
            return this.partBuffList(this.teamBase)
        }

    }
    export class Buff<Target> {
        ID: symbol = Symbol()
        /**标签 */
        tag: string = "未知来源"
        /**Buff类型 */
        type: Type
        /**激活时间 */
        StartFrame: number = 0
        /**结束时间 */
        DeadTime: number = 0
        /**属性加成 */
        target: Atom.ObjectBase = new Atom.ObjectBase()
        /**
         * 
         * @param cmd 指令
         * @param DMG 伤害实例
         * @returns 
         */
        modifyDMG(cmd: ModifyCommand,frameTime:number, DMG?: DamageModel.Damage<Target>) {
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
        constructor(tag: string, type: BuffModel.Type, outTime:OutTime, init = (buff: Buff<Target> ) => { }) {
            this.ID = Symbol.for(tag)
            this.tag = tag
            this.type = type
            if(outTime==="never"){
                this.StartFrame = 0
                this.DeadTime = -1
            }else{
                this.StartFrame = outTime.start
                this.DeadTime =  outTime.end
            }
            
            init(this)
        }
    }
}