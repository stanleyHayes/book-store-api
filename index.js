import express from "express";
import {graphqlHTTP} from "express-graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";

import schema from "./schema/schema.js";

dotenv.config({path: './config/config.env'});

mongoose.connect(process.env.MONGODB_URI, {useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology:true})
    .then((data) => {
        console.log(`Successfully connected to mongodb on ${data.connection.host} and database ${data.connection.db.databaseName}`);
    }).catch(error => {
        console.log(`Error: ${error.message}`);
    });

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => console.log(`Server connected in ${process.env.NODE_ENV} on port ${port}`));