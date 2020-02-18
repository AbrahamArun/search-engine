import { getKeyWords, getFrequency, getDocumentsWithFreq, getMatchingDocuments } from './Search';
import data from '../data/data';
import stopWords from '../data/stop-words';

test('should get keywords and exclude all stop words', () => {
    const keywords = getKeyWords('a brain creativity mirror', stopWords);
    expect(keywords[0]).toEqual('brain');
    expect(keywords[2]).toEqual('mirror');
    expect(keywords.length).toBe(3);
});

test('should return a frequency map for all the words', () => {
    const frequency = getFrequency(['foo', 'foo', 'temp', 'dummy']);
    expect(frequency.foo).toBe(2);
    expect(frequency.temp).toBe(1);
    expect(frequency.dummy).toBe(1);
});

test('should return documents with frequency for each', () => {
    const documents = data.summaries;
    const documentsWithFreq = getDocumentsWithFreq(documents, stopWords);
    const book54 = documentsWithFreq.find(document => document.id === 54);

    const frequencyOfChange = book54.frequency['change'];
    const frequencyOfBook = book54.frequency['book'];

    expect(frequencyOfChange).toBe(2);
    expect(frequencyOfBook).toBe(1);
});

test('should find documents for query', () => {
    const query = 'brain creativity mirror';
    const documents = data.summaries;
    const documentsWithFreq = getDocumentsWithFreq(documents, stopWords);
    const matchingDocuments = getMatchingDocuments(query, 1, documentsWithFreq);
    const topDocument = matchingDocuments[0];
    const topDocumentId = topDocument.id;
    expect(topDocumentId).toBe(50);
})