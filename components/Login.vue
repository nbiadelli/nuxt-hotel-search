<template>
  <div class="max-w-md mx-auto mt-20 p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Usuário</label>
        <input v-model="username" id="username" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Digite seu usuário" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
        <input v-model="password" id="password" type="password" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Digite sua senha" />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md">Entrar</button>
    </form>
    <p class="text-red-600 font-bold text-sm mt-4">{{errorMessage}}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    await authStore.login(username.value, password.value);
    router.push('/search');
  } catch (error) {
    errorMessage.value = (error as Error).message;
    console.log("....", errorMessage.value)
  }
};
</script>

