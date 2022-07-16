import {ItemTransformer} from "./ItemTransformer";

it("should be able to transform string to other string", () => {
    const matcher = ItemTransformer.transfer<string,string>()
        .inCase(it=>it==="1").then(it=>"100")
        .inCaseValue("3").thenValue("300")
    expect(matcher.match("1")).toBe("100")
    expect(matcher.match("3")).toBe("300")
    expect(()=>matcher.match("2")).toThrow(Error)
    expect(matcher.defaultValue("200").match("2")).toBe("200")
})