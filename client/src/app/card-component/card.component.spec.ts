import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { CardComponent } from './card.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {Component} from "@angular/core";
import {Card} from "../card/card";
import {by} from "protractor";
import {debug} from "util";


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let debugElement: DebugElement;

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
    component = fixture.debugElement.children[0].componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should check that card is added correctly', () => {

        expect(component.card.synonym).toContain("test synonym");
        expect(component.card.antonym).toContain("test antonym");
        expect(component.card.general_sense).toContain("test general_sense");
        expect(component.card.example_usage).toContain("test example_usage");


    });
    // NOT WORKING
    // it('should highlight upon selection', () => {
    //    component.selected = 1;
    //    let synonym: HTMLElement = debugElement.query(By.css('div')).nativeElement;
    //    expect(synonym.style.backgroundColor).toEqual('yellow')
    // });
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
