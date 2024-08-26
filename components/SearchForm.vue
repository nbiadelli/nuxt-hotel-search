<template>
  <div
    class="max-w-6xl mx-auto p-4 bg-white shadow-md rounded-lg h-screen flex flex-col"
  >
    <div class="sticky top-0 bg-white z-10">
      <h2 class="text-xl font-bold mb-4">Pesquisar Hotéis</h2>
      <form @submit.prevent="searchHotels">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px] mb-4 relative">
            <label
              for="destination"
              class="block text-sm font-medium text-gray-700"
              >Destino</label
            >
            <input
              v-model="form.destination"
              id="destination"
              type="text"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Destino"
            />
            <button
              v-if="form.destination"
              type="button"
              @click="clearForm"
              class="items-center absolute top-1/2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div class="flex-1 min-w-[120px] mb-4">
            <label for="checkIn" class="block text-sm font-medium text-gray-700"
              >Check-in</label
            >
            <input
              v-model="form.checkIn"
              id="checkIn"
              type="date"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex-1 min-w-[120px] mb-4">
            <label
              for="checkOut"
              class="block text-sm font-medium text-gray-700"
              >Check-out</label
            >
            <input
              v-model="form.checkOut"
              id="checkOut"
              type="date"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex-1 min-w-[80px] mb-4">
            <label for="rooms" class="block text-sm font-medium text-gray-700"
              >Quartos</label
            >
            <input
              v-model="form.rooms"
              id="rooms"
              type="number"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="1"
            />
          </div>
          <div class="flex-1 min-w-[80px] mb-4">
            <label for="guests" class="block text-sm font-medium text-gray-700"
              >Hóspedes</label
            >
            <input
              v-model="form.guests"
              id="guests"
              type="number"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="1"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
          >
            Pesquisar
          </button>
        </div>
      </form>
    </div>

    <div class="flex-1 overflow-y-auto mt-4">
      <div
        class="flex flex-col items-end justify-between mt-4 mb-4"
        v-if="userStore.hotelStore.length"
      >
        <Filter />
      </div>
      <div
        v-for="(item, index) in userStore.hotelStore"
        :key="index"
        class="mb-4"
      >
        <div class="flex items-start">
          <input
            type="checkbox"
            :value="item"
            @change="toggleHotelSelection(item)"
            class="mr-2"
          />
          <Cards
            :imageUrl="item.imageUrl"
            :hotelName="item.name"
            :location="item.location"
            :distanceFromCenter="item.distanceFromCenter"
            :roomType="item.roomType"
            :bedType="item.bedType"
            :breakfastInfo="item.breakfastInfo"
            :price="item.pricePerNight"
            :ratingLabel="item.ratingLabel"
            :rating="item.rating"
            :reviewCount="item.reviewCount"
            :stars="item.stars"
            @click="reservationItem(item)"
          />
        </div>
      </div>
    </div>

    <div
      v-if="selectedHotels.length > 0"
      class="mt-6 bg-gray-100 p-4 rounded-lg"
    >
      <h3 class="text-lg font-bold mb-4">Comparar Hotéis Selecionados</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(hotel, index) in selectedHotels"
          :key="index"
          class="bg-white p-4 shadow rounded"
        >
          <h4 class="text-md font-semibold mb-2">
            <span class="font-bold">{{ hotel.name }}</span>
          </h4>
          <p>
            Localização: <span class="font-bold">{{ hotel.location }}</span>
          </p>
          <p>
            Preço por Noite:
            <span class="font-bold">{{ hotel.pricePerNight }}</span>
          </p>
          <p>
            Tipo de Quarto: <span class="font-bold">{{ hotel.roomType }}</span>
          </p>
          <p>
            Avaliação:
            <span class="font-bold"
              >{{ hotel.reviewCount }} {{ hotel.rating }} ({{
                hotel.reviewCount
              }}
              avaliações)</span
            >
          </p>
          <button
            @click="reservationItem(hotel)"
            class="bg-blue-600 text-white font-semibold px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from 'nuxt/app';
import { useCounterStore } from "../stores/hotels";
import type {
  Hotel,
  HotelSearchForm,
  Reservation,
} from "../server/api/hotels.types";

const userStore = useCounterStore();

const form = ref<HotelSearchForm>({
  destination: "",
  checkIn: "",
  checkOut: "",
  rooms: 1,
  guests: 1,
});

const selectedHotels = ref<Hotel[]>([]);

const searchHotels = async () => {
  try {
    const response = await $fetch<{ hotels: Hotel[] }>("/api/hotels", {
      method: "GET",
      params: {
        destination: form.value.destination,
        checkIn: form.value.checkIn,
        // checkOut: form.value.checkOut,
        // rooms: form.value.rooms,
        // guests: form.value.guests,
      },
    });
    saveListHotel(response.hotels);
  } catch (error) {
    console.error("Erro ao buscar hotéis:", error);
  }
};

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
  userStore.saveReservationHotels(saveHotel);
  navigateTo('/reservation')
};

const saveListHotel = (hotels: Hotel[]) => {
  userStore.saveHotels(hotels);
};

const clearForm = () => {
  form.value.destination = "";
};
</script>
