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
