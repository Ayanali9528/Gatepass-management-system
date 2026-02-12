const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure your email credentials (use an app password for Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayanali753366@gmail.com', // Replace with your Gmail
    pass: 'sfng ojyb rpak dnzi'    // Replace with your Gmail App Password
  }
});

// Endpoint for student gate pass requests
app.post('/send-gatepass-email', (req, res) => {
  const { name, regId, className, section, email, reason, dateTime, contact } = req.body;

  const mailOptions = {
    from: 'ayanali753366@gmail.com', // Replace with your Gmail
    to: 'kumar.atulpal9050@gmail.com', // Teacher's email
    subject: 'New Gate Pass Request Submitted',
    html: `
      <h3>New Gate Pass Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Registration ID:</strong> ${regId}</p>
      <p><strong>Class:</strong> ${className}</p>
      <p><strong>Section:</strong> ${section}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p><strong>Date and Time:</strong> ${dateTime}</p>
      <p><strong>Contact:</strong> ${contact}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    res.send('Email sent: ' + info.response);
  });
});

// Endpoint for hosteller gate pass requests
app.post('/send-hostel-email', (req, res) => {
  const { regId, hostelName, roomNumber, hostelBlock, hostelReason, outgoingDateTime, incomingDateTime, contact } = req.body;

  const mailOptions = {
    from: 'ayanali753366@gmail.com', // Your Gmail
    to: 'ayanali753366@gmail.com', // Warden's email (replace if different)
    subject: 'New Hostel Gate Pass Request Submitted',
    html: `
      <h3>New Hostel Gate Pass Request</h3>
      <p><strong>Registration ID:</strong> ${regId}</p>
      <p><strong>Name:</strong> ${hostelName}</p>
      <p><strong>Room Number:</strong> ${roomNumber}</p>
      <p><strong>Hostel Block:</strong> ${hostelBlock}</p>
      <p><strong>Reason:</strong> ${hostelReason}</p>
      <p><strong>Outgoing Date and Time:</strong> ${outgoingDateTime}</p>
      <p><strong>Incoming Date and Time:</strong> ${incomingDateTime}</p>
      <p><strong>Contact:</strong> ${contact}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email to warden');
    }
    res.send('Warden email sent: ' + info.response);
  });
});

// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));