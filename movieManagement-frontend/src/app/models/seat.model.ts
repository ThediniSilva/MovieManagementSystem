export interface Seat {
    id: number;
    seatNumber: string;
    reserved: boolean;
     // Add this property
  selected?: boolean; // Optional property to track selection status
  }
  