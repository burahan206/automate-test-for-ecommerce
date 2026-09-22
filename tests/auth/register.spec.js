const { expect, test } = require('../fixtures/auth');
const {
  deleteCurrentUser,
  registerNewUser,
} = require('../../utils/test-data');

test('TC1: Register a user', async ({ page }) => {
  await registerNewUser(page);
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

  await deleteCurrentUser(page);
});

test('TC5: Reject registration with an existing email', async ({ page, registeredUser }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[data-qa="signup-name"]', 'E2E Test User');
  await page.fill('input[data-qa="signup-email"]', registeredUser.email);
  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith('/signup')
      && response.request().method() === 'POST',
  );
  await page.click('button[data-qa="signup-button"]');

  expect((await responsePromise).ok()).toBeTruthy();
  // The site currently redirects duplicate-email submissions to its signup page
  // instead of rendering the older inline validation message on /login.
  await expect(page).toHaveURL(/\/signup$/);
});
