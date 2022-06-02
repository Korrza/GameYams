import { Component, OnInit } from '@angular/core';
import { GettingDBService } from 'src/app/services/getting-db.service';
import { Patries } from 'src/Models/Patries.models';

@Component({
  selector: 'app-patries-list',
  templateUrl: './patries-list.component.html',
  styleUrls: ['./patries-list.component.scss']
})
export class PatriesListComponent implements OnInit {

  pastries : Patries[] = [];

  constructor(private DB: GettingDBService) { }

  ngOnInit(): void {
    this.DB.getData().subscribe(
      data => {
        this.pastries = data;
      }
    )
  }

}
