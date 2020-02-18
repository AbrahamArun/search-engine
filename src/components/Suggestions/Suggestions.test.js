import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Suggestions from "./Suggestions";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders suggestions", () => {
    const suggestions = [{
        title: 'Book title 1',
        id: 1
    }, {
        title: 'Book title 2',
        id: 2
    }]
    act(() => {
        render(<Suggestions suggestions={suggestions} />, container);
    });
    const firstTitle = document.getElementById(1).textContent;
    const secondTitle = document.getElementById(2).textContent;
    expect(firstTitle).toBe("Book title 1");
    expect(secondTitle).toBe("Book title 2");
})