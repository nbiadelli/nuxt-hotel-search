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
}
[];

export interface Reservation {
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
}
{
}

export interface HotelSearchForm {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

export interface PaymentMethods {
  card: boolean;
  pix: boolean;
}

export interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  paymentMethods: PaymentMethods;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  pixKey: string;
  hotel: Object;
}
export interface ReservationResponse {
  success: boolean;
  reservationId: number;
}
