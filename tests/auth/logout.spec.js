const { expect, test } = require('../fixtures/auth');

test('TC4: Logout a registered user', async ({ page, registeredUser }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', registeredUser.email);
  await page.fill('input[data-qa="login-password"]', registeredUser.password);
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

  await page.click('a[href="/logout"]');

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
});
