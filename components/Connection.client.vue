<script setup>
import { socket } from "./socket";

const isConnected = ref(false);
const transport = ref("N/A");
const message = ref("");
const isLoading = ref(true);

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});

socket.on("StatusReservation", (v) => {
  message.value = v;
});

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-if="isLoading" class="flex flex-col items-center">
      <div
        class="animate-spin rounded-full h-40 w-40 border-t-4 border-blue-600 mb-4"
      ></div>
      <p class="text-blue-600 mt-2" >Processando sua reserva...</p>
    </div>

    <div v-else class="flex flex-col items-center text-green-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-16 h-16 mb-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <p class="text-lg mt-4">{{ message.message }}</p>
      <p class="text-1xl">
        Numero da sua Reserva: <span class="font-bold">{{ message.reservationId }}</span>
      </p>
    </div>
  </div>
</template>
