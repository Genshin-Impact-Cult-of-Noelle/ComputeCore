/*
 * @Date: 2022-01-17 17:36:44
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-17 18:20:55
 * @FilePath: \noelle-core-v2\src\modules\Atom\index.ts
 */
import { Keys } from "../../common/typeTool";
import { GROUP, LevelArr } from "../../enum";
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
                const asKey = <Keys<PropType>>key
                this[asKey] = prop[asKey]
                this.content[asKey].push(...prop.content[asKey])
            }
        }
    }
    export type ElementType = "Pyro" | "Hydro" | "Cryo" | "Electro" | "Geo" | "Anemo" | "Dendro" | "Physical"
    enum ElementDEF {
        Pyro = "elementDEFPyro",
        Hydro = "elementDEFHydro",
        Cryo = "elementDEFCryo",
        Electro = "elementDEFElectro",
        Geo = "elementDEFGeo",
        Anemo = "elementDEFAnemo",
        Dendro = "elementDEFDendro",
        Physical = "elementDEFPhysical",
    }
    enum ElementDMG {
        Pyro = "elementDMGPyro",
        Hydro = "elementDMGHydro",
        Cryo = "elementDMGCryo",
        Electro = "elementDMGElectro",
        Geo = "elementDMGGeo",
        Anemo = "elementDMGAnemo",
        Dendro = "elementDMGDendro",
        Physical = "elementDMGPhysical",
    }
    type ElementPropNameKey = "DEF" | "DMG"
    const ElementPropName = {
        DEF: ElementDEF,
        DMG: ElementDMG
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
        private addKey(key: Keys<ObjectProps>, Other: ObjectBase) {
            const [ThisAtom, OtherAtom] = [this[key], Other[key]]
            ThisAtom.add(OtherAtom)
        }
        add(other: ObjectBase) {
            for (const key in ObjectProps.prototype) {
                this.addKey(key as keyof ObjectProps, other)
            }
            return this
        }
        getElementDEF(key: Atom.ElementType) {
            return this[ElementPropName["DMG"][key]]
        }
        getElementDMG(key: Atom.ElementType) {
            return this[ElementPropName["DMG"][key]]
        }
        setAllElementProp(type: ElementPropNameKey, val: Prop) {
            for (let key in ElementPropName[type]) {
                this[ElementPropName[type][key] as ElementDMG] = val
            }
            return this
        }
        addAllElementProp(type: ElementPropNameKey, val: Prop) {
            for (let key in ElementPropName[type]) {
                this[ElementPropName[type][key] as ElementDMG].add(val)
            }
            return this
        }
    }



}
