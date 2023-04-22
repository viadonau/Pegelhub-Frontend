import { test as base, expect } from '@playwright/test';
import { BaseTest } from 'tests/base';

type HeaderFixture = {
    title: string;
    headerLogoName: string;
    headerLogoCount: number;
};

export const test = base.extend<{ args: HeaderFixture }>({
    args: {
        title: 'Pegelhub',
        headerLogoName: 'headerLogo',
        headerLogoCount: 1,
    },
    page: async ({ page }, use) => {
        await use(page);
    }
});
export { expect };
export { BaseTest };