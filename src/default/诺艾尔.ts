/*
 * @Date: 2022-01-20 10:04:48
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-21 16:42:04
 * @FilePath: \noelle-core-v2\src\default\诺艾尔.ts
 */

import Noelle, { Tools, Types, Classes } from "../"
import { WeaponExtarArr } from "../enum"

const skillLabel = "大扫除"
const Burst: Noelle.Type.Skill = {
    name: skillLabel,
    init: (s) => {
        let CD = 0
        const defToAtk = [0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.8, 0.85, 0.9, 0.95]
        s.fnc = (from, to, t, lv = 1) => {
            if (CD > t) {
                const sum = CD - t
                console.warn("尚未冷却警告", skillLabel, "剩余时间", Math.floor(sum / 60), "秒", sum % 60, "帧")
            }
            CD = 900 * (1 - from.Last.coolDownRate.Last) + t
            const buff = new Noelle.Class.Buff(skillLabel, "object", Tools.getFrame(t, 12))
            const Character = from.character.core
            const CharacterDEF = from.Last.def.Last
            const Rate = defToAtk[lv - 1] + (Character.extraStar > 5 ? 0.5 : 0)
            const atk = new Noelle.Class.Prop().push(skillLabel, CharacterDEF * Rate, "extra")
            buff.target["atk"].add(atk)

            from.pushBuff("character", buff)
            if (to.character.core.tag != from.character.core.tag) {

            }
            return {
                delay: {
                    must: 120,
                    last: 119
                }
            }
        }
    }

}




let atkCount = 0
const atkdata: Types.SkillRate[] = [
    {
        row: [
            {
                use: "atk",
                rate: [0.7912, 0.8556, 0.9200, 1.0120, 1.0764, 1.1500, 1.2512, 1.3524, 1.4536, 1.5640, 1.6744, 1.7848, 1.8952, 2.0056, 2.116],
            }
        ],
        delay: { must: 20, last: 20 }
    },
    {
        row: [
            {
                use: "atk",
                rate: [0.7336, 0.7933, 0.853, 0.9383, 0.998, 1.0663, 1.1601, 1.2539, 1.3477, 1.4501, 1.5525, 1.6548, 1.7572, 1.8595, 1.9619],
            }
        ],
        delay: { must: 20, last: 20 }
    },
    {
        row: [
            {
                use: "atk",
                rate: [0.8626, 0.9328, 1.003, 1.1033, 1.1735, 1.2538, 1.3641, 1.4744, 1.5847, 1.7051, 1.8255, 1.9458, 2.0662, 2.1865, 2.3069],
            }
        ],
        delay: { must: 20, last: 20 }
    },
    {
        row: [
            {
                use: "atk",
                rate: [1.1343, 1.2267, 1.319, 1.4509, 1.5432, 1.6488, 1.7938, 1.9389, 2.084, 2.2423, 2.4006, 2.5589, 2.7171, 2.8754, 3.0337],
            }
        ],
        delay: { must: 20, last: 20 }
    },
]
const AttackName = "普通攻击·西风剑术·女仆"
const Attack: Noelle.Type.Skill = {
    name: AttackName,
    init: (s) => {
        s.fnc = (from, to, t, lv = 1) => {
            if (from.tag != to.tag) {
                const DMG = new Noelle.Class.Damage(from, s, to, Tools.DMGRate(atkdata[atkCount], lv), "ATKNORMAL", from.character.core.nowBaseAtkElement)
                from.modifyDamage(DMG, t, "A")
                to.pushDamage(DMG, t)
            }
            atkCount++
            atkCount %= 4
            return {
                delay: {
                    must: 120,
                    last: 110
                }
            }
        }

    }

}
const SkillName = "护心凯"
const Skill: Noelle.Type.Skill = {
    name: SkillName,
    init(s) {
        s.fnc = (from, to, time, lv = 1) => {
            return {}
        }
    }
}
export const 诺艾尔: Noelle.Type.Character = {
    type: "character",
    character: {
        elementType: "Geo",
        gender: "girl",
        levelData: {
            def: {
                rate: [0, 0, 0, 0, 0.075, 0.075, 0.15, 0.15, 0.15, 0.15, 0.225, 0.225, 0.30, 0.30],
                base: [67, 172, 222, 333, 368, 423, 471, 526, 562, 617, 652, 708, 743, 799],
            },
            atk: {
                base: [16, 41, 53, 80, 88, 101, 113, 126, 134, 148, 156, 169, 178, 191],
            },
            health: {
                base: [1012, 2600, 3356, 5027, 5564, 6400, 7117, 7953, 8490, 9325, 9862, 10698, 11235, 12071],
            }
        },
        name: "诺艾尔",
        star: 4,
        tag: "Tivat",
        weaponType: "claymore"
    },
    skill: {
        elementBurst: Burst,
        elementSkill: Burst,
        normalAttack: Attack
    }
}

