<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {{ selectedLabel }}
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a
          v-for="option in options"
          :key="option.value"
          href="#"
          @click.prevent="selectOption(option)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {{ option.label }}
        </a>
      </div>
    </div>

    <!-- Exibir a lista ordenada -->
    <!-- <ul class="mt-4">
      <li v-for="hotel in sortedHotels" :key="hotel.name">
        {{ hotel.name }} - ${{ hotel.price }} - {{ hotel.stars }} Estrelas
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Hotel  } from "../server/api/hotels.types"
import { useCounterStore } from "../stores/listHotels";
const userStore = useCounterStore();


const options = ref([
  { label: 'Menor Preço', value: 'pricePerNight' },
  { label: 'Maior Avaliações', value: 'stars' },
]);

const isOpen = ref(false);
const selectedLabel = ref('Selecione uma opção');
const selectedValue = ref<string | null>(null);

const sortedHotels = ref<Hotel[]>([...userStore.filterHotels]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: { label: string; value: string }) => {
  selectedLabel.value = option.label;
  selectedValue.value = option.value;
  isOpen.value = false;
  sortHotels(option.value);
};

const sortHotels = (value: string) => {
  let sortedHotels = [...userStore.hotelStore];

  if (value === 'pricePerNight') {
    sortedHotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (value === 'stars') {
    sortedHotels.sort((a, b) => b.stars - a.stars);
  }

  userStore.hotelStore = sortedHotels;
};
</script>

<style scoped>
</style>
