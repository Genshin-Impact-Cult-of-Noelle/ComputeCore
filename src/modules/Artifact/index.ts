/*
 * @Date: 2022-01-18 10:12:35
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-18 18:02:37
 * @FilePath: \noelle-core-v2\src\modules\Artifact\index.ts
 */

import { Common } from "../../common/typeTool"
import { Atom } from "../Atom"
import { SkillModel } from "../Skill"

export namespace ArtifactModel {
    export type SetDataType<T>=SkillModel.SkillData<T>
    type Type = "生之花" | "死之羽" | "时之沙" | "空之杯" | "理之冠"
    type BaseData = {
        type: Type,
        name: string,
        set: string,
    }
    type DataProp = {
        [key in Atom.ArtifactPropUserName]?: number
    }
    export type DataType = {
        main: DataProp,
        other: DataProp
    } & BaseData
    type ArtifactData = {
        data: Atom.ObjectBase
    } & BaseData
    const createKeyArray = ["atk", "def", "health"]
    function createObjectBase(data: DataType) {
        const base = new Atom.ObjectBase()
        for (const iterator of [data.main, data.other]) {
            for (const key in iterator) {
                const asKey = <Atom.ArtifactPropUserName>key
                const prop = new Atom.Prop()
                const histroy = { label: data.name, val: iterator[asKey] || 0 }


                switch (asKey) {
                    case "defRate":
                    case "atkRate":
                    case "healthRate":
                        prop.content.rate.push(histroy)
                        prop.rate = histroy.val
                        break;
                    case "atkExtra":
                    case "defExtra":
                    case "healthExtra":
                    default:
                        prop.content.extra.push(histroy)
                        prop.extra = histroy.val
                        break;
                }
                if (asKey == "atkExtra" || asKey == "atkRate") {
                    base["atk"].add(prop)
                } else if (asKey == "defExtra" || asKey == "defRate") {
                    base["def"].add(prop)
                } else if (asKey == "healthExtra" || asKey == "healthRate") {
                    base["health"].add(prop)
                } else {
                    base[asKey].add(prop)
                }
            }
        }
        return base

    }
    export class Artifact implements ArtifactData {
        type: Type;
        set: string = "";
        name: string = "";
        data: Atom.ObjectBase = new Atom.ObjectBase()
        constructor(data: ArtifactData) {
            this.type = data.type
            this.set = data.set
            this.name = data.name
            this.data = data.data
        }
    }
    type ArtifactObj = {
        [key in Type]?: Artifact
    }
    export class ArtifactControl {
        artifactObj: ArtifactObj = {}
        constructor() {
        }
        /**设置圣遗物 */
        setArtifact(data: DataType) {
            const artifact = new Artifact({
                ...data,
                data: createObjectBase(data)
            })
            this.artifactObj[data.type] = artifact
        }
        get Last() {
            const computeBase = new Atom.ObjectBase()
            const artifactObj = this.artifactObj
            for (const key in artifactObj) {
                const asKey = <Common.Keys<ArtifactObj>>key
                const artifact = artifactObj[asKey]
                if (artifact) {
                    const data = artifact.data
                    computeBase.add(data)
                }

            }
            return computeBase
        }
    }

}