export module ImBusyModule {
    export function busyMan(): BusyMan {
        return new BusyManImpl();
    }

    export interface ImBusy {
        jobId(): string;

        doneMyJob():void;
    }

    export interface BusyMan {
        newJob(): ImBusy;

        amIBusy(): boolean;

        jobIsDone(imBusy: ImBusy):void;
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
            const imBusy = new ImBusyImpl(this, this.nextId())
            this.busyList.set(imBusy.jobId(), imBusy)
            return imBusy
        }

        public jobIsDone(imBusy: ImBusy) {
            this.busyList.delete(imBusy.jobId())
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
