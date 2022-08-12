import {Ranges} from "../range/Range";
import {HalfWidthConversion} from './HalfWidthConversion'

it("", () => {
    let start = "\uff01"[0].charCodeAt(0)
    let end = "\uff5e"[0].charCodeAt(0)

    let range = Ranges.to(start, end)
    let msg = range
        .map((value, index) =>
            `${String.fromCharCode(value)}||${HalfWidthConversion.toHalfWidth(String.fromCharCode(value))}||${index}||${value}||${value.toString(16)}`
        )
        .reduce((a, b) => `${a}\n${b}`)
    // console.log(`Size: ${range.length}\n${msg}`)
})

it("", () => {
    let start = "\u0001"[0].charCodeAt(0)
    let end = "\u005d"[0].charCodeAt(0)

    let range = Ranges.to(start, end)
    let msg = range
        .map((value, index) =>
            `${String.fromCharCode(value)}||${HalfWidthConversion.toFullWidth(String.fromCharCode(value))}||${index}||${value}||${value.toString(16)}`
        )
        .reduce((a, b) => `${a}\n${b}`)
    // console.log(`Size: ${range.length}\n${msg}`)
})
