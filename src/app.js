import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";



const app= express()


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  Credential:true
}))


// ye kuch configurations required hai i.e middlewareFunctions
//Middleware functions are a powerful feature of Express.js that allow you to modularize and organize your code effectively. By using middleware, you can handle tasks such as logging, authentication, parsing request bodies, handling errors, and much more in a clean and maintainable way.


app.use(express.json({limit:"16kb"}))//Built-in Middleware
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))//Built-in Middleware
app.use(cookieParser())//Third-Party Middleware


//middleware in Express.js like a series of checkpoints or steps that your request goes through before it gets a final response. Each checkpoint can look at the request, make changes to it, and decide whether to pass it on to the next checkpoint or end the process by sending a response back to the client.
// Do something with the request (like check if the user is logged in).
// Add or change information in the request.
// Send a response right away and stop the process.
// Pass control to the next middleware function.



// routes import
import {router}  from "./routes/user.routes.js"

// routes declaration

app.use("/api/v1/users",router)


export {app}