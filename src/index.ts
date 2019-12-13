import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './controllers/post';
import { validateContentType } from './middleware/validator';
import { handleErrors } from './middleware/errorHandler';
import { generateResponse } from './utils/utils';

const app = express();
const port = 3000;

app.use(validateContentType);
app.use(express.json());

// For posts and comments endpoints use postRoutes
app.use('/posts', postRoutes);
// Another path is a invalid URL
app.all('*', function(req: express.Request, res: express.Response) {
  generateResponse(res, 404);
});

// Middleware for handling client errors
app.use(handleErrors);

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
