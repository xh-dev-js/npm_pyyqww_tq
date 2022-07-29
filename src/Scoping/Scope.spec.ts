import {Scope} from "./Scope";

describe("Test Scope", ()=>{
  it("input null", ()=>{
    expect(Scope.ofNullable(null).get()).toBe(null);
    expect(Scope.ofNullable(null).empty()).toBe(true);
    expect(Scope.nullableSupplied(()=>null).empty()).toBe(true);
  })
  it("input number", ()=>{
    expect(Scope.of<number>(1).get()).toBe(1);
    expect(Scope.of<number>(1).empty()).toBe(false);
    expect(Scope.of<number>(1).nonEmpty()).toBe(true);
    expect(Scope.ofNullable(null).get()).toBe(null);
    expect(Scope.ofNullable(null).empty()).toBe(true);
    expect(Scope.ofNullable(null).nonEmpty()).toBe(false);
  })
  it("input map to", ()=>{
    expect(Scope.of(1).mapTo(it=>it+"").nonEmpty()).toBe(true)
    expect(Scope.of(1).mapTo(it=>it+"").get()).toBe("1")

    expect(Scope.ofNullable<string>(null).mapTo(it=>it+"").missing()).toBe(true)

  })
  it("input fill if ", ()=>{
    expect(Scope.ofNullable<number>(null).ifEmpty(2).nonEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(null).ifEmpty(2).get()).toBe(2)

  })
  it("input if exists", ()=>{
    expect(Scope.of(1).exists()).toBe(true)
    expect(Scope.ofNullable<number>(null).exists()).toBe(false)

  })
  it("input if missing", ()=>{
    expect(Scope.of(1).ifEmpty(2).missing()).toBe(false)
    expect(Scope.ofNullable<number>(null).missing()).toBe(true)
  })
  it("input if empty ", ()=>{
    expect(Scope.of(1).ifEmpty(2).nonEmpty()).toBe(true)
    expect(Scope.of(1).ifEmpty(2).get()).toBe(1)

    expect(Scope.ofNullable<number>(null).ifEmpty(2).nonEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(null).ifEmpty(2).get()).toBe(2)
  })

  it("input if empty provides", ()=>{
    expect(Scope.of(1).ifEmptyProvide(()=>2).nonEmpty()).toBe(true)
    expect(Scope.of(1).ifEmptyProvide(()=>2).get()).toBe(1)

    expect(Scope.ofNullable<number>(null).ifEmptyProvide(()=>2).nonEmpty()).toBe(true)
    expect(Scope.ofNullable<number>(null).ifEmptyProvide(()=>2).get()).toBe(2)
  })

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
    expect(Scope.suppliedBy<number>(()=>null).missing()).toBe(true)
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
