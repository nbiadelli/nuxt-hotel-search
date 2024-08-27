<template>
  <div>
    <slot />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo("/search", { redirectCode: 301 })
    },
  ],
});
</script>