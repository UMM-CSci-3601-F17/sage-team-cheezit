import {NewCardDialogComponent} from "./new-card-dialog.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs/Observable";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {DeckService} from "../deck/deck.service";


describe('NewCardDialogComponent', () => {
    let component: NewCardDialogComponent;
    let fixture: ComponentFixture<NewCardDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [NewCardDialogComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: DeckService},
                {provide: MdDialogRef},
                {provide: MD_DIALOG_DATA},
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    }
                }],
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(NewCardDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


});
