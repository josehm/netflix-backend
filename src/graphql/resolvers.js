import queries from './queries'
import mutations from './mutations'
import types from './types'

const resolvers = {
    Query: queries,
    Mutation: mutations,
    ...types
};

export default resolvers;