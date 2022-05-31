import { Component, OnInit } from '@angular/core';
import { GameServicesService } from 'src/app/services/game-services.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameServicesService) { }

  dices : number[] = []

  ngOnInit(): void {
    this.dices = [1,1,2,2,1]
    for (let i = 0; i < 5; i++) {
      // this.dices.push(this.gameService.launchRandomDice());
    }
  }

  launchRandomDice() {
    this.ngOnInit();
    this.gameService.compareAllDices(this.dices)
  }
}
