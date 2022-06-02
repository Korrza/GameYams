import { Injectable } from '@angular/core';
import { Patries } from 'src/Models/Patries.models';
import { GettingDBService } from './getting-db.service';

@Injectable({
  providedIn: 'root'
})
export class GameServicesService {

  constructor(private db: GettingDBService) { }

  launchRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  compareAllDices(dice : number[]): string {
    console.log(dice)
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
    return result;
  }

  comparePair(dice: number[]) {
    let result = 0;
    let diceChecked = 0;
    for (let i = 0; i < dice.length; i++) {
      for (let j = i + 1; j < dice.length; j++) {
        if (dice[i] === dice[j]) {
          if (dice[i] != diceChecked) {
            result++
          }
          diceChecked = dice[j];
        }
        if (result === 2) {
          return true;
        }
      }
    }
    if (result >= 2) {
      return true;
    } else {
      return false;
    }
  }

  compareSquare(dice: number[]) {
    let result = 0;
    for (let i = 1; i < dice.length; i++) {
      if (dice[i] === dice[0]) {
        result++;
        console.log(result)
      }
      if (result === 3) {
        return true;
      }
    }
    for (let i = dice.length - 2; i > 0; i--) {
      if (dice[i] === dice[dice.length - 1]) {
        result++;
        console.log(result)
      }
      if (result === 3) {
        return true;
      }
    }
    
    return false;
  }

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

  getWinnedPatries(patries: Patries[], result: string) {
    let timeToRoll = this.getTimeToRoll(result);
    let i = 0;
    
    while (i < timeToRoll) {

      console.log(patries.length)
      let randomValue = Math.ceil(Math.random() * patries.length)-1;
      let patriesToTake = patries[randomValue];

      if (patriesToTake.number > 0) {
        let date : string[] = [];

        if (patriesToTake.date) {
          date = patriesToTake.date;
          date.push(this.getActualDate());
        }
        else
          date.push(this.getActualDate());

        let newPatrie = new Patries(
          patriesToTake.name,
          patriesToTake.number - 1,
          patriesToTake.order,
          patriesToTake.date
        );

        this.db.modifyPastrie(newPatrie);
        i++
      } else {
        // remove patriesToTake from the list
        patries.splice(randomValue, 1);
        console.log(",test,",patries.length);
      }
    }
  }

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

  getActualDate() {
    let date = new Date();
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
}
