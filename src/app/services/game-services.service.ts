import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameServicesService {

  constructor() { }

  launchRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  compareAllDices(dice : number[]) {
    console.log(dice)
    let result = "none";
    if (this.compareYams(dice)) {
      result = "yams"
    } else if (this.compareSquare(dice)) {
      result = "square"
    } else if (this.comparePair(dice)) {
      result = "duo"
    }
    console.log(dice, result);
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
    console.log("square")
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
}
