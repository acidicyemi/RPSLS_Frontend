import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guesture } from '../models/pattern.model';
import { GameboardService } from '../services/gameboard.service';

@Component({
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  randChoice:string = ""

  choices: Guesture[] = []
  
  choices$: Observable<Guesture[]> = new Observable<Guesture[]>();

  constructor(private gameService: GameboardService) { }

  ngOnInit(): void {
  }


  getGuestures() {  
    this.choices$ = this.gameService.getGuestures()
  }

  mychoice(id:number) {
    console.log(`number ${id}`)
  }

  getRandChoice(){
    this.gameService.getRandChoice().subscribe(
      (data) => { 
        this.randChoice = data.name
      }
      
    )
  }
}
