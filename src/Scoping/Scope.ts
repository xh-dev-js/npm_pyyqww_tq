export class Scope<T> implements Scope<T> {
    constructor(private value: T | null) {
    }

    apply(op: (t: T | null) => void): Scope<T> {
        if (this.nonEmpty()) {
            op(this.value!)
        }
        return this;
    };
    ifEmptyApply = (op: () => void): Scope<T> => {
        if (this.empty()) {
            op()
        }
        return this;
    };
    ifNonEmptyApply(op: () => void): Scope<T>{
        if (this.nonEmpty()) {
            op()
        }
        return this;
    };

    ifEmptyProvide(op: () => T | null): Scope<T> {
        if (this.empty()) {
            return Scope.ofNullable(op())
        } else {
            return this;
        }
    };

    ifEmpty(t: T): Scope<T> {
        if (this.empty()) {
            return Scope.ofNullable(t)
        } else {
            return this;
        }
    };

    public mapTo<O>(op: (t: T) => O | null): Scope<O> {
        if (this.nonEmpty()) {
            return Scope.ofNullable<O>(op(this.value!))
        } else {
            return Scope.ofNullable<O>(null)
        }
    };

    exists(): boolean {
        return this.nonEmpty();
    }
    missing(): boolean {
        return this.empty();
    }
    nonEmpty(): boolean {
        return !this.empty();
    }

    empty(): boolean {
        return this.value === null;
    }

    public static of<U>(v: U): Scope<U> {
        return Scope.ofNullable(v);
    }

    public static ofNullable<U>(value: U | null): Scope<U> {
        if (value === undefined || value === null) {
            return new Scope<U>(null)
        } else {
            return new Scope<U>(value)
        }
    };

    public static suppliedBy<U>(op: () => U): Scope<U> {
        return Scope.ofNullable(op());
    }


    public static nullableSupplied<U>(op: () => U | null): Scope<U> {
        return Scope.ofNullable(op());
    }

    get(): T {
        return this.value;
    }

    getNullable(): T | null {
        return this.value;
    }

    getOr(value: T): T {
        if (this.nonEmpty()) {
            return this.value!
        } else {
            return value
        }
    };

    getOrProvide(op: () => T): T {
        if (this.nonEmpty()) {
            return this.value!
        } else {
            return op()
        }
    };
}
