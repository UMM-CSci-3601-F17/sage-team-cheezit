import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";


describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [  ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
