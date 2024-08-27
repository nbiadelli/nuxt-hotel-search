import { ref } from 'vue';
import { describe, it, expect, vi } from 'vitest';

type ReservationForm = {
  name: string;
  email: string;
  phone: string;
  paymentMethods: {
    card: boolean;
    pix: boolean;
  };
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
  pixKey: string;
  hotel: any;
};

type ReservationResponse = {
  success: boolean;
};

describe('handleSubmit', () => {
  it('should submit the form and update bookingConfirmation on success', async () => {
    const form = ref<ReservationForm>({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      paymentMethods: {
        card: true,
        pix: false,
      },
      cardNumber: '4111111111111111',
      cardExpiry: '12/24',
      cardCVV: '123',
      pixKey: 'XsaNQdkMkAKjjFgIvx2Z.',
      hotel: { id: 1, name: 'Hotel Test' },
    });

    const bookingConfirmation = ref(false);

    const $fetch = vi.fn().mockResolvedValue({
      booking: { success: true },
    });

    const handleSubmit = async () => {
      try {
        const response = await $fetch<{ booking: ReservationResponse }>(
          '/api/reservation',
          {
            method: 'POST',
            body: form.value,
          }
        );
        bookingConfirmation.value = response.booking.success;
      } catch (error) {
        console.error('Erro ao realizar reserva:', error);
      }
    };

    await handleSubmit();

    expect($fetch).toHaveBeenCalledWith('/api/reservation', {
      method: 'POST',
      body: form.value,
    });

    expect(bookingConfirmation.value).toBe(true);
  });

  it('should handle errors during submission', async () => {
    const form = ref<ReservationForm>({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      paymentMethods: {
        card: true,
        pix: false,
      },
      cardNumber: '4111111111111111',
      cardExpiry: '12/24',
      cardCVV: '123',
      pixKey: 'XsaNQdkMkAKjjFgIvx2Z.',
      hotel: { id: 1, name: 'Hotel Test' },
    });

    const bookingConfirmation = ref(false);

    const $fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const handleSubmit = async () => {
      try {
        const response = await $fetch<{ booking: ReservationResponse }>(
          '/api/reservation',
          {
            method: 'POST',
            body: form.value,
          }
        );
        bookingConfirmation.value = response.booking.success;
      } catch (error) {
        console.error('Erro ao realizar reserva:', error);
      }
    };

    await handleSubmit();

    expect($fetch).toHaveBeenCalled();
    expect(bookingConfirmation.value).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao realizar reserva:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});

