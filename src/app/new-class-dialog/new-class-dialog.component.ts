import {Component, OnInit} from '@angular/core';
import {ClassService} from "../class/class.service";
import {MatDialogRef, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-new-class-dialog',
  templateUrl: './new-class-dialog.component.html',
  styleUrls: ['./new-class-dialog.component.css']
})
export class NewClassDialogComponent implements OnInit {

    constructor(public classService : ClassService,
                public matDialogRef : MatDialogRef<NewClassDialogComponent>,
                public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

    newClassName: string;

  public addNewClass(): void {
      this.classService.addNewClass(this.newClassName).then(
          succeeded => {
              //this.deckService.decks.push(succeeded);
              this.snackBar.open("Added class", null, {
                  duration: 2000,
              });
          }, err => {
              console.log(err);
              this.snackBar.open("Error adding class", null, {
                  duration: 2000,
              });
          }
      );
      this.matDialogRef.close();
  }

}
