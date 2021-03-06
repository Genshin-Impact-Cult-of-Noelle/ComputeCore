/*
 * @Date: 2022-01-16 16:01:58
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-25 15:37:09
 * @FilePath: \noelle-core-v2\src\common\typeTool.ts
 */




export namespace Common {
    type BaseType = Array<unknown>
    export type Keys<T> = keyof T
    export type Shift<T extends BaseType> =
        T extends [infer A, ...infer B]
        ? B
        : T;
    export type LinkStr<PreStr extends string = "", LastStr extends string = "", T extends string[] = []> = T["length"] extends 1 ? `${PreStr}${T[0]}${LastStr}` : `${PreStr}${T[0]}${LastStr}` | LinkStr<PreStr, LastStr, Shift<T>>;
}