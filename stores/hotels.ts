import { defineStore } from 'pinia';
import type { Hotel, Reservation } from "../server/api/hotels.types"

export const useCounterStore = defineStore('hotelStore', {
  state: () => ({
    hotelStore: [] as Hotel[],
    hotelStoreReservation: {} as Reservation,
  }),
  actions: {
    saveHotels(hotels: Hotel[]) {
      this.hotelStore = hotels;
    },
    saveReservationHotels(reservation: Reservation) {
      this.hotelStoreReservation = reservation;
    },
  },
  getters: {
    filterHotels: (state) => state.hotelStore,
    reservationHotels: (state) => state.hotelStoreReservation,
  },
});
