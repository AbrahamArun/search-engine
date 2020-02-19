import stopWords from '../data/stop-words';

// Utility to extract only useful terms from a text input
export function getKeyWords(text, stopwords) {
    const keywords = text.split(/\W+/)
        .map(keyword => keyword.toLowerCase())
        .filter((token) => {
            return token.length >= 2 && stopwords.indexOf(token) === -1;
        });
    return keywords;
}

// Return the frequency of each keyword in a map
export function getFrequency(keywords) {
    return keywords.reduce((frequency, keyword) => {
        if (!frequency[keyword]) {
            frequency[keyword] = 1;
        } else {
            frequency[keyword] = frequency[keyword] + 1;
        }
        return frequency;
    }, {});
}

// Utility to get the term frequency of each keyword mapped to each document
export function getDocumentsWithFreq(documents, stopWords) {
    const documentsWithFreq = documents.map((document) => {
        const keywords = getKeyWords(document.summary, stopWords);
        const frequency = getFrequency(keywords);
        return { ...document, ...{ frequency } }
    });
    return documentsWithFreq;
}

export function getMatchingDocuments(query, N, documents) {
    const keywords = [...new Set(getKeyWords(query, stopWords))];
    // Calculate the score for each document
    const length = documents.length;
    const relevantDocuments = [];
    for (let i = 0; i < length; i++) {
        const document = documents[i];
        // Calculate the score for a document
        let totalFrequency = 0;
        const numKeywords = keywords.length;
        for (let j = 0; j < numKeywords; j++) {
            const keyword = keywords[j];
            if (document.frequency[keyword]) {
                totalFrequency = totalFrequency + document.frequency[keyword];
            }
        }
        if (totalFrequency > 0)
            relevantDocuments.push({ ...document, ...{ score: totalFrequency } })
    }
    // Sort in descending order of score
    relevantDocuments.sort((a, b) => { return b.score - a.score })
    // return only the top N results
    relevantDocuments.slice(0, N);
    return relevantDocuments;
}

// Utility to collate books data from the sample data
export function getBooks(data) {
    return data.authors.reduce((books, author) => {
        const bookId = author.book_id;
        books[bookId] = {
            author: author.author,
            title: data.titles[bookId],
            summary: data.summaries.find(summary => summary.id === bookId).summary
        };
        return books;
    }, {});
}
