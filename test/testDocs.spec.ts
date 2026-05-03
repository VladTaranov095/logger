import { test } from '@playwright/test';
import { Docs } from '../PageObject';

test('Check text content on page Docs @smoke', async ({ page }) => {
  process.env['testId'] = 'Docs';
  const docsCheck = new Docs(page);
  await docsCheck.goto();
  await docsCheck.click(docsCheck.docsButton);
  await docsCheck.click(docsCheck.writingTestTab);
  await docsCheck.checkText("You");
});