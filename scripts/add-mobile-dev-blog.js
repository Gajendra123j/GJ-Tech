const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const mobileDevBlog = {
    title: "Mobile App Development Guide",
    content: `Getting Started with Android Development

Prerequisites:
- Java Development Kit (JDK)
- Android Studio
- Android SDK
- Basic knowledge of Java/Kotlin

Key Android Components:
1. Activities
2. Fragments
3. Services
4. Content Providers
5. Broadcast Receivers

User Interface Development:
- XML layouts
- Material Design components
- Custom views
- Responsive design

Data Storage:
- SQLite databases
- Shared Preferences
- Room persistence library
- File storage

Networking and APIs:
- RESTful API integration
- JSON parsing
- Network security
- Background operations

Best Practices:
1. Code Organization
   - Use proper package structure
   - Follow MVVM architecture
   - Implement clean architecture

2. Performance
   - Optimize layouts
   - Use background threads
   - Implement caching
   - Memory management

3. Security
   - Implement encryption
   - Secure data storage
   - Network security
   - Input validation

Testing:
- Unit testing
- Integration testing
- UI testing
- Performance testing

Deployment:
1. Prepare release build
2. Sign the APK
3. Test on multiple devices
4. Publish to Play Store

Common Challenges:
- Device fragmentation
- Battery optimization
- Memory management
- Network connectivity
- Security concerns

Future Trends:
- Kotlin-first development
- Jetpack Compose
- Machine Learning integration
- AR/VR capabilities
- Cross-platform development`,
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    techStack: "Android, Java, Kotlin, Android Studio, XML, SQLite, REST APIs",
    githubLink: "https://github.com/Gajendra123j",
    tags: ["android-development", "mobile-apps", "programming", "tutorial"],
    author: "GJ Tech"
};

async function addBlog() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gjtech', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const blog = new Blog(mobileDevBlog);
        await blog.save();
        console.log('Mobile App Development blog added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding blog:', error);
        process.exit(1);
    }
}

addBlog(); 