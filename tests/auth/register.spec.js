// tests/auth/register.spec.js
const { test,expect } = require('@playwright/test');
const { saveUser } = require('../../utils/test-data');

test('TC1: Register User', async ({ page }) => {
  const email = `user${Date.now()}@example.com`;
  const password = 'Password123';

  await page.goto('http://automationexercise.com');
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', 'John Doe');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await page.check('#id_gender1');
  await page.fill('#password', password);
  await page.selectOption('#days', '10');
  await page.selectOption('#months', '5');
  await page.selectOption('#years', '1990');
  await page.fill('#first_name', 'John');
  await page.fill('#last_name', 'Doe');
  await page.fill('#address1', '123 Main Street');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'California');
  await page.fill('#city', 'Los Angeles');
  await page.fill('#zipcode', '90001');
  await page.fill('#mobile_number', '1234567890');
  await page.click('button[data-qa="create-account"]');

  // บันทึก user ลงไฟล์
  saveUser(email, password);
});

test('tc5: Register User with existing email', async ({ page }) => {
  const existingEmail = 'user25@example.com';

  await page.goto('http://automationexercise.com');
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', 'John Doe');
  await page.fill('input[data-qa="signup-email"]', existingEmail);
  await page.click('button[data-qa="signup-button"]');
  await expect(page.getByText('Email Address already exist!')).toBeVisible();
});