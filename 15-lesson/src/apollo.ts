import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import typeDefs from './schema';
import resolvers from './resolvers';
import { IServices } from './@types/services';

export const createApolloServer = (services: IServices): ApolloServer => {
    const schema: GraphQLSchema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    const DEV = process.env.NODE_ENV === 'development';

    return new ApolloServer({
        schema,
        playground: DEV,
        introspection: DEV,
        context: () => ({services}),
    });
};
