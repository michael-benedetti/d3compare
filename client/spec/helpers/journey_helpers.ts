import {By, until, WebDriver} from "selenium-webdriver";
import {expect} from "chai";

export async function loadPage(page: WebDriver, pagePath?: string) {
    pagePath = pagePath || "";
    await page.get(`${global.journeyHost}${pagePath}`);
    await page.wait(until.elementLocated(By.css(".App")));
}

export async function pageToContainText(text: string, page: WebDriver) {
    const pageContent = await page.getPageSource();
    expect(pageContent).to.contain(text);
}

export async function elementWithExactText(element: string, text: string, page: WebDriver) {
    return await page.wait(until.elementLocated(By.xpath(`//${element}[text()="${text}"]`)), 3000);
}

export async function fillIn(id: string, text: string, page: WebDriver) {
    const elementHandle = await page.findElement(By.id(id));
    await elementHandle.clear();
    await elementHandle.sendKeys(text);
}