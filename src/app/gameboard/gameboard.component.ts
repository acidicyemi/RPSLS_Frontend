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
  singlePlayer: boolean = false
  p1c: number = 0
  private _baseUrl: string = "http://127.0.0.1:8084"

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
        this.status = `You played ${this.choices[data.player - 1].name} & the computer played ${this.choices[data.computer - 1].name}. You ${data.results} `
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
      },
      (err) => console.log(err),
      () => {
        this.p1c = 0
      }
    )
  }

  ngOnDestroy() {
    // TODO UNSUBSCRIBE
  }

}
