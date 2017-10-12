import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {Component} from "@angular/core";
import {Card} from "../card/card";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [ TestComponentWrapper, CardComponent ],
        providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
    selector: 'test-component-wrapper',
    template: '<app-card [card]="card"></app-card>'
})
class TestComponentWrapper {
    card : Card = {
        _id : "test id",
        word : "test word",
        synonym : "test synonym",
        antonym: "test antonym",
        general_sense: "test general_sense",
        example_usage: "test example_usage",
    };
}
