import { ElementType } from "./enum";

type Keys<T> = keyof T

/**原子 */
namespace Atom {
    export class PropAtom {
        /**白值 */
        val: number = 0;
        /**增加百分比 */
        rate: number = 0;
        /**额外固定 */
        extra: number = 0;
        constructor() {
        }
        get Last() {
            return this.val * this.rate + this.extra
        }
        add(Prop: PropAtom) {
            this.val += Prop.val
            this.rate += Prop.val
            this.extra += Prop.extra
        }
    }
    export type ElementType = "Pyro" | "Hydro" | "Cryo" | "Electro" | "Geo" | "Anemo" | "Dendro" | "Physical"
}
/**分子 */
namespace Molecule {
    class PropAtom extends Atom.PropAtom { }
    type ElementType = Atom.ElementType
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
    class ObjectProps {
        /**攻击力 */
        atk: PropAtom = new PropAtom()
        /**防御力 */
        def: PropAtom = new PropAtom()
        /**生命值 */
        health: PropAtom = new PropAtom()
        /**元素精通 */
        elementMaster: PropAtom = new PropAtom()
        /**元素充能效率 */
        elementChargeRate: PropAtom = new PropAtom()
        /**暴击率 */
        critRate: PropAtom = new PropAtom()
        /**暴击伤害 */
        critDamage: PropAtom = new PropAtom()
        /**治疗加成 */
        cureRate: PropAtom = new PropAtom()
        /**受治疗加成 */
        cureRateBefor: PropAtom = new PropAtom()
        /**冷却缩减 */
        coolDownRate: PropAtom = new PropAtom()
        /**护盾强效 */
        armorRate: PropAtom = new PropAtom()
        /**元素属性 */
        elementDMGPyro: PropAtom = new PropAtom()
        elementDEFPyro: PropAtom = new PropAtom()
        elementDMGHydro: PropAtom = new PropAtom()
        elementDEFHydro: PropAtom = new PropAtom()
        elementDMGCryo: PropAtom = new PropAtom()
        elementDEFCryo: PropAtom = new PropAtom()
        elementDMGElectro: PropAtom = new PropAtom()
        elementDEFElectro: PropAtom = new PropAtom()
        elementDMGGeo: PropAtom = new PropAtom()
        elementDEFGeo: PropAtom = new PropAtom()
        elementDMGAnemo: PropAtom = new PropAtom()
        elementDEFAnemo: PropAtom = new PropAtom()
        elementDMGDendro: PropAtom = new PropAtom()
        elementDEFDendro: PropAtom = new PropAtom()
        elementDMGPhysical: PropAtom = new PropAtom()
        elementDEFPhysical: PropAtom = new PropAtom()
        constructor() {

        }
    }
    export class ObjectBase extends ObjectProps {
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
        getElementDEF(key: ElementType) {
            return this[ElementPropName["DMG"][key]]
        }
        getElementDMG(key: ElementType) {
            return this[ElementPropName["DMG"][key]]
        }
        setAllElementProp(type: ElementPropNameKey, val: PropAtom) {
            for (let key in ElementPropName[type]) {
                this[ElementPropName[type][key] as ElementDMG] = val
            }
            return this
        }
        addAllElementProp(type: ElementPropNameKey, val: PropAtom) {
            for (let key in ElementPropName[type]) {
                this[ElementPropName[type][key] as ElementDMG].add(val)
            }
            return this
        }
    }
}
/**合成物 */
namespace Polymer{
    type BuffType = "teamBase" | "teamNow" | "object"
    type ModifyCommand =""
    class Buff{
        ID:symbol=Symbol()
        tag: string = "未知来源"
        type: BuffType
        activeFrame: number = 0
        modifyDMG(c:ModifyCommand,DMG?:Damage){
            return DMG
        }
        constructor(type:BuffType,init=(buff:Buff)=>null){
            this.type = type
            init(this)
        }
    }
    class Skill{
        label:string = "未知技能"
    }
    class Damage{
        
    }
    class Role{

    }
    class Artifact{

    }
    class Weapon{

    }
}

































// /**原子属性 */
// namespace BaseSystem {
//     type BuffType = "teamBase" | "teamNow" | "object"
//     type BuffArray = Buff[]
//     class Buff {
//         activeType: boolean = true;
//         tag: string = "未知来源"
//         type: BuffType
//         activeFrame: number = 0
//         // frameFunction:
//         propObject: BasePropObject = new BasePropObject()
//         DMGModify: DMGModifyFunction = (c) => { return c }
//         constructor(type: BuffType, init: (Buff: Buff) => void) {
//             this.type = type
//             init(this)
//         }
//     }
// }




// class BuffList {
//     /**组队全局buff */
//     private teamBase: BuffArray = []
//     /**组队驻场buff */
//     private teamNow: BuffArray = []
//     /**本地buff */
//     private object: BuffArray = []
//     addBuff(buff: Buff) {
//         this[buff.type].push(buff)
//     }
//     findBuff(tag: string) {
//         return [
//             this.teamBase.filter(item => item.tag == tag),
//             this.teamNow.filter(item => item.tag == tag),
//             this.object.filter(item => item.tag == tag)
//         ]
//     }
//     getArray(key: BuffType) {
//         return this[key]
//     }
// }
// class BasePropObject {
//     /**攻击力 */
//     atk: PropAtom = new PropAtom()
//     /**防御力 */
//     def: PropAtom = new PropAtom()
//     /**生命值 */
//     health: PropAtom = new PropAtom()
//     /**元素精通 */
//     elementMaster: PropAtom = new PropAtom()
//     /**元素充能效率 */
//     elementChargeRate: PropAtom = new PropAtom()
//     /**暴击率 */
//     critRate: PropAtom = new PropAtom()
//     /**暴击伤害 */
//     critDamage: PropAtom = new PropAtom()
//     /**治疗加成 */
//     cureRate: PropAtom = new PropAtom()
//     /**受治疗加成 */
//     cureRateBefor: PropAtom = new PropAtom()
//     /**冷却缩减 */
//     coolDownRate: PropAtom = new PropAtom()
//     /**护盾强效 */
//     armorRate: PropAtom = new PropAtom()
//     /**元素属性 */
//     element: ElementObj = new ElementObj()

//     private addKey(key: string, Other: BasePropObject) {
//         const [ThisAtom, OtherAtom] = [this[key], Other[key]]
//         if (ThisAtom instanceof PropAtom && OtherAtom instanceof PropAtom) {
//             ThisAtom.add(OtherAtom)
//         } else if (ThisAtom instanceof ElementObj && OtherAtom instanceof ElementObj) {
//             ThisAtom.add(OtherAtom)
//         }
//     }
//     add(other: BasePropObject) {
//         for (const key in BasePropObject.prototype) {
//             this.addKey(key, other)
//         }
//         return this
//     }
//     getElementDEF(key: ElementType) {
//         return this.element.DEF[key]
//     }
//     getElementDMG(key: ElementType) {
//         return this.element.DMG[key]
//     }
//     setAllElementDMG(val: PropAtom) {
//         for (let key in ElementType) {
//             const ElementKey = ElementType[key]
//             this.element.DEF[ElementKey]

//         }
//     }
// }
// // class Base extends BasePropObject {
// //     buffList: BuffList = new BuffList()
// //     get Last() {
// //         const TempObject = new BasePropObject()
// //         this.buffList.getArray("object").map(item => {
// //             TempObject.add(item.propObject)
// //         })
// //         TempObject.add(this)
// //         return TempObject
// //     }
// //     constructor() {
// //         super()
// //     }
// // }
// type ModifyCommand = "ATKNORMAL" | "ATKNORMAL"
// interface DMGModifyFunction {
//     (command: ModifyCommand): any

// }
// class ExtraBaseObject {

// }
// class Weapon { }

// // class Role extends Base {
// //     ONE: PropAtom = new PropAtom()
// //     constructor() {
// //         super()
// //         this.ONE.val = 1
// //         this.critRate.val = 0.05
// //         this.critDamage.val = 0.5
// //         this.elementChargeRate.val = 1
// //     }
// // }


// class Artifact { }