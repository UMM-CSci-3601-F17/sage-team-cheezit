import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";

@Component({
  selector: 'app-public-decks',
  templateUrl: './public-decks.component.html',
  styleUrls: ['./public-decks.component.css']
})
export class PublicDecksComponent implements OnInit {

  constructor(public deckService: DeckService) { }

  ngOnInit() {
  }

}
