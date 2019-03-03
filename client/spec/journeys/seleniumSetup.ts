import {Builder} from "selenium-webdriver";
import {Options} from "selenium-webdriver/firefox";

process.env.NODE_ENV = "test";

const globalVariables = {browser: global.browser};

before(async () => {
  global.journeyHost = "http://localhost:8080";

  global.browser = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(new Options()
      .headless()
      .windowSize({width: 1440, height: 900})
    )
    .build();
});

// close browser and reset global variables
after(async () => {
  global.browser.close();
  global.browser = globalVariables.browser;
});
