import {ItemTransformer} from "./ItemTransformer";

describe("demo", ()=>{
    const itemTransfer = ItemTransformer.transfer<number, string>()
        .inCase(it => it === 0).then(it => 0 + "")
        .inCaseValue(1).thenValue("1")
        .defaultValue("2")

    console.log(itemTransfer.match(0))             // "0"
    console.log(itemTransfer.match(1))             // "1"
    console.log(itemTransfer.match(2))             // "2"
    console.log(itemTransfer.match(3))             // "2"
})

describe('test case', function () {
    it("should be able to transform string to other string", () => {
        const matcher = ItemTransformer.transfer<string, string>()
            .inCase(it => it === "1").then(it => "100")
            .inCaseValue("3").thenValue("300")
        expect(matcher.match("1")).toBe("100")
        expect(matcher.match("3")).toBe("300")
        expect(() => matcher.match("2")).toThrow(Error)
        expect(matcher.defaultValue("200").match("2")).toBe("200")
    })
});
