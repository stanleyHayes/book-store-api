import express from "express";
import {graphqlHTTP} from "express-graphql";
import dotenv from "dotenv";

dotenv.config({path: './config/config.env'});
const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({

}));

app.listen(port, () => console.log(`Server connected in ${process.env.NODE_ENV} on port ${port}`));