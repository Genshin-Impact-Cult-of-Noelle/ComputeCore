/*
 * @Date: 2022-01-16 09:18:52
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-24 15:18:45
 * @FilePath: \noelle-core-v2\src\index.ts
 */
import { Atom } from "./modules/Atom"
import { BuffModel } from "./modules/Buff"
import { ControlModel } from "./modules/Control"
import { DamageModel } from "./modules/Damage"
import { SkillModel } from "./modules/Skill"
import * as Enum from "./enum"
export namespace Types {
    export type Character = ControlModel.CharacterRoleData
    export type Skill = SkillModel.SkillData<ControlModel.Control>
    export type Weapon = ControlModel.WeaponData
    export type ArtifactSet = ControlModel.ArtifactData
    export type SkillRate = SkillModel.DMGRateDetail
}
export const Classes = {
    Prop: Atom.Prop,
    Buff: BuffModel.Buff,
    Damage: DamageModel.Damage
}
export const Tools = {
    getFrame(start: number, time: number) {
        const end = start + Math.floor(time * 60)
        return {
            start,
            end
        }
    },
    DMGRate(data:Types.SkillRate,lv:number): DamageModel.Rate[] {
        const result:DamageModel.Rate[] =[]
        data.row.map(item=>{
            result.push({
                prop:item.use,
                rate:item.rate[lv-1]
            })
        })
        return result
    }
}
export namespace Noelle {
    export namespace Type {
        export type Character = Types.Character
        export type Skill = Types.Skill
        export type Weapon = Types.Weapon
        export type ArtifactSet = Types.ArtifactSet
        export type SkillRate = Types.SkillRate
    }
    export const Class = Classes
    export const Tool = Tools
    export const load = ControlModel.Control.loadData
    export const ConstData = Enum
}
export default Noelle