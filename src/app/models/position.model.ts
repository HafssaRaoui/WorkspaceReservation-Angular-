export interface Reservation {
  reservationId: number;
  details: string;
}

export interface Position {
  id: number;
  numero: string;
  reservations: Reservation[]; // Ajouter la liste des réservations
}
