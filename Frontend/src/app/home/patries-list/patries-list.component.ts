import { Component, OnInit } from '@angular/core';
import { GettingDBService } from 'src/app/services/getting-db.service';
import { Patries } from 'src/Models/Patries.models';

@Component({
  selector: 'app-patries-list',
  templateUrl: './patries-list.component.html',
  styleUrls: ['./patries-list.component.scss']
})
export class PatriesListComponent implements OnInit {

  winnedPastries : Patries[] = [];
  pastries : Patries[] = [];

  constructor(private DB: GettingDBService) { }

  ngOnInit(): void {
    let pastriesBuffer: Patries[] = [];
    console.log("test",JSON.parse(localStorage.getItem('currentUser')!));
    let user = JSON.parse(localStorage.getItem('currentUser')!)
    console.log("isAuth", user.isAuth);
    if (user.isAuth) {
      this.DB.getData().subscribe(
        data => {
          pastriesBuffer = data;
          for (let i = 0; i < pastriesBuffer.length; i++) {
            if (pastriesBuffer[i].number < 10) {
              this.winnedPastries.push(pastriesBuffer[i]);
              console.log(pastriesBuffer[i]);
            }
          }
        }
      )
    }
    this.DB.getData().subscribe(
      data => {
        this.pastries = data;
      }
    )
  }
}
