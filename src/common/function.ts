/*
 * @Date: 2022-01-20 16:09:57
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-25 16:01:20
 * @FilePath: \noelle-core-v2\src\common\function.ts
 */
export function ObjectThin(data: unknown): Object | boolean {
    if (data instanceof Array) {
        return data.filter(item=>ObjectThin(item))
    } else if (typeof data === "object" && data) {
        const keys = Object.keys(data)
        if (!keys.length) {
            return false
        }
        const temp={}
        keys.map(item => {
            if (item == "DMGHistroy" || item == "levelData") {
            } else  {
                const res = ObjectThin(data[item])
                if (res){
                    temp[item] = res
                }
            }
        })
        if (Object.keys(temp).length) {
            return temp
        } else {
            return false
        }
    } else if (typeof data === "function") {
        return false
    } else if (typeof data === "number") {
        return data ?? false
    } else if (typeof data === "string") {
        return data ?? false
    } else {
        return true
    }

}