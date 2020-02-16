const data = require('./data.json');
const stopWords = require('./stop-words.json');

function getKeyWords(text, stopwords) {
    const keywords = text.split(/\W+/).
        map(keyword => keyword.toLowerCase()).
        filter((token) => {
            return token.length >= 2 && stopwords.indexOf(token) == -1;
        });
    return keywords;
}

function getFrequency(keywords) {
    return keywords.reduce((frequency, keyword) => {
        if (!frequency[keyword]) {
            frequency[keyword] = 1;
        } else {
            frequency[keyword] = frequency[keyword] + 1;
        }
        return frequency;
    }, {});
}

function getDocumentsWithFreq(documents, stopWords) {
    const documentsWithFreq = documents.map((document) => {
        const keywords = getKeyWords(document.summary, stopWords);
        const frequency = getFrequency(keywords);
        return { ...document, ...{ frequency } }
    });
    return documentsWithFreq;
}

module.exports = {
    getKeyWords,
    getFrequency,
    getDocumentsWithFreq
};
