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

# Scope API

Scope API is a set of helper utils for creating object and converting object.

## Existence of instance

Scope API considers

1. any input value of null, undefined as empty.
2. any input value of non value as non-empty. \
   p.s. if not specify the type of, when pass null, the result type will become Scope<null>

```typescript
import {Scope} from "./Scope";

//----------- Init object

// create empty Scope
let variableOf1: Scope<number> = Scope.of<number>(null) // => null

// create non-empty scope
let variableOf2: Scope<number> = Scope.of(1) // => 1
let variableO3: Scope<number> = Scope.ofElse(null, 3).get() // => 3
let variableO4: Scope<number> = Scope.ofNullable<number>(null).ifEmpty(4).get() // => 4


// if not specify the type, when passing null, result type is not expected
let variableO5: Scope<null> = Scope.ofNullable(null).get() // => null
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
let v1: Scope<A> = Scope.of(new A()).apply(it => it.a = 100) // A.a = 100
let v2: Scope<A> = Scope.ofNullable<A>(null).apply(it => it.a = 100) // A = null, if null apply statment is not executed
let v3: Scope<A> = Scope.ofNullable<A>(new A()).ifThenApply(it => it.a == 1, it => it.a = 2) // A.a = 2

// Update value by condition
let v4: Scope<A> = Scope.ofNullable<A>(new A()).ifThenApply(it => it.a == 0, it => it.a = 2) // A.a = 1


class B {
    private b: number

    static fromA(a: A): B {...
    }
}

// conversion of instance
let v5: Scope<B> = Scope.ofNullable<A>(new A()).map(it => B.fromA(it))
```

## Retrieve object

retrieve the object

1. get object
2. get default value if null

```typescript
let v1: Scope<number> = Scope.of(1)
let v1Value: number = v1.get() // 1

let v2: Scope<number> = Scope.ofNullable<A>(null)
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


