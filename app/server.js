import app from './app.js';
import dotenv from 'dotenv';

//read environment variables
dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})