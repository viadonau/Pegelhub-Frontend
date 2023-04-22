import { BaseTest, expect, test } from './overview.action';

test.beforeEach(async ({ page, args }) => {
  await BaseTest.navigate(page, BaseTest.getConfig().BASE_URL);
  await BaseTest.validateUrl(page, new RegExp(`.*${BaseTest.getConfig().PATH_OVERVIEW}*`));
});

test('is default page', async ({ page }) => {
  await BaseTest.validateUrl(page, new RegExp(`.*${BaseTest.getConfig().PATH_OVERVIEW}*`));
})

test('has table title', async ({ page, args }) => {
  const cardTitle = BaseTest.getElementByClass(page, args.tableTitleClass);

  await (cardTitle.filter({ hasText: args.tableTitle }));
})

test('table has columns', async ({ page, args }) => {
  const columnHeaders = args.columnHeader;
  const columns = BaseTest.getElementByTag(page, 'th');

  await (expect(columns).toHaveCount(columnHeaders.length));

  for (var idx = 0; idx < columnHeaders.length; idx++) {
    await (expect(columns.nth(idx)).toContainText(columnHeaders[idx]));
  }
})

test('data is shown', async ({ page }) => {
  const rows = BaseTest.getElementByTag(page, 'tbody > tr');

  await page.waitForResponse((res) => res.url().includes('/supplier'));
  await expect(await rows.count()).toBe(10);
})