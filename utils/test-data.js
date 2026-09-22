const BASE_URL = 'https://automationexercise.com';

function createTestUser() {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    email: `e2e-${id}@example.com`,
    password: 'Password123',
  };
}

async function registerNewUser(page, user = createTestUser()) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[data-qa="signup-name"]', 'E2E Test User');
  await page.fill('input[data-qa="signup-email"]', user.email);
  await page.click('button[data-qa="signup-button"]');

  await page.check('#id_gender1');
  await page.fill('#password', user.password);
  await page.selectOption('#days', '10');
  await page.selectOption('#months', '5');
  await page.selectOption('#years', '1990');
  await page.fill('#first_name', 'E2E');
  await page.fill('#last_name', 'User');
  await page.fill('#address1', '123 Test Street');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'California');
  await page.fill('#city', 'Los Angeles');
  await page.fill('#zipcode', '90001');
  await page.fill('#mobile_number', '1234567890');
  await page.click('button[data-qa="create-account"]');

  await page.locator('h2:has-text("Account Created!")').waitFor();
  await page.click('a[data-qa="continue-button"]');
  await page.locator('a:has-text("Logged in as")').waitFor();

  return user;
}

async function deleteCurrentUser(page) {
  await page.click('a[href="/delete_account"]');
  await page.locator('h2:has-text("Account Deleted!")').waitFor();
  await page.click('a[data-qa="continue-button"]');
}

module.exports = {
  BASE_URL,
  createTestUser,
  deleteCurrentUser,
  registerNewUser,
};
