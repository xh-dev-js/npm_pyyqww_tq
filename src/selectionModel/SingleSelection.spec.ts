import {Selection, SingleSelectionModel} from "./SingleSelection";

class A { }
describe('test single selection model', function () {
    it("model not allow empty", () => {

        const ls = [new A(), new A()]
        const model = SingleSelectionModel.New(ls)
        expect(() => model.find("a")).toThrow("Not found")
        expect(model.find(ls[0]).isSelected()).toBe(true)
        expect(model.find(ls[1]).isSelected()).toBe(false)

        expect(model.allowEmpty()).toBe(false)
        expect(() => model.findEmpty()).toThrow("No empty option is allowed")

        const options = model.findOptions()
        expect(model.findSelection(options[0]).isSelected()).toBe(true)
        expect(model.findSelection(options[1]).isSelected()).toBe(false)

        const all = model.getAll()
        expect(options[0]).toBe(all[0])
        expect(options[1]).toBe(all[1])

        expect(model.getCur()).toBe(options[0])

        expect(()=>model.selectEmpty()).toThrow("No empty option is allowed")

        expect(()=>model.select(new A())).toThrow("item not exists")
        model.select(ls[0]);
        expect(model.findSelection(options[0]).isSelected()).toBe(true)
        expect(model.findSelection(options[1]).isSelected()).toBe(false)
        model.select(ls[1]);
        expect(model.findSelection(options[0]).isSelected()).toBe(false)
        expect(model.findSelection(options[1]).isSelected()).toBe(true)

        expect(()=>model.findSelection({} as Selection<A>)).toThrow("Not found")
    })
    it("model of allow empty", () => {
        const ls = [new A(), new A()]
        const model = SingleSelectionModel.NewWithDefault(ls)
        expect(() => model.find("a")).toThrow("Not found")
        expect(model.find(ls[0]).isSelected()).toBe(false)
        expect(model.find(ls[1]).isSelected()).toBe(false)

        expect(model.allowEmpty()).toBe(true)
        expect(() => model.findEmpty()).not.toBeNull()

        const empty = model.findEmpty()
        expect(empty.isSelected()).toBe(true)

        const options = model.findOptions()
        expect(model.findSelection(options[0]).isSelected()).toBe(false)
        expect(model.findSelection(options[1]).isSelected()).toBe(false)

        const all = model.getAll()
        expect(empty).toBe(all[0])
        expect(options[0]).toBe(all[1])
        expect(options[1]).toBe(all[2])

        expect(model.getCur()).toBe(empty)


    });

    it("test select", ()=>{
        const ls = [new A(), new A()]
        const model = SingleSelectionModel.New(ls)
        const options = model.getAll()
        expect(options[0].isSelected()).toBe(true)
        expect(options[0].value().get()).toBe(ls[0])
        expect(options[1].isSelected()).toBe(false)
        expect(options[1].value().get()).toBe(ls[1])

        options[0].select()
        expect(options[0].isSelected()).toBe(true)
        expect(options[1].isSelected()).toBe(false)

        options[0].select()
        expect(options[0].isSelected()).toBe(true)
        expect(options[1].isSelected()).toBe(false)

        options[1].select()
        expect(options[0].isSelected()).toBe(false)
        expect(options[1].isSelected()).toBe(true)

        options[1].select()
        expect(options[0].isSelected()).toBe(false)
        expect(options[1].isSelected()).toBe(true)

        options[0].select()
        expect(options[0].isSelected()).toBe(true)
        expect(options[1].isSelected()).toBe(false)

        model.selectSelection(options[0])
        expect(options[0].isSelected()).toBe(true)
        expect(options[1].isSelected()).toBe(false)

        model.selectSelection(options[1])
        expect(options[0].isSelected()).toBe(false)
        expect(options[1].isSelected()).toBe(true)

    })

    it("test empty input ",()=>{
       expect(()=>SingleSelectionModel.New<A>([]) ).toThrow("selection must be with at least one element")
    })

    it('test hook', ()=>{
        const model = SingleSelectionModel.New(["a","b","c"])
        let msg: string[] = []
        model.register(SingleSelectionModel.NewHook(
            it=>msg.push(`Init with: ${it.value().get()}`),
            it=>msg.push(`${it.value().get()} selected`),
            it=> msg.push(`${it.value().get()} unselected`)
        ))
        model.select("a")
        model.select("b")
        model.select("c")
        model.select("c")
        model.select("a")

        const msgList = [
            "Init with: a",
            "a unselected",
            "b selected",
            "b unselected",
            "c selected",
            "c unselected",
            "a selected"
        ]

        msg.forEach((v,i,x)=>{
            expect(v).toBe(msgList[i])
        })
        msgList.forEach((v,i,x)=>{
            expect(v).toBe(msg[i])
        })
    })
})

describe("demo", ()=>{
    const lsOfOptions = ["a","b","c"]
    const model = SingleSelectionModel.NewWithDefault(lsOfOptions) //with an empty default selected item
    // const model = SingleSelectionModel.New(lsOfOptions) //with out an empty default selected item
    const cur = model.getCur()              // get current selection, must have 1 selection
    const empty = model.findEmpty()         // get empty selection, only exists when init with NewWithDefault function
    console.log(cur === empty)              // ==> true
    expect(cur).toBe(empty)
    const options = model.findOptions()     // get all non-empty option selection
    const all = model.getAll()              // all = [options + empty]

    const optionA = model.find("a")       // optionA === options[0] === all[1]
    console.log(optionA == options[0])
    console.log(optionA == all[1])
    expect(optionA).toBe(options[0])
    expect(optionA).toBe(all[1])


    //OptionA: false, Empty: true
    console.log(`OptionA: ${optionA.isSelected()}, Empty: ${empty.isSelected()}`)
    expect(optionA.isSelected()).toBe(false)
    expect(empty.isSelected()).toBe(true)
    optionA.select()                        // select optionA
    //OptionA: true, Empty: false
    console.log(`OptionA: ${optionA.isSelected()}, Empty: ${empty.isSelected()}`)
    expect(optionA.isSelected()).toBe(true)
    expect(empty.isSelected()).toBe(false)

})
