import React, { useState } from 'react';
import data from '../../data/data';
import stopWords from '../../data/stop-words';
import { getDocumentsWithFreq, getMatchingDocuments, getBooks } from '../../utils/Search';
import Books from '../Books/Books';
import Suggestions from '../Suggestions/Suggestions';
import './App.css';

const documents = data.summaries;
const documentsWithFreq = getDocumentsWithFreq(documents, stopWords);
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
    setSelectedBookId(null);
  }

  const onSuggestionSelected = (event) => {
    const bookId = event.target.value;
    setSearchTerm(books[bookId].title);
    setSuggestions([]);
    setSelectedBookId(bookId);
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
            <Suggestions suggestions={suggestions} onSelect={onSuggestionSelected} />
          </div>
          <div>
            <input type="submit" value="Submit" className="submit-box" />
          </div>
        </form>
      </div>
      <Books books={selectedBooks} />
    </div>
  );
}

export default App;
