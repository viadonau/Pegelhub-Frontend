import { BaseTest, test } from 'tests/login/login.action';
import { expect } from "@playwright/test";

test.beforeEach(async ({ page, args }) => {
    await BaseTest.navigate(page, BaseTest.getConfig().BASE_URL.concat('/', 'login'));
});

test('should disable next button if no api.key has been entered', async ({ page }) => {
  const nextBtn = BaseTest.button(page, 'Weiter');
  expect(await nextBtn.isDisabled()).toBe(true);
})

test('should perform redirect to overview page after next button has been clicked and api-key is valid', async ({ page }) => {
    const apiKey = page.getByPlaceholder('API Key');
    const nextBtn = BaseTest.button(page, 'Weiter');

    await apiKey.fill('asdf');
    await nextBtn.click();

    await BaseTest.validateUrl(page, new RegExp(`.*${BaseTest.getConfig().PATH_OVERVIEW}*`));
})

test('should show an asterisk inside the api-key input field', async ({ page }) => {
    const asterisk = BaseTest.getElementById(page, 'required-icon');
    await expect(asterisk).toBeVisible();
})

test('should show an appropriate help text if the api-key input does not correspond to the Base64 pattern', async ({ page }) => {
    const apiKey = page.getByPlaceholder('API Key');
    await expect(apiKey).toBeVisible();
})
