import {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} from "graphql";
import _ from "lodash";

const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: "1", author: "1"},
    {name: 'The Final Empire', genre: 'Fantasy', id: "2", author: "2"},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: "3", author: "3"}
]

const authors = [
    {name: 'Patrick Rothfuss', age: 44, id: "1"},
    {name: 'Brandon Sanderson', age: 42, id: "2"},
    {name: 'Terry Pratchett', age: 66, id: "3"}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.author})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        id: {type: GraphQLID}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType, 
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
});



export default new GraphQLSchema({
    query: RootQuery
});