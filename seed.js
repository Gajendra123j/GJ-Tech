const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://gajendras0438:singh123@cluster0.igkuosm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define schemas
const BiodataSchema = new mongoose.Schema({
  name: String,
  title: String,
  personalInfo: {
    email: String,
    location: String,
    phone: String
  },
  education: [{
    degree: String,
    institution: String,
    period: String
  }],
  skills: [String],
  experience: [{
    position: String,
    company: String,
    period: String,
    responsibilities: [String]
  }]
});
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  tags: [String]
});
const Biodata = mongoose.model("Biodata", BiodataSchema);
const Blog = mongoose.model("Blog", BlogSchema);
// Seed data
const biodata = {
  name: "Gajendra Singh",
  title: "Full Stack Developer",
  personalInfo: {
    email: "gajendras0438@gmail.com",
    location: "New Delhi, India",
    phone: "+91 9876543210"
  },
  education: [{
    degree: "Bachelor of Technology in Computer Science",
    institution: " University",
    period: "2023 - 2027"
  }],
  skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express.js", "HTML/CSS"],
  experience: [{
    position: "Full Stack Developer",
    company: "ABC Tech Solutions",
    period: "2022 - Present",
    responsibilities: [
      "Developed and maintained web applications using MERN stack",
      "Implemented RESTful APIs and database schemas",
      "Collaborated with cross-functional teams"
    ]
  }]
};
const blogPosts = [
  {
    title: "Getting Started with MERN Stack Development",
    content: "Learn the basics of MERN stack development and how to build your first full-stack application...",
    author: "Gajendra Singh",
    tags: ["MERN", "Web Development", "JavaScript"]
  },
  {
    title: "Best Practices for MongoDB Schema Design",
    content: "Explore the best practices for designing efficient MongoDB schemas for your applications...",
    author: "Gajendra Singh",
    tags: ["MongoDB", "Database", "Backend"]
  },
  {
    title: "Building Responsive Web Applications with React",
    content: "Discover how to create responsive and user-friendly web applications using React...",
    author: "Gajendra Singh",
    tags: ["React", "Frontend", "Web Development"]
  }
];
// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Biodata.deleteMany({});
    await Blog.deleteMany({});
    // Insert new data
    await Biodata.create(biodata);
    await Blog.create(blogPosts);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}
// Run the seed function
seedDatabase(); 