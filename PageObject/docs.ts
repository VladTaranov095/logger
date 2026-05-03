// import { Logger } from "log4js";
// import { createLogger } from "../logger";
import { type Locator, type Page } from '@playwright/test';
import { BasePage } from "./basePage";


export class Docs extends BasePage {
    // readonly logger: Logger;
    // readonly page: Page;
    readonly docsButton: Locator;
    readonly writingTestTab: Locator;

    constructor(page: Page) {
        super(page);
        // this.logger = createLogger('test');
        // this.page = page;
        this.docsButton = page.getByRole('link', { name: 'Docs' });
        this.writingTestTab = page.locator('li.theme-doc-sidebar-item-link a[href="/docs/writing-tests"]');
    }

    // async goto() {
    //     this.logger.info('Successfully navigated to: https://playwright.dev');
    //     await this.page.goto('https://playwright.dev');
    // }

    //  async clickDocsButton() {
    //     await this.click(this.docsButton, 'Docs Button');
    // }

    // async clickWritingTestTab() {
    //     await this.click(this.writingTestTab, 'Writing Test Tab');
    // }

    // async clickDocsButton() {
    //     this.logger.info('Click on Docs');
    //     await this.docsButton.click();
    // }

    // async clickWritingTestTab() {
    //     this.logger.info('Click on Writing Test');
    //     await this.writingTestTab.click();
    // }

    //     async checkText(text: string) {
    //          this.logger.info(`Checking if page contains text: "${text}"`);
    //          const pageText = await this.page.locator('body').textContent();
    //          this.logger.debug(`Try to find text content: "${text}"`);
    //          this.logger.info('Check this page');
    //          expect(pageText, `This page does not contain needed text content: "${text}"`).toContain(text);
    // }
}