import express from 'express';
import session from 'express-session'
import defaultRouter from './src/routers/default.routes.js';
import authRouter from './src/routers/auth.routes.js';
import cartRouter from './src/routers/cart.routes.js';

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
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;
    res.locals.name = req.session.name || null;
    next();
});

//routers
app.use("/", defaultRouter);
app.use("/", authRouter);
app.use("/", cartRouter);

//static directories
app.use(express.static('app/public'));


export default app;