import { Logger } from "log4js";
import { createLogger } from "../logger";
import { expect, Page } from '@playwright/test';


export abstract class BasePage{
    readonly logger: Logger;
    protected readonly page: Page;
    readonly baseUrl: string;

    constructor(page:Page){
        this.logger = createLogger(this.constructor.name + " ");
        this.page = page;
        this.baseUrl = process.env.BASE_URL || 'https://playwright.dev';    
    }

    async goto(): Promise<void> {
        this.logger.info(`Navigating to: ${this.baseUrl}`);
        await this.page.goto(this.baseUrl);
    }

    async checkText(text: string) {
             this.logger.info(`Checking if page contains text: "${text}"`);
             const pageText = await this.page.locator('body').textContent();
             this.logger.debug(`Try to find text content: "${text}"`);
             this.logger.info('Check this page');
             expect(pageText, `This page does not contain needed text content: "${text}"`).toContain(text);
    }

}
 
