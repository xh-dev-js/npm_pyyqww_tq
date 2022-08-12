import {Scope, Scopes} from "./Scopes";

describe("Test for creation", () => {
    it("test create empty Scope", () => {
        expect(Scopes.empty().isEmpty()).toBe(true)
    })

    it("test of else", () => {
        expect(Scopes.ofElse<number>(1, 2).get()).toBe(1)
        expect(Scopes.ofElse<number>(null, 2).get()).toBe(2)
    })

    it("test create null", () => {
        expect(Scopes.ofNullable<number>(null).isEmpty()).toBe(true)
        expect(Scopes.ofNullable<number>(undefined).isEmpty()).toBe(true)
        expect(Scopes.ofNullable<number>(1).isEmpty()).toBe(false)
    })

    it("test create ", () => {
        expect(Scopes.of(1).isEmpty()).toBe(false)

        // This is allowed only because the Scope of result in type Scope<null>
        expect(Scopes.of(null).isEmpty()).toBe(true)
    })

    it("test create with supply", () => {
        expect(Scopes.suppliedBy(() => null).isEmpty()).toBe(true);
        expect(Scopes.suppliedBy(() => 1).isEmpty()).toBe(false);
    })
})


describe("Test map", () => {
    it("map to", () => {
        expect(Scopes.of(1).map(it => it + "").nonEmpty()).toBe(true)
        expect(Scopes.of(1).map(it => it + "").get()).toBe("1")

        expect(Scopes.ofNullable<string>(null).map(it => it + "").missing()).toBe(true)
    })

    it("if then map to", () => {
        expect(Scopes.ofNullable<number>(null).ifThenMap(() => true, _ => "1", () => "0").get()).toBe(null)
        expect(Scopes.of(1).ifThenMap(() => true, _ => "1", () => "0").get()).toBe("1")
        expect(Scopes.of(1).ifThenMap(() => false, _ => "1", () => "0").get()).toBe("0")
    })

    it("if non empty then map", () => {
        expect(Scopes.ofNullable<number>(null).ifNonEmptyMap(_ => "1").get()).toBe(null)
        expect(Scopes.ofNullable<number>(1).ifNonEmptyMap(_ => "1").get()).toBe("1")
    })
})
describe("Test apply", () => {
    it("test normal apply", () => {

        let value = 1
        Scopes.ofNullable<null>(null).apply(it => {
            value = 2
            expect(it).toBe(null)
        })
        expect(value).toBe(1)

        value = 1
        Scopes.of(1).apply(it => {
            expect(it).toBe(1)
            value = 2
        })
        expect(value).toBe(2)

        value = 1
        Scopes.ofNullable<number>(null).apply(_ => {
            value = 2
        })
        expect(value).toBe(1)
    })

    it("test if then apply", () => {
        let value = 1
        Scopes.of(1).ifThenApply(() => true, _ => value = 2)
        expect(value).toBe(2)

        value = 1
        Scopes.of(1).ifThenApply(() => false, _ => value = 2)
        expect(value).toBe(1)
    })

    it("test if empty apply", () => {
        let value = 1
        Scopes.of(1).ifEmptyApply(() => value = 2)
        expect(value).toBe(1)

        value = 1
        Scopes.of(null).ifEmptyApply(() => value = 2)
        expect(value).toBe(2)
    })

    it("test if non empty apply", () => {
        let value = 1
        Scopes.of(1).ifNonEmptyApply(() => value = 2)
        expect(value).toBe(2)

        value = 1
        Scopes.of(null).ifNonEmptyApply(() => value = 2)
        expect(value).toBe(1)
    })
})

describe("test do if ", () => {
    it("input if empty provides", () => {
        expect(Scopes.of(1).ifEmptyProvide(() => 2).nonEmpty()).toBe(true)
        expect(Scopes.of(1).ifEmptyProvide(() => 2).get()).toBe(1)

        expect(Scopes.ofNullable<number>(null).ifEmptyProvide(() => 2).nonEmpty()).toBe(true)
        expect(Scopes.ofNullable<number>(null).ifEmptyProvide(() => 2).get()).toBe(2)
    })

    it("input fill if ", () => {
        expect(Scopes.ofNullable<number>(null).ifEmpty(2).nonEmpty()).toBe(true)
        expect(Scopes.ofNullable<number>(null).ifEmpty(2).get()).toBe(2)

    })
})


describe("existence test", () => {
    it("input if exists", () => {
        expect(Scopes.of(1).exists()).toBe(true)
        expect(Scopes.ofNullable<number>(null).exists()).toBe(false)

    })

    it("input if missing", () => {
        expect(Scopes.of(1).ifEmpty(2).missing()).toBe(false)
        expect(Scopes.ofNullable<number>(null).missing()).toBe(true)
    })

    it("input number", () => {
        expect(Scopes.of<number>(1).get()).toBe(1);
        expect(Scopes.of<number>(1).isEmpty()).toBe(false);
        expect(Scopes.of<number>(1).nonEmpty()).toBe(true);
        expect(Scopes.ofNullable(null).get()).toBe(null);
        expect(Scopes.ofNullable(null).isEmpty()).toBe(true);
        expect(Scopes.ofNullable(null).nonEmpty()).toBe(false);
    })

    it("input if empty ", () => {
        expect(Scopes.of(1).ifEmpty(2).nonEmpty()).toBe(true)
        expect(Scopes.of(1).ifEmpty(2).get()).toBe(1)

        expect(Scopes.ofNullable<number>(null).ifEmpty(2).nonEmpty()).toBe(true)
        expect(Scopes.ofNullable<number>(null).ifEmpty(2).get()).toBe(2)
    })
})

describe("Test Scope", () => {


    it("input get", () => {
        expect(Scopes.of(1).get()).toBe(1)
        expect(Scopes.ofNullable(null).get()).toBe(null)
    })

    it("input get nullable", () => {
        expect(Scopes.of(1).getNullable()).toBe(1)
        expect(Scopes.ofNullable(null).getNullable()).toBe(null)
    })

    it("input get or", () => {
        expect(Scopes.of(1).getOr(2)).toBe(1)
        expect(Scopes.ofNullable<number>(null).getOr(2)).toBe(2)
    })

    it("input get or provide", () => {
        expect(Scopes.of(1).getOrProvide(() => 2)).toBe(1)
        expect(Scopes.ofNullable<number>(null).getOrProvide(() => 2)).toBe(2)
    })

    it("input suppliedBy", () => {
        expect(Scopes.suppliedBy<number>(() => 1).get()).toBe(1)
    })

    class A {
        public s = 100;
    }

    it("input apply", () => {
        let scope = Scopes.of(new A())
        expect(scope.exists()).toBe(true)
        expect(scope.get().s).toBe(100)
        expect(scope.apply(i => i.s = 200).get().s).toBe(200)
        expect(scope.get().s).toBe(200)
    })

    it("input if empty apply", () => {
        let a = new A()
        Scopes.ofNullable<number>(null).ifEmptyApply(() => a.s = 200)
        expect(a.s).toBe(200)
        Scopes.ofNullable<number>(1).ifEmptyApply(() => a.s = 300)
        expect(a.s).toBe(200)
    })

    it("input if non empty apply", () => {
        let a = new A()
        Scopes.ofNullable<number>(null).ifNonEmptyApply(() => a.s = 200)
        expect(a.s).toBe(100)
        Scopes.ofNullable<number>(1).ifNonEmptyApply(() => a.s = 300)
        expect(a.s).toBe(300)
    })

})

describe("demo", () => {
    it("demo code 1", () => {
        //----------- Init object

        // create empty Scope
        let variableOf1: Scope<number> = Scopes.ofNullable<number>(null)
        // console.log(variableOf1.get()) // => null

        // create non-empty scope
        let variableOf2: Scope<number> = Scopes.of(1)
        // console.log(variableOf2.get()) // => 1
        let variableO3: number = Scopes.ofElse<number>(null, 3).get()
        // console.log(variableO3) // => 3
        let variable04 = Scopes.ofNullable<number>(null).ifEmpty(4).get()
        // console.log(variable04) // => 4


        // if not specify the type, when passing null, result type is not expected
        let variable05: null = Scopes.ofNullable(null).get()
        // console.log(variable05) // => null
    })

    it("demo code 2", () => {

        class A {
            public a: number = 1
        }

        // Init newly create object
        let v1: Scope<A> = Scopes.of(new A()).apply(it => it.a = 100) // A.a = 100
        // console.log(v1.get())
        let v2: Scope<A> = Scopes.ofNullable<A>(null).apply(it => it.a = 100) // A = null, if null apply statment is not executed
        // console.log(v2.get())
        let v3: Scope<A> = Scopes.ofNullable<A>(new A()).ifThenApply(it => it.a == 1, it => it.a = 2) // A.a = 2
        // console.log(v3.get())

        // Update value by condition
        let v4: Scope<A> = Scopes.ofNullable<A>(new A()).ifThenApply(it => it.a == 0, it => it.a = 2) // A.a = 1
        // console.log(v4.get())


        class B {
            private b: number | undefined

            static fromA: (a: A) => B =
                (a: A) => Scopes.of(new B()).apply(b => b.b = a.a).get()

        }

        // conversion of instance
        let v5: Scope<B> = Scopes.ofNullable<A>(new A()).map(it => B.fromA(it)) // B.b = 1
        // console.log(v5.get())
    })
})
