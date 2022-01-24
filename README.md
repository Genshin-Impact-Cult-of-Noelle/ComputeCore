<!--
 * @Date: 2022-01-19 09:22:06
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-24 11:31:17
 * @FilePath: \noelle-core-v2\README.md
-->
# noelleCore
![![诺艾尔神教](https://www.noelle.cool/)](https://www.noelle.cool/favicon.ico)

[![State-of-the-art Shitcode](https://img.shields.io/static/v1?label=State-of-the-art&message=Shitcode&color=7B5804)](https://github.com/trekhleb/state-of-the-art-shitcode)
### 介绍
noelleCore,适用于原神计算,诺艾尔神教 构造 计算核心。
通过构造自定义函数来完成原神中的技能机制

### 快速入门

#### 安装
```
npm i noelle-core --save
```
#### 使用核心来构建人物

```TypeScript
// import noelle,{ Tools, Types, Classes } from "noelle-core"
import Noelle from "noelle-core"
const { Tool: { getFrame, DMGRate }, Class: { Damage, Buff, Prop } } = Noelle
const burstData:Noelle.Type.SkillRate[]=[
    // SkillRate指技能描述中某一行内容 
    {   //行倍率数据 
        row:[
            {
                // 该行的其中一个倍率以攻击力为基底 
                use: "atk",
                // 该行的其中一个倍率有15个等级数据 
                rate: [0.672, 0.7224, 0.7728, 0.84, 0.8904, 0.9408, 1.008, 1.0752, 1.1424, 1.2096, 1.2768, 1.344, 1.428, 1.512, 1.596]
            }
        ]
        //技能帧计数 
        delay:{
            //此处must与last都是130的原因是这是元素爆发，常规操作下无法中断
            //后续动作可中断时帧数
            must:130,
            //后续动作不可中断时帧数 
            last:130
        }
    }
]
const Burst:Noelle.Type.Skill = {
    //技能名
    name:"大扫除",
    //技能初始化函数(尽情使用闭包吧)
    init(skill){
        //冷却时间
        let CD = 0
        //防御转攻击倍率
        const defToAtk = [0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.8, 0.85, 0.9, 0.95]
        //在fnc里实现具体的技能逻辑
        skill.fnc = (from,to,time,lv)=>{
            if (CD > time) {
                const sum = CD -time
                console.warn("尚未冷却警告", "大扫除", "剩余时间", Math.floor(sum / 60), "秒", sum % 60, "帧")
            }
            CD = 900 * (1 - from.Last.coolDownRate.Last) + time
            /**buff构造参数：
             * 名称，
             * buff类型(object:本体,teamNow：全队驻场生效,teamBase:全队生效)
             * buff存活时间对象
             * 初始化函数(尽情闭包)        
            */            
            const buff = new Buff("大扫除","object",getFrame(time,15),(buffObj)=>{
                //buff.modifyDMG 伤害修饰函数，cmd伤害指令，time伤害帧位，DMG伤害实例(可空)
                buff.modifyDMG = (cmd, time, DMG?) => {
                    //当伤害类型为普攻重击坠击时
                    if (DMG.DMGType === "ATKNORMAL" || DMG.DMGType === "ATKDOWN" || DMG.DMGType === "ATKBASH") {
                        //伤害的元素类型转化为岩属性
                        DMG.ElementType = "Geo"
                    }
                    return DMG
                }
            })
            //取回技能释放角色对象
            const Character = from.character.core
            //取回角色计算装备以及Buff后的最终属性 中的防御属性 中的最终值
            const CharacterDEF = from.Last.def.Last
            //计算大扫除转化倍率
            const Rate = defToAtk[lv - 1] + (Character.extraStar > 5 ? 0.5 : 0)
            //计算转化后的攻击力值使用Prop对象，使用push将属性描述放入Prop对象
            const atk = new Prop().push(skillLabel, CharacterDEF * Rate, "extra")
            //Prop与属性位置无关联，只表示一个数学量
            //你甚至可以 buff.target["critRate"].add(atk)
            //将<Prop>atk 放入对应的属性位置            
            buff.target["atk"].add(atk)
            //将buff放入技能发动者对象
            from.pushBuff("character", buff)
            //判断技能来源以及技能目标是否同一阵营(诺艾尔.tag 不等于 丘丘人.tag)(诺艾尔.tag 等于 五郎.tag)
            if (to.character.core.tag != from.character.core.tag) {
                /**创建伤害对象
                 * from 伤害来源
                 * skillObj 伤害技能
                 * DMGrate 伤害倍率
                 * 伤害类型
                 * 伤害属性
                */
                const DMG = new Damage(from, skillObj, to, DMGRate(burstData[0], lv), "ATKNORMAL", "Geo")
                //将伤害交给来源修饰
                from.modifyDamage(DMG, t, "Q")
                //将伤害交塞入目标并结算
                to.pushDamage(DMG, t)
            }
            return {
                delay:{
                    must:120,
                    last:130
                }
            }
        }
    }
}
//定义人物数据
export const 诺艾尔: Noelle.Type.Character = {
    //数据类型，用于加载时的标识
    type: "character",
    //人物基础属性
    character: {
        //神之眼属性
        elementType: "Geo",
        //性别
        gender: "girl",
        //等级数据
        levelData: {
            //单条等级数据
            def: {
                //rate 增幅百分比
                rate: [0, 0, 0, 0, 0.075, 0.075, 0.15, 0.15, 0.15, 0.15, 0.225, 0.225, 0.30, 0.30],
                //base 白值(暴击爆伤请使用base)
                base: [67, 172, 222, 333, 368, 423, 471, 526, 562, 617, 652, 708, 743, 799],
            },
            atk: {
                base: [16, 41, 53, 80, 88, 101, 113, 126, 134, 148, 156, 169, 178, 191],
            },
            health: {
                base: [1012, 2600, 3356, 5027, 5564, 6400, 7117, 7953, 8490, 9325, 9862, 10698, 11235, 12071],
            }
        },
        //名称
        name: "诺艾尔",
        //星级
        star: 4,
        //阵营
        tag: "Tivat",
        //武器类型
        weaponType: "claymore"
    },
    //技能数据挂载(上面只定义了Burst)
    skill: {
        //元素爆发
        elementBurst: Burst,
        //元素战技
        elementSkill: Burst,
        //普通攻击
        normalAttack: Burst
    }
}
```


<table>
        <tr>
            <td>Noelle模块名</td>
            <td>类型</td>
            <td>属性</td>
            <td>描述</td>
        </tr>
        <tr>
            <td rowspan="5">Type</td>
            <td rowspan="5">TypeScript::type</td>
            <td>Character</td>            
            <td>角色数据结构定义</td>
        </tr>
        <tr>
            <td>Skill</td>
            <td>技能数据结构定义</td>
        </tr>
        <tr>
            <td>Weapon</td>
            <td>武器数据结构定义</td>
        </tr>
        <tr>
            <td>ArtifactSet</td>
            <td>圣遗物套装结构定义</td>
        </tr>
        <tr>
            <td>SkillRate</td>
            <td>技能倍率结构</td>
        </tr>
        <tr>
            <td rowspan="3">Class</td>
            <td rowspan="3">TypeScript::class</td>
            <td>Prop</td>            
            <td>基本属性类</td>
        </tr>
        <tr>
            <td>Buff</td>
            <td>增减异常状态类</td>
        </tr>
        <tr>
            <td>Damage</td>
            <td>伤害类</td>
        </tr>
        <tr>
            <td rowspan="2">Tool</td>
            <td rowspan="2">TypeScript::object&lt;string,Function&gt;</td>
            <td>getFrame</td>            
            <td>取回帧区间object</td>
        </tr>
        <tr>
            <td>DMGRate</td>
            <td>取回技能倍率</td>
        </tr>
        <tr>
            <td>load</td>
            <td>Function</td>
            <td></td>            
            <td>加载数据到缓存区</td>
        </tr>
    </table>

#### 角色属性名词典

#### 圣遗物属性词典
```json
//                       
//请使用键名构造圣遗物数据 
//                       
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
