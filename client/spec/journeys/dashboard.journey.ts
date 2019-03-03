import {WebDriver} from "selenium-webdriver";
import {
    elementWithExactText,
    fillIn,
    loadPage,
    pageToContainText
} from "../helpers/journey_helpers";
import {forIt} from "../helpers";

describe("Home Dashboard", async () => {
    let page: WebDriver;

    before(async () => {
        page = await global.browser;
        await page.get(`${global.journeyHost}/reseed/testFixtures`);
    });

    it("loads the dashboard homepage", async () => {
        await loadPage(page);
        await forIt(200);
        await pageToContainText("First Test Todo", page);
    });

    it("allows the user to add a new todo to the todo list", async () => {
        await fillIn("newTodoInput", "Second Test Todo", page);
        const newTodoButton = await elementWithExactText("button", "New Todo", page);
        await newTodoButton.click();

        await elementWithExactText("div", "Second Test Todo", page);
    });
});
