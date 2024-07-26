import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from './models/position.model';
import {  Reservation } from './models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_Position = "/positions/reserved";
  readonly ENDPOINT_Reserve = "/reservations/reserve"; 
  readonly ENDPOINT_Release = "/reservations/release"; 

  constructor(private httpClient: HttpClient) { }

  getPositions(date?: string): Observable<Position[]> {
    let url = `${this.API_URL}${this.ENDPOINT_Position}`;
    if (date) {
      
     
      url += `?date=${date}`;
    }
    console.log('URL générée :', url);
    return this.httpClient.get<Position[]>(url);
  }

  reservePosition(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${this.API_URL}/reservations/reserve`, reservation);
}



}
