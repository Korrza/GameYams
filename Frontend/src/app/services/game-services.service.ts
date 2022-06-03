import { Injectable } from '@angular/core';
import { Patries } from 'src/Models/Patries.models';
import { PopUpComponent } from '../home/pop-up/pop-up.component';
import { GettingDBService } from './getting-db.service';

@Injectable({
  providedIn: 'root'
})
export class GameServicesService {

  constructor(private db: GettingDBService, private message: PopUpComponent) { }

  launchRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // retourne une string en fonction du résultat du lancé de dés
  compareAllDices(dice : number[]): string {
    let result = "none";
    if (this.compareYams(dice)) {
      result = "yams"
    } else if (this.compareSquare(dice)) {
      result = "square"
    } else if (this.comparePair(dice)) {
      result = "duo"
    } else {
      result = "lose"
    }
    console.log(result);
    return result;
  }

  // détermine si le joueur a eux deux paires de dés
  comparePair(dice: number[]) {
    let diceChecked = 0;
    let diceBuffer = [dice[0], dice[1], dice[2], dice[3], dice[4]];

    for (let i = 0; i < diceBuffer.length; i++) {
      for (let j = i + 1; j < diceBuffer.length; j++) {
        if (diceBuffer[i] == diceBuffer[j] && diceBuffer.length > 1
            && diceBuffer[i] != -1 && diceBuffer[j] != -1) {
          diceBuffer[j] = -1;
          diceBuffer[i] = -1;
          diceChecked++;
        }
      }
    }

    if (diceChecked == 2) {
      return true;
    } else {
      return false;
    }
  }

  // détermine si le joueur a eux quatre dés identiques
  compareSquare(dice: number[]) {
    let result = 0;
    let diceBuffer = [dice[0], dice[1], dice[2], dice[3], dice[4]];
    let numberToBe = -2;

    for (let i = 1; i < diceBuffer.length; i++) {
      if (diceBuffer[i] === diceBuffer[0] && diceBuffer[i] != -1) {
        result++;
        numberToBe = diceBuffer[i];
        diceBuffer[i] = -1;
      }
      if (result === 3) {
        return true;
      }
    }
    for (let i = diceBuffer.length - 2; i > 0; i--) {
      if (numberToBe === -2) 
        numberToBe = diceBuffer[diceBuffer.length - 1];
      if (diceBuffer[i] === numberToBe) {
        result++;
        diceBuffer[i] = -1;
      }
      if (result === 3) {
        return true;
      }
    }
    
    return false;
  }

  // détermine si le joueur a eux cinq dés identiques
  compareYams(dice: number[]) {
    let result = 0;
    for (let i = 1; i < dice.length; i++) {
      if (dice[i] === dice[0]) {
        result++;
      }
    }
    if (result === 4) {
      return true;
    } else {
      return false;
    }
  }

  // donne une pâtisseries au hasard
  getWinnedPatries(patries: Patries[], result: string) {
    let timeToRoll = this.getTimeToRoll(result);
    let i = 0;

    if (this.getAllWinnedPastries(patries) < patries.length * 10 - 50) {
      this.message.showMessage("Il n'y à plus de patisseries à gagner");
      return
    }
    
    while (i < timeToRoll) {

      let randomValue = Math.ceil(Math.random() * patries.length)-1;
      let patriesToTake = patries[randomValue];

      if (patries[randomValue].number > 0) {
        let date : string[] = [];

        if (patriesToTake.date) {
          date = patriesToTake.date;
          date.push(this.getActualDate() + " par " + this.getLoggedUserName());
        }
        else
          date.push(this.getActualDate()  + " par " + this.getLoggedUserName());

        let newPatrie = new Patries(
          patriesToTake.name,
          patriesToTake.number - 1,
          patriesToTake.order,
          patriesToTake.date
        );

        this.db.modifyPastrie(newPatrie);
        i++
      } else {
        patries.splice(randomValue, 1);
      }
    }

    if (timeToRoll == 0)
      this.message.showMessage("Vous n'avez pas gagné de pâtisserie");
    else 
      this.message.showMessage("Vous avez gagné " + timeToRoll + " pâtisserie(s)");


  }

  // retourne le nombre de pâtisseries réstante
  getAllWinnedPastries(pastries: Patries[]) {
    // get all patries.number 
    let allPastriesNumber = 0;
    for (let i = 0; i < pastries.length; i++) {
      allPastriesNumber += pastries[i].number;
    }
    return allPastriesNumber; 
  }

  // retourne une valeur en fonction du résultat du lancé de dés
  getTimeToRoll(result: string) {
    let timeToRoll = 0

    switch(result) {
      case "yams": {
        timeToRoll = 3;
        break;
      }
      case "square": {
        timeToRoll = 2;
        break;
      }
      case "duo": {
        timeToRoll = 1;
        break;
      }
      default: {
        break;
      }
    }
    return timeToRoll;
  }

  // retourne la date actuelle
  getActualDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${day}/${month}/${year} à ${this.formatTheValue(hour)}:${this.formatTheValue(minutes)}:${this.formatTheValue(seconds)}`;
  }

  // rajoute un 0 devant un nombre
  formatTheValue(value : number) {
    if (value <= 9) {
      return "0" + value;
    } else {
      return value;
    }
  }

  // récupère le nom de l'utilisateur connecté
  getLoggedUserName() {
    let user = JSON.parse(localStorage.getItem('currentUser')!);

    if (user == null) {
      return "Anonyme"; 
    }
    return user.name;
  }
}
