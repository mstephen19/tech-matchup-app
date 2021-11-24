import { gql } from '@apollo/client';

export const QUERY_MATCHUPS = gql`
  query getMatchups {
    matchups {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const QUERY_TECH = gql`
  query getTech {
    tech {
      _id
      name
    }
  }
`;

export const MUTATION_MATCHUP = gql`
  mutation createMatchup($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      tech1
      tech2
    }
  }
`;
