import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/post';
import { validateContentType } from './middleware/validator';

dotenv.config();
const app = express();
const port = 3000;

// *************************************************************
// ******************   Configs    *****************************
// *************************************************************

app.use(validateContentType);
app.use(express.json());
app.use('/posts', postRoutes);

// *************************************************************
// ******************   MongoDB    *****************************
// *************************************************************
mongoose
  .connect('mongodb://127.0.0.1/blogapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Could not connect to MongoDB', err));

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
