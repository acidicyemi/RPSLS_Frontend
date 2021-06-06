import { OnDestroy } from '@angular/core';
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
  status:string = "";

  choices: Guesture[] = [];

  constructor(private gameService: GameboardService) { }

  ngOnInit(): void {
  }


  getGuestures() {
    this.gameService.getGuestures().subscribe(
      (data) => {
        console.log(data);
        this.choices =   data
      },
      (err) => console.log(err),
      () => console.log("completed")
    )
  }

  mychoice(id: number) {
    this.gameService.playGame(id).subscribe(
      (data) => {
        console.log(data, this.choices);
        this.status =   `You played ${this.choices[data.player-1].name} & the computer played ${this.choices[data.computer-1].name}. You ${data.results} `
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

  ngOnDestroy() {
    // TODO UNSUBSCRIBE
  }

}
