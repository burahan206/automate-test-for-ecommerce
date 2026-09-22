const { test, expect } = require('@playwright/test');

test('TC25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('SUBSCRIPTION')).toBeVisible();
    await page.locator('#scrollUp').evaluate((element) => element.click());
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100);
});

test('TC26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('SUBSCRIPTION')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100);
});
