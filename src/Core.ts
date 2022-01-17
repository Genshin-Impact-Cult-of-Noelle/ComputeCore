import {  GROUP, LevelArr } from "./enum";
import { Keys } from "./common/typeTool"

/**原子 */
namespace Atom {
    type PropTypeNotNull<T = number> = {
        /**基础 */
        base: T;
        /**增加百分比 */
        rate: T;
        /**额外固定 */
        extra: T;
    }
    type PropHistroy = {
        label: string,
        val: number,
    }
    export type PropType<T = number, CanNull = "No"> = CanNull extends "No" ? PropTypeNotNull<T> : Partial<PropTypeNotNull<T>>
    /**单条属性 */
    export class Prop implements PropType {
        content: PropType<PropHistroy[]> = { base: [], rate: [], extra: [] }
        base = 0;
        rate = 0;
        extra = 0;
        constructor() {
        }
        get Last() {
            return this.base * (1 + this.rate) + this.extra
        }
        add(prop: Prop) {
            for (const key in this.content) {
                const asKey = <Keys<PropType>>key
                this[asKey] = prop[asKey]
                this.content[asKey].push(...prop.content[asKey])
            }
        }
    }
    export type ElementType = "Pyro" | "Hydro" | "Cryo" | "Electro" | "Geo" | "Anemo" | "Dendro" | "Physical"
}
/**分子 */
namespace Molecule {
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
        atk: Atom.Prop = new Atom.Prop()
        /**防御力 */
        def: Atom.Prop = new Atom.Prop()
        /**生命值 */
        health: Atom.Prop = new Atom.Prop()
        /**元素精通 */
        elementMaster: Atom.Prop = new Atom.Prop()
        /**元素充能效率 */
        elementChargeRate: Atom.Prop = new Atom.Prop()
        /**暴击率 */
        critRate: Atom.Prop = new Atom.Prop()
        /**暴击伤害 */
        critDamage: Atom.Prop = new Atom.Prop()
        /**治疗加成 */
        cureRate: Atom.Prop = new Atom.Prop()
        /**受治疗加成 */
        cureRateBefor: Atom.Prop = new Atom.Prop()
        /**冷却缩减 */
        coolDownRate: Atom.Prop = new Atom.Prop()
        /**护盾强效 */
        armorRate: Atom.Prop = new Atom.Prop()
        /**元素属性 */
        elementDMGPyro: Atom.Prop = new Atom.Prop()
        elementDEFPyro: Atom.Prop = new Atom.Prop()
        elementDMGHydro: Atom.Prop = new Atom.Prop()
        elementDEFHydro: Atom.Prop = new Atom.Prop()
        elementDMGCryo: Atom.Prop = new Atom.Prop()
        elementDEFCryo: Atom.Prop = new Atom.Prop()
        elementDMGElectro: Atom.Prop = new Atom.Prop()
        elementDEFElectro: Atom.Prop = new Atom.Prop()
        elementDMGGeo: Atom.Prop = new Atom.Prop()
        elementDEFGeo: Atom.Prop = new Atom.Prop()
        elementDMGAnemo: Atom.Prop = new Atom.Prop()
        elementDEFAnemo: Atom.Prop = new Atom.Prop()
        elementDMGDendro: Atom.Prop = new Atom.Prop()
        elementDEFDendro: Atom.Prop = new Atom.Prop()
        elementDMGPhysical: Atom.Prop = new Atom.Prop()
        elementDEFPhysical: Atom.Prop = new Atom.Prop()
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
        setAllElementProp(type: ElementPropNameKey, val: Atom.Prop) {
            for (let key in ElementPropName[type]) {
                this[ElementPropName[type][key] as ElementDMG] = val
            }
            return this
        }
        addAllElementProp(type: ElementPropNameKey, val: Atom.Prop) {
            for (let key in ElementPropName[type]) {
                this[ElementPropName[type][key] as ElementDMG].add(val)
            }
            return this
        }
    }

}
/**合成物 */
namespace Polymer {
    export type LevelData = {
        [key in Keys<Molecule.ObjectProps>]?: Atom.PropType<number[], "Yes">
    }
    type BaseObjectdata = {
        name: string
        levelData: LevelData
    }
    export type SkillData = {

    }
    type BuffType = "teamBase" | "teamNow" | "object"
    type ModifyCommand = ""
    class BuffCenter {
        role: Base
        teamBase: Buff[] = []
        teamNow: Buff[] = []
        object: Buff[] = []
        constructor(role: Base) {
            this.role = role
        }
        nextFrame(frame: number) {
            this.object = this.object.filter(item => { return !!item.nextFrame(frame) })
            this.teamBase = this.teamBase.filter(item => { return !!item.nextFrame(frame) })
            this.teamNow = this.teamNow.filter(item => { return !!item.nextFrame(frame) })
        }

    }
    class Buff {
        /**标签 */
        tag: string = "未知来源"
        /**Buff类型 */
        type: BuffType
        /**激活时间 */
        private StartFrame: number = 0
        /**结束时间 */
        private DeadTime: number = 0
        /**属性加成 */
        target: Molecule.ObjectBase = new Molecule.ObjectBase()
        /**
         * 
         * @param c 指令
         * @param DMG 伤害实例
         * @returns 
         */
        modifyDMG(c: ModifyCommand, DMG?: Damage) {
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
        constructor(target: Base, type: BuffType, init = (buff: Buff) => { }) {
            this.target = target
            this.type = type
            init(this)
        }
    }
    class Base extends Molecule.ObjectBase {
        buff: BuffCenter
        private _level: number = 0;
        name: string = "未知";
        levelData: LevelData

        constructor(data: BaseObjectdata) {
            super()
            this.buff = new BuffCenter(this)
            this.name = data.name
            this.levelData = data.levelData
            this.level = 1
        }
        get Last() {
            const tempBase = new Molecule.ObjectBase()
            this.buff.object.map(item => {
                tempBase.add(item.target)
            })
            return tempBase
        }
        set level(val: number) {
            this._level = LevelArr[val]
            for (const key in this.levelData) {
                const asKey = <Keys<LevelData>>key
                const prop = this.levelData[asKey]
                if (prop) {
                    for (const type in prop) {
                        const asType = <Keys<Atom.PropType>>type
                        const propData = prop[asType]
                        if (propData) {
                            this[asKey][asType] = propData[val]
                        }
                    }
                }
            }
        }
        get level() {
            return this._level
        }

    }
    class Skill {
        ID: symbol = Symbol()
        label: string = "未知技能"
        fnc(from: Role, to: Role, lv?: number) { return }
        constructor(data: SkillData) {

        }
    }
    /**伤害类 */
    type DamageType = "ATKNORMAL" | "ATKBASH" | "ATKDOWN" | "ESKILL" | "QSKILL"
    class Damage {
        from: Role;
        to: Role;
        /**来源固化 */
        fromRole: Molecule.ObjectBase;
        /**伤害目标 */
        toRole: Molecule.ObjectBase;
        /**伤害技能KEY */
        ID: Symbol;
        /**伤害表达式 */
        compute: { use: keyof Molecule.ObjectProps, val: number }[] = []
        /**跟随伤害 */
        other: Damage[] = []
        /**伤害属性 */
        ElementType: Atom.ElementType | undefined = undefined
        /**伤害类型 */
        DMGType: DamageType | undefined = undefined
        /**伤害标签 */
        tag: string
        constructor(from: Role, skill: Skill, to: Role) {
            this.ID = skill.ID
            this.from = from
            this.to = to
            this.fromRole = from.Last
            this.toRole = to.Last
            this.tag = skill.label
        }

    }
    export class Role extends Base {

        /**势力 */
        tag: GROUP = GROUP.Tivat
        /**受到的伤害数组 */
        pain: Damage[] = []
        constructor(data: any) {
            super(data)


        }
        nextFrame(frame: number) {
        }
        A() { }
        AC() { }
        E() { }
        EC() { }
        Q() { }
    }
    class Artifact {

    }
    /* class Weapon extends Base {
         constructor() {
             super()
         }
 
     }*/
}







namespace NoelleCore {
    type DoType = "A" | "Q" | "E" | "Shift" | "Space" | "Change" | "Start"
    type ActionType = {
        command: DoType,
        val: number
    }
    interface TeamInterFace {
        do(type: DoType, val?: number): TeamInterFace
    }
    class Team implements TeamInterFace {
        /**切人冷却 */
        ChangeCD: number = 0
        /**场上角色 */
        nowRole?: Polymer.Role
        /**角色数组 */
        roleList: Polymer.Role[] = []
        /**当前帧位 */
        timeCount: number = 0
        /**指令队列 */
        action: ActionType[] = []
        /**延时帧位 */
        delayFrame = {
            break: 0,
            must: 0,
        }
        delay(val: number) {
            const to = this.timeCount + val
            while (this.timeCount < to) {
                if (this.ChangeCD) this.ChangeCD--
                this.timeCount++
                this.roleList.map(item => {
                    item.nextFrame(this.timeCount)
                })
            }
        }
        play() {
            let lastCMD: DoType = "Start"
            this.action.map(item => {

                switch (item.command) {
                    case "Change":
                        if (this.nowRole === this.roleList[item.val]) break;
                        if (lastCMD == "Space" || lastCMD == "Q" || lastCMD == "Shift") {
                            this.delay(this.delayFrame.must)
                        } else {
                            this.delay(Math.max(this.ChangeCD + this.delayFrame.break))
                        }
                        this.ChangeCD = 180
                        this.delayFrame.break = 0
                        this.delayFrame.must = 0
                        lastCMD = "Change"
                        break;
                    case "A":
                        this.delay(this.delayFrame.must)
                        break;
                    case "E":
                        break;
                    case "Q":
                        break;
                    case "Shift":
                        break;
                    case "Space":

                    default:
                        break;
                }
            })
        }
        do(type: DoType, val?: number) {
            this.action.push({
                command: type,
                val: val || 0
            })
            return this
        }
    }
    class Character {

    }
}
namespace Core {
    export const Atoms = Atom
}
class p extends Core.Atoms.Prop {

}