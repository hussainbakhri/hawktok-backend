// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Use environment PORT for Render deployment
const PORT = process.env.PORT || 3000;

// CORS configuration - Allow your Hostinger frontend domain
const allowedOrigin = process.env.CLIENT_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

// Debug environment variables
console.log("🔍 Environment Check:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "***SET***" : "NOT SET");

// Verify SMTP connection on startup
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true, // Enable logging
  debug: true, // Include SMTP traffic in the logs
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
  } else {
    console.log("✅ SMTP Server is ready to send emails");
    console.log("📧 Configured email:", process.env.EMAIL_USER);
  }
});

// Route to handle form submissions
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `[WEBSITE FORM] New Contact Request from ${name}`,
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WEBSITE CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-US', { 
  timeZone: 'UTC',
  dateStyle: 'full',
  timeStyle: 'long'
})}

CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  This is an automated message from your website contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 0;">
    <div style="background: linear-gradient(90deg, #FF0050 0%, #FF1A66 14%, #EE2A7B 28%, #69C9D0 42%, #00F2EA 57%, #00D4FF 71%, #0099FF 100%); padding: 30px 20px;">
      <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">🌐 Website Contact Form</h1>
      <span style="display: inline-block; background: rgba(255, 255, 255, 0.25); color: white; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: bold; margin-top: 12px; letter-spacing: 0.5px; border: 2px solid rgba(255, 255, 255, 0.4);">NEW SUBMISSION</span>
      <div style="color: rgba(255, 255, 255, 0.95); font-size: 13px; margin-top: 10px;">Received: ${new Date().toLocaleString('en-US', { 
        dateStyle: 'full',
        timeStyle: 'long'
      })}</div>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px 20px;">
      <div style="background: white; padding: 25px; margin: 20px 0; border-left: 4px solid #69C9D0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <div style="font-weight: 600; color: #555; margin-bottom: 5px; font-size: 14px;">👤 Name:</div>
        <div style="color: #333; margin-bottom: 15px; font-size: 15px;">${name}</div>
        
        <div style="font-weight: 600; color: #555; margin-bottom: 5px; font-size: 14px;">📧 Email:</div>
        <div style="color: #333; margin-bottom: 15px; font-size: 15px;"><a href="mailto:${email}" style="color: #0099FF; text-decoration: none;">${email}</a></div>
      </div>
      
      <div style="font-weight: 600; color: #555; margin-bottom: 10px; font-size: 14px;">💬 Message:</div>
      <div style="background: white; padding: 25px; margin: 20px 0; border-radius: 4px; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>
    
    <div style="background: linear-gradient(90deg, #FF0050 0%, #FF1A66 14%, #EE2A7B 28%, #69C9D0 42%, #00F2EA 57%, #00D4FF 71%, #0099FF 100%); color: #fff; padding: 20px; text-align: center; font-size: 12px;">
      <strong>⚠️ This is an automated notification from your website contact form.</strong><br>
    
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    console.log("📧 Attempting to send email...");
    console.log("FROM:", mailOptions.from);
    console.log("TO:", mailOptions.to);
    console.log("REPLY-TO:", mailOptions.replyTo);
    
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    
    res.json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    console.error("Error details:", {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    res.status(500).json({ 
      success: false, 
      msg: "Failed to send message",
      error: error.message 
    });
  }
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS allowed origin: ${allowedOrigin}`);
});
