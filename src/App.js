import React, { useState } from 'react';
import data from './data.json';
import stopWords from './stop-words.json';
import { getDocumentsWithFreq, getMatchingDocuments } from './api';
import './App.css';


const documents = data.summaries;
const documentsWithFreq = getDocumentsWithFreq(documents, stopWords);

function getBooks(data) {
  return data.authors.reduce((books, author) => {
    const bookId = author.book_id;
    books[bookId] = {
      author: author.author,
      title: data.titles[bookId],
      summary: data.summaries.find(summary => summary.id === bookId)
    };
    return books;
  }, {});
}

const books = getBooks(data);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleChange = event => {
    const queryString = event.target.value;
    const matchingDocuments = getMatchingDocuments(queryString, 5, documentsWithFreq);
    const suggestions = matchingDocuments.map((doc) => {
      return {
        id: doc.id, ...books[doc.id]
      }
    });

    setSearchTerm(queryString);
    setSuggestions(suggestions);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const isBookAlreadySelected = selectedBooks.find(book => book.id === selectedBookId);

    if (!isBookAlreadySelected) {
      selectedBooks.push({
        id: selectedBookId,
        ...books[selectedBookId]
      });
    }
    setSearchTerm('');
    setSuggestions([]);
    setSelectedBooks(selectedBooks);
    setSelectedBookId(null)

  }

  const onSuggestionSelected = (event) => {
    const bookId = event.target.value;
    setSearchTerm(books[bookId].title);
    setSuggestions([])
    setSelectedBookId(bookId);
  }

  const renderSelectedBooks = (books) => {
    if (books.length === 0) {
      return <div>No books selected</div>
    }
    const selectedBooks = books.map((book, index) => {
      return (
        <div key={index}>
          {book.title}
        </div>
      )
    })
    return selectedBooks;
  }

  const renderSuggestions = (books) => {
    const titles = books.map((book, index) => {
      return (
        <li className={"sugestion"} key={index} onClick={onSuggestionSelected} value={book.id}>
          {book.title}
        </li>
      )
    })

    return (
      <ul className="suggestions">
        {titles}
      </ul>
    );
  }

  return (
    <div className="App">
      <h1>Search books</h1>
      <div className="search-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              className="input-box"
            />
            {renderSuggestions(suggestions)}
          </div>
          <div>
            <input type="submit" value="Submit" className="submit-box" />
          </div>
        </form>
      </div>
      <div className="selected-books">
        {renderSelectedBooks(selectedBooks)}
      </div>
    </div>
  );
}

export default App;
