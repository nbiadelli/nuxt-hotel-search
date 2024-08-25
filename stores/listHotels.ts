import { defineStore } from 'pinia';
import type { Hotel } from "../server/api/hotels.types"

export const useCounterStore = defineStore('hotelStore', {
  state: () => ({
    hotelStore: [] as Hotel[],
  }),
  actions: {
    saveHotels(hotels: Hotel[]) {
      this.hotelStore = hotels;
    },
    reservationHotels(reservation: Hotel[]) {
      this.hotelStore = reservation;
    },
  },
  getters: {
    filterHotels: (state) => state.hotelStore,
  },
});
