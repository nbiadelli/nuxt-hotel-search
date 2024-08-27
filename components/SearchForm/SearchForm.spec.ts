import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useCounterStore } from '../../stores/hotels';
import { navigateTo } from 'nuxt/app';
import type { Hotel, Reservation } from '../../server/api/hotels.types';

vi.mock('nuxt/app', () => ({
  navigateTo: vi.fn(),
}));

vi.mock('../stores/hotels', () => ({
  useCounterStore: vi.fn(() => ({
    saveReservationHotels: vi.fn(),
  })),
}));

describe('Component Functions', () => {
  // Mock data
  const selectedHotels = ref<Hotel[]>([]);
  const form = ref({ destination: '' });

  const toggleHotelSelection = (hotel: Hotel) => {
    const index = selectedHotels.value.findIndex(
      (selected) => selected.id === hotel.id
    );
    if (index === -1) {
      selectedHotels.value.push(hotel);
    } else {
      selectedHotels.value.splice(index, 1);
    }
  };

  const reservationItem = (saveHotel: Reservation) => {
    const userStore = useCounterStore();
    userStore.saveReservationHotels(saveHotel);
    navigateTo("/reservation");
  };

  const clearForm = () => {
    form.value.destination = "";
  };

  it('should save the reservation and navigate to /reservation', () => {
    const hotel: Hotel = { id: 1, name: 'Hotel Test' } as Reservation;

    const mockSaveReservation = vi.fn();
    const mockNavigate = vi.fn();
    (useCounterStore as any).mockReturnValue({
      saveReservationHotels: mockSaveReservation,
    });
    (navigateTo as any).mockImplementation(mockNavigate);

    const reservation: Reservation = hotel as Reservation;

    reservationItem(reservation);

    expect(mockSaveReservation).toHaveBeenCalledWith(reservation);
    expect(mockNavigate).toHaveBeenCalledWith('/reservation');
  });

  it('should clear the destination field in form', () => {
    form.value.destination = 'Test Destination';
    clearForm();
    expect(form.value.destination).toBe('');
  });
});
