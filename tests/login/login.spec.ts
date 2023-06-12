import { BaseTest, test } from 'tests/login/login.action';

test.beforeEach(async ({ page, args }) => {
    await BaseTest.navigate(page, BaseTest.getConfig().BASE_URL.concat('/', 'login'));
});

test('trigger login without data', async ({ page }) => {
    await (await BaseTest.getElementById(page, 'btnLogin')).click();
    await BaseTest.validateUrl(page, new RegExp(`.*${BaseTest.getConfig().PATH_OVERVIEW}*`));
})

test('trigger login with data', async ({ page }) => {
    await (await BaseTest.getElementById(page, 'apiKeyInp')).fill('asdf');
    await (await BaseTest.getElementById(page, 'btnLogin')).click();

    await BaseTest.validateUrl(page, new RegExp(`.*${BaseTest.getConfig().PATH_OVERVIEW}*`));
})