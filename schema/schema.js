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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType, 
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({name: args.name, age: arg.age});
                author = await author.save();
                return author;
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                id: {type: GraphQLID}
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {id: {type: GraphQLID}}
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                author: {type: GraphQLID}
            }
        },
        updateBook: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                id: {type: GraphQLID}
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});