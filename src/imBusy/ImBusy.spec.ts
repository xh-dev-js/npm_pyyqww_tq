import {ImBusyModule} from "./ImBusy";
import HackerMan = ImBusyModule.HackerMan;
import busyMan = ImBusyModule.busyMan;

describe("Test ImBuxy", () => {
    it("initial busy man", () => {
        const busyMan = ImBusyModule.busyMan()
        expect(busyMan.amIBusy()).toBe(false)
    })
    it("busy man having jobs", () => {
        const busyMan = ImBusyModule.busyMan()
        expect(busyMan.amIBusy()).toBe(false)
        let job = busyMan.newJob()
        expect(busyMan.amIBusy()).toBe(true)
        job.doneMyJob()
        expect(busyMan.amIBusy()).toBe(false)
    })
    it("job done for multiple times", () => {
        const busyMan = ImBusyModule.busyMan()
        expect(busyMan.amIBusy()).toBe(false)
        let job = busyMan.newJob()
        expect(busyMan.amIBusy()).toBe(true)
        job.doneMyJob()
        job.doneMyJob()
        job.doneMyJob()
        job.doneMyJob()
        job.doneMyJob()
        expect(busyMan.amIBusy()).toBe(false)
    })
    it("job done for multiple times but still having job", () => {
        const busyMan = ImBusyModule.busyMan()
        expect(busyMan.amIBusy()).toBe(false)
        busyMan.newJob()
        let job = busyMan.newJob()
        expect(busyMan.amIBusy()).toBe(true)
        job.doneMyJob()
        job.doneMyJob()
        job.doneMyJob()
        job.doneMyJob()
        job.doneMyJob()
        expect(busyMan.amIBusy()).toBe(true)
    })

    it("i having lost jobs", () => {
        const busyMan = ImBusyModule.busyMan()
        expect(busyMan.amIBusy()).toBe(false)

        busyMan.newJob()
        busyMan.newJob()
        busyMan.newJob()
        expect(busyMan.amIBusy()).toBe(true)

        let hackerMan = busyMan as unknown as HackerMan
        hackerMan.clearTasks()

        expect(busyMan.amIBusy()).toBe(false)
    })

    it("i having lost jobs again", () => {
        const busyMan = ImBusyModule.busyMan()
        expect(busyMan.amIBusy()).toBe(false)

        busyMan.newJob()
        busyMan.newJob()
        busyMan.newJob()
        expect(busyMan.amIBusy()).toBe(true)

        let hackerMan = busyMan as unknown as HackerMan
        hackerMan.modifyList(map => {
            [...map.entries()].map((it, _) => {
                console.log(`Delete: ${it[0]}`)
            })
            map.clear()
        })

        expect(busyMan.amIBusy()).toBe(false)
    })

    it("test hook", () => {
        let v = 0
        let b = false
        let man = busyMan()
        let hook = ImBusyModule.NewSimpleHook(
            t => {
                v++;
                b = t
            },
            t => {
                v++;
                b = t
            }
        )

        expect(hook.id()).toBe("")
        man.register(hook)
        expect(hook.id()).toBe("1")

        expect(v).toBe(1)
        expect(b).toBe(false)
        let j1 = man.newJob()
        expect(v).toBe(2)
        expect(b).toBe(true)

        let j2 = man.newJob()
        expect(v).toBe(2)
        expect(b).toBe(true)

        j2.doneMyJob()
        expect(v).toBe(2)
        expect(b).toBe(true)

        j2.doneMyJob()
        expect(v).toBe(2)
        expect(b).toBe(true)

        j1.doneMyJob()
        expect(v).toBe(3)
        expect(b).toBe(false)

        const j3 = man.newJob()
        expect(v).toBe(4)
        expect(b).toBe(true)

        man.deRegister(hook)

        j3.doneMyJob()
        expect(v).toBe(4)
        expect(b).toBe(true)


    })
})
