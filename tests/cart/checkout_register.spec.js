const { test, expect } = require('@playwright/test');

test('TC14: Place Order: Register while Checkout', async ({ page }) => {

    const email = `user${Date.now()}@example.com`;
    const password = 'Password123';

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.locator('text=Add to cart').first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await page.fill('input[data-qa="signup-name"]', 'test');
    await page.fill('input[data-qa="signup-email"]', email);
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.check('#id_gender1');
    await page.fill('#password', password);
    await page.selectOption('#days', '10');
    await page.selectOption('#months', '5');
    await page.selectOption('#years', '1990');
    await page.fill('#first_name', 'test');
    await page.fill('#last_name', 'test');
    await page.fill('#address1', '123 Main Street');
    await page.selectOption('#country', 'United States');
    await page.fill('#state', 'California');
    await page.fill('#city', 'Los Angeles');
    await page.fill('#zipcode', '90001');
    await page.fill('#mobile_number', '1234567890');
    await page.click('button[data-qa="create-account"]');
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page.getByText('Logged in as test')).toBeVisible();
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await expect(page.getByText('Your delivery address Mr.')).toBeVisible();
    await expect(page.getByText('Your billing address Mr. test')).toBeVisible();
    await page.locator('textarea[name="message"]').fill('test');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').fill('test');
    await page.locator('input[name="card_number"]').fill('1111111111111');
    await page.getByRole('textbox', { name: 'ex.' }).fill('258');
    await page.getByRole('textbox', { name: 'MM' }).fill('12');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('2027');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await expect(page.getByText('Congratulations! Your order')).toBeVisible();
    await page.click('a[href="/delete_account"]');
    await expect(page.locator('h2:has-text("Account Deleted!")')).toBeVisible();
    await page.click('a[data-qa="continue-button"]');
});

test('TC15 : Place Order: Register before Checkout' , async ({ page }) => {

    const email = `user${Date.now()}@example.com`;
    const password = 'Password123';   

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', 'John Doe');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await page.check('#id_gender1');
  await page.fill('#password', password);
  await page.selectOption('#days', '10');
  await page.selectOption('#months', '5');
  await page.selectOption('#years', '1990');
  await page.fill('#first_name', 'John');
  await page.fill('#last_name', 'Doe');
  await page.fill('#address1', '123 Main Street');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'California');
  await page.fill('#city', 'Los Angeles');
  await page.fill('#zipcode', '90001');
  await page.fill('#mobile_number', '1234567890');
  await page.click('button[data-qa="create-account"]');
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText(`Logged in as John`)).toBeVisible();
  await page.waitForSelector('.product-image-wrapper', { state: 'visible' });  
  await page.locator('text=Add to cart').first().click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();    
  await expect(page.getByText('Your delivery address Mr.')).toBeVisible();
  await expect(page.getByText('Your billing address Mr. John')).toBeVisible();
  await page.locator('textarea[name="message"]').fill('test');
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator('input[name="name_on_card"]').fill('John Doe');
  await page.locator('input[name="card_number"]').fill('1111111111111');
  await page.getByRole('textbox', { name: 'ex.' }).fill('258');
  await page.getByRole('textbox', { name: 'MM' }).fill('12');
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2027');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await expect(page.getByText('Congratulations! Your order')).toBeVisible();
  await page.click('a[href="/delete_account"]');
  await expect(page.locator('h2:has-text("Account Deleted!")')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});










