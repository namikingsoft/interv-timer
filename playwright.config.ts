import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: '**/e2e/*.test.ts',
}

export default config
