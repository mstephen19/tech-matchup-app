const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tech {
    _id: ID
    name: String
  }

  type Matchup {
    _id: ID
    tech1: String
    tech2: String
    tech1_votes: Int
    tech2_votes: Int
  }

  type Query {
    matchups: [Matchup]
    matchup(id: ID!): Matchup
    tech: [Tech]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(id: ID!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
