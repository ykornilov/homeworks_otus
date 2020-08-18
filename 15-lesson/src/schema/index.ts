import { gql } from 'apollo-server';

const typeDef = gql`
    type Query {
        getAllNavigations: [Navigation!]!
        getNavigation(id: Int!): Navigation!
    }

    type Mutation {
        addNavigation(navigation: String!): Navigation!
        updateNavigation(id: Int!, navigation: String!): Navigation!
        deleteNavigation(id: Int!): Navigation!
    }

    type Navigation {
        id: Int!
        navigation: String!
    }
`;

export default typeDef;
