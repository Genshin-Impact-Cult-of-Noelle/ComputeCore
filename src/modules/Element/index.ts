/*
 * @Date: 2022-01-23 09:52:14
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-24 09:48:12
 * @FilePath: \noelle-core-v2\src\modules\Element\index.ts
 */

import { Common } from "../../common/typeTool"
import { Atom } from "../Atom"

export namespace Element {
    const EnrgyLoss = {
        10000: 8000 / 95 / 60,
        20000: 16000 / 120 / 60,
        40000: 32000 / 170 / 60
    }
    type EnrgyLevel = 10000 | 20000 | 40000
    type ct = {
        [key in Atom.ElementType]: {
            level: EnrgyLevel,
            stock: number
        }
    }
    class React<T> {
        private stroe: ct = {
            /**风 */
            Anemo: { level: 10000, stock: 0 },
            /**岩 */
            Geo: { level: 10000, stock: 0 },
            /**冰 */
            Cryo: { level: 10000, stock: 0 },
            /**火 */
            Pyro: { level: 10000, stock: 0 },
            /**雷 */
            Electro: { level: 10000, stock: 0 },
            /**水 */
            Hydro: { level: 10000, stock: 0 },
            /**草 */
            Dendro: { level: 10000, stock: 0 },
            /**物理 */
            Physical: { level: 10000, stock: 0 }
        }
        inject(element: Atom.ElementType, level: EnrgyLevel) {
            const injectVal = level * 0.8
            if (!this.stroe[element].stock) {
                this.stroe[element].level = level
            }
            this.stroe[element].stock = Math.max(this.stroe[element].stock, injectVal)
            this.mix(element)
        }
        nextFrame() {
            Object.keys(this.stroe).map((key) => {
                const asKey = <Atom.ElementType>key
                if (this.stroe[asKey].stock) {
                    this.stroe[asKey].stock = this.loss(this.stroe[asKey].stock,EnrgyLoss[this.stroe[asKey].level])
                }
            })
        }
        private loss(r:number,lost:number,flag:number=0){
            return Math.max(r-lost,flag)
        }
        private mix(BeElement: Atom.ElementType) {
            switch (BeElement) {
                case "Hydro":
                    if (this.stroe.Pyro.stock) {
                        this.stroe.Hydro.stock =this.loss(this.stroe.Hydro.stock,this.stroe.Pyro.stock*0.5)
                        this.stroe.Pyro.stock = 0
                    }
                    if(this.stroe){
                        
                    }
                    break;
                case "Cryo":
                    if (this.stroe.Pyro.stock) {
                        
                    }
                    break;
                case "Pyro":
                    if (this.stroe.Pyro.stock) {
                        this.stroe.Pyro.stock = 0
                    }
                    break
                default:
                    break;
            }
        }
    }
}