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
    page.once('dialog', async dialog => {
    console.log(dialog.message()); // แสดงข้อความ alert
    await dialog.accept(); // กด OK
});
    await page.getByRole('button', { name: 'Submit' }).click();

     await expect(page.locator('#contact-page').getByText('Success! Your details have')).toBeVisible();({ timeout: 10000 });
    await page.getByRole('link', { name: ' Home' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/');
});
