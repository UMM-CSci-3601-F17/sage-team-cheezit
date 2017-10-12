import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {Card} from "../card/card";


export class CardState {
    public cardPoints:number;
    public cardHints:number[];
    public isComplete: boolean;
    public selected: number;


    constructor(){
        this.cardPoints = 5;
        this.cardHints = [1,2,3,4];
        this.isComplete = false;
        this.selected = 0;
    }

    public randomizeSages(): void{
        if(this.cardHints.length > 0) {
            let randnum = Math.floor(Math.random() * this.cardHints.length);
            this.selected = this.cardHints[randnum];

            this.cardHints.splice(randnum, 1);
            this.cardPoints = this.cardPoints - 1;
        }

    }

    public isDone(): void {
        this.isComplete = true;
    }


}
