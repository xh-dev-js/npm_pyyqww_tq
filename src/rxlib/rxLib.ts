import {BehaviorSubject, filter, map, Observable, Subject} from "rxjs";
import {Scope, Scopes} from "../Scoping/Scopes";

export interface ObsPair<T> {
  sub: Subject<T>
  obs: Observable<T>
  value: ()=>Scope<T>
}

export module RxServiceService {
  export function obs<T>(): ObsPair<T> {
    const subject = new BehaviorSubject<T | null>(null)
    const observable = subject.pipe(
      filter((it) => it !== null),
      map((it) => it!)
    )

    return {sub: subject as Subject<T>, obs: observable, value: () => Scopes.of(subject.value!)}
  }

  export function obsd<T>(d: T): ObsPair<T> {
    const subject = new BehaviorSubject<T>(d)
    return {sub: subject, obs: subject, value: () => Scopes.of(subject.value)}
  }

}
