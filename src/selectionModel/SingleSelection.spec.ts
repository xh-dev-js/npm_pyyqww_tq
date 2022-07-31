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
})
