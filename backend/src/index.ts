import express from 'express';
import cors from 'cors';

const app = express();

// Allow requests from all origins (or specify origins if needed)
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running with CORS enabled!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
