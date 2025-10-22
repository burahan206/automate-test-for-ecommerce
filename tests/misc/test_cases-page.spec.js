const {test, expect} = require('@playwright/test');

test('tc6: Verify test cases page', async ({page}) => {
    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);  
    await page.getByRole('link', { name: ' Test Cases' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');
});
