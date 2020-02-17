import React from 'react';
import './Books.css';

function Books(props) {
    const renderSelectedBooks = (books) => {
        if (books.length === 0) {
            return <div>No books selected</div>
        }
        const selectedBooks = books.map((book, index) => {
            return (
                <div key={index} className="book-card shadow">
                    <h3 id="book-title">{book.title}</h3>
                    <div id="summary" className="gray-text">{book.summary}</div>
                    <hr className="gray-line" />
                    <div id="author" className="gray-text">{book.author}</div>
                </div>
            )
        })
        return selectedBooks;
    }

    return (
        <div className="selected-books">
            {renderSelectedBooks(props.books)}
        </div>
    );
}

export default Books;
