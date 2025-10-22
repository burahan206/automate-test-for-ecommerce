const { test, expect } = require('@playwright/test');

test('TC21:Add review on product', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await page.getByRole('link', { name: ' View Product' }).first().click();
    await expect(page).toHaveTitle(/Automation Exercise - Product Details/);
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await page.locator('a[href="#reviews"]').click();
    await expect(page.getByText('Write Your Review')).toBeVisible();
    await page.getByRole('textbox', { name: 'Your Name' }).fill('test');
    await page.getByRole('textbox', { name: 'Email Address', exact: true  }).fill('test@example.com');
    await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('test');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thank you for your review.')).toBeVisible();
});