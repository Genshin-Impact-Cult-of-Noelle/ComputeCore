# noelleCore
[![State-of-the-art Shitcode](https://img.shields.io/static/v1?label=State-of-the-art&message=Shitcode&color=7B5804)](https://github.com/trekhleb/state-of-the-art-shitcode)
#### 介绍
noelleCore,适用于原神计算,诺艾尔神教专用计算核心。
通过构造自定义函数来完成原神中的技能机制

#### 快速入门
安装
```
npm i noelle-core --save
```
使用

```js
// import { Character, CoreHas } from "noelle-core"
// const { Character, CoreHas } = require("noelle-core")
import Core from "noelle-core"

//->true
Core.CoreHas("诺艾尔") 
Core.CoreHas("螭骨剑") 
Core.CoreHas("角斗士的终幕礼")
//->false    
Core.CoreHas("立本")   

//创建诺艾尔角色   
const noelle = new Core.Character({ name: "诺艾尔", extar: false, level: 90, star: 6 })
//创建木桩
const mod = new Core.Character({ name: "木桩" })

noelle
    //设置技能等级可以缺省默认{a:1,e:1,q:1}
    .skill({ a: 10, q: 13, e: 13 }) 

    //设置武器name必填 
    .weapon({ name: "白影剑", level: 90, extar: false, star: 5 })

    .artifact({
        //设置圣遗物套装名
        artifactSet: "角斗士的终幕礼",    
        //设置圣遗物部位                           
        artifactType: "理之冠",
        //主属性
        main: { "healthExtra": 780 },      
        //其他属性                       
        other: {                                                  
            "critDMG": 0.07,
            "critRate": 0.152,
            "atkExtra": 37,
            "energyRechargeRate": 0.052
        }
    })

    //白影要先叠被动
    .useA(mod)
    .useA(mod)
    .useA(mod)
    .useA(mod)
    //使用技能
    .useQ()    
    //如果有目标会产生伤害 
    .useA(mod)  

    //伤害列表[]
console.log(noelle.DMG) 
```

#### 词典
```json
{
    "atkBase":"攻击力-白",
    "atkExtra": "攻击力-固",
    "atkRate": "攻击力-%",
    "defBase":"防御力-白",
    "defExtra": "防御力-固",
    "defRate": "防御力-%",
    "healthBase":"生命值-白",
    "healthExtra": "生命值-固",
    "healthRate": "生命值-%",
    "critRate": "暴击率",
    "critDMG": "暴击伤害",
    "energyRechargeRate": "元素充能效率",
    "elementMastery": "元素精通",
    "elementDMGPyro": "火元素伤害加成",
    "elementDMGHydro": "水元素伤害加成",
    "elementDMGCryo": "冰元素伤害加成",
    "elementDMGElectro": "雷元素伤害加成",
    "elementDMGGeo": "岩元素伤害加成",
    "elementDMGAnemo": "风元素伤害加成",
    "elementDMGDendro": "草元素伤害加成",
    "elementDMGPhysical": "物理伤害加成",
    "cureRate": "治疗加成"
}
```
增伤、带条件的面板不展示与角色面板，只会在伤害修饰器中生效