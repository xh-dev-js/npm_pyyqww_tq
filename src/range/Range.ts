import exp from "constants";

export module Ranges{
    export const until = (from:number, to:number):number[] => [...Array(to-from)].map((_,it)=>it+from)
    export const to = (from:number, to:number):number[] => [...Array(to+1-from)].map((_,it)=>it+from)
}