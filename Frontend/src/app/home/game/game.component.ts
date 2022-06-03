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
  pastries : Patries[] = [];
  isDisable: boolean = false;

  // initie la page du jeu
  ngOnInit(): void {
    this.dices = [1,3,3,3,7];
    this.getPastries();
  }

  // recupère les pâtisseries et les stock dans le tableau pastries
  getPastries() {
    this.DB.getData().subscribe(
      data => {
        this.pastries = data;
      }
    )
  }
  
  // lance le jeu
  launchRandomDice() {
    if (this.isDisable == false) {
      this.getPastries();
      this.dices = []
      for (let i = 0; i < 5; i++) {
        this.dices.push(this.gameService.launchRandomDice());
      }

      this.switchDiceHider()
      this.switchHideClass();
      
      setTimeout(() => {
        let result = this.gameService.compareAllDices(this.dices);
        this.showMessage(this.translateResultToMessage(result));
        this.gameService.getWinnedPatries(this.pastries, result);
        this.isDisable = true;

        setTimeout(() => {
          this.isDisable = false;
          this.switchHideClass();
        }, 4000);
      }, 1000);

    }
  }

  switchHideClass() {
    let doc = document.getElementById("button")! as HTMLDivElement;

    // check if doc contain the class isDisable
    if (doc.classList.contains("is-disable")){
      doc.classList.remove("is-disable");
    } else {
      doc.classList.add("is-disable");
    }
  }

  // traduit le résultat du jeu en string plus précise
  translateResultToMessage(result: string) :string{
    switch (result) {
      case "duo":
        return "Duo !";
      case "square":
        return "Carré :o !";
      case "yams":
        return "YAMS !!!!!";
      default:
        return "Perdu :(";
    }
  }

  // affiche un message (yams / carré / duo / perdu)
  showMessage(message: string) {
    let doc = document.getElementById("bread-message-box") as HTMLDivElement;

    if (doc != null) {
      doc!.style.display = "block";
      doc.innerHTML = message;

      setTimeout(() => {
        doc.style.display = "none";
      }, 3000);
    }
  }

  // affiche et cache les dés
  switchDiceHider() {
    for (let i = 0; i < 5; i++) {
      document.getElementById("dice-hider-" + i)!.style.display = "block";
    }

    let i = 0;
    let timer = setInterval(() => {

      // wait 0.2s 
      document.getElementById("dice-hider-" + i)!.style.display = "none";
      i++;
      if (i == 5) {
        clearInterval(timer);
      }
    }, 200);
  }
}
