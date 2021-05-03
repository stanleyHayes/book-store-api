import {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} from "graphql";
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
            async resolve(parent, args){
                return await Author.findById(parent.author);
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
            async resolve(parent, args){
                return await Book.find({author: parent.id}).populate('author');
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
            async resolve(parent, {id}){
                return await Book.findById(id).populate('author');
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, {id}){
                return await Author.findById(id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args){
                return await Book.find({}).populate('author');
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args){
               return await Author.find({});
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent, args){
                let author = new Author({name: args.name, age: args.age});
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
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                genre: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: new GraphQLNonNull( GraphQLID)}
            },
            async resolve(parent, {name, genre, author}){
                let book = new Book({name, genre, author});
                book = await book.save();
                book = await book.populate({path: 'author'}).execPopulate()
                return book;
            }
        },
        updateBook: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                const updates = Object.keys(args);

            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});