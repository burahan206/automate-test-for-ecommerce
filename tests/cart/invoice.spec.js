const { test, expect } = require('@playwright/test');

test('TC24: Download Invoice after purchase order', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await page.click('a[href="/login"]');
    await page.fill('input[data-qa="signup-name"]', 'John Doe');
    await page.fill('input[data-qa="signup-email"]', `user${Date.now()}@example.com`);
    await page.click('button[data-qa="signup-button"]');
    await page.check('#id_gender1');
    await page.fill('#password', 'Password123');
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
    await expect(page.getByText('Logged in as John Doe')).toBeVisible();
    await page.getByRole('link', { name: ' Products' }).dblclick();
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.locator('text=Add to cart').first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveURL(/\/view_cart$/);
    await page.getByText('Proceed To Checkout').click();
    await expect(page.locator('#address_delivery').getByText('John Doe')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('Main Street')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('Los Angeles')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('California')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('90001')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('United States')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('1234567890')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('John Doe')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('Main Street')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('Los Angeles')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('California')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('90001')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('United States')).toBeVisible();
    await expect(page.locator('#address_invoice').getByText('1234567890')).toBeVisible();
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').fill('test');
    await page.locator('input[name="card_number"]').fill('1111111111111');
    await page.getByRole('textbox', { name: 'ex.' }).fill('258');
    await page.getByRole('textbox', { name: 'MM' }).fill('12');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('2027');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'Download Invoice' }).click(),
    ]);

    // ตรวจสอบชื่อไฟล์
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('invoice'); // ชื่อไฟล์ควรมีคำว่า invoice

    // ตรวจว่าไฟล์ถูกสร้างใน temp folder แล้ว
  const filePath = await download.path();
  expect(filePath).not.toBeNull();

  console.log('✅ Invoice downloaded successfully');

});