
# ImBusyModule
I'm busy module is simple tool to track busy status.

````typescript
import {ImBusyModule} from "./ImBusy";

// Create a busy man instance to store his busy status
const busyMan = ImBusyModule.busyMan()

busyMan.amIBusy() // false
const someJob = busyMan.newJob()
busyMan.amIBusy() // true

someJob.doneMyJob() // remove job from busy man

// Busy man finally having time for coding
busyMan.amIBusy() // false 



````
