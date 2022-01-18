/*
 * @Date: 2022-01-18 17:53:28
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 19:18:24
 * @FilePath: \noelle-core-v2\src\testDB.ts
 */

import { CharacterData, Buff, SkillData, getFrame, Prop } from "./Core"
const x: CharacterData = {
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
}
const skillLabel = "大扫除"
const k: SkillData = {
    name: skillLabel,
    fnc: (() => {
        const defToAtk = [0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.8, 0.85, 0.9, 0.95]
        return (from, to, t, lv = 1) => {
            const buff = new Buff(skillLabel, "object", t, t + getFrame(12))
            const Character = from.character.core
            const CharacterDEF = from.Last.def.Last
            const Rate = defToAtk[lv - 1] + Character.extraStar > 5 ? 0.5 : 0
            const atk = new Prop().push(skillLabel, CharacterDEF * Rate, "extra")
            buff.target["atk"].add(atk)
            from.pushBuff("Character", buff)
            if (to.character.core.tag != from.character.core.tag) {

            }
            return {
                delay:{
                    must:120,
                    last:110 
                }
            }
        }
    })(),
}