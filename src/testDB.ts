/*
 * @Date: 2022-01-18 17:53:28
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-19 16:30:12
 * @FilePath: \noelle-core-v2\src\testDB.ts
 */

import { CharacterData, Buff, SkillData, getFrame, Prop, Noelle, WeaponData } from "./Core"
import { WeaponExtarArr } from "./enum"


const skillLabel = "大扫除"
const k: SkillData = {
    name: skillLabel,
    fnc: (() => {
        let CD = 0
        const defToAtk = [0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.8, 0.85, 0.9, 0.95]
        return (from, to, t, lv = 1) => {
            if (CD > t) {
                const sum = CD - t
                console.warn("尚未冷却警告", skillLabel, "剩余时间", Math.floor (sum / 60), "秒", sum % 60, "帧")
            }
            CD = 900 * (1 - from.Last.coolDownRate.Last) + t
            const buff = new Buff(skillLabel, "object", getFrame(t, 12))
            const Character = from.character.core
            const CharacterDEF = from.Last.def.Last
            const Rate = defToAtk[lv - 1] + (Character.extraStar > 5 ? 0.5 : 0)
            const atk = new Prop().push(skillLabel, CharacterDEF * Rate, "extra")
            buff.target["atk"].add(atk)
            console.log(CharacterDEF, CharacterDEF * Rate);

            from.pushBuff("character", buff)
            if (to.character.core.tag != from.character.core.tag) {

            }
            return {
                delay: {
                    must: 120,
                    last: 110
                }
            }
        }
    })(),
}
export const 诺艾尔: CharacterData = {
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
        elementBurst: k,
        elementSkill: k,
        normalAttack: k
    }
}
export const 螭骨剑: WeaponData = {
    type: "weapon",
    weapon: {
        levelData: {
            atk: {
                base: WeaponExtarArr.S4M42
            },
            critRate: {
                extra: WeaponExtarArr.EP060
            }
        },
        name: "螭骨剑",
        star: 4,
        weaponType: "claymore"
    },
    skill: {
        name: "螭骨剑",
        fnc: (() => {
            let count = 0
            let powerLevel = 0
            const DMGExtraRateArr = [0.06, 0.07, 0.08, 0.09, 0.1]
            return (from, to, t, lv = 1) => {
                const weaponBuff = new Buff("螭骨剑", "object", "never", (b) => {
                    b.frameFnc = (f) => {
                        count++
                        powerLevel = Math.min(5, count / 240)
                    }
                    b.modifyDMG = (cmd, DMG) => {
                        if (DMG) {
                            DMG.DMGRate.push({
                                label: "螭骨剑",
                                type: "普通增伤",
                                val: powerLevel * DMGExtraRateArr[lv - 1]
                            })
                        }
                        return DMG
                    }
                })
                return {}
            }
        })(),
    }
}
