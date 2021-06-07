import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Guesture, MultiPlayer, Play } from '../models/pattern.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameboardService {
  private _baseURL: string = "https://codechallenge.boohma.com";

  public get baseURL(): string {
    return this._baseURL;
  }

  public set baseURL(value: string) {
    this._baseURL = value;
  }

  constructor(private http: HttpClient) { }

  getGuestures() {
    return this.http.get<Guesture[]>(`${this._baseURL}/choices`).pipe(
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
        } else {
            errorMsg = this.getServerErrorMessage(error);
        }
        console.log(error);

        return throwError(errorMsg);
      })

    )
  }

  getRandChoice() {
    return this.http.get<Guesture>(`${this._baseURL}/choice`);
  }

  playGame(id: number) {
    let data = { "player": id }
    return this.http.post<Play>(`${this._baseURL}/play`, data);
  }

  multiplayer(player1: number, player2: number) {
    let data = { "player1": player1, "player2": player2 }
    return this.http.post<MultiPlayer>(`${this._baseURL}/multiplayer`, data);
  }

  updateBaseUrl(url: string) {
    this.baseURL = url
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        alert(`Not Found: ${error.message}`);
        return `Not Found: ${error.message}`
      }
      case 403: {
        alert(`Access Denied: ${error.message}`);
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        alert(`Internal Server Error: ${error.message}`);
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        alert(`Unknown Server Error: ${error.message}`);
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
