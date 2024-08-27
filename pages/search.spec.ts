import { ref } from 'vue';
import { describe, it, expect, vi } from 'vitest';

describe('Search', () => {
  it('should fetch hotels and update dataHotels', async () => {
    const $fetch = vi.fn().mockResolvedValue({
      hotels: [{ id: 1, name: 'Hotel Test' }],
    });

    const searchFormData = ref({
      destination: 'Paris',
      checkIn: '2024-09-01',
      checkOut: '2024-09-10',
      rooms: 1,
      guests: 1,
    });

    const dataHotels = ref([]);

    const Search = async () => {
      try {
        const response = await $fetch<{ hotels: any[] }>("/api/hotels", {
          method: "GET",
          params: {
            destination: searchFormData.value.destination,
            checkIn: searchFormData.value.checkIn,
          },
        });
        dataHotels.value = response.hotels;
      } catch (error) {
        console.error("Erro ao buscar hotéis:", error);
      }
    };

    await Search();

    expect($fetch).toHaveBeenCalledWith('/api/hotels', {
      method: 'GET',
      params: {
        destination: 'Paris',
        checkIn: '2024-09-01',
      },
    });

    expect(dataHotels.value).toEqual([{ id: 1, name: 'Hotel Test' }]);
  });

  it('should handle errors during fetch', async () => {
    const $fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const searchFormData = ref({
      destination: 'Paris',
      checkIn: '2024-09-01',
      checkOut: '2024-09-10',
      rooms: 1,
      guests: 1,
    });

    const dataHotels = ref([]);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const Search = async () => {
      try {
        const response = await $fetch<{ hotels: any[] }>("/api/hotels", {
          method: "GET",
          params: {
            destination: searchFormData.value.destination,
            checkIn: searchFormData.value.checkIn,
          },
        });
        dataHotels.value = response.hotels;
      } catch (error) {
        console.error("Erro ao buscar hotéis:", error);
      }
    };

    await Search();

    expect($fetch).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Erro ao buscar hotéis:", expect.any(Error));
    expect(dataHotels.value).toEqual([]);

    consoleErrorSpy.mockRestore();
  });
});





