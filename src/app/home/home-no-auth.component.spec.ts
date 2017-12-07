import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";


describe('HomeComponentNoAuth', () => {
    let component: HomeComponent;
    let debugElement: DebugElement;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a button for Google Sign In Button', () => {
        let button: HTMLElement = debugElement.query(By.css('.sign-in-button')).nativeElement;
        expect(button).toBeTruthy();
    });

    it('should contain a button for Public Decks', () => {
        let button: HTMLElement = debugElement.query(By.css('.public-deck-button')).nativeElement;
        expect(button).toBeTruthy();
    });

    it('should contain a button for Join Game', () => {
        let button: HTMLElement = debugElement.query(By.css('.join-game-button')).nativeElement;
        expect(button).toBeTruthy();
    });

    it('should contain a button for Help Decks', () => {
        let button: HTMLElement = debugElement.query(By.css('.help-button')).nativeElement;
        expect(button).toBeTruthy();
    });

    it('should contain a button called Public Decks', () => {
        let button: HTMLElement = debugElement.query(By.css('.public-deck-button')).nativeElement;
        expect(button.innerText).toContain('Public Decks')
    });

    it('should contain a button called Join Game', () => {
        let button: HTMLElement = debugElement.query(By.css('.join-game-button')).nativeElement;
        expect(button.innerText).toContain('Join Game')
    });

    it('should contain a button called Help', () => {
        let button: HTMLElement = debugElement.query(By.css('.help-button')).nativeElement;
        expect(button.innerText).toContain('Help')
    });
});
