const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.post('/process-image', async (req, res) => {
  try {
    const imageUrl = req.body.url;
    // Fetch the image from the provided URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'binary');

    // Process the image (resize, modify, etc.)
    const processedImage = await sharp(imageData)
      .resize({ width: 500 }) // Adjust the resizing as needed
      .toBuffer();

    // Send the processed image back
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(processedImage, 'binary');
  } catch (error) {
    console.log('Error processing image:', error);
    console.error('Error processing image:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
   res.send("I'm Alive dude");
});

app.listen(port, () => {
  console.log(`Server is running on port :${port}`);
});
