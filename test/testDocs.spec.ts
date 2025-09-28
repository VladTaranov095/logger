const { test, expect } = require('@playwright/test');
const { Docs } = require('../PageObject');
process.env['testId'] = "aad";
test('Check text content on page Docs', async ({ page }) => {
  const docsCheck = new Docs(page);
  await docsCheck.goto();
  await docsCheck.clickDocsButton();
  await docsCheck.clickWritingTestTab();
  await docsCheck.checkDcosText("You");
});