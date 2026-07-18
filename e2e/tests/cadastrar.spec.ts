import { test, expect } from '@playwright/test';

test('Visitar página inicial', async ({ page }) => {
  

  await page.goto('/');
  

});

