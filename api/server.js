const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

const COUNTERS = 'counters';
const PRODUCTS = 'products';

const url = process.env.DB_URL
  || 'mongodb+srv://CS648-Assignment4:CS648-Assignment4@cs648assignment4.0myyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let db;

const uidForDocument = async (name) => {
  const result = await db
    .collection(COUNTERS)
    .findOneAndUpdate(
      { _id: name },
      {
        $inc: { uid: 1 },
        $set: { _id: name },
      },
      { returnOriginal: false, upsert: true },

    );
  return result.value.uid;
};

const productList = async () => db.collection(PRODUCTS).find({}).toArray();

const addProduct = async (_, { product }) => {
  const productInsert = { ...product };
  productInsert.id = await uidForDocument(PRODUCTS);
  const result = await db.collection(PRODUCTS).insertOne(productInsert);
  return db
    .collection(PRODUCTS)
    .findOne({ _id: result.insertedId });
};

const connectToDb = async () => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
};

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    addProduct,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

server.applyMiddleware({ app, path: '/graphql' });

const port = process.env.API_SERVER_PORT || 3000;

const run = async () => {
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log(`API server started at port ${port}`);
    });
  } catch (error) {
    console.log('Error connecting to DB - ', error);
  }
};

run();
