# Single Selection Model
A model for single selection case

```typescript
const lsOfOptions = ["a","b","c"]
const model = SingleSelectionModel.NewWithDefault(lsOfOptions) //with an empty default selected item
// const model = SingleSelectionModel.New(lsOfOptions) //with out an empty default selected item
const cur = model.getCur()              // get current selection, must have 1 selection
const empty = model.findEmpty()         // get empty selection, only exists when init with NewWithDefault function
console.log(cur === empty)              // ==> true
const options = model.findOptions()     // get all non-empty option selection
const all = model.getAll()              // all = [options + empty]

const optionA = model.find("a")       // optionA === options[0] === all[1]
console.log(optionA == options[0])
console.log(optionA == all[1])


//OptionA: false, Empty: true
console.log(`OptionA: ${optionA.isSelected()}, Empty: ${empty.isSelected()}`)
optionA.select()                        // select optionA
//OptionA: true, Empty: false
console.log(`OptionA: ${optionA.isSelected()}, Empty: ${empty.isSelected()}`)
```

# ImBusyModule

I'm busy module is simple tool to track busy status.

````typescript
import {ImBusyModule} from "./ImBusy";

// Create a busy man instance to store his busy status
const busyMan = ImBusyModule.busyMan()

busyMan.amIBusy() // false
const someJob = busyMan.newJob()
busyMan.amIBusy() // true

someJob.doneMyJob() // remove job from busy man

// Busy man finally having time for coding
busyMan.amIBusy() // false 
````

Add a hook to the BusyMan
```typescript
const man = busyMan()
let inited = false
let busy = false
man.register(NewSimpleHook(
        it => busy = it,     // status change hook, called when status change
        it => inited = it)   // initialize hook, call when register
)
console.log(`Registered: ${inited}, Busy: ${busy}`) // Registered: true, Busy: false
const j1 = man.newJob()
console.log(`Registered: ${inited}, Busy: ${busy}`) // Registered: true, Busy: true
j1.doneMyJob()
console.log(`Registered: ${inited}, Busy: ${busy}`) // Registered: true, Busy: false
```

# Scope API

Scope API is a set of helper utils for creating object and converting object.

## Existence of instance

Scope API considers

1. any input value of null, undefined as empty.
2. any input value of non value as non-empty. \
   p.s. if not specify the type of, when pass null, the result type will become Scope<null>

```typescript
import {Scopes, Scope} from "./Scopes";

//----------- Init object

// create empty Scope
let variableOf1: Scope<number> = Scopes.ofNullable<number>(null)
console.log(variableOf1.get()) // => null

// create non-empty scope
let variableOf2: Scope<number> = Scopes.of(1)
console.log(variableOf2.get()) // => 1
let variableO3: number = Scopes.ofElse<number>(null, 3).get()
console.log(variableO3) // => 3
let variable04 = Scopes.ofNullable<number>(null).ifEmpty(4).get()
console.log(variable04) // => 4


// if not specify the type, when passing null, result type is not expected
let variable05: null = Scopes.ofNullable(null).get()
console.log(variable05) // => null
```

## Value initializing or Value converting

Scope API provide apply and map method for

1. init newly created object
2. update value by condition
3. conversion of instance

```typescript
import {Scope} from "./Scope";

class A {
    public a: number = 1
}

// Init newly create object

class A { public a: number = 1 }

// Init newly create object
let v1: Scope<A> = Scopes.of(new A()).apply(it => it.a = 100) // A.a = 100
let v2: Scope<A> = Scopes.ofNullable<A>(null).apply(it => it.a = 100) // A = null, if null apply statment is not executed
let v3: Scope<A> = Scopes.ofNullable<A>(new A()).ifThenApply(it => it.a == 1, it => it.a = 2) // A.a = 2

// Update value by condition
let v4: Scope<A> = Scopes.ofNullable<A>(new A()).ifThenApply(it => it.a == 0, it => it.a = 2) // A.a = 1


class B {
   private b: number|undefined

   static fromA: (a: A) => B =
           (a: A) => Scopes.of(new B()).apply(b => b.b = a.a).get()
}

// conversion of instance
let v5: Scope<B> = Scopes.ofNullable<A>(new A()).map(it => B.fromA(it)) // B.b = 1
```

## Retrieve object

retrieve the object

1. get object
2. get default value if null

```typescript
let v1: Scope<number> = Scopes.of(1)
let v1Value: number = v1.get() // 1

let v2: Scope<number> = Scopes.ofNullable<A>(null)
let v2Value: number = v2.getOr(2) // 2
```

# Item Transformer

Item Transformer help convert value in clear structure easy understand way.
If missing the defaultValue({value}) expression, the transformer throw exception for "No match Found"

```typescript
import {ItemTransformer} from "./ItemTransformer";

const itemTransfer = ItemTransformer.transfer<number, string>()
        .inCase(it => it === 0).then(it => 0 + "")
        .inCaseValue(1).thenValue("1")
        .defaultValue("2")

console.log(itemTransfer.match(0))             // "0"
console.log(itemTransfer.match(1))             // "1"
console.log(itemTransfer.match(2))             // "2"
console.log(itemTransfer.match(3))             // "2"
```



