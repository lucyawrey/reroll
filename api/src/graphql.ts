import express from "express";
import serverless from "serverless-http";
import { connect, Schema } from "mongoose";

const main = async () => {
  // create mongoose connection
  const mongoose = await connect(
    process.env.MONGO_CONNECTION_STRING!, 
    {useNewUrlParser: true, useUnifiedTopology: true}
  );
  await mongoose.connection;

  const Character = new Schema({
    name: String
  })
  
  const CharacterModel = mongoose.model("character", Character);
  
  
  // Sets up a graphql server at /graphql
  const app = express();

  app.get("/", async (req, res) => {
    const chars = await CharacterModel.find({})
    res.send(chars);
  })

  module.exports.handler = serverless(app);
};

main().catch((error)=>{
  console.log(error, 'error');
})