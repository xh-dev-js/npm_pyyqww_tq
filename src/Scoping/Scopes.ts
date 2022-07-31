export module Scopes {
    export function empty<T>(): Scope<T> {
        return Scopes.ofNullable<T>(null)
    }

    export function ofNullable<U>(value: U | null | undefined): Scope<U> {
        if (value === undefined || value === null) {
            return new ScopeImpl<U>(null)
        } else {
            return new ScopeImpl<U>(value)
        }
    }

    export function of<U>(v: U): Scope<U> {
        return Scopes.ofNullable(v);
    }

    export function ofElse<U>(v: U | null | undefined, elseValue: U): Scope<U> {
        return Scopes.ofNullable(v).ifEmpty(elseValue);
    }

    export function suppliedBy<U>(op: () => U | null): Scope<U> {
        return Scopes.ofNullable(op());
    }

}

export interface Scope<T> {
    // map
    map<O>(op: (t: T) => O | null): Scope<O>

    ifThenMap<O>(test: (t: T) => boolean, mapTo: (t: T) => O | null, elseOperation: () => O | null): Scope<O>

    ifNonEmptyMap<O>(op: (t: T) => O | null): Scope<O>

    // apply
    apply(op: (t: T) => void): Scope<T>

    ifThenApply(test: (t: T) => boolean, apply: (t: T) => void): Scope<T>

    ifEmptyApply(op: () => void): Scope<T>

    ifNonEmptyApply(op: (t: T) => void): Scope<T>


    // do if

    ifEmptyProvide(op: () => T | null): Scope<T>

    ifEmpty(t: T): Scope<T>


    // existence test
    exists(): boolean;

    missing(): boolean;

    nonEmpty(): boolean;

    isEmpty(): boolean;

    // retrieve
    get(): T;

    getNullable(): T | null;

    getOr(value: T): T;

    getOrProvide(op: () => T): T;

}

export class ScopeImpl<T> implements Scope<T> {
    constructor(private value: T | null) {
    }

    apply(op: (t: T) => void): Scope<T> {
        if (this.nonEmpty()) {
            op(this.value!)
        }
        return this;
    };

    ifEmptyApply(op: () => void): Scope<T> {
        if (this.isEmpty()) {
            op()
        }
        return this;
    };

    ifNonEmptyApply(op: (t: T) => void): Scope<T> {
        this.ifThenApply(() => this.nonEmpty(), op)
        return this;
    };

    ifEmptyProvide(op: () => T | null): Scope<T> {
        if (this.isEmpty()) {
            return Scopes.ofNullable(op())
        } else {
            return this;
        }
    };

    ifEmpty(t: T): Scope<T> {
        if (this.isEmpty()) {
            return Scopes.ofNullable(t)
        } else {
            return this;
        }
    };

    public map<O>(op: (t: T) => O | null): Scope<O> {
        if (this.nonEmpty()) {
            return Scopes.ofNullable<O>(op(this.value!))
        } else {
            return Scopes.empty<O>()
        }
    };

    exists(): boolean {
        return this.nonEmpty();
    }

    missing(): boolean {
        return this.isEmpty();
    }

    nonEmpty(): boolean {
        return !this.isEmpty();
    }

    isEmpty(): boolean {
        return this.value === null;
    }


    get(): T {
        return this.value!;
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

    ifNonEmptyMap<O>(op: (t: T) => (O | null)): Scope<O> {
        if (this.isEmpty()) {
            return Scopes.empty<O>()
        } else {
            return Scopes.ofNullable(op(this.get()))
        }
    }

    ifThenApply(test: (t: T) => boolean, apply: (t: T) => void): Scope<T> {
        if (this.nonEmpty() && test(this.get())) {
            apply(this.get())
            return this
        } else {
            return this
        }
    }

    ifThenMap<O>(cond: (t: T) => boolean, mapTo: (t: T) => (O | null), elseOperation: () => O | null): Scope<O> {
        if (this.isEmpty()) {
            return Scopes.empty<O>()
        } else if (cond(this.get())) {
            return Scopes.ofNullable(mapTo(this.get()))
        } else {
            return Scopes.ofNullable(elseOperation())
        }
    }

}
