import { describe, it, expect, vi } from 'vitest';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

describe('handleSubmit', () => {
  it('should login successfully and navigate to /search', async () => {
    const router = { push: vi.fn() };
    (useRouter as vi.Mock).mockReturnValue(router);

    const authStore = { login: vi.fn().mockResolvedValue(null) };
    (useAuthStore as vi.Mock).mockReturnValue(authStore);

    const username = ref('testuser');
    const password = ref('password');
    const errorMessage = ref('');

    const handleSubmit = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push('/search');
      } catch (error) {
        errorMessage.value = (error as Error).message;
      }
    };

    await handleSubmit();

    expect(authStore.login).toHaveBeenCalledWith('testuser', 'password');
    expect(router.push).toHaveBeenCalledWith('/search');
    expect(errorMessage.value).toBe('');
  });

  it('should handle login failure and set errorMessage', async () => {
    const router = { push: vi.fn() };
    (useRouter as vi.Mock).mockReturnValue(router);

    const authStore = {
      login: vi.fn().mockRejectedValue(new Error('Login failed')),
    };
    (useAuthStore as vi.Mock).mockReturnValue(authStore);

    const username = ref('testuser');
    const password = ref('password');
    const errorMessage = ref('');

    const handleSubmit = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push('/search');
      } catch (error) {
        errorMessage.value = (error as Error).message;
      }
    };

    await handleSubmit();

    expect(authStore.login).toHaveBeenCalledWith('testuser', 'password');
    expect(router.push).not.toHaveBeenCalled();
    expect(errorMessage.value).toBe('Login failed');
  });
});

