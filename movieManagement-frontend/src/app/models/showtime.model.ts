export interface Showtime {
    id: number;
    startDate: string;  // Format: YYYY-MM-DD
    startTime: string;  // Format: HH:MM:SS
    ticketPrice: number;
    theater: {
      id: number;
      name: string;
      location: string;
    };
  }
  