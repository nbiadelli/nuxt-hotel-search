<template>
  <div class="w-full h-full flex flex-col">
    <header
      class="w-full h-20 bg-blue-600 text-white flex items-center justify-between px-8 top-0 left-0"
    >
      <div>
        <h1 class="text-2xl font-bold">O SEU HOTEL.com</h1>
      </div>
      <div v-if="authStore.loginAuthenticated" class="ml-auto">
        <Avatar avatarUrl="http://1.viki.io/a/ph/avatar_profile-acc6c5a5a9d35bd7d292dfd776cfec76.png?s=30x30&f=t&cb=1" />
      </div>
    </header>
  
    <main class="w-full flex-1 mt-10 px-8 mb-8">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();

</script>
