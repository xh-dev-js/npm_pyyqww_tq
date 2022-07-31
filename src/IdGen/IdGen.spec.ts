import {NewNumberIdGen, NewStringIdGen} from "./IdGen";

describe("Test Id Generator", () => {
    it("simple test for number id gen", ()=>{
        const idGen = NewNumberIdGen()
        expect(idGen.cur()).toBe(0)
        expect(idGen.next()).toBe(1)
        expect(idGen.cur()).toBe(1)
        expect(idGen.next()).toBe(2)
        expect(idGen.cur()).toBe(2)
        expect(idGen.next()).toBe(3)
        expect(idGen.cur()).toBe(3)
    })
    it("simple test for string id gen", ()=>{
        const idGen = NewStringIdGen()
        expect(idGen.cur()).toBe(0+"")
        expect(idGen.next()).toBe(1+"")
        expect(idGen.cur()).toBe(1+"")
        expect(idGen.next()).toBe(2+"")
        expect(idGen.cur()).toBe(2+"")
        expect(idGen.next()).toBe(3+"")
        expect(idGen.cur()).toBe(3+"")
    })
})
