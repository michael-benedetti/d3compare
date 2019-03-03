import {RenderResult, fireEvent} from "react-testing-library";
import * as fetchMock from "fetch-mock";

export function fillInByTestId(testId: string, text: string, container: RenderResult) {
    const div = container.getByTestId(testId) as HTMLElement;
    const input = div.querySelector("input") as HTMLInputElement;
    input.value = text;
    fireEvent.change(input);
    fireEvent.blur(input);
}

export function fillIn(label: string, text: string, container: RenderResult) {
    const input = container.getByLabelText(label) as HTMLInputElement;
    input.value = text;
    fireEvent.change(input);
    fireEvent.blur(input);
}

export function lastFetchBodyMatches(body: Object) {
    let fetchBody = fetchMock.lastCall()![1]!.body;
    let expectedBody = JSON.stringify(body);
    const match = fetchBody === expectedBody;
    if (!match) {
        throw new Error(`last fetch did not contain expected body: \nFetch:\t    ${fetchBody}\nExpected:\t${expectedBody}`);
    }
    return match;
}
