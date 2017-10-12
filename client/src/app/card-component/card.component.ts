import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";
import {CardState} from "../play-component/CardState";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    cardState: CardState;

  constructor() {
    this.cardState = new CardState;
  }

  @Input() card: Card;

  ngOnInit() {
  }

}
