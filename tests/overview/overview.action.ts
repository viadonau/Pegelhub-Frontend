import { test as base, expect } from '@playwright/test';
import { BaseTest } from 'tests/base';

type OverviewFixture = {
    tableTitleClass: string;
    tableTitle: string;
    columnHeader: string[];
};

export const test = base.extend<{ args: OverviewFixture }>({
    args: {
        tableTitleClass: 'p-card-title',
        tableTitle: 'Pegellieferanten',
        columnHeader: ['Pegellieferant', 'Letzter Wert', 'RNW', 'HSW', 'Letzter Wert von']
    },
    page: async ({ page }, use) => {
        await use(page);
    }
});
export { expect };
export { BaseTest };