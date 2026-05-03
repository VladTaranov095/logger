import { test } from '@playwright/test';
import { Api } from '../PageObject';


test('Check text content on page API @smoke', async ({ page }) => {
    process.env['testId'] = 'API';
    const ApiCheck = new Api(page);
    await ApiCheck.goto();
    await page.pause();
    await ApiCheck.click(ApiCheck.apiButton);
    // await ApiCheck.apiButton.click();
    await ApiCheck.click(ApiCheck.apiRequest);
    await ApiCheck.checkText('Exposes API that can be used for the Web API testing.');
});
