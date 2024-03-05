import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

// Initialize dotenv
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// Define a simple route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
