// tests/auth/logout.spec.js
const { test, expect } = require('@playwright/test');

test('TC4: Logout User', async ({ page }) => {
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
    await page.fill('input[data-qa="login-password"]', 'Password123');              
    // 6. Click 'Login' button
    await page.click('button[data-qa="login-button"]');
    // 7. Verify that 'Logged in as username' is visible
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });
    // 8. Click 'Logout' button
    await page.click('a[href="/logout"]');
    // 9. Verify that user is navigated to login page
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
});

