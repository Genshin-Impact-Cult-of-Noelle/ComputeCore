/*
 * @Date: 2022-01-17 18:24:58
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-17 19:10:33
 * @FilePath: \noelle-core-v2\src\modules\Skill\index.ts
 */
import { Molecule } from "../Molecule"
import { CharacterModel } from "../Character"
export namespace SkillModel{
    export type Data<FncTarget> = {
        label:string,
        fnc:(from:FncTarget , to: FncTarget, lv?: number) =>void
    }
    export class Skill<Target> {
        ID: symbol = Symbol()
        label: string = "未知技能"
        fnc(from:Target , to: Target, lv?: number) { return }
        constructor(data: Data<Target>) {

        }
    }
}