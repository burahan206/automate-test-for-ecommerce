const {test, expect} = require('@playwright/test');

test('TC10:Verify Subscription in home page', async ({page}) => {
      
    await page.goto('http://automationexercise.com');       
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByText('Subscription')).toBeVisible();
    await page.locator('#susbscribe_email').fill('test@example.com');   
    await page.locator('#subscribe').click();          
    await expect(page.getByText('You have been successfully')).toBeVisible();

});

test('TC11:Verify Subscription in Cart page', async ({page}) => {
      
    await page.goto('http://automationexercise.com/view_cart');       
    await expect(page).toHaveTitle(/Automation Exercise - Checkout/);
    await expect(page.getByText('Subscription')).toBeVisible();
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.locator('#susbscribe_email').fill('test@example.com');   
    await page.locator('#subscribe').click();          
    await expect(page.getByText('You have been successfully')).toBeVisible();       
});