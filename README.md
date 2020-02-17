# search-engine

## Preview

![Preview](./preview.gif)

## How to setup

`yarn install && yarn start` this will install all the modules and launch the application in your browser

`yarn test` to run the tests

## Algorithm to find the most relevant documents/summaries

1. Pre-process the documents
    * Tokenize and filter out all the keywords (remove the stopwords such as 'the', 'a', 'an', 'in' etc.).
    * Then find the frequency of all the keywords
2. For any search query
    * Tokenize and filter the keywords, extract only unique keywords
    * Find the sum of frequency of each of the keywords in each document and score each document
    * Sort the documents based on the score and return only the top K results

## Data taken from external sources
Some common [english stop words](https://raw.githubusercontent.com/6/stopwords-json/master/dist/en.json) taken from https://github.com/6/stopwords-json

React setup has been forked from https://github.com/facebook/create-react-app