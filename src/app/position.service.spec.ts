import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from './models/position.model'; // Assurez-vous d'importer l'interface

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_Position = "/positions/reserved";

  constructor(private httpClient: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(this.API_URL + this.ENDPOINT_Position);
  }
}
