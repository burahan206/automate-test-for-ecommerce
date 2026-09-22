const { test, expect } = require('@playwright/test');


test('TC 17: Remove Item from Cart', async ({ page }) => {  

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.locator('text=Add to cart').first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    const removeButton = page.locator('.cart_quantity_delete');
    await removeButton.click();
    await expect(removeButton).toHaveCount(0);

});


