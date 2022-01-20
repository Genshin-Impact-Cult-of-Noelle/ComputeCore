/*
 * @Date: 2022-01-20 12:58:12
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 13:56:04
 * @FilePath: \noelle-core-v2\src\default\木桩.ts
 */

import Noelle from "../Core"
const Skill:Noelle.Type.Skill = {
    name:"木桩",
    init(s){

    }    
}
export const 木桩: Noelle.Type.Character = {
    type: "character",
    character: {
        elementType: "Physical",
        gender: "girl",
        levelData: {
            def: {
                base: [505, 600, 600, 700, 700, 750, 750, 800, 800, 850, 850, 900, 900, 950],
            },
        },
        name: "木桩",
        star: 1,
        tag: "Abyss",
        weaponType: "sword",
        init(c){
            c.setAllElementProp("DEF","基础",0.1)
        }
    },
    skill: {
        elementBurst: Skill,
        elementSkill: Skill,
        normalAttack: Skill
    }
}