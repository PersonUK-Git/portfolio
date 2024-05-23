const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./sendEmail');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.post('/api/contact', async(req, res) => {
  const { firstName, lastName, email, phoneNumber, topic, message } = req.body;

  

  try {
    await sendEmail({ firstName, lastName, email, phoneNumber, topic, message });
    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'There was an error sending your message. Please try again later.' });
  }

  
});

app.listen(port, () => console.log(`Server running on port ${port}`));
