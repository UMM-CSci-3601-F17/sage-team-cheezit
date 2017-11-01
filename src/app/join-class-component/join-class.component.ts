import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {ClassService} from "../class/class.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import "rxjs/add/operator/takeUntil";

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.css']
})
export class JoinClassComponent implements OnInit, OnDestroy  {

  constructor(public afAuth: AngularFireAuth, public classService: ClassService,
              private route: ActivatedRoute, public snackBar: MatSnackBar,
              private router: Router) { }

  public id: string;
  public joincode: string;

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.route.queryParams.subscribe(qp => {

                if(qp['joincode']) {
                    this.joincode = qp['joincode'];
                        this.afAuth.authState.takeUntil(componentDestroyed(this)).subscribe(state => {
                            if(state != null)
                                this.classService.joinClass(this.id, this.joincode).then(
                                    result => {
                                        this.snackBar.open("Joined class", null, {
                                            duration: 2000,
                                        });
                                        console.log(result);
                                        this.router.navigate(['/class', this.id]);

                                    },
                                    err => {
                                        this.snackBar.open("Error joining class", null, {
                                            duration: 2000,
                                        });
                                        console.log(err);
                                        this.router.navigate(['/']);
                                    }
                                );
                    });

                }
            });


        });
    }

    ngOnDestroy() {
    }

}
