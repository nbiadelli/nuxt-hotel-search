<template>
  <SearchForm
    :onSearch="searchHotels"
    :toggleHotelSelection="toggleHotelSelection"
    :listHotel="dataHotels"
    @update:form="handleFormUpdate"
  ></SearchForm>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import type { Hotel, HotelSearchForm } from "../server/api/hotels.types";

const searchFormData = ref<HotelSearchForm>({
  destination: "",
  checkIn: "",
  checkOut: "",
  rooms: 1,
  guests: 1,
});

const dataHotels = ref<Hotel[]>();

onMounted(() => {
  searchHotels();
});

const handleFormUpdate = (form: HotelSearchForm) => {
  searchFormData.value = form;
};

const toggleHotelSelection = (hotel: Hotel) => {
  const fhotel = dataHotels.value?.find(x => x.id === hotel.id);
  if (fhotel) {
    fhotel.selected = !fhotel.selected;
  }
}

const searchHotels = async () => {
  try {
    const response = await $fetch<{ hotels: Hotel[] }>("/api/hotels", {
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
</script>
