/*
 * @Page: Do not edit
 * @Version: Do not edit
 * @Autor: Do not edit
 * @Date: 2021-11-05 15:22:21
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-12 18:11:44
 */
const { Character, CoreHas, Team } = require("../main/index.js");
console.log(CoreHas("诺艾尔"), CoreHas("螭骨剑"), CoreHas("华馆梦醒形骸记"));
const team = new Team();
const wl = new Character({ name: "五郎", extar: false, level: 90, star: 6 });
const noelle = new Character({
  name: "诺艾尔",
  extar: false,
  level: 90,
  star: 6,
});
team.addRole(wl);
team.addRole(noelle);
const mod = new Character({ name: "木桩", level: 90 });
noelle
  .skill({ a: 10, q: 13, e: 13 })
  .artifact({
    artifactSet: "华馆梦醒形骸记",
    artifactType: "理之冠",
    main: {
      critDMG: 0.622,
    },
    other: {
      critRate: 0.031,
      atkExtra: 33,
      atkRate: 0.146,
      defRate: 0.124,
    },
  })
  .artifact({
    artifactSet: "华馆梦醒形骸记",
    artifactType: "死之羽",
    main: {
      atkExtra: 311,
    },
    other: {
      critDMG: 0.109,
      atkRate: 0.058,
      defRate: 0.204,
      critRate: 0.066,
    },
  })
  .artifact({
    artifactSet: "华馆梦醒形骸记",
    artifactType: "生之花",
    main: {
      healthExtra: 4780,
    },
    other: {
      defRate: 0.168,
      critDMG: 0.21,
      healthRate: 0.053,
      atkExtra: 27,
    },
  })
  .artifact({
    artifactSet: "华馆梦醒形骸记",
    artifactType: "空之杯",
    main: {
      elementDMGGeo: 0.466,
    },
    other: {
      atkRate: 0.058,
      defRate: 0.124,
      defExtra: 60,
      critRate: 0.101,
    },
  })
  .artifact({
    artifactSet: "绝缘之旗印",
    artifactType: "时之沙",
    main: {
      defRate: 0.583,
    },
    other: {
      critRate: 0.171,
      atkExtra: 19,
      healthRate: 0.111,
      critDMG: 0.062,
    },
  })
  .weapon({ name: "螭骨剑", level: 90, extar: false, star: 5 }) //21108
  .useQ()
  .useA(mod);
console.log(noelle.DMG);
team.addRole(new Character({ name: "诺艾尔", extar: false, level: 90, star: 6 }));
wl.useE();

noelle
  .weapon({ name: "天空之傲", level: 90, extar: false, star: 5 })
  // .useQ()
  // .useE(mod)
  .useA(mod)
  .useA(mod)
  .useA(mod)
  .useQ()
  .useA(mod)
  .useA(mod)
  .useA(mod);
console.log(...noelle.DMG);
console.log(
  noelle.entity.Last.def,
  noelle.entity.Last.atk,
  noelle.entity.Last.critDMG,
  noelle.entity.team.data
);
/* {
  computeStr: '倍率224.23%*4844.96(atk) 累加增伤186.60% 倍率倍率100.00% 防御结算50.00% 抗性结算90.00% 暴击41.90% 爆伤150.30%',
  tag: '诺艾尔-普通攻击',
  max: 22833,
  min: 9122,
  avg: 14867,
  other: [
    {
      computeStr: '倍率160.00%*4844.96(atk) 累加增伤116.00% 倍率倍率100.00% 防御结算50.00% 抗性结算90.00% 暴击41.90% 爆伤150.30%',
      tag: '天空之傲-被动',
      max: 10128,
      min: 4047,
      avg: 6595,
      other: [],
      Last: [Object]
    }
  ],
  Last: { max: 32961, min: 13169, avg: 21462 }
}
2491.357 4844.96195
 */
