// import { Logger } from "log4js";
// import { createLogger } from "../logger";
import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from "../basePage";


export class Docs extends BasePage {
    // readonly logger: Logger;
    // readonly page: Page;
    readonly docsButton: Locator;
    readonly writingTestTab: Locator;

    constructor(page: Page) {
        super(page);
        // this.logger = createLogger('test');
        // this.page = page;
        this.docsButton = page.locator('//*[@id="__docusaurus"]/nav/div[1]/div[1]/a[2]');
        this.writingTestTab = page.locator('//*[@id="__docusaurus_skipToContent_fallback"]/div/div/aside/div/div/nav/ul/li[1]/ul/li[2]/a');
    }

    // async goto() {
    //     this.logger.info('Successfully navigated to: https://playwright.dev');
    //     await this.page.goto('https://playwright.dev');
    // }

    async clickDocsButton() {
        this.logger.info('Click on Docs');
        await this.docsButton.click();
    }

    async clickWritingTestTab() {
        this.logger.info('Click on Writing Test');
        await this.writingTestTab.click();
    }

//     async checkText(text: string) {
//          this.logger.info(`Checking if page contains text: "${text}"`);
//          const pageText = await this.page.locator('body').textContent();
//          this.logger.debug(`Try to find text content: "${text}"`);
//          this.logger.info('Check this page');
//          expect(pageText, `This page does not contain needed text content: "${text}"`).toContain(text);
// }
}