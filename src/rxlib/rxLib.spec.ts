import {RxServiceService} from './rxLib';
import obs = RxServiceService.obs;
import {DoneFn} from "jest-jasmine2/build/queueRunner";
import obsd = RxServiceService.obsd;

describe('RxServiceService', () => {

    it("test obs", (done: DoneFn)=>{
        const o=obs<string>()
        o.obs.subscribe((it)=>{
            expect(it).toBe("xxxx")
            done()
        })
        o.sub.next("xxxx")
    })
    it("test obsd", (done: DoneFn)=>{
        let i=0
        const o=obsd<string>("y")
        o.obs.subscribe((it)=>{
            if(i===0){
                expect(it).toBe("y")
                i++
            } else{
                expect(it).toBe("xxxx")
                done()
            }
        })
        o.sub.next("xxxx")
    })

});
