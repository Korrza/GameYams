import { Component, OnInit } from '@angular/core';
import { GameServicesService } from 'src/app/services/game-services.service';
import { GettingDBService } from 'src/app/services/getting-db.service';
import { Patries } from 'src/Models/Patries.models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameServicesService, private DB: GettingDBService) { }

  dices : number[] = [];
  patries : Patries[] = [];

  ngOnInit(): void {
    this.dices = [1,1,2,2,1]
    for (let i = 0; i < 5; i++) {
      // this.dices.push(this.gameService.launchRandomDice());
    }
    // get patries from DB
    this.DB.getData().subscribe(
      data => {
        this.patries = data;
        this.gameService.getWinnedPatries(this.patries, "yams");
      }
    )

  }

  launchRandomDice() {
    this.ngOnInit();
    let result = this.gameService.compareAllDices(this.dices);
    this.gameService.getWinnedPatries(this.patries, result);
  }
}
