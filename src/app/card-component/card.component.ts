import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";
import {SaveCardDialogComponent} from "../save-card-dialog/save-card-dialog.component";

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
        this.edit.open(SaveCardDialogComponent, {
            data: {card: this.card}
        });
    };

}
