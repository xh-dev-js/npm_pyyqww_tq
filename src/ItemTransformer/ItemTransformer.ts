type Predicate<From> = (From) => Boolean
type Transform<From, To> = (From) => To
type CasePair<From, To> = [Predicate<From>, Transform<From, To>]

export class ItemTransformer<From, To> {
    private readonly list: CasePair<From, To>[]
    private readonly defaultTransform: Transform<From, To>

    constructor(list: CasePair<From, To>[], defaultTransform: Transform<From, To>) {
        this.list = list;
        this.defaultTransform = defaultTransform;
    }

    inCaseValue(from: From): CaseCriteria<From, To> {
        return this.inCase(it => it === from)
    }

    inCase(predicate: Predicate<From>): CaseCriteria<From, To> {
        return new CaseCriteria(this.list, this.defaultTransform, predicate)
    }

    defaultValue(value: To) {
        return new ItemTransformer(this.list, _ => value)
    }

    static transfer<From, To>(): ItemTransformer<From, To> {
        return new ItemTransformer<From, To>([], null);
    }

    match(from: From): To {
        for (let it of this.list) {
            let [predicate, transform] = it
            if (predicate(from)) {
                return transform(from);
            }
        }
        if(this.defaultTransform === null){
            throw new Error("No match found")
        } else {
            return this.defaultTransform(from)
        }
    }
}

export class CaseCriteria<From, To> {
    private readonly list: CasePair<From, To>[] = []
    private readonly predicate: Predicate<From> = null;
    private readonly defaultTransform: Transform<From, To> = null;

    constructor(list: [Predicate<From>, Transform<From, To>][], defaultTransform: Transform<From, To>, predicate: Predicate<From>) {
        this.list = list
        this.predicate = predicate
        this.defaultTransform = defaultTransform
    }

    then(transform: Transform<From, To>): ItemTransformer<From, To> {
        return new ItemTransformer<From, To>([...this.list, [this.predicate, transform]], this.defaultTransform)
    }

    thenValue(value: To): ItemTransformer<From, To> {
        return this.then(_ => value)
    }
}

