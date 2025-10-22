// utils/test-data.js
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'user.json');

function saveUser(email, password) {
  fs.writeFileSync(dataFile, JSON.stringify({ email, password }));
}

function loadUser() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  
}

export async function registerNewUser(page) {
  const email = `user_${Date.now()}@example.com`;
  const password = '123456';

  await page.goto('https://automationexercise.com');
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', 'TempUser');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');

  await page.fill('input[data-qa="password"]', password);
  await page.fill('input[data-qa="first_name"]', 'Temp');
  await page.fill('input[data-qa="last_name"]', 'User');
  await page.fill('input[data-qa="address"]', '123 Test St');
  await page.fill('input[data-qa="state"]', 'Bangkok');
  await page.fill('input[data-qa="city"]', 'Bangkok');
  await page.fill('input[data-qa="zipcode"]', '10110');
  await page.fill('input[data-qa="mobile_number"]', '0800000000');
  await page.click('button[data-qa="create-account"]');

  await page.waitForSelector('h2:has-text("Account Created!")');
  await page.click('a[data-qa="continue-button"]');
  await page.waitForSelector('a:has-text("Logged in as")', { timeout: 10000 });

  return { email, password };
}

module.exports = { saveUser, loadUser, registerNewUser };
