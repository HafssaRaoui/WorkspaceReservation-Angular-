import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from './models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_Position = "/positions/reserved";

  constructor(private httpClient: HttpClient) { }

  getPositions(date?: string): Observable<Position[]> {
    let url = `${this.API_URL}${this.ENDPOINT_Position}`;
    if (date) {
      
     
      url += `?date=${date}`;
    }
    console.log('URL générée :', url);
    return this.httpClient.get<Position[]>(url);
  }

 
}

