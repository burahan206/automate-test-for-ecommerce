const {test, expect} = require('@playwright/test');

test('tc6: Contact Us Form', async ({page}) => {
   
    await page.goto('http://automationexercise.com');   
    await expect(page).toHaveTitle(/Automation Exercise/);  
    await page.click('a[href="/contact_us"]');
    await expect(page.locator('h2:has-text("Get In Touch")')).toBeVisible();
    await page.fill('input[data-qa="name"]', 'John Doe');
    await page.fill('input[data-qa="email"]', 'john@example.com');
    await page.getByRole('textbox', { name: 'Subject' }).fill('test');
    await page.fill('textarea[data-qa="message"]', 'Hello, this is a test message.');

    await page.setInputFiles('input[type="file"]', {
    name: 'dummy.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('This is a dummy file generated in memory.')
  });
    const responsePromise = page.waitForResponse(
      (response) => response.url().endsWith('/contact_us')
        && response.request().method() === 'POST',
    );
    await page.getByRole('button', { name: 'Submit' }).click();
    expect((await responsePromise).ok()).toBeTruthy();
});
