import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Books from "./Books";

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

it("renders a book", () => {
    const book = {
        title: 'Book title',
        summary: 'This contains the summary of the book',
        author: 'Author'
    }

    act(() => {
        render(<Books books={[book]} />, container);
    });
    const title = document.getElementById('book-title').textContent;
    const summary = document.getElementById('summary').textContent;
    const author = document.getElementById('author').textContent;
    expect(title).toBe("Book title");
    expect(summary).toBe("This contains the summary of the book");
    expect(author).toBe("Author");
})