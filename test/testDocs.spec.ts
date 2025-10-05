const { test, expect } = require('@playwright/test');
const { Docs } = require('../PageObject');

test('Check text content on page Docs', async ({ page }) => {
  process.env['testId'] = 'Docs';
  const docsCheck = new Docs(page);
  await docsCheck.goto();
  await docsCheck.clickDocsButton();
  await docsCheck.clickWritingTestTab();
  await docsCheck.checkText("You");
});