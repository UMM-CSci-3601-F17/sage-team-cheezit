import { TestBed, async } from "@angular/core/testing";
import {HomeComponent} from "./home.component";

describe("Home", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it("says a message", async(() => {
        const comp = TestBed.createComponent(HomeComponent);
        expect(comp.componentInstance.text).toBe("Hello world!");
    }));
});