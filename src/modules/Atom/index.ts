/*
 * @Date: 2022-01-17 17:36:44
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 15:21:37
 * @FilePath: \noelle-core-v2\src\modules\Atom\index.ts
 */
import { Common } from "../../common/typeTool";
import { BuffModel } from "../Buff";
export namespace Atom {
    type PropTypeNotNull<T = number> = {
        /**基础 */
        base: T;
        /**增加百分比 */
        rate: T;
        /**额外固定 */
        extra: T;
    }
    type PropHistroy = {
        /**标签 */
        label: string,
        /**值 */
        val: number,
    }
    export type PropType<T = number, CanNull = "No"> = CanNull extends "No" ? PropTypeNotNull<T> : Partial<PropTypeNotNull<T>>
    /**单条属性 */
    export class Prop implements PropType {
        /**属性增幅记录 */
        content: PropType<PropHistroy[]> = { base: [], rate: [], extra: [] }
        base = 0;
        rate = 0;
        extra = 0;
        constructor() {
        }
        /**计算本条属性 */
        get Last() {
            return this.base * (1 + this.rate) + this.extra
        }
        /**属性相加 */
        add(prop: Prop) {
            for (const key in this.content) {
                const asKey = <Common.Keys<PropType>>key
                this[asKey] += prop[asKey]
                this.content[asKey].push(...prop.content[asKey])
            }
            return this
        }
        push(label: string, val: number, type: Common.Keys<PropType>) {
            this[type] += val
            this.content[type].push({
                label,
                val
            })
            return this
        }
    }


    //   type ElementType = "Pyro" | "Hydro" | "Cryo" | "Electro" | "Geo" | "Anemo" | "Dendro" | "Physical"
    export type ElementType<PreStr extends string = "", LastStr extends string = ""> = Common.LinkStr<PreStr, LastStr, ["Pyro", "Hydro", "Cryo", "Electro", "Geo", "Anemo", "Dendro", "Physical"]>
    type ElementDEF = ElementType<"elementDEF">
    type ElementDMG = ElementType<"elementDMG">
    export type ArtifactPropUserName<T extends string[] = ["atk", "def", "health"]> =
        Common.LinkStr<"", "Rate", T> |
        Common.LinkStr<"", "Extra", T> |
        ElementDMG | "critRate" | "critDamage"

    type ElementPropNameKey = "DEF" | "DMG"
    const ElemnetPropName: {
        DEF: ElementDEF[],
        DMG: ElementDMG[]
    } = {
        DEF: ["elementDEFPyro", "elementDEFHydro", "elementDEFCryo", "elementDEFElectro", "elementDEFGeo", "elementDEFAnemo", "elementDEFDendro", "elementDEFPhysical"],
        DMG: ["elementDMGPyro", "elementDMGHydro", "elementDMGCryo", "elementDMGElectro", "elementDMGGeo", "elementDMGAnemo", "elementDMGDendro", "elementDMGPhysical"],
    }
    export class ObjectProps {
        /**攻击力 */
        atk: Prop = new Prop()
        /**防御力 */
        def: Prop = new Prop()
        /**生命值 */
        health: Prop = new Prop()
        /**元素精通 */
        elementMaster: Prop = new Prop()
        /**元素充能效率 */
        elementChargeRate: Prop = new Prop()
        /**暴击率 */
        critRate: Prop = new Prop()
        /**暴击伤害 */
        critDamage: Prop = new Prop()
        /**治疗加成 */
        cureRate: Prop = new Prop()
        /**受治疗加成 */
        cureRateBefor: Prop = new Prop()
        /**冷却缩减 */
        coolDownRate: Prop = new Prop()
        /**护盾强效 */
        armorRate: Prop = new Prop()
        /**元素属性 */
        elementDMGPyro: Prop = new Prop()
        elementDEFPyro: Prop = new Prop()
        elementDMGHydro: Prop = new Prop()
        elementDEFHydro: Prop = new Prop()
        elementDMGCryo: Prop = new Prop()
        elementDEFCryo: Prop = new Prop()
        elementDMGElectro: Prop = new Prop()
        elementDEFElectro: Prop = new Prop()
        elementDMGGeo: Prop = new Prop()
        elementDEFGeo: Prop = new Prop()
        elementDMGAnemo: Prop = new Prop()
        elementDEFAnemo: Prop = new Prop()
        elementDMGDendro: Prop = new Prop()
        elementDEFDendro: Prop = new Prop()
        elementDMGPhysical: Prop = new Prop()
        elementDEFPhysical: Prop = new Prop()
        constructor() {

        }
    }
    export class ObjectBase extends ObjectProps {
        ID: symbol = Symbol()
        constructor() {
            super()
        }
        private addKey(key: Common.Keys<ObjectProps>, Other: ObjectBase) {
            const [ThisAtom, OtherAtom] = [this[key], Other[key]]
            ThisAtom.add(OtherAtom)
        }
        clean() {
            for (const key of Object.keys(this)) {
                if (this[key] instanceof Prop) {
                    this[key] = new Prop()
                }
            }
            return this
        }
        add(other: ObjectBase) {
            for (const key of Object.keys(this)) {
                if (other[key] instanceof Prop) {
                    this.addKey(key as keyof ObjectProps, other)
                }
            }
            return this
        }
        getElementDEF(key: ElementType) {
            return this["elementDEF" + key as ElementDEF]
        }
        getElementDMG(key: ElementType) {
            return this["elementDMG" + key as ElementDMG]
        }
        setAllElementProp(type: ElementPropNameKey, label: string, val: number) {
            const prop = new Prop().push(label, val, "base")
            ElemnetPropName[type].map(item => {
                this[item] = prop
            })
            return this
        }
        addAllElementProp(type: ElementPropNameKey, label: string, val: number) {
            const prop = new Prop().push(label, val, "base")
            ElemnetPropName[type].map(item => {
                this[item].add(prop)
            })
            return this
        }
    }



}
