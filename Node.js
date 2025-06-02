// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const PORT = 3000; // The port your backend server will listen on

// --- Middleware ---
// Enable CORS: Allows your frontend (potentially on a different origin/port) to make requests to this backend.
app.use(cors());
// Parse JSON request bodies (e.g., if you send JSON data)
app.use(bodyParser.json());
// Parse URL-encoded request bodies (e.g., for standard form submissions, though FormData is used here)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory.
// This allows you to access uploaded files via a URL (e.g., http://localhost:3000/uploads/photo-16789012345.jpg)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MongoDB Connection ---
// Replace 'mongodb://localhost:27017/applicationDB' with your actual MongoDB connection string
// if your database is hosted elsewhere or on a different port.
// In a production environment, this URI should be stored in an environment variable (e.g., using 'dotenv' package).
const MONGODB_URI = 'mongodb://localhost:27017/applicationDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// --- Mongoose Schema and Model ---
// Defines the structure and validation rules for documents in your 'applications' collection.
const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true }, // Store the HASHED password, never plain text!
    photoPath: { type: String, required: true }, // Path to the uploaded photo file
    signaturePath: { type: String, required: true }, // Path to the uploaded signature file
    razorpayPaymentId: { type: String, required: true, unique: true }, // Unique ID from Razorpay payment
    submittedAt: { type: Date, default: Date.now } // Timestamp of submission
});

// Create the Mongoose Model. 'Application' will correspond to the 'applications' collection in MongoDB.
const Application = mongoose.model('Application', applicationSchema);

// --- Multer Storage Configuration for File Uploads ---
// Multer is used to handle 'multipart/form-data', primarily for file uploads.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/';
        // Check if the 'uploads' directory exists, if not, create it.
        if (!require('fs').existsSync(uploadDir)) {
            require('fs').mkdirSync(uploadDir);
        }
        cb(null, uploadDir); // Specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
        // Generate a unique filename to prevent overwriting files with the same name.
        // Format: fieldname-timestamp.extension (e.g., photo-16789012345.jpg)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter to accept only image files (JPEG, PNG, GIF, etc.)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        // Reject the file and provide an error message
        cb(new Error('Only image files are allowed for photo and signature uploads!'), false);
    }
};

// Configure Multer with storage and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB (5 * 1024 * 1024 bytes)
    fileFilter: fileFilter
});

// --- API Endpoint for Form Submission ---
// This route handles POST requests to '/submit-application'.
// 'upload.fields' is used to handle multiple file inputs (photo and signature).
app.post('/submit-application', upload.fields([
    { name: 'photo', maxCount: 1 },    // Expects one file for 'photo' field
    { name: 'signature', maxCount: 1 } // Expects one file for 'signature' field
]), async (req, res) => {
    try {
        // Extract text fields from req.body
        const { name, email, phone, password, razorpayPaymentId } = req.body;

        // --- Server-side Validation ---
        // Basic checks for required text fields. More robust validation (e.g., email format, phone regex)
        // should be added for a production application.
        if (!name || !email || !phone || !password || !razorpayPaymentId) {
            return res.status(400).json({ message: 'All text fields and payment ID are required.' });
        }
        // Check if files were actually uploaded
        if (!req.files || !req.files['photo'] || !req.files['signature']) {
            return res.status(400).json({ message: 'Photo and signature files are required.' });
        }

        // Get the file paths from Multer's upload result
        const photoPath = req.files['photo'][0].path;
        const signaturePath = req.files['signature'][0].path;

        // --- Password Hashing ---
        // Hash the user's password using bcrypt before storing it in the database.
        // '10' is the number of salt rounds, a higher number increases security but takes more time.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Application document instance
        const newApplication = new Application({
            name,
            email,
            phone,
            password: hashedPassword, // Store the hashed password
            photoPath,
            signaturePath,
            razorpayPaymentId
        });

        // Save the new application document to MongoDB
        const savedApplication = await newApplication.save();

        // Send a success response back to the frontend
        res.status(200).json({
            message: 'Application submitted successfully!',
            applicationId: savedApplication._id,
            // Provide URLs to access the uploaded files (useful for debugging/display)
            photoUrl: `http://localhost:${PORT}/${photoPath.replace(/\\/g, '/')}`, // Adjust path for URL compatibility
            signatureUrl: `http://localhost:${PORT}/${signaturePath.replace(/\\/g, '/')}`
        });

    } catch (error) {
        // --- Error Handling ---
        // Check for specific MongoDB duplicate key error (code 11000)
        // This typically occurs if 'email' or 'razorpayPaymentId' (which are unique) are duplicated.
        if (error.code === 11000) {
            let field = Object.keys(error.keyValue)[0];
            return res.status(409).json({
                message: `An application with this ${field} already exists. Please check your details.`,
                error: error.message
            });
        }
        // Handle other types of errors (e.g., Multer errors, Mongoose validation errors)
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Failed to submit application due to a server error.', error: error.message });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Make sure your MongoDB server is also running.`);
    console.log(`Open your HTML file (e.g., public/index.html) in a browser to use the form.`);
});
