import { Base, PropAtom } from "../base";

class ContronBox{
    pa
}
interface RoleSkillLevel{
    A:number,
    E:number,
    Q:number
}
type LevelPropName="atk"|"def"|"health"|"critDamage"|"critRate"
interface RoleData{
    levelData:{
        [key in LevelPropName]?:PropAtom
    }
}
class Role extends Base.Object{
    roleData:RoleData
    skillLevel:RoleSkillLevel={E:1,A:1,Q:1}
    constructor(roleData:RoleData){
        super()
        this.ONE.val=1
        this.critRate.val=0.05
        this.critDamage.val=0.5
        this.elementChargeRate.val=1
    }


}