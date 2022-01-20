/*
 * @Date: 2022-01-20 16:09:57
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-20 16:48:30
 * @FilePath: \noelle-core-v2\src\common\function.ts
 */
export function ObjectThin(data: any):Object|boolean {
    if (data instanceof Object) {
        const keys = Object.keys(data)
        if (!keys.length) {
            return false
        }
        keys.map(item => {
            if(item=="levelData"){
                delete data[item]
            }else            if(!ObjectThin(data[item])){
                delete data[item]
            }
        })
        if(Object.keys(data).length){
            return data
        }else{
            return false
        }
        

    } else if (data instanceof Array) {
        return data.some(item=>ObjectThin(item))
    }else if(typeof data ==="function"){
        return false
    }else if(typeof data ==="number"){
        return !!data
    }else if(typeof data ==="string"){
        return !!data
    }else {
        return true
    }

}