const { test, expect } = require('@playwright/test');

test('tc8:VerifyAll Products and Product Details page', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await expect(page.getByText('All Products  Added! Your')).toBeVisible();
    await page.getByRole('link', { name: ' View Product' }).first().click();
    await expect(page).toHaveTitle(/Automation Exercise - Product Details/);
    //Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs.')).toBeVisible();
    await expect(page.getByText('Availability:')).toBeVisible();
    await expect(page.getByText('Condition:')).toBeVisible();
    await expect(page.getByText('Brand:')).toBeVisible();

});

test('TC18: View Category Products', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByText('Category Women Dress Tops')).toBeVisible();
    await page.getByRole('link', { name: ' Women' }).click();
    await page.getByRole('link', { name: 'Dress' }).click();
    await expect(page.getByText('Women - Dress Products ')).toBeVisible();
    await page.getByRole('link', { name: ' Men' }).click();
    await page.getByRole('link', { name: 'Tshirts' }).click();
    await expect(page.getByText('Men - Tshirts Products ')).toBeVisible();

});

test('TC19: View & Cart Brand Products', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByText('Brands')).toBeVisible();
    await page.getByRole('link', { name: '(6) Polo' }).click();
    await page.goto('https://automationexercise.com/brand_products/Polo');
    await expect(page.getByRole('heading', { name: 'Brand - Polo Products' })).toBeVisible();
    await page.getByRole('link', { name: '(5) H&M' }).click();
    await page.getByRole('heading', { name: 'Brand - H&M Products' }).click();      
    await expect(page.getByRole('heading', { name: 'Brand - H&M Products' })).toBeVisible();

});