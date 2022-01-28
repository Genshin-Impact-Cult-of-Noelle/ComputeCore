/*
 * @Date: 2022-01-19 14:03:32
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-28 10:38:18
 * @FilePath: \ComputeCore\src\modules\Action\index.ts
 */
import { ControlModel } from "../Control"

export namespace ActionModel {
    type ActionCMD = "普通攻击" | "元素战技" | "元素爆发" | "闪避" | "切换" | "等待"
    type WaitModel = "must" | "last"
    type ActionItem = {
        CMD: ActionCMD,
        character?: symbol
        delay?: number
    }
    const noneDelay = { must: 0, last: 0 }
    export class Action {
        private LastDo: ActionCMD = "等待"
        private frame: number = 0
        private delayCache: { [key in WaitModel]: number } = { ...noneDelay }
        private toDo: ActionItem[] = []
        private control?: ControlModel.Control
        do(cmd: ActionCMD, data?: ControlModel.Control | number) {
            const action: ActionItem = {
                CMD: cmd,
            }
            if (data instanceof ControlModel.Control && cmd === "切换") {
                action.character = data.character.core.ID
            } else if (typeof data === "number" && cmd === "等待") {
                action.delay = data
            }
            this.toDo.push(action)
            return this
        }
        private check(target: ControlModel.Control) {
            if (this.toDo
                .filter(item => item.CMD === "切换")
                .map(item => {
                    return target.team.inTeam(item.character ?? Symbol())
                })
                .some(item => !item)) return false
            return true
        }
        private waitTo(model: WaitModel) {
            const to = this.frame + this.delayCache[model]
            while (to > this.frame) {
                this.frame++
                this.control?.refreshAll(this.frame)
            }
        }
        play(target: ControlModel.Control, toMod: ControlModel.Control) {
            if (!this.check(target)) {
                return false
            } else {
                target.team.init()
                this.control = target
                for (const iterator of this.toDo) {
                    this.frame++
                    switch (iterator.CMD) {
                        case "普通攻击":
                            this.waitTo("last")
                            this.delayCache = this.control.A(toMod, this.frame)?.delay ?? { ...noneDelay }
                            break;
                        case "元素爆发":
                            if (["普通攻击"].includes(this.LastDo)) {
                                this.waitTo("must")
                            } else {
                                this.waitTo("last")
                            }
                            this.delayCache = this.control.E(toMod, this.frame)?.delay ?? { ...noneDelay }

                            break;
                        case "元素战技":
                            this.waitTo("must")
                            this.control.Q(toMod, this.frame)
                            this.delayCache = this.control.Q(toMod, this.frame)?.delay ?? { ...noneDelay }
                            break;
                        case "等待":

                        default:
                            break;
                    }
                }
                return true
            }
        }
        clean() {
            this.toDo = []
            this.frame = 0
        }
    }
}