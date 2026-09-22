const { test, expect } = require('@playwright/test');

test('TC21:Add review on product', async ({ page }) => {

    await page.goto('https://automationexercise.com/products');
    await expect(page).toHaveURL(/\/products$/);
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await page.goto('https://automationexercise.com/product_details/1');
    await expect(page).toHaveURL(/\/product_details\/1$/);
    await expect(page).toHaveTitle(/Automation Exercise - Product Details/);
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await page.locator('a[href="#reviews"]').click();
    await expect(page.getByText('Write Your Review')).toBeVisible();
    await page.locator('#name').fill('test');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#review').fill('test');
    await page.locator('#button-review').click();
    await expect(page.getByText('Thank you for your review.')).toBeVisible();
});
