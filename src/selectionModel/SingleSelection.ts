import {Scope, Scopes} from "../Scoping/Scopes";

export module SingleSelectionModel {
    export function New<T>(ts: T[]): SingleSelectionModel<T> {
        return Scopes.of(new SelectionsImpl<T>())
            .apply(it => it.setSelections(ts))
            .get()
    }

    export function NewWithDefault<T>(ts: T[]): SingleSelectionModel<T> {
        return Scopes.of(new SelectionsImpl<T>())
            .apply(it => it.setSelectionsWithDefault(ts))
            .get()
    }

    export function NewHook<T>(
        whenSelect: (t:Selection<T>)=>void,
        whenUnSelect: (t:Selection<T>)=>void): SelectHook<T>{
        return new SelectHookImpl<T>(whenSelect, whenUnSelect)
    }
}

export interface Selection<T> {
    isSelected(): boolean

    value(): Scope<T>

    select(): void


}

export interface SelectHook<T> {
    whenSelect(t: Selection<T>): void

    whenUnSelect(t: Selection<T>): void
}

class SelectHookImpl<T> implements SelectHook<T>{
    constructor(
        private _whenSelect: (t:Selection<T>)=>void,
        private _whenUnSelect: (t:Selection<T>)=>void,
        ) {
    }
    whenSelect(t: Selection<T>): void {
        this._whenSelect(t)
    }

    whenUnSelect(t: Selection<T>): void {
        this._whenUnSelect(t)
    }

}

export interface SingleSelectionModel<T> {

    find(t: T): Selection<T>

    findSelection(selection: Selection<T>): Selection<T>

    allowEmpty(): boolean

    findEmpty(): Selection<T>

    findOptions(): Selection<T>[]

    getCur(): Selection<T>

    getAll(): Selection<T>[]

    select(t: T): void

    selectSelection(t: Selection<T>): void

    selectEmpty(): void

    setSelections(list: T[]): Selection<T>[]

    setSelectionsWithDefault(list: T[]): Selection<T>[]

    register(hook: SelectHook<T>): SingleSelectionModel<T>
}

class SelectionImpl<T> implements Selection<T> {
    constructor(
        private _isSelected: boolean,
        private _value: T | null,
        private _parent: SelectionsImpl<T>
    ) {
    }

    isSelected(): boolean {
        return this._isSelected;
    }


    value(): Scope<T> {
        return Scopes.ofNullable(this._value);
    }

    select(): void {
        if (this !== this._parent.getCur()) {
            this._parent.setCur(this, this._parent.getCur() as SelectionImpl<T>)
        }
    }

    selectSelect(value: boolean): void {
        this._isSelected = value
    }
}


interface SingleSelectionSelectionInternal<T> {
    createEmptySelection(): SelectionImpl<T>

    setCur(toBeSet: SelectionImpl<T>, toBeUnset: SelectionImpl<T>): void
}

class SelectionsImpl<T> implements SingleSelectionModel<T>, SingleSelectionSelectionInternal<T> {
    private selections: SelectionImpl<T>[] = []
    private currentSelection: SelectionImpl<T>
    private _allowEmpty = false

    createEmptySelection = () => new SelectionImpl<T>(false, null, this)
    allowEmpty = () => this._allowEmpty

    findEmpty(): Selection<T> {
        if (this._allowEmpty) {
            return this.selections.find((it, _, __) => it.value().isEmpty())!
        } else {
            throw new Error("No empty option is allowed")
        }
    }

    findOptions: () => Selection<T>[] =
        () => this.selections.filter((it, _, __) => it.value().exists())!
    getCur: () => Selection<T> =
        () => this.currentSelection
    getAll: () => Selection<T>[] =
        () => this.selections

    constructor() {
        this.currentSelection = this.createEmptySelection()
        this.selections = [this.currentSelection]
        this.currentSelection.select()
    }

    selectSelection(t: Selection<T>): void {
        this.setCur(this.findSelection(t) as SelectionImpl<T>, this.getCur() as SelectionImpl<T>)
    }

    select(t: T): void {
        const target = this.selections
            .find((it, _, __) => it.value().exists() && it.value().get() === t)
        if (target === undefined) {
            throw new Error("item not exists")
        }

        if (!target.isSelected())
            this.selectSelection(target)
    }

    setSelections(list: T[]): Selection<T>[] {
        this._allowEmpty = false
        if (list.length === 0) {
            throw Error("selection must be with at least one element")
        }
        this.selections = list.map(it => new SelectionImpl<T>(false, it, this))
        this.currentSelection = this.selections[0]
        this.setCur(this.currentSelection, this.currentSelection)
        return this.selections
    }

    setSelectionsWithDefault(list: T[]): Selection<T>[] {
        this._allowEmpty = true
        const defaultSelection = this.createEmptySelection()
        const selects = list.map(it => new SelectionImpl<T>(false, it, this))
        selects.unshift(defaultSelection)
        this.selections = selects
        this.currentSelection = selects[0]
        this.setCur(defaultSelection, this.currentSelection)
        return this.selections
    }

    selectEmpty(): void {
        this.setCur(this.findEmpty() as SelectionImpl<T>, this.getCur() as SelectionImpl<T>)
    }

    setCur(toBeSet: SelectionImpl<T>, toBeUnset: SelectionImpl<T>): void {

        if(toBeUnset.isSelected()){
            toBeUnset.selectSelect(false)
            this.hooks.forEach(it => it.whenUnSelect(toBeUnset))
        }

        if(!toBeSet.isSelected()){
            toBeSet.selectSelect(true)
            this.hooks.forEach(it => it.whenSelect(toBeSet))
        }
        this.currentSelection = toBeSet
    }

    findSelection(selection: Selection<T>): Selection<T> {
        const found = this.getAll().find(it => it === selection)
        if (found) {
            return found!
        } else {
            throw new Error("Not found")
        }
    }

    find(t: T): Selection<T> {
        const found = this.getAll()
            .find((it, _, __) => it.value().exists() && it.value().get() === t)
        if (found) {
            return found!
        } else {
            throw new Error("Not found")
        }
    }

    private hooks: SelectHook<T>[] = []

    register(hook: SelectHook<T>): SingleSelectionModel<T> {
        this.hooks.push(hook)
        hook.whenSelect(this.getCur())
        return this
    }

}
