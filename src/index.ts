// export * from './Collections/Tuples';

import {ItemTransformer} from "./ItemTransformer/ItemTransformer";

let x = ItemTransformer.transfer<string,string>()
    .inCase(it=>it==="1").then(it=>"100")
    .match("2")

console.log(x)
