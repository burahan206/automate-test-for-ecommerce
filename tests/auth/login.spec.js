const { expect, test } = require('../fixtures/auth');
const { createTestUser } = require('../../utils/test-data');

test('TC2: Login with a newly registered account', async ({ page, registeredUser }) => {
  await page.goto('https://automationexercise.com/login');
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  await page.fill('input[data-qa="login-email"]', registeredUser.email);
  await page.fill('input[data-qa="login-password"]', registeredUser.password);
  await page.click('button[data-qa="login-button"]');

  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});

test('TC3: Reject invalid credentials', async ({ page }) => {
  const user = createTestUser();

  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="login-email"]', user.email);
  await page.fill('input[data-qa="login-password"]', 'incorrect-password');
  await page.click('button[data-qa="login-button"]');

  await expect(
    page.locator('p:has-text("Your email or password is incorrect!")'),
  ).toBeVisible();
});
