<template>
  <div class="w-full h-full flex flex-col">
    <header
      class="w-full h-20 bg-blue-600 text-white flex items-center pl-8 top-0 left-0"
    >
      <h1 class="text-2xl font-bold">O SEU HOTEL.com</h1>
    </header>

    <main class="w-full flex-1 pt-24 px-8 mb-8">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>
