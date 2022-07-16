export class Scope<T> implements Scope<T> {
  constructor(private value: T | null) {
  }


  apply = (op: (t: T) => void): Scope<T> => {
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
  ifNonEmptyApply = (op: () => void): Scope<T> => {
    if (this.nonEmpty()) {
      op()
    }
    return this;
  };

  ifEmptyProvide = (op: () => T): Scope<T> => {
    if (this.empty()) {
      return Scope.ofNullable(op())
    } else {
      return this;
    }
  };

  ifEmpty = (t: T): Scope<T> => {
    if (this.empty()) {
      return Scope.ofNullable(t)
    } else {
      return this;
    }
  };

  mapTo = <O>(op: (t: T) => (O | null)): Scope<O> => {
    if (this.nonEmpty()) {
      return Scope.ofNullable(op(this.value!))
    } else {
      return Scope.ofNullable<O>(null)
    }
  };

  exists = (): boolean => this.nonEmpty();
  missing = (): boolean => this.empty();
  nonEmpty = (): boolean => !this.empty();
  empty(): boolean {
    return this.value === null;
  }

  static of = <T>(v: T): Scope<T> => Scope.ofNullable(v);

  static ofNullable = <T>(value: T | null): Scope<T> => {
    if (value === undefined || value === null) {
      return new Scope<T>(null)
    } else {
      return new Scope<T>(value)
    }
  };

  static suppliedBy = <T>(op: () => T): Scope<T> => Scope.ofNullable(op());

  static nullableSupplied = <T>(op: () => T | null): Scope<T> => Scope.ofNullable(op());

  get = (): T | null => this.value;

  getOr = (value: T): T => {
    if (this.nonEmpty()) {
      return this.value!
    } else {
      return value
    }
  };

  getOrProvide = (op: () => T): T => {
    if (this.nonEmpty()) {
      return this.value!
    } else {
      return op()
    }
  };
}
