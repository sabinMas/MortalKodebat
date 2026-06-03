import express from 'express';
import defaultRouter from './src/routers/default.routes.js';

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", "public/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routers
app.use("/", defaultRouter);



export default app;