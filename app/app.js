import express from 'express';
import defaultRouter from './src/routers/default.routes.js';

//configure Express.js app
const app = express();


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//view engine
app.set("view engine", "ejs");
app.set("views", "app/public/views");


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", defaultRouter);

//static directories
app.use(express.static('app/public'));


export default app;