# search-engine

## Algorithm to find the most relevant documents/summaries

1. Pre-process the documents
    * Tokenize and filter out all the keywords (remove the stopwords such as 'the', 'a', 'an', 'in' etc.).
    * Then find the frequency of all the keywords
2. For any search query
    * Tokenize and filter the keywords, extract only unique keywords
    * Find the sum of frequency of each of the keywords in each document and score each document
    * Sort the documents based on the score and return only the top K results
