const { expect, test } = require('../fixtures/auth');

test('TC16: Place an order after login', async ({ page, registeredUser }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.click('a[href="/login"]');
    await page.fill('input[data-qa="login-email"]', registeredUser.email);
    await page.fill('input[data-qa="login-password"]', registeredUser.password);
    await page.click('button[data-qa="login-button"]');
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: ' Products' }).dblclick();
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.locator('text=Add to cart').first().click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await page.goto('https://automationexercise.com/view_cart');
    //Verify that cart page is displayed
    await expect(page).toHaveURL(/\/view_cart$/);
    await page.getByText('Proceed To Checkout').click();
    await expect(page.locator('#address_delivery')).toContainText('E2E User');
    await expect(page.locator('#address_invoice')).toContainText('E2E User');
    await page.locator('textarea[name="message"]').fill('test');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').fill('test');
    await page.locator('input[name="card_number"]').fill('1111111111111');
    await page.getByRole('textbox', { name: 'ex.' }).fill('258');
    await page.getByRole('textbox', { name: 'MM' }).fill('12');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('2027');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await expect(page.getByText('Congratulations! Your order')).toBeVisible();
});
