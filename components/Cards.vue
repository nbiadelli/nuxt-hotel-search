<template>
    <div class="border rounded-lg shadow-sm p-4 bg-white flex space-x-4">
      <pre>{{hotel}}</pre>
      <div class="relative w-60 h-60">
        <img
          :src="imageUrl"
          alt="Hotel image"
          class="rounded-lg w-full h-full object-cover"
        />
        <span
          v-if="breakfastIncluded"
          class="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md"
        >
          Café da manhã incluído
        </span>
      </div>
  
      <div class="flex flex-col justify-between flex-grow">
        <div>
          <h3 class="text-lg font-semibold">{{ hotelName }}</h3>
          <div class="text-sm text-gray-600">
            {{ location }} • {{ distanceFromCenter }}
          </div>
          <div class="mt-2 text-green-700 font-semibold">
            Deseja pagar em 3x? Esta acomodação aceita parcelamento em reservas a partir de R$ 0.
          </div>
          <div class="mt-1 text-gray-800">
            <p class="font-bold">{{ roomType }}</p>
            <p>{{ bedType }}</p>
            <p class="text-green-600">{{ breakfastInfo }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4">
          <div>
            <span class="text-xl font-bold text-gray-800">R$ {{ price }}</span>
            <p class="text-sm text-gray-600">Impostos e taxas incluídos</p>
          </div>
          <button v-if="!buttonVisible" class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">
            Reservar
          </button>
        </div>
      </div>
  
      <div class="flex flex-col items-end justify-between">
        <div class="text-yellow-500">
          <span v-for="star in stars" :key="star" class="text-lg">★</span>
        </div>
        <div class="text-right">
          <span class="block text-gray-700 font-bold">{{ ratingLabel }}</span>
          <span class="block text-lg font-semibold text-blue-600">{{ rating }}</span>
          <span class="block text-gray-600 text-sm">{{ reviewCount }} avaliações</span>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HotelCard',
    props: {
      imageUrl: {
        type: String,
        required: true
      },
      hotelName: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      distanceFromCenter: {
        type: String,
        required: true
      },
      breakfastIncluded: {
        type: Boolean,
        default: false
      },
      roomType: {
        type: String,
        required: true
      },
      bedType: {
        type: String,
        required: true
      },
      breakfastInfo: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      ratingLabel: {
        type: String,
        required: true
      },
      rating: {
        type: String,
        required: true
      },
      reviewCount: {
        type: String,
        required: true
      },
      stars: {
        type: Number,
        required: true
      },
      buttonVisible: {
        type: Boolean,
        required: false
      },
      
    }
  });
  </script>
    