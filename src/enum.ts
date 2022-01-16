/*
 * @Page: Do not edit
 * @Version: Do not edit
 * @Autor: Do not edit
 * @Date: 2021-09-26 09:15:33
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-16 09:50:38
 */

export const LevelArr=[1, 20, 20, 40, 40, 50, 50, 60, 60, 70, 70, 80, 80, 90]
/**
 * 武器类型
 */
export enum WeaponType {
    /**其他 */
    OTHER = -1,
    /** 单手剑 */
    SWORD,
    /** 双手剑 */
    CLAYMORE,
    /** 长柄武器 */
    POLEARM,
    /** 弓箭 */
    BOW,
    /** 法器 */
    CATALYST,

}
export enum GROUP {
    /**提瓦特 */
    Tivat,
    /**深渊 */
    Abyss,
}

export const WeaponTypeStr = {
    /**弓箭 */
    'bow': WeaponType.BOW,
    /**单手剑 */
    'sword': WeaponType.SWORD,
    /**长柄武器 */
    'polearm': WeaponType.POLEARM,
    /**双手剑 */
    'claymore': WeaponType.CLAYMORE,
    /**法器 */
    'catalyst': WeaponType.CATALYST
}
/**
 * 属性类型
 */
export enum ElementType {
    /** 其他 */
    OTHER = -1,
    /** 火 */
    PYRO,
    /** 水 */
    HYDRO,
    /** 冰 */
    CRYO,
    /** 雷 */
    ELECTRO,
    /** 岩 */
    GEO,
    /** 风 */
    ANEMO,
    /** 草 */
    DENDRO,
    /** 物理 */
    PHYSICAL,
    /** 依赖当前附魔 */
    NOW

}
/**
 * 伤害类型
 */
export enum DMGType {
    /** 无类型 */
    OTHER = -1,
    /** 普通攻击 */
    ATKNORMAL,
    /** 重击 */
    ATKCHARGED,
    /** 下坠攻击 */
    ATKPLUNGING,
    /** 元素战技 */
    ELEMENTSKILL,
    /** 元素爆发 */
    ELEMENTBURST,

}

/**
 * 技能实例类型
 */
export enum SkillType {
    /** 其他 */
    OTHER = -1,
    /** 普通攻击 */
    ATKNORMAL,
    /** 元素战技 */
    ATKSKILL,
    /** 元素爆发 */
    ATKBURST,

}

/**
 * 指令枚举
 */
export enum ActionCommand{
    /** 普通攻击 */
    ATKNORMAL,
    /** 重击 */
    ATKCHARGED,
    /** 下坠攻击 */
    ATKPLUNGING,
    /** 元素战技 */
    ELEMENTSKILL,
    /** 元素爆发 */
    ELEMENTBURST,
    OTHER
}
/**
 * 性别
 */
export enum GenderType {
    /** 女 */
    GIRL = 0,
    /** 男 */
    BOY = 1,
    /** 未知 */
    OTHER = -1,

}
/**
 * 角色突破文案
 */
export const ExtraLevel = [
    '1级',
    '20级',
    '20级突破',
    '40级',
    '40级突破',
    '50级',
    '50级突破',
    '60级',
    '60级突破',
    '70级',
    '70级突破',
    '80级',
    '80级突破',
    '90级'
]
/**
 * @member S1M23 -> 1星基础面板23攻击力
 * @member E48 -> 1级时值为48
 * @member EP192 -> 1级时值为19.2%
 */
export const WeaponExtarArr = {

    S1M23: [23, 56, 68, 102, 113, 130, 141, 158, 169, 185, 185, 185, 185, 185],
    S2M33: [33, 80, 91, 139, 151, 174, 186, 209, 202, 243, 243, 243, 243, 243],
    S3M38: [38, 86, 105, 151, 171, 193, 212, 234, 253, 274, 294, 314, 334, 354],
    S3M39: [39, 94, 113, 169, 189, 216, 236, 263, 282, 309, 329, 355, 375, 401],
    S3M40: [40, 102, 121, 187, 207, 239, 259, 292, 311, 344, 363, 396, 415, 448],

    S4M39: [39, 94, 120, 176, 202, 229, 255, 282, 308, 335, 361, 388, 414, 440],
    S4M41: [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454],
    S4M42: [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510],
    S4M44: [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565],
    S4M45: [45, 128, 154, 247, 273, 321, 347, 395, 421, 470, 496, 545, 571, 620],
    
    S5M44: [44, 110, 141, 210, 241, 275, 307, 341, 373, 408, 439, 475, 506, 542],
    S5M46: [46, 122, 153, 235, 266, 308, 340, 382, 414, 457, 488, 532, 563, 608],
    S5M48: [48, 133, 164, 261, 292, 341, 373, 423, 455, 506, 537, 590, 621, 674],
    S5M49: [49, 145, 176, 286, 317, 374, 406, 464, 495, 555, 586, 648, 679, 741],

    E48: [48, 85, 85, 124, 124, 143, 143, 162, 162, 182, 182, 201, 201, 221],
    E43: [43, 76, 76, 111, 111, 129, 129, 146, 146, 164, 164, 181, 181, 198],
    E41: [41, 72, 72, 105, 105, 122, 122, 138, 138, 154, 154, 171, 171, 187],
    E36: [36, 64, 64, 93, 93, 107, 107, 122, 122, 136, 136, 151, 151, 165],
    E31: [31, 54, 54, 79, 79, 91, 91, 104, 104, 116, 116, 128, 128, 141],
    E24: [24, 42, 42, 62, 62, 71, 71, 81, 81, 91, 91, 101, 101, 110],
    E20: [20, 36, 36, 53, 53, 61, 61, 69, 69, 77, 77, 85, 85, 94],
    E12: [12, 21, 21, 31, 31, 36, 36, 41, 41, 45, 45, 50, 50, 55],
    EP192: [0.192, 0.34, 0.34, 0.494, 0.494, 0.572, 0.572, 0.65, 0.65, 0.726, 0.726, 0.804, 0.804, 0.882],
    EP150: [0.15, 0.265, 0.265, 0.387, 0.387, 0.447, 0.447, 0.508, 0.508, 0.568, 0.568, 0.629, 0.629, 0.69],
    EP144: [0.144, 0.254, 0.254, 0.371, 0.371, 0.429, 0.429, 0.487, 0.487, 0.545, 0.545, 0.603, 0.603, 0.632],
    EP133: [0.133, 0.236, 0.236, 0.343, 0.343, 0.397, 0.397, 0.451, 0.451, 0.505, 0.505, 0.559, 0.559, 0.613],
    EP120: [0.12, 0.212, 0.212, 0.309, 0.309, 0.357, 0.357, 0.406, 0.416, 0.454, 0.454, 0.503, 0.503, 0.551],
    EP108: [0.108, 0.191, 0.191, 0.278, 0.278, 0.322, 0.322, 0.365, 0.365, 0.409, 0.409, 0.453, 0.453, 0.496],
    EP113: [0.113, 0.199, 0.199, 0.290, 0.290, 0.335, 0.335, 0.381, 0.381, 0.426, 0.426, 0.472, 0.472, 0.517],
    EP102: [0.102, 0.18, 0.18, 0.263, 0.263, 0.304, 0.304, 0.345, 0.345, 0.386, 0.386, 0.427, 0.427, 0.469],
    EP100: [0.10, 0.177, 0.177, 0.258, 0.258, 0.298, 0.298, 0.338, 0.338, 0.397, 0.397, 0.419, 0.419, 0.459],
    EP096: [0.096, 0.17, 0.17, 0.247, 0.247, 0.286, 0.286, 0.325, 0.325, 0.363, 0.363, 0.402, 0.402, 0.441],
    EP090: [0.09, 0.159, 0.159, 0.232, 0.232, 0.268, 0.268, 0.304, 0.304, 0.341, 0.341, 0.377, 0.377, 0.413],
    EP085: [0.085, 0.15, 0.15, 0.219, 0.219, 0.253, 0.253, 0.288, 0.288, 0.322, 0.322, 0.356, 0.356, 0.39],
    EP080: [0.08, 0.141, 0.141, 0.206, 0.206, 0.238, 0.238, 0.271, 0.271, 0.303, 0.303, 0.335, 0.335, 0.368],
    EP077: [0.077, 0.135, 0.135, 0.197, 0.197, 0.228, 0.228, 0.259, 0.259, 0.29, 0.29, 0.321, 0.321, 0.352],
    EP075: [0.075, 0.133, 0.133, 0.193, 0.193, 0.224, 0.224, 0.254, 0.254, 0.284, 0.284, 0.315, 0.315, 0.345],
    EP072: [0.072, 0.127, 0.127, 0.185, 0.185, 0.214, 0.241, 0.244, 0.244, 0.273, 0.273, 0.302, 0.302, 0.331],
    EP068: [0.068, 0.12, 0.12, 0.175, 0.175, 0.203, 0.203, 0.23, 0.23, 0.257, 0.257, 0.285, 0.285, 0.312],
    EP067: [0.067, 0.118, 0.118, 0.172, 0.172, 0.199, 0.199, 0.226, 0.226, 0.252, 0.252, 0.279, 0.279, 0.306],
    EP064: [0.064, 0.113, 0.113, 0.164, 0.164, 0.19, 0.19, 0.216, 0.216, 0.241, 0.241, 0.267, 0.267, 0.293],
    EP060: [0.06, 0.106, 0.106, 0.155, 0.155, 0.179, 0.179, 0.203, 0.203, 0.227, 0.227, 0.251, 0.251, 0.276],
    EP051: [0.051, 0.09, 0.09, 0.131, 0.131, 0.152, 0.152, 0.173, 0.173, 0.193, 0.193, 0.214, 0.214, 0.235],
    EP048: [0.048, 0.085, 0.085, 0.124, 0.124, 0.143, 0.143, 0.162, 0.162, 0.182, 0.182, 0.201, 0.201, 0.221],
    EP045: [0.045, 0.08, 0.08, 0.116, 0.116, 0.134, 0.134, 0.152, 0.152, 0.17, 0.17, 0.189, 0.189, 0.207],
    EP034: [0.034, 0.06, 0.06, 0.088, 0.088, 0.101, 0.101, 0.115, 0.115, 0.129, 0.129, 0.142, 0.142, 0.156],
}
// export const CNAttr:BaseInit<string> = {
//     /**攻击力-白 */
//     atkBase:"攻击力",
//     /**攻击力-固 */
//     atkExtra: '攻击力',
//     /**攻击力-% */
//     atkRate: '攻击力%',
//     /**防御力-白 */
//     defBase: '防御力',
//     /**防御力-固 */
//     defExtra: '防御力',
//     /**防御力-% */
//     defRate: '防御力%',
//     /**生命值-白 */
//     healthBase: '生命值',
//     /**生命值-固 */
//     healthExtra: '生命值',
//     /**生命值-% */
//     healthRate: '生命值%',
//     /**暴击率-% */
//     critRate: '暴击率%',
//     /**暴击伤害-% */
//     critDMG: '暴击伤害%',
//     /**元素充能效率-% */
//     energyRechargeRate: '元素充能效率%',
//     /**元素精通 */
//     elementMastery: '元素精通',
//     /**火元素伤害加成-% */
//     elementDMGPyro: '火元素伤害加成%',
//     /**水元素伤害加成-% */
//     elementDMGHydro: '水元素伤害加成%',
//     /**冰元素伤害加成-% */
//     elementDMGCryo: '冰元素伤害加成%',
//     /**雷元素伤害加成-% */
//     elementDMGElectro: '雷元素伤害加成%',
//     /**岩元素伤害加成-% */
//     elementDMGGeo: '岩元素伤害加成%',
//     /**风元素伤害加成-% */
//     elementDMGAnemo: '风元素伤害加成%',
//     /**草元素伤害加成-% */
//     elementDMGDendro: '草元素伤害加成%',
//     /**物理伤害加成-% */
//     elementDMGPhysical: '物理伤害加成%',
//     /**治疗加成% */
//     cureRate: '治疗加成%'
// }
