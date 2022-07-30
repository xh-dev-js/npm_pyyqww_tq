import {Scope} from "./Scope";

describe("Test for creation", ()=>{
  it("test create empty Scope", ()=>{
    expect(Scope.empty().isEmpty()).toBe(true)
  })

  it("test of else", ()=>{
    expect(Scope.ofElse<number>(1, 2).get()).toBe(1)
    expect(Scope.ofElse<number>(null, 2).get()).toBe(2)
  })

  it("test create null", ()=>{
    expect(Scope.ofNullable<number>(null).isEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(undefined).isEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(1).isEmpty()).toBe(false)
  })

  it("test create ", ()=>{
    expect(Scope.of(1).isEmpty()).toBe(false)

    // This is allowed only because the Scope of result in type Scope<null>
    expect(Scope.of(null).isEmpty()).toBe(true)
  })

  it("test create with supply", ()=>{
    expect(Scope.suppliedBy(()=>null).isEmpty()).toBe(true);
    expect(Scope.suppliedBy(()=>1).isEmpty()).toBe(false);
  })
})


describe("Test map", ()=>{
  it("map to", ()=>{
    expect(Scope.of(1).map(it=>it+"").nonEmpty()).toBe(true)
    expect(Scope.of(1).map(it=>it+"").get()).toBe("1")

    expect(Scope.ofNullable<string>(null).map(it=>it+"").missing()).toBe(true)
  })

  it("if then map to", ()=>{
    expect(Scope.ofNullable<number>(null).ifThenMap(()=>true,_=>"1", ()=>"0").get()).toBe(null)
    expect(Scope.of(1).ifThenMap(()=>true,_=>"1", ()=>"0").get()).toBe("1")
    expect(Scope.of(1).ifThenMap(()=>false,_=>"1", ()=>"0").get()).toBe("0")
  })

  it("if non empty then map", ()=>{
    expect(Scope.ofNullable<number>(null).ifNonEmptyMap(_=>"1").get()).toBe(null)
    expect(Scope.ofNullable<number>(1).ifNonEmptyMap(_=>"1").get()).toBe("1")
  })
})
describe("Test apply", ()=>{
  it("test normal apply", ()=>{

    let value = 1
    Scope.ofNullable<null>(null).apply(it=>{
      value = 2
      expect(it).toBe(null)
    })
    expect(value).toBe(1)

    value = 1
    Scope.of(1).apply(it=> {
      expect(it).toBe(1)
      value = 2
    })
    expect(value).toBe(2)

    value = 1
    Scope.ofNullable<number>(null).apply(_=> {
      value = 2
    })
    expect(value).toBe(1)
  })

  it("test if then apply", ()=>{
    let value = 1
    Scope.of(1).ifThenApply(()=>true, _=>value=2)
    expect(value).toBe(2)

    value = 1
    Scope.of(1).ifThenApply(()=>false, _=>value=2)
    expect(value).toBe(1)
  })

  it("test if empty apply", ()=>{
    let value = 1
    Scope.of(1).ifEmptyApply(()=>value=2)
    expect(value).toBe(1)

    value = 1
    Scope.of(null).ifEmptyApply(()=>value=2)
    expect(value).toBe(2)
  })

  it("test if non empty apply", ()=>{
    let value = 1
    Scope.of(1).ifNonEmptyApply(()=>value=2)
    expect(value).toBe(2)

    value = 1
    Scope.of(null).ifNonEmptyApply(()=>value=2)
    expect(value).toBe(1)
  })
})

describe("test do if ", ()=>{
  it("input if empty provides", ()=>{
    expect(Scope.of(1).ifEmptyProvide(()=>2).nonEmpty()).toBe(true)
    expect(Scope.of(1).ifEmptyProvide(()=>2).get()).toBe(1)

    expect(Scope.ofNullable<number>(null).ifEmptyProvide(()=>2).nonEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(null).ifEmptyProvide(()=>2).get()).toBe(2)
  })

  it("input fill if ", ()=>{
    expect(Scope.ofNullable<number>(null).ifEmpty(2).nonEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(null).ifEmpty(2).get()).toBe(2)

  })
})


describe("existence test", ()=>{
  it("input if exists", ()=>{
    expect(Scope.of(1).exists()).toBe(true)
    expect(Scope.ofNullable<number>(null).exists()).toBe(false)

  })

  it("input if missing", ()=>{
    expect(Scope.of(1).ifEmpty(2).missing()).toBe(false)
    expect(Scope.ofNullable<number>(null).missing()).toBe(true)
  })

  it("input number", ()=>{
    expect(Scope.of<number>(1).get()).toBe(1);
    expect(Scope.of<number>(1).isEmpty()).toBe(false);
    expect(Scope.of<number>(1).nonEmpty()).toBe(true);
    expect(Scope.ofNullable(null).get()).toBe(null);
    expect(Scope.ofNullable(null).isEmpty()).toBe(true);
    expect(Scope.ofNullable(null).nonEmpty()).toBe(false);
  })

  it("input if empty ", ()=>{
    expect(Scope.of(1).ifEmpty(2).nonEmpty()).toBe(true)
    expect(Scope.of(1).ifEmpty(2).get()).toBe(1)

    expect(Scope.ofNullable<number>(null).ifEmpty(2).nonEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(null).ifEmpty(2).get()).toBe(2)
  })
})

describe("Test Scope", ()=>{


  it("input get", ()=>{
    expect(Scope.of(1).get()).toBe(1)
    expect(Scope.ofNullable(null).get()).toBe(null)
  })

  it("input get nullable", ()=>{
    expect(Scope.of(1).getNullable()).toBe(1)
    expect(Scope.ofNullable(null).getNullable()).toBe(null)
  })

  it("input get or", ()=>{
    expect(Scope.of(1).getOr(2)).toBe(1)
    expect(Scope.ofNullable<number>(null).getOr(2)).toBe(2)
  })

  it("input get or provide", ()=>{
    expect(Scope.of(1).getOrProvide(()=>2)).toBe(1)
    expect(Scope.ofNullable<number>(null).getOrProvide(()=>2)).toBe(2)
  })

  it("input suppliedBy", ()=>{
    expect(Scope.suppliedBy<number>(()=>1).get()).toBe(1)
  })

  class A {
    public s = 100;
  }
  it("input apply", ()=>{
    let scope = Scope.of(new A())
    expect(scope.exists()).toBe(true)
    expect(scope.get().s).toBe(100)
    expect(scope.apply(i=>i.s=200).get().s).toBe(200)
    expect(scope.get().s).toBe(200)
  })

  it("input if empty apply", ()=>{
    let a = new A()
    Scope.ofNullable<number>(null).ifEmptyApply(()=>a.s = 200)
    expect(a.s).toBe(200)
    Scope.ofNullable<number>(1).ifEmptyApply(()=>a.s = 300)
    expect(a.s).toBe(200)
  })

  it("input if non empty apply", ()=>{
    let a = new A()
    Scope.ofNullable<number>(null).ifNonEmptyApply(()=>a.s = 200)
    expect(a.s).toBe(100)
    Scope.ofNullable<number>(1).ifNonEmptyApply(()=>a.s = 300)
    expect(a.s).toBe(300)
  })

})
