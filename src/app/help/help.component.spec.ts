import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {HelpComponent} from "./help.component";
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";


describe('HelpComponent', () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [  ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
