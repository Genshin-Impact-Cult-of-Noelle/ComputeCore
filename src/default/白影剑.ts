/*
 * @Date: 2022-01-20 10:05:29
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 10:26:40
 * @FilePath: \noelle-core-v2\src\default\白影剑.ts
 */
import { Buff, getFrame, WeaponData } from "../Core"
import { WeaponExtarArr } from "../enum"
const name = "白影剑",
    skillName = "注能之锋",
    rate = [0.06, 0.075, 0.09, 0.105, 0.12]
let buffCount = 0,
    CD = 0,
    deadTime = 0
export const 白影剑: WeaponData = {
    type: "weapon",
    weapon: {
        levelData: {
            atk: {
                base: WeaponExtarArr.S4M42
            },
            critRate: {
                extra: WeaponExtarArr.EP133
            }
        },
        name,
        star: 4,
        weaponType: "claymore"
    },
    skill: {
        name: skillName,
        fnc: (from, to, t, lv = 1) => {
            const weaponBuff = new Buff("螭骨剑", "object", "never", (b) => {
                b.frameFnc = (frame) => {
                    CD && CD--
                    if (deadTime == frame) {
                        buffCount = 0
                        b.target.clean()
                    }
                }
                b.modifyDMG = (cmd, f, DMG) => {
                    if (DMG.DMGType === "ATKNORMAL" || DMG.DMGType === "ATKBASH" && buffCount < 4 && !CD) {
                        buffCount++
                        CD = 30
                        b.target.clean()
                        const label = skillName + buffCount,
                            val = rate[lv - 1] * buffCount,
                            type = "rate"
                        b.target.atk.push(label, val, type)
                        b.target.def.push(label, val, type)
                    }
                    return DMG
                }
            })
            from.pushBuff("weapon", weaponBuff)
            return {}
        },
    }
}