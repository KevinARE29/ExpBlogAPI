import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/post';
import { validateContentType } from './middleware/validator';
import { generateResponse } from './utils/utils';

dotenv.config();
const app = express();
const port = 3000;

// *************************************************************
// ******************   Configs    *****************************
// *************************************************************

app.use(validateContentType);
app.use(express.json());

// For posts and comments endpoints
app.use('/posts', postRoutes);
// Another path is a invalid URL
app.all('*', function(req: express.Request, res: express.Response) {
  generateResponse(res, 404);
});

// *************************************************************
// ******************   MongoDB    *****************************
// *************************************************************
mongoose
  .connect('mongodb://127.0.0.1/blogapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Could not connect to MongoDB', err));

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
