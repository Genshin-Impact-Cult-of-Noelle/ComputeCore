/*
 * @Date: 2022-01-16 09:18:52
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 16:50:30
 * @FilePath: \noelle-core-v2\src\Core.ts
 */
import { ArtifactModel } from "./modules/Artifact"
import { Atom } from "./modules/Atom"
import { BuffModel } from "./modules/Buff"
import { CharacterModel } from "./modules/Character"
import { ControlModel } from "./modules/Control"
import { DamageModel } from "./modules/Damage"
import { SkillModel } from "./modules/Skill"
import { WeaponModel } from "./modules/Weapon"

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
        export type Character = ControlModel.CharacterRoleData
        export type Skill = SkillModel.SkillData<ControlModel.Control>
        export type Weapon = ControlModel.WeaponData
        export type ArtifactSet = ControlModel.ArtifactData
    }
    export const Class = Classes
    export const Tool = Tools
    export const load = ControlModel.Control.loadData
}
export default Noelle
import {诺艾尔} from "./default/诺艾尔"
import {木桩} from "./default/木桩"
Noelle.load([木桩,诺艾尔])
const x = new ControlModel.Control("诺艾尔")
const mod = new ControlModel.Control("木桩")
x.Q(x, 1)

x.setArtifact({
    type: "时之沙",
    name: "TEST",
    main: {
        elementDMGGeo: 0.466
    },
    set: "TEST",
    other: {
        atkRate: 0.466,
        defRate: 1230
    }
})
x.Q(x, 11)
x.A(mod,12)
x.A(mod,12)
x.A(mod,12)
x.A(mod,12)
console.log(x.Last.atk.content);


