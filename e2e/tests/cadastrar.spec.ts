import { test, expect } from '@playwright/test';

test.describe("Página inicial", () => {
test('Visitar página inicial', async ({ page }) => {
  
  await page.goto("/");
  
  });
});

