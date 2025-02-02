export interface Showtime {
    id: number;
    startDate: string;  // Format: YYYY-MM-DD
    startTime: string;  // Format: HH:MM:SS
    ticketPrice: number;
    movie:{
      title:string;
    };
    theater: {
      id: number;
      name: string;
      location: string;
    };
  }
  export interface Movie {
    id: number;
    title: string;
    genre: string;
    duration: number;
    director: string;
    imageUrl: string;
  }
  
  export interface Theater {
    id: number;
    name: string;
    location: string;
    seatCount: number;
    features: string;
    imageUrl: string;
  }