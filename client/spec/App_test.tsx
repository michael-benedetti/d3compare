import * as  React from 'react';
import App from '../src/App';
import {cleanup, render, RenderResult} from "react-testing-library";
import * as fetchMock from "fetch-mock";
import {HttpD3Repository} from "../src/HttpD3Repository";

describe("Home Dashboard", () => {
    let container: RenderResult;

    afterEach(async () => {
        cleanup();
        fetchMock.restore();
    });

    function renderApp(d3Repository = new HttpD3Repository()) {
        container = render(
            <App
              d3Repository={d3Repository}
            />,
        );
    }

    it("renders the app", async () => {
        renderApp();
        await container.getByText("Hi.");
    });
});
