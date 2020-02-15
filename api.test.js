const data = require('./data.json');
const stopWords = require('./stop-words.json');
const { getKeyWords } = require('./api');

test('should get keywords and exclude all stop words', () => {
    const keywords = getKeyWords('a brain creativity mirror', stopWords);
    expect(keywords[0]).toEqual('brain');
    expect(keywords[2]).toEqual('mirror');
    expect(keywords.length).toBe(3);
});