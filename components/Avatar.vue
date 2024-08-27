<template>
  <div class="relative" @click="toggleMenu">
    <div class="flex items-center space-x-2 cursor-pointer">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="w-10 h-10 rounded-full object-cover"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        :class="{ 'transform rotate-180': isOpen }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
    >
      <ul class="py-1">
        <li>
          <button
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { navigateTo } from "nuxt/app";

const authStore = useAuthStore();

const props = defineProps<{
  avatarUrl: string;
}>();

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const logout = () => {
  !authStore.loginExit
  isOpen.value = false;
  navigateTo("/login");
};
</script>

