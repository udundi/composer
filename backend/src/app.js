import express from 'express';
import cors from 'cors';
import agentsRouter from './routes/agents.js';
import dataRouter from './routes/data.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/agents', agentsRouter);
app.use('/api/data', dataRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));