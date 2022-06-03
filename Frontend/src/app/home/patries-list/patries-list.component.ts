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

  // récupère les pâtisseries et les stock dans les tableaux pastries et winnedPastries
  ngOnInit(): void {
    let pastriesBuffer: Patries[] = [];
    let user = JSON.parse(localStorage.getItem('currentUser')!)

    if (user.isAuth) {
      this.DB.getData().subscribe(
        data => {
          pastriesBuffer = data;
          for (let i = 0; i < pastriesBuffer.length; i++) {
            if (pastriesBuffer[i].number < 10) {
              this.winnedPastries.push(pastriesBuffer[i]);
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
