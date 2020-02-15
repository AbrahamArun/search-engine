const data = require('./data.json');
const stopWords = require('./stop-words.json');
const { getKeyWords, getFrequency } = require('./api');

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