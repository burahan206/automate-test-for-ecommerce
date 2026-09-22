const { test: base, expect } = require('@playwright/test');
const {
  deleteCurrentUser,
  registerNewUser,
} = require('../../utils/test-data');

const test = base.extend({
  registeredUser: async ({ page }, use) => {
    const user = await registerNewUser(page);

    await page.click('a[href="/logout"]');
    await expect(page).toHaveURL(/\/login$/);

    try {
      await use(user);
    } finally {
      const deleteLink = page.locator('a[href="/delete_account"]');
      if (await deleteLink.isVisible()) {
        await deleteCurrentUser(page);
      }
    }
  },
});

module.exports = { expect, test };
