const { test, expect } = require('@playwright/test');

test('tc8:VerifyAll Products and Product Details page', async ({ page }) => {

    await page.goto('https://automationexercise.com/products');
    await expect(page).toHaveURL(/\/products$/);
    await expect(page).toHaveTitle(/Automation Exercise - All Products/);
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    await page.goto('https://automationexercise.com/product_details/1');
    await expect(page).toHaveURL(/\/product_details\/1$/);
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

    await page.goto('https://automationexercise.com/category_products/1');
    await expect(page).toHaveURL(/\/category_products\/1$/);
    await expect(page.getByRole('heading', { name: 'Women - Dress Products' })).toBeVisible();
    await page.goto('https://automationexercise.com/category_products/3');
    await expect(page).toHaveURL(/\/category_products\/3$/);
    await expect(page.getByRole('heading', { name: 'Men - Tshirts Products' })).toBeVisible();

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
