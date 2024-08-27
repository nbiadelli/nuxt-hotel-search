import { beforeEach, vi } from 'vitest';
import { config } from '@vue/test-utils';

beforeEach(() => {
  config.global.mocks = {
    $nuxt: {
      $fetch: vi.fn(),
    },
  };
});
