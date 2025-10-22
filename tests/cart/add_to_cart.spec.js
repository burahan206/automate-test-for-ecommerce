const { test, expect } = require('@playwright/test');

test('TC12: Add Product to Cart', async ({ page }) => {
    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Products' }).dblclick();
    // ✅ รอให้รายการสินค้าปรากฏก่อน
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.locator('text=Add to cart').first().click();

    //6. Click 'Continue Shopping' button
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    //7. Hover over second product and click 'Add to cart'
    // Hover over second product
    await page.locator('.product-image-wrapper').nth(2).hover();

    //8. Click 'Add to cart' button 

    await page.locator('text=Add to cart').nth(2).click();


    // Click the button

    await page.getByRole('link', { name: 'View Cart' }).click();


    //9. Verify both products are added to Cart
    await expect(page.locator('tr').nth(1).getByText('Blue Top')).toBeVisible();
    await expect(page.locator('tr').nth(2).getByText('Men Tshirt')).toBeVisible();

    //10. Verify their prices, quantity and total price
    await expect(page.locator('#product-1 .cart_price p')).toHaveText('Rs. 500');
    await expect(page.locator('#product-1 .cart_quantity button')).toHaveText('1');
    await expect(page.locator('#product-1 .cart_total p')).toHaveText('Rs. 500');
    await expect(page.locator('#product-2 .cart_price p')).toHaveText('Rs. 400');
    await expect(page.locator('#product-2 .cart_quantity button')).toHaveText('1'); 
    await expect(page.locator('#product-2 .cart_total p')).toHaveText('Rs. 400');
});

test('TC13: Verify Product quantity in Cart after adding same product', async ({ page }) => {
    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole('link', { name: ' Products' }).dblclick();    
    await page.waitForSelector('.product-image-wrapper', { state: 'visible' });
    await page.getByRole('link', { name: ' View Product' }).first().click();
    await page.locator('#quantity').fill('4');
    await page.getByRole('button', { name: ' Add to cart' }).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByRole('button', { name: '4' })).toBeVisible();
});

test('TC22:Add to cart from Recommended items', async ({ page }) => {   

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
      await expect(page.getByRole('heading', { name: 'recommended items' })).toBeVisible();
  await page.locator('.item.active > div:nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.getByRole('link', { name: 'Winter Top' })).toBeVisible();

});
