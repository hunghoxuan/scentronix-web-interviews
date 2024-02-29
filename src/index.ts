import express from 'express';
import { checkOnlineUrls } from './utils/network';
import { urls as defaultUrls } from './config';

// Initialize environment variables
require('dotenv').config();
const port = process.env.PORT || 3000;
const timeout = parseInt(process.env.TIMEOUT || '5000');

// Create a new express application instance
const app = express();
app.use(express.json());

// Handle JSON parse error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
      return res.status(400).send({ success: false, message: 'Bad JSON format: ' + err.message }); // Bad JSON request
  }
  next();
});

// Check online URLs. Return array of online URLs.
app.post('/check-online-urls', async (req, res) => {
  try {
    const { urls, priority } = req.body;
    const checkedUrls = urls || defaultUrls;
    // console.log('Checking URLs:', priority, checkedUrls);
    const result = await checkOnlineUrls(checkedUrls, priority, timeout);
    res.json( {success: true, online_urls: result });        
  } catch (error: any) {
    res.status(500).send({ success: false, message: 'Unexpected error: ' + error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});