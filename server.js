require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const addstudentRoutes = require('./routes/addstudentRoutes');
const purchasedCoursesRouter = require('./routes/PurchasedCourses');
const Feedback = require('./models/Feedback'); // Ensure Feedback model is imported correctly
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect('mongodb+srv://Ashwini:Ashvni09@cluster0.96ohe.mongodb.net/AVL-HUB?retryWrites=true&w=majority&appName=Cluster0',)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));





  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model("User", userSchema);
  
  // API Endpoint to Check if Email is Registered
  app.post("/api/check-email", async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({ registered: true });
      }
      return res.status(200).json({ registered: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
    }
  });
  
  app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword, // Save the hashed password
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
      res.status(500).json({ message: "Failed to register user." });
    }
  });

 
// API Endpoint to Login Users
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, "your_jwt_secret", {
      expiresIn: "1h", // Set the token expiry time as needed
    });

    // Send the token back to the frontend
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});




// Define Schema and Model
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  category: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

// Routes

app.post("/add-course", async (req, res) => {
  const { title, instructor, image, video, category } = req.body;

  // Validation
  if (!title || !instructor || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newCourse = new Course({ title, instructor, image, video, category });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding course", error: err.message });
  }
});
// GET all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send('Error retrieving feedback');
  }
});

// POST new feedback
app.post('/api/feedback', async (req, res) => {
  const { name, comment, rating } = req.body;

  if (!name || !comment || rating === undefined) {
    return res.status(400).send('Please provide all feedback fields');
  }
  const newFeedback = new Feedback({ name, comment, rating });

  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).send('Error saving feedback');
  }
});

// Routes
app.use('/api/courses', purchasedCoursesRouter);

// Use student routes
app.use('/api/students', addstudentRoutes);


// Define the Message Schema and Model
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// API Endpoint to Save Messages
app.post("/api/messages", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save the message." });
  }
});





// Start server

app.listen(5000,()=>
  {
      console.log('server is running on the port 5000')
  });
