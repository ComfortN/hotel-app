const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Config Mailtrap SMTP
// const transporter = nodemailer.createTransport({
//     host: 'live.smtp.mailtrap.io',  // From Mailtrap SMTP settings
//     port: 587,
//     auth: {
//       user: 'api',
//       pass: 'c12f1929b274a9a0629fbee850906e21',
//     },
//   });


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luxestayhotel@gmail.com',
    pass: 'brns ccsd jmqg mzrg'
  }
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: 'luxestayhotel@gmail.com',
    to, subject, text, html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));