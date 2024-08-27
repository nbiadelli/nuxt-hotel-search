import { defineStore } from 'pinia';
import type { Reservation } from "../server/api/hotels.types"

export const useCounterStore = defineStore('hotelStore', {
  state: () => ({
    hotelStoreReservation: {} as Reservation,
  }),
  actions: {
    saveReservationHotels(reservation: Reservation) {
      this.hotelStoreReservation = reservation;
    },
  },
  getters: {
    reservationHotels: (state) => state.hotelStoreReservation,
  },
});
