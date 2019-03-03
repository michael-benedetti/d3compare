import {WebDriver} from "selenium-webdriver";
import {
    loadPage,
    pageToContainText
} from "../helpers/journey_helpers";
import {forIt} from "../helpers";

describe("D3 Compare", async () => {
    let page: WebDriver;

    before(async () => {
        page = await global.browser;
        await page.get(`${global.journeyHost}`);
    });

    it("loads the dashboard homepage", async () => {
        await loadPage(page);
        await forIt(200);
        await pageToContainText("Hi.", page);
    });
});
