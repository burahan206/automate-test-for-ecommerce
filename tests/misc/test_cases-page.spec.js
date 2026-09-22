const {test, expect} = require('@playwright/test');

test('tc6: Verify test cases page', async ({page}) => {
    await page.goto('https://automationexercise.com/test_cases');
    await expect(page).toHaveURL(/\/test_cases$/);
    await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
});
