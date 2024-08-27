export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  if (to.path === "/reservation" && !authStore.loginAuthenticated) {
    return navigateTo("/login", { redirectCode: 301 });
  }
});
