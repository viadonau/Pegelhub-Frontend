import { Locator, Page, expect } from "@playwright/test";
import { TestConfig } from "./testconfig";

export { TestConfig };
export class BaseTest {
    public static getConfig() {
        return TestConfig;
    }

    private static getElement(page: Page, value: string, prefix = ''): Locator {
        return page.locator(`${prefix}${value}`);
    }

    static getElementById(page: Page, id: string): Locator {
        return this.getElement(page, id, '#');
    }

    static getElementByClass(page: Page, className: string): Locator {
        return this.getElement(page, className, '.');
    }

    static getElementByTag(page: Page, tag: string): Locator {
        return this.getElement(page, tag);
    }

    static validateUrl(page: Page, expectedUrl: RegExp): Promise<void> {
        return expect(page).toHaveURL(expectedUrl);
    }

    static navigate(page: Page, url: string): Promise<void | any> {
        return page.goto(url);
    }
}