<template>
  <div
    class="max-w-6xl mx-auto p-4 bg-white shadow-md rounded-lg h-screen flex flex-col"
  >
    <h2 class="text-xl font-bold mb-4">Reservar Quarto</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Nome</label
        >
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700"
          >Telefone</label
        >
        <input
          v-model="form.phone"
          type="tel"
          id="phone"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Método de Pagamento</label
        >
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              v-model="form.paymentMethods.card"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700">Cartão de Crédito</span>
          </label>
        </div>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              v-model="form.paymentMethods.pix"
              class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700">Pix</span>
          </label>
        </div>
      </div>

      <div v-if="form.paymentMethods.card" class="mb-4">
        <label for="cardNumber" class="block text-sm font-medium text-gray-700"
          >Número do Cartão</label
        >
        <input
          v-model="form.cardNumber"
          type="text"
          id="cardNumber"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Número do cartão"
          required
        />
      </div>

      <div v-if="form.paymentMethods.card" class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            for="cardExpiry"
            class="block text-sm font-medium text-gray-700"
            >Validade</label
          >
          <input
            v-model="form.cardExpiry"
            type="text"
            id="cardExpiry"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MM/AA"
            required
          />
        </div>
        <div>
          <label for="cardCVV" class="block text-sm font-medium text-gray-700"
            >CVV</label
          >
          <input
            v-model="form.cardCVV"
            type="text"
            id="cardCVV"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="CVV"
            required
          />
        </div>
      </div>

      <div v-if="form.paymentMethods.pix" class="mb-4">
        <label for="pixKey" class="block text-sm font-medium text-gray-700"
          >Chave Pix</label
        >
        <input
          v-model="form.pixKey"
          type="text"
          id="pixKey"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Sua chave Pix (CPF, CNPJ, email, etc.)"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reservar
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  phone: "",
  paymentMethods: {
    card: false,
    pix: false,
  },
  cardNumber: "",
  cardExpiry: "",
  cardCVV: "",
  pixKey: "XsaNQdkMkAKjjFgIvx2Z.",
});

const handleSubmit = () => {
  // Lógica para envio do formulário, pode incluir chamada para API de reserva
  console.log("Form data:", form.value);
  // Aqui você pode adicionar a lógica para envio do formulário, como uma requisição para uma API de reservas
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
