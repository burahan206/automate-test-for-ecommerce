const { test, expect } = require('@playwright/test');

test('tc9: Search Product', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Men Tshirt');
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible({ timeout: 10000 })

});

test('TC20: Search Product and Verify Cart After Login', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Men Tshirt');
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible();
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.getByText('Add to cart').nth(1).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.fill('input[data-qa="login-email"]', 'user25@example.com');
    await page.fill('input[data-qa="login-password"]', 'Password123');
    await page.click('button[data-qa="login-button"]');
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();

});

