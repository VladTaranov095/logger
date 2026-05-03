import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  
  // CI специфичные настройки
  retries: 2,
  workers: 1,
  fullyParallel: false,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['line']
  ],
  
  use: {
    ...baseConfig.use,
    headless: true,
    trace: 'on-first-retry',
  },
});