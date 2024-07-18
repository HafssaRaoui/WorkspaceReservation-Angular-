export interface Reservation {
  reservationId: number;
  details: string;
  userId : number;
  first_name: String;
  last_name: String;
}

export interface Position {
  id: number;
  numero: string;
  reservations: Reservation[]; // Ajouter la liste des réservations
}
