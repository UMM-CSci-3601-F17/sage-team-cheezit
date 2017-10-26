import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListComponent } from './deck-list.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {Deck} from "../deck/deck";
import {DeckService} from "../deck/deck.service";
import {APP_BASE_HREF} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";

describe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;

  let deckServiceStub: {
      getDeck: (id) => Observable<Deck>,
      getDecks: (id) => void
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [SharedModule, RouterTestingModule],
        declarations: [ DeckListComponent,],
        providers: [{provide: DeckService, useValue: deckServiceStub},
            {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
