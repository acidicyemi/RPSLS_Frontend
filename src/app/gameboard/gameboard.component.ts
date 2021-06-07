import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guesture } from '../models/pattern.model';
import { GameboardService } from '../services/gameboard.service';

@Component({
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, OnDestroy {

  randChoice: string = "";
  status: string = "";
  singlePlayer: boolean = true
  p1c: number = 0
  private _baseUrl: string = "https://codechallenge.boohma.com"

  choices: Guesture[] = [];

  constructor(private gameService: GameboardService) { }

  ngOnInit(): void {
  }
  get baseURL(): string {
    return this._baseUrl;
  }
  
  set baseURL(val: string) {
    this._baseUrl = val;
    this.gameService.updateBaseUrl(val)
  }

  getGuestures() {
    this.gameService.getGuestures().subscribe(
      (data) => {
        console.log(data);
        this.choices = data
      },
      (err) => console.log(err),
      () => console.log("completed")
    )
  }

  mychoice(id: number) {
    this.gameService.playGame(id).subscribe(
      (data) => {
        console.log(data, this.choices);
        this.status = `You played ${this.choices[data.player - 1].name} & the computer played ${this.choices[data.computer - 1].name}. You ${data.results}`
        // save score to localStorage
        let player = 0
        let computer = 0
        if (data.results == "tie") return;
        if (data.results == "win") {
          player = 1
        }else {
          computer = 1
        }
        let v = localStorage.getItem("singleScore")
        var values = JSON.parse(`${v}`);

        if(values != null) {
          player = values.player + player
          computer = values.computer + computer
        }
        localStorage.setItem('singleScore', JSON.stringify({"player": player, "computer": computer}))
      },
      (err) => console.log(err),
      () => console.log("completed")
    )
  }

  getRandChoice() {
    this.gameService.getRandChoice().subscribe(
      (data) => {
        this.randChoice = data.name
      },
      (err) => console.log(err),
      () => console.log("completed")
    )
  }

  multiplayer(id: number) {
    this.gameService.multiplayer(this.p1c, id).subscribe(
      (data) => {
        this.status = `player1 played ${this.choices[data.player1 - 1]?.name} & the player2 played ${this.choices[data.player2 - 1]?.name}. Player1 ${data.results}`
        let player1 = 0
        let player2 = 0
        if (data.results == "tie") return;
        if (data.results == "win") {
          player1 = 1
        }else {
          player2 = 1
        }
        let v = localStorage.getItem("multiPlayerScore")
        var values = JSON.parse(`${v}`);

        if(values != null) {
          player1 = values.player1 + player1
          player2 = values.player2 + player2
        }
        localStorage.setItem('multiPlayerScore', JSON.stringify({"player1": player1, "player2": player2}))
      },
      (err) => console.log(err),
      () => {
        this.p1c = 0
      }
    )
  }

  ngOnDestroy() {
    
  }

  showScore(){
    if(this.singlePlayer) {
      let v = localStorage.getItem("singleScore")
      var values = JSON.parse(`${v}`);
      if(values != null) {
        console.log(values)
        alert(`player : ${values.player}, computer: ${values.computer}`)
        return
      }
      alert(`player : 0, computer: 0`)
      return
    }
    let v = localStorage.getItem("multiPlayerScore")
    var values = JSON.parse(`${v}`);
    if(values != null) {
      console.log(values)
      alert(`player1 : ${values.player1}, player2: ${values.player2}`)
      return;
    }
    alert(`player1 : 0, player2: 0`)
    return
  }

  clearScore(){
    if (this.singlePlayer) {
      localStorage.setItem('singleScore', JSON.stringify({"player": 0, "computer": 0}))
      return
    }
    localStorage.setItem('multiPlayerScore', JSON.stringify({"player1": 0, "player2": 0}))
  }

}
