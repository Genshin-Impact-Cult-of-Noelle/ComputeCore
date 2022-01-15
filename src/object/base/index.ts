/**原子属性 */
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

type ElementProp = {
    [key in ElementType]?: PropAtom;
};
// class ElementObj {
//     /**元素防御 */
//     DEF: ElementProp = {}
//     /**元素攻击 */
//     DMG: ElementProp = {}
//     constructor() {
//         for (let key in ElementType) {
//             const ElementKey = ElementType[key]
//             this.DEF[ElementKey] = new PropAtom()
//             this.DEF[ElementKey] = new PropAtom()
//         }
//     }
//     add(other: ElementObj) {
//         for (let key in ElementType) {
//             const ElementKey = ElementType[key]
//             this.DEF[ElementKey] += other.DEF[ElementKey]
//             this.DEF[ElementKey] += other.DMG[ElementKey]
//         }
//     }

// }
type BuffType = "teamBase" | "teamNow" | "object"
type ElementType="Pyro"|"Hydro"|"Cryo"|"Electro"|"Geo"|"Anemo"|"Dendro"|"Physical"
type ElementPropType = "DEF"|"DMG"
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
type BuffArray = Buff[]
class Buff {
    activeType: boolean = true;
    tag: string = "未知来源"
    type: BuffType
    activeFrame: number = 0
    // frameFunction:
    propObject: BasePropObject = new BasePropObject()
    DMGModify: DMGModifyFunction = (c) => { return c }
    constructor(type: BuffType, init: (Buff: Buff) => void) {
        this.type = type
        init(this)
    }
}
class BuffList {
    /**组队全局buff */
    private teamBase: BuffArray = []
    /**组队驻场buff */
    private teamNow: BuffArray = []
    /**本地buff */
    private object: BuffArray = []
    addBuff(buff: Buff) {
        this[buff.type].push(buff)
    }
    findBuff(tag: string) {
        return [
            this.teamBase.filter(item => item.tag == tag),
            this.teamNow.filter(item => item.tag == tag),
            this.object.filter(item => item.tag == tag)
        ]
    }
    getArray(key: BuffType) {
        return this[key]
    }
}
class BasePropObject {
    static get prop() {
        return PropAtom
    }
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
    private addKey(key: string, Other: BasePropObject) {
        const [ThisAtom, OtherAtom] = [this[key], Other[key]]
        if (ThisAtom instanceof PropAtom && OtherAtom instanceof PropAtom) {
            ThisAtom.add(OtherAtom)
        }
    }
    add(other: BasePropObject) {
        for (const key in BasePropObject.prototype) {
            this.addKey(key, other)
        }
        return this
    }
    getElementDEF(key: ElementType) {
         
        return this[ElementDEF[key]]
    }
    getElementDMG(key: ElementType) {
        return this[ElementDMG[key]]
    }
    setAllElement(type:ElementPropType, val: number) {
        let keyBox =type==="DMG"?ElementDMG:ElementDEF
        for (let key in keyBox) {
            const ElementKey = keyBox[key] 
            this[ElementKey].val=val
        }
    }
}
class BaseObject extends BasePropObject {
    ONE: PropAtom = new PropAtom()
    buffList: BuffList = new BuffList()
    get Last() {
        const TempObject = new BasePropObject()
        this.buffList.getArray("object").map(item => {
            TempObject.add(item.propObject)
        })
        TempObject.add(this)
        return TempObject
    }
    constructor() {
        super()
    }
}
type ModifyCommand = "ATKNORMAL" | "ATKNORMAL"
interface DMGModifyFunction {
    (command: ModifyCommand): any
}
export class Base {
    static get Object() {
        return BaseObject
    }
    static get Buff() {
        return Buff
    }
}