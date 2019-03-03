import {WebDriver} from "selenium-webdriver";

declare global {
  namespace NodeJS {
    interface Global {
      browser: WebDriver;
      journeyHost: string;
    }
  }
}
