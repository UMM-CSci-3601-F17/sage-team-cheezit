import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";
import { NewCardDialogComponent } from "../new-card-dialog/new-card-dialog.component";

import {MatDialogConfig} from "@angular/material";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public edit: MatDialog) {
  }

  @Input() card: Card;

  @Input() selected?: number[] = [];

  ngOnInit() {
  }
    public editCard() {
        let cardData = new MatDialogConfig();
        cardData.data = {
            Word: this.card.word,
            Synonym: this.card.synonym,
            Antonym: this.card.antonym,
            General_sense: this.card.general_sense,
            Example_usage: this.card.example_usage
        };
        let editCardReference = this.edit.open(NewCardDialogComponent, cardData);
    };

}
