// require('dotenv').config({path:'./env'})

// import mongoose from  "mongoose";
// import { DB_NAME } from "./constants";
import dotenv from "dotenv";
import {connectDB,disconnectDB} from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen( 8000, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Failed!!!", err);
  });

  const gracefulShutdown = () => {
    disconnectDB()
      .then(() => {
        console.log('Server shutting down');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error during disconnection:', err);
        process.exit(1);
      });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

/*



import express from "express";
const app=express()

;(async()=>{
   try {
    await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
      console.log("ERR:",error);
      throw error
    })

  app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on ${process.env.PORT}`)
  })

   } catch (error) {
       console.log(error)
       throw error
   }
})() */
