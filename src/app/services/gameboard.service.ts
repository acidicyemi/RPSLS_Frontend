import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guesture, Play } from '../models/pattern.model';

@Injectable({
  providedIn: 'root'
})
export class GameboardService {
  baseURL: string = "http://127.0.0.1:8084"
  constructor(private http: HttpClient) { }

  getGuestures() {
    return this.http.get<Guesture[]>(`${this.baseURL}/choices`);
  }
  
  getRandChoice(){
    return this.http.get<Guesture>(`${this.baseURL}/choice`);
  }
  
  playGame(id:number){
    let data = {"player": id}
    return this.http.post<Play>(`${this.baseURL}/play`, data);
  }
}
