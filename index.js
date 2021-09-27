import express from 'express';
import memoRouter from './resources/memo/memo.router.js';

const app = express();
//tells express we are accepting json data from the client
app.use(express.json());

app.use('/api/memo', memoRouter);

app.listen(3000, () => {
    //to know when done setting up port
    console.log('server running on port 3000');
});