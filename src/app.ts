import express from 'express';
import { router } from './infrastructure/routes/loan-schedule.routes';

const app = express();

const port = 4545;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log('Server running on port', port)
})