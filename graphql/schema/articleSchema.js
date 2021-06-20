const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Article {
        _id: ID!
        title: String!
        body: String!
        createdAt: String!
        updatedAt: String!
    }

    input ArticleInput {
        title: String!
        body: String!
    }

    input ArticleId {
        _id: ID!
    }

    input ArticleUpdate {
        _id: ID!
        title: String!
        body: String!
    }
    
    type Query {
        articles: [Article!]
    }

    type Mutation {
        createArticle(article:ArticleInput): Article
        deleteArticle(article:ArticleId): Article
        updateArticle(article:ArticleUpdate): Article
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)