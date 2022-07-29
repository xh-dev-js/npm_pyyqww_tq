import {ImBusyModule} from "./ImBusy";
import HackerMan = ImBusyModule.HackerMan;

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
})
