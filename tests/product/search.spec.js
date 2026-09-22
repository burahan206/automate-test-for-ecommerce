const { expect, test: baseTest } = require('@playwright/test');
const { test: authTest } = require('../fixtures/auth');

baseTest('TC9: Search products', async ({ page }) => {

    await page.goto('https://automationexercise.com/products');
    await expect(page).toHaveURL(/\/products$/);
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Men Tshirt');
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible({ timeout: 10000 })

});

authTest('TC20: Preserve a searched product in the cart after login', async ({ page, registeredUser }) => {

    await page.goto('https://automationexercise.com/products');
    await expect(page).toHaveURL(/\/products$/);
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Men Tshirt');
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Men Tshirt').nth(2)).toBeVisible();
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.getByText('Add to cart').nth(1).click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await page.goto('https://automationexercise.com/view_cart');
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.fill('input[data-qa="login-email"]', registeredUser.email);
    await page.fill('input[data-qa="login-password"]', registeredUser.password);
    await page.click('button[data-qa="login-button"]');
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();

});
