export interface Hotel {
    id: number;
    name: string;
    location: string;
    pricePerNight: number;
    availableRooms: number;
    availableDates: string[];
    imageUrl: string;
    distanceFromCenter: string;
    breakfastInfo: string;
    roomType: string;
    bedType: string;
    ratingLabel: string;
    rating: string;
    reviewCount: string;
    stars: number;
  }[]
  
  export interface HotelSearchForm {
    destination: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  }
  