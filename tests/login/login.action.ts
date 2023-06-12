import { test as base, expect } from '@playwright/test';
import { BaseTest } from 'tests/base';

type LoginFixture = {
    tableTitleClass: string;
    tableTitle: string;
    columnHeader: string[];
};

export const test = base.extend<{ args: LoginFixture }>({
    args: undefined,
    page: async ({ page }, use) => {
        await use(page);
    }
});
export { expect };
export { BaseTest };