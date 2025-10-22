// tests/auth/login.spec.js
const { test, expect } = require('@playwright/test');
const { loadUser } = require('../../utils/test-data');

test('TC2: Login with registered account', async ({ page }) => {
  const { email, password } = loadUser();
   // 1. Launch browser & Navigate
  await page.goto('http://automationexercise.com');
  // 2. Verify home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);
  // 3. Click on 'Signup / Login' button        
  await page.click('a[href="/login"]');
  // 4. Verify 'Login to your account' is visible
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
  // 5. Enter email and password
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);
  // 6. Click 'Login' button      
  await page.click('button[data-qa="login-button"]');
  // 7. Verify that 'Logged in as username' is visible    
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });
  // 8. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');
  // 9. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.locator('h2:has-text("Account Deleted!")')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');   

});


test('TC 3: Login User with Incorrect Email and Password', async ({ page }) => {
  // 1. Launch browser & Navigate
  await page.goto('http://automationexercise.com');

  // 2. Verify home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 3. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 4. Verify 'Login to your account' is visible
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  // 5. Enter email and password
  await page.fill('input[data-qa="login-email"]', 'user25@example.com');
  await page.fill('input[data-qa="login-password"]', 'WrongPassword');

  // 6. Click 'Login' button
  await page.click('button[data-qa="login-button"]');

  // 7. Verify 'Your email or password is incorrect!' is visible
  await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();
});

