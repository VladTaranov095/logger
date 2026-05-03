// import { Logger } from "log4js";
// import { createLogger } from "../logger";
import { type Locator, type Page } from '@playwright/test';
import { BasePage } from "./basePage";


export class Api extends BasePage {
    // readonly logger: Logger;
    // readonly page: Page;
    readonly apiButton: Locator;
    readonly apiRequest: Locator;
    // readonly baseUrl: string;

    constructor(page: Page) {

        super(page);
        // this.logger = createLogger('API');
        // this.page = page;
        // this.apiButton = page.getByRole('link', { name: 'API' });
        this.apiButton = page.locator('a :text("API")');
        this.apiRequest = page.locator('li.theme-doc-sidebar-item-link a[href="/docs/api/class-apirequest"]');
        // this.baseUrl = process.env.BASE_URL || 'https://playwright.dev';
    }
    // async goto() {
    //     this.logger.info(`Navigating to: ${this.baseUrl}`);
    //     await this.page.goto(this.baseUrl);
    // }

    // async clickApiButton() {
    //     this.logger.info('Click on Api');
    //     await this.apiButton.click();
    // }

    // async clickApiRequest() {
    //     this.logger.info('Click on ApiRequest');
    //     await this.apiRequest.click();
    // }

    // async checkText(text) {
    //      this.logger.info(`Checking if page contains text: "${text}"`);
    //      const pageText = await this.page.locator('body').textContent();
    //      this.logger.debug(`Try to find text content: "${text}"`);
    //      this.logger.info('Check this page');
    //      expect(pageText, `This page does not contain needed text content: "${text}"`).toContain(text);
    // }
}