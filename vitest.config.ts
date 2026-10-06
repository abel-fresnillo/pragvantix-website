import 'vitest/config';
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globalSetup: ['tests/build-site.ts'],
  },
});
