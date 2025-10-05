import { test } from '@playwright/test';
import { Api } from '../PageObject';


test('Check text content on page API', async ({ page }) => {
    process.env['testId'] = 'API';
    const ApiCheck = new Api(page);
    await ApiCheck.goto();
    await ApiCheck.clickApiButton();
    await ApiCheck.clickApiRequest();
    await ApiCheck.checkText('Exposes API that can be used for the Web API testing.');
})