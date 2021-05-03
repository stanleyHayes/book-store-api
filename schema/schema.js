import {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} from "graphql";
import Book from "../models/book.js";
import Author from "../models/author.js";

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        id: {type: GraphQLID},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {author: parent.id});
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType, 
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
               
            }
        }
    }
});



export default new GraphQLSchema({
    query: RootQuery
});