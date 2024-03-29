import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB("mongodb+srv://ntagungiraali:ntagungiraali@dallecluster.cqwcnea.mongodb.net/");
    app.listen(port, 
      () => console.log('Server started on port 5000'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
