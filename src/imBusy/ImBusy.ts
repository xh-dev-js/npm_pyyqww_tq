import exp from "constants";

export module ImBusyModule {
    export function busyMan(): BusyMan {
        return new BusyManImpl();
    }

    export interface ImBusy {
        jobId(): string;

        doneMyJob(): void;

    }

    export interface BusyHook {
        id(): string;

        setId(id: string): void;

        hook(busy: boolean): void
        initHook(busy: boolean): void
    }

    class SimpleBusyHook implements BusyHook {
        private _id: string = ""
        op: (b:boolean) => void
        initOp: (b:boolean) => void

        constructor(op: (b: boolean) => void, initOp: (b:boolean)=>void) {
            this.op = op;
            this.initOp = initOp
        }

        id(): string {
            return this._id;
        }

        setId(id: string): void {
            this._id = id
        }

        hook(busy: boolean): void {
            this.op(busy)
        }

        initHook(busy: boolean): void {
            this.initOp(busy)
        }

    }

    export function NewSimpleHook(op: (b:boolean)=>void, init: (b:boolean)=>void): BusyHook {
        return new SimpleBusyHook(op, init)
    }


    export interface BusyMan {
        newJob(): ImBusy;

        amIBusy(): boolean;

        jobIsDone(imBusy: ImBusy): void;

        register(busyHook: BusyHook): BusyHook;

        deRegister(busyHook: BusyHook): void;
    }

    export interface HackerMan {
        clearTasks(): void;

        modifyList(oper: (busyList: Map<string, ImBusy>) => void): void;
    }

    class BusyManImpl implements BusyMan, HackerMan {

        private busyList: Map<string, ImBusy> = new Map<string, ImBusy>()

        private id: number = 0
        nextId = (): string => {
            return `${this.id++}`
        }

        public newJob(): ImBusy {
            let before = this.amIBusy()
            const imBusy = new ImBusyImpl(this, this.nextId())
            this.busyList.set(imBusy.jobId(), imBusy)
            let now = this.amIBusy()
            if (now !== before) {
                this.hooks.forEach(it => it.hook(now))
            }
            return imBusy
        }

        public jobIsDone(imBusy: ImBusy) {
            let before = this.amIBusy()
            this.busyList.delete(imBusy.jobId())
            let now = this.amIBusy()
            if (now !== before) {
                this.hooks.forEach(it => it.hook(now))
            }
        }

        public amIBusy(): boolean {
            return this.busyList.size !== 0
        }

        clearTasks(): void {
            this.busyList.clear()
        }

        modifyList(oper: (busyList: Map<string, ImBusyModule.ImBusy>) => void): void {
            oper(this.busyList)
        }

        private hookId = 0
        private hookIdGen = () => `${++this.hookId}`
        private hooks: BusyHook[] = []

        deRegister(busyHook: ImBusyModule.BusyHook): void {
            this.hooks = this.hooks.filter(it => it.id() !== busyHook.id())
        }

        register(busyHook: ImBusyModule.BusyHook): ImBusyModule.BusyHook {
            busyHook.setId(this.hookIdGen())
            this.hooks.push(busyHook)
            busyHook.initHook(this.amIBusy())
            return busyHook;
        }
    }

    class ImBusyImpl implements ImBusy {
        constructor(private amIBusy: BusyMan, private taskId: string) {
        }

        doneMyJob() {
            this.amIBusy.jobIsDone(this)
        }

        jobId(): string {
            return this.taskId;
        }

    }
}
