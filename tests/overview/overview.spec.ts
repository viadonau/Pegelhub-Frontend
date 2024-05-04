import { BaseTest, expect, test } from 'tests/overview/overview.action';

test.beforeEach(async ({ page, args }) => {
  await BaseTest.navigate(page, BaseTest.getConfig().BASE_URL.concat('/', 'login'));

  await BaseTest.getElementById(page, 'api-key-input').fill('asdf');
  await BaseTest.getElementById(page, 'next-btn').click();

  await BaseTest.validateUrl(page, new RegExp(`.*${BaseTest.getConfig().PATH_OVERVIEW}*`));
});

test('select table view', async ({page})=> {
  const tableView = (await BaseTest.getElementByTag(page, 'p-selectbutton').all()).at(0);
  await tableView?.click();

  const table = BaseTest.getElementByTag(page, 'table');
  await expect(table).toBeVisible();
})

test('select grid view', async ({page})=> {
  const cardView = (await BaseTest.getElementByTag(page, 'p-selectbutton').all()).at(1);
  await cardView?.click();

  const cards = BaseTest.getElementById(page, 'cardContainer');
  await expect(cards).toBeVisible();
})

test('select map view', async ({page})=> {
  const mapView = (await BaseTest.getElementByTag(page, 'p-selectbutton').all()).at(2);
  await mapView?.click();

  const map = BaseTest.getElementById(page, 'positionMap');
  await expect(map).toBeVisible();
})

test('has table title', async ({ page, args }) => {
  const cardTitle = BaseTest.getElementByClass(page, args.tableTitleClass);

  cardTitle.filter({hasText: args.tableTitle});
})

test('table has columns', async ({ page, args }) => {
  const tableView = (await BaseTest.getElementByTag(page, 'p-selectbutton').all()).at(0);
  await tableView?.click();

  const columnHeaders = args.columnHeader;
  const columns = BaseTest.getElementByTag(page, 'th');

  await (expect(columns).toHaveCount(columnHeaders.length));

  for (let idx = 0; idx < columnHeaders.length; idx++) {
    await (expect(columns.nth(idx)).toContainText(columnHeaders[idx]));
  }
})

test('table data is shown', async ({ page }) => {
  //await page.waitForResponse((res) => res.url().includes('/supplier'));

  await (await BaseTest.getElementByTag(page, 'p-selectbutton').all()).at(0)?.click();
  const rows = BaseTest.getElementByTag(page, 'tbody > tr');

  expect(await rows.count()).toBeGreaterThan(0);
})

test('grid data is shown', async ({ page }) => {
  //await page.waitForResponse((res) => res.url().includes('/supplier'));

  await (await BaseTest.getElementByTag(page, 'p-selectbutton').all()).at(1)?.click();
  const rows = BaseTest.getElementByTag(page, '#cardContainer > div');

  expect(await rows.count()).toBeGreaterThan(0);
})
