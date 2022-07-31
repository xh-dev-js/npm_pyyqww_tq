export interface IdGen<T> {
    next(): T

    cur(): T
}

export function NewNumberIdGen(): NumberIdGen {
    return new NumberIdGen()
}

export function NewStringIdGen(): StringIdGen {
    return new StringIdGen()
}

export class NumberIdGen implements IdGen<number> {
    private id = 0
    next = () => ++this.id
    cur = () => this.id
}

export class StringIdGen implements IdGen<string> {
    private idGen = NewNumberIdGen()

    cur(): string {
        return `${this.idGen.cur()}`
    }

    next(): string {
        return `${this.idGen.next()}`
    }

}
