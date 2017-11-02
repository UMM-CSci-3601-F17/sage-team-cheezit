import {Component, Input, OnInit} from '@angular/core';
import {Card, CardId} from "../card/card";
import {SaveCardDialogComponent} from "../save-card-dialog/save-card-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss', './dragula.css']
})
export class CardComponent implements OnInit {
    @Input() card: CardId;

    @Input() deckId: string;

    @Input() selected?: number[] = [];
    static _debug: boolean = false;
    _debug: boolean = CardComponent._debug;


    constructor(public edit: MatDialog, public deckService: DeckService, public snackBar: MatSnackBar, private dragulaService: DragulaService) {

    }

    ngOnInit() {
        this.dragulaService.drag.subscribe((value: any) => {
            if (this._debug) {
                console.log("drag start");
                console.log(value);
                console.log("drag stop");
                console.log(`drag: ${value[0]}`);
            }
            // this.onDrag(value.slice(1));
        });

        this.dragulaService.drop.subscribe((value: any) => {
            console.log(`drop: ${value[0]}`);
            //this.onDrop(value.slice(1));
        });

        this.dragulaService.over.subscribe((value: any) => {
            if (this._debug) { console.log(`over: ${value[0]}`); }
            // this.onOver(value.slice(1));
        });

        this.dragulaService.out.subscribe((value: any) => {
            if (this._debug) { console.log(`out: ${value[0]}`); }
            //this.onOut(value.slice(1));
        });
        }

    public editCard() {
        this.edit.open(SaveCardDialogComponent, {
            data: {card: this.card, deckId: this.deckId}
        });
    };

    public deleteCard() {
        this.deckService.deleteCard(this.deckId, this.card.id).then(result => {
            this.snackBar.open("Deleted card", null, {
                duration: 2000,
            });
        }, err => {
            this.snackBar.open("Error deleting card", null, {
            duration: 2000,
        });
        })
    }

    dragulaServiceCard()
    {
        this.dragulaService.setOptions('editor-bag', {
            accepts: function (el, target, source, sibling) {
                var fn_debug = true;
                var acceptAll = false;

                if (this._debug || fn_debug) {
                    console.log("accepts() start el, target, source, sibling");
                    console.log({el, target, source, sibling});
                }
                if (target.classList.contains('master')) {
                    return false;
                }
                if (sibling == null) {
                    return (target.children.length == 0);
                }
                var name: string = el.innerText;
                return false;
            },

        });
        this.ngOnInit();
    }
}
