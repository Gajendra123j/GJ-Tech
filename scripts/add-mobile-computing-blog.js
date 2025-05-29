const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const mobileComputingBlog = {
    title: "Mobile Computing & Android Overview",
    content: `Mobile computing refers to the use of portable computing devices such as smartphones, tablets, and laptops that can connect to wireless networks. This technology has revolutionized how we interact with digital services and has become an integral part of our daily lives.

Key Components of Mobile Computing:
- Mobile Hardware (devices)
- Mobile Software (operating systems)
- Mobile Communication (networks)
- Mobile Applications

Android Operating System:
Android is an open-source operating system developed by Google, primarily designed for touchscreen mobile devices. It's based on the Linux kernel and has become the world's most popular mobile operating system.

Android Architecture:
- Linux Kernel
- Hardware Abstraction Layer (HAL)
- Android Runtime
- Native Libraries
- Application Framework
- Applications

Key Features:
- Open Source
- Customizable UI
- Multitasking
- Widgets
- Google Services Integration

Android Development:
Android app development involves creating applications for devices running the Android operating system. The primary development tools include Android Studio, the official Integrated Development Environment (IDE) for Android development.

Development Components:
- Activities and Fragments
- Intents and Intent Filters
- Services
- Content Providers
- Broadcast Receivers

Mobile App Development Lifecycle:
1. Planning and Analysis: Define app requirements, target audience, and features
2. Design: Create UI/UX design, wireframes, and prototypes
3. Development: Write code, implement features, and integrate APIs
4. Testing: Perform unit testing, integration testing, and user acceptance testing
5. Deployment: Publish to Google Play Store and monitor performance

Future of Mobile Computing:
The future of mobile computing is promising, with emerging technologies like 5G, Artificial Intelligence, Internet of Things (IoT), and Augmented Reality (AR) shaping the landscape. These technologies will enable more powerful, efficient, and innovative mobile applications.

Emerging Trends:
- 5G Technology
- AI and Machine Learning Integration
- IoT and Smart Devices
- AR/VR Applications
- Edge Computing
- Progressive Web Apps (PWAs)`,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    techStack: "Android, Java, Kotlin, Android Studio, XML",
    githubLink: "https://github.com/Gajendra123j",
    tags: ["mobile-computing", "android", "app-development", "technology"],
    author: "GJ Tech"
};

async function addBlog() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gjtech', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const blog = new Blog(mobileComputingBlog);
        await blog.save();
        console.log('Blog added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding blog:', error);
        process.exit(1);
    }
}

addBlog(); 