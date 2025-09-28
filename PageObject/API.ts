import { createLogger } from "../logger";
import { expect, type Locator, type Page } from '@playwright/test';
const logger = createLogger('test');

    export class Api {
        readonly page: Page;
        readonly apiButton: Locator;
        readonly apiRequest: Locator;
        readonly baseUrl: string;

        constructor(page: Page) {

            this.page = page;
            this.apiButton = page.locator('//*[@id="__docusaurus"]/nav/div[1]/div[1]/a[3]');
            this.apiRequest = page.locator('//*[@id="__docusaurus_skipToContent_fallback"]/div/div/aside/div/div/nav/ul/li/ul/li[3]/ul/li[1]/a');
            this.baseUrl = process.env.BASE_URL || 'https://playwright.dev';
        }

        async goto() {
            logger.info(`Navigating to: ${this.baseUrl}`);
            await this.page.goto(this.baseUrl);
        }

        async clickApiButton() {
            logger.info('Click on Api');
            await this.apiButton.click();
        }

        async clickApiRequest() {
            logger.info('Click on ApiRequest');
            await this.apiRequest.click();
        }

        

        async checkAPIText(text) {
             logger.info(`Checking if page contains text: "${text}"`);
             const pageText = await this.page.locator('body').textContent();
             logger.debug(`Try to find text content: "${text}"`);
             logger.info('Check this page');
             expect(pageText, `This page does not contain needed text content: "${text}"`).toContain(text);
        }

    }