import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (one level up from server directory)
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

console.log('📄 Loading .env from:', envPath);
console.log('🔍 EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('🔍 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Set' : '❌ Missing');
console.log('🔍 RECIEPIENT_EMAIL:', process.env.RECIEPIENT_EMAIL || 'Not set (will use EMAIL_USER)');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? true // Allow all origins in production (or specify your domain)
    : true,
  credentials: true
}));
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('❌ Missing email credentials in .env file!');
  console.error('Required variables: EMAIL_USER, EMAIL_PASSWORD');
  console.error('Optional variables: SMTP_HOST, SMTP_PORT, RECIEPIENT_EMAIL');
  console.error('\nPlease check your .env file in the project root directory.');
}

// Create reusable transporter object using SMTP transport
// Supports Gmail, Outlook, and other SMTP providers via environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Default to Gmail
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '', // Your email
    pass: process.env.EMAIL_PASSWORD || '', // Your email password or app password
  },
});

// Verify transporter configuration
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log('❌ SMTP Server Error:', error.message);
      console.log('   Please check your .env file credentials.');
    } else {
      console.log('✅ SMTP Server is ready to send messages');
    }
  });
} else {
  console.warn('⚠️  Email credentials not configured. Email sending will fail.');
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📧 Contact form submission received');
    
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email credentials missing');
      return res.status(500).json({ 
        success: false, 
        error: 'Email service not configured. Please check server configuration.' 
      });
    }

    const { name, email, phone, serviceType, message } = req.body;
    console.log('📝 Form data:', { name, email, phone, serviceType, messageLength: message?.length });

    // Validate required fields
    if (!name || !email || !serviceType || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email address' 
      });
    }

    // Prepare email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIEPIENT_EMAIL || process.env.EMAIL_USER, // Where to send the contact form submissions
      replyTo: email, // Allow replies to go to the sender
      subject: `Contact Form Submission - ${serviceType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Service Type:</strong> ${serviceType}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #4CAF50; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Nilesec Systems contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        Service Type: ${serviceType}
        
        Message:
        ${message}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from the React app build directory (in production)
const distPath = path.resolve(__dirname, '..', 'dist');

// Serve static assets (images, CSS, JS, etc.) with proper caching
app.use(express.static(distPath, {
  maxAge: '1y',
  etag: true,
  index: false // Don't serve index.html for directories
}));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Catch all handler: send back React's index.html file for client-side routing
// This must be last, after all API routes and static files
// Only match non-API, non-static file routes
app.get('*', (req, res) => {
  // Skip API routes (should already be handled above, but just in case)
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  // Skip static file extensions (these should be handled by express.static)
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  const hasStaticExtension = staticExtensions.some(ext => req.path.toLowerCase().endsWith(ext));
  if (hasStaticExtension) {
    return res.status(404).send('File not found');
  }
  
  // Send index.html for SPA routes
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading page');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
});

