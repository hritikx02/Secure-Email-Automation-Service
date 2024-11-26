const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sendEmail } = require('./emailService');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendEmail(name, email, message);
        res.send('Your message has been sent successfully!');
    } catch (error) {
        res.status(500).send('There was an error sending your message.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});