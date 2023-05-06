import { BaseTest, expect, test } from 'tests/header/header.action';

test.beforeEach(async ({ page }) => {
    await BaseTest.navigate(page, BaseTest.getConfig().BASE_URL);
})

test('has title', async ({ page, args }) => {
    await expect(page).toHaveTitle(args.title);
})

test('has logo', async ({ page, args }) => {
    await expect(BaseTest.getElementById(page, args.headerLogoName)).toHaveCount(args.headerLogoCount);
})