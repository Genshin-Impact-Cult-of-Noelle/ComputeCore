import { ControlModel } from "../Control"

/*
 * @Date: 2022-01-19 14:03:32
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 14:28:39
 * @FilePath: \noelle-core-v2\src\modules\Action\index.ts
 */
export namespace ActionModel {
    type ActionCMD = "普通攻击" | "元素战技" | "元素爆发" | "闪避" | "切换"
    type ActionItem = {
        CMD: ActionCMD,
        data: symbol
    }
    export class Action {
        private frame: number = 0
        private toDo: ActionItem[] = []
        do(cmd: ActionCMD, control?: ControlModel.Control) {
            const action: ActionItem = {
                CMD: cmd,
                data: Symbol()
            }
            if (control) {
                action.data = control.character.core.ID
            }
            this.toDo.push(action)
        }
        private check(target:ControlModel.Control) {
            if(this.toDo.filter(item => item.CMD === "切换").map(item=>{
               return target.team.inTeam(item.data)
            }).some(item=>!item))return false
            return true
        }
        play(target:ControlModel.Control) {
            if(this.check(target)){
                return false
            }else{

            }
        }
        clean() {
            this.toDo = []
            this.frame = 0
        }
    }
}