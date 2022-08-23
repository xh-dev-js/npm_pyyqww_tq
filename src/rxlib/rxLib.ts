import {BehaviorSubject, filter, map, Observable, Subject} from "rxjs";

export interface ObsPair<T> {
  sub: Subject<T>
  obs: Observable<T>
  value: ()=>T
}

export module RxServiceService {
  export function obs<T>(): ObsPair<T> {
    const subject = new BehaviorSubject<T | null>(null)
    const observable = subject.pipe(
      filter((it) => it !== null),
      map((it) => it!)
    )

    return {sub: subject as Subject<T>, obs: observable, value: () => subject.value!}
  }

  export function obsd<T>(d: T): ObsPair<T> {
    const subject = new BehaviorSubject<T>(d)
    return {sub: subject, obs: subject, value: () => subject.value}
  }

}
