import { Reservation } from "./reservation.model";

export interface Position {
  id: number;
  numero: string;
  reservations: Reservation[]; 
}
