import React, { useState, useEffect, useRef } from 'react';
import { User, Save, Edit, Download, Upload, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Plus, Minus, Eye, EyeOff, FileText, Camera, Star, Code } from 'lucide-react';

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      profileImage: '',
      bio: '',
      website: '',
      linkedIn: '',
      github: ''
    },
    professional: {
      jobTitle: '',
      company: '',
      industry: '',
      yearsExperience: '',
      currentSalary: '',
      expectedSalary: '',
      workType: 'full-time',
      availability: 'immediately',
      summary: ''
    },
    skills: [
      {
        category: 'Technical',
        items: [
          { name: '', proficiency: 3, years: '' }
        ]
      }
    ],
    education: [
      {
        degree: '',
        institution: '',
        graduationYear: '',
        gpa: '',
        major: '',
        achievements: ''
      }
    ],
    experience: [
      {
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ['']
      }
    ],
    projects: [
      {
        name: '',
        description: '',
        technologies: '',
        url: '',
        github: '',
        startDate: '',
        endDate: '',
        highlights: ['']
      }
    ],
    certifications: [
      {
        name: '',
        issuer: '',
        date: '',
        expiryDate: '',
        credentialId: ''
      }
    ],
    languages: [
      {
        name: '',
        proficiency: 'native'
      }
    ]
  });

  const [savedProfiles, setSavedProfiles] = useState([]);
  const [currentView, setCurrentView] = useState('edit');
  const [currentSection, setCurrentSection] = useState('personal');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userProfiles') || '[]');
    setSavedProfiles(saved);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          personal: { ...prev.personal, profileImage: e.target.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    const profileData = {
      ...profile,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    const updatedProfiles = [...savedProfiles, profileData];
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('userProfiles', JSON.stringify(updatedProfiles));
    alert('Profile saved successfully!');
  };

  const generateResume = () => {
    const resumeHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resume - ${profile.personal.firstName} ${profile.personal.lastName}</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .resume { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .profile-img { width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; object-fit: cover; margin-bottom: 20px; }
        .name { font-size: 2.5em; margin: 0; font-weight: 300; }
        .title { font-size: 1.2em; opacity: 0.9; margin: 5px 0; }
        .contact { display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap; }
        .contact-item { display: flex; align-items: center; gap: 5px; }
        .section { padding: 30px 40px; border-bottom: 1px solid #eee; }
        .section:last-child { border-bottom: none; }
        .section-title { font-size: 1.5em; color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #667eea; }
        .experience-item, .education-item, .project-item { margin-bottom: 25px; }
        .experience-item:last-child, .education-item:last-child, .project-item:last-child { margin-bottom: 0; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
        .item-title { font-weight: bold; color: #333; }
        .item-company { color: #667eea; font-weight: 500; }
        .item-date { color: #666; font-size: 0.9em; margin-left: auto; }
        .item-description { color: #555; line-height: 1.6; margin-top: 10px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .skill-category { background: #f8f9fa; padding: 15px; border-radius: 8px; }
        .category-title { font-weight: bold; color: #333; margin-bottom: 10px; }
        .skill-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .skill-name { font-size: 0.9em; }
        .skill-level { display: flex; gap: 2px; }
        .star { color: #ffd700; }
        .star.empty { color: #ddd; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; color: #555; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            ${profile.personal.profileImage ? `<img src="${profile.personal.profileImage}" alt="Profile" class="profile-img">` : ''}
            <h1 class="name">${profile.personal.firstName} ${profile.personal.lastName}</h1>
            <p class="title">${profile.professional.jobTitle}</p>
            <div class="contact">
                ${profile.personal.email ? `<div class="contact-item">📧 ${profile.personal.email}</div>` : ''}
                ${profile.personal.phone ? `<div class="contact-item">📱 ${profile.personal.phone}</div>` : ''}
                ${profile.personal.city ? `<div class="contact-item">📍 ${profile.personal.city}, ${profile.personal.state}</div>` : ''}
                ${profile.personal.linkedIn ? `<div class="contact-item">💼 LinkedIn</div>` : ''}
                ${profile.personal.github ? `<div class="contact-item">🐙 GitHub</div>` : ''}
            </div>
        </div>

        ${profile.professional.summary ? `
        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p>${profile.professional.summary}</p>
        </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${profile.skills.map(category => `
                    <div class="skill-category">
                        <div class="category-title">${category.category}</div>
                        ${category.items.map(skill => `
                            <div class="skill-item">
                                <span class="skill-name">${skill.name}</span>
                                <div class="skill-level">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<span class="star ${i < skill.proficiency ? '' : 'empty'}">★</span>`
                                    ).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>

        ${profile.experience.length > 0 && profile.experience[0].jobTitle ? `
        <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${profile.experience.map(exp => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${exp.jobTitle}</div>
                            <div class="item-company">${exp.company}</div>
                        </div>
                        <div class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                    ${exp.achievements.filter(a => a).length > 0 ? `
                        <ul>
                            ${exp.achievements.filter(a => a).map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${profile.education.length > 0 && profile.education[0].degree ? `
        <div class="section">
            <h2 class="section-title">Education</h2>
            ${profile.education.map(edu => `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${edu.degree} ${edu.major ? `in ${edu.major}` : ''}</div>
                            <div class="item-company">${edu.institution}</div>
                        </div>
                        <div class="item-date">${edu.graduationYear}</div>
                    </div>
                    ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                    ${edu.achievements ? `<div class="item-description">${edu.achievements}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${profile.projects.length > 0 && profile.projects[0].name ? `
        <div class="section">
            <h2 class="section-title">Projects</h2>
            ${profile.projects.map(project => `
                <div class="project-item">
                    <div class="item-header">
                        <div class="item-title">${project.name}</div>
                        <div class="item-date">${project.startDate} - ${project.endDate}</div>
                    </div>
                    ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
                    ${project.technologies ? `<div><strong>Technologies:</strong> ${project.technologies}</div>` : ''}
                    ${project.highlights.filter(h => h).length > 0 ? `
                        <ul>
                            ${project.highlights.filter(h => h).map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${profile.certifications.length > 0 && profile.certifications[0].name ? `
        <div class="section">
            <h2 class="section-title">Certifications</h2>
            ${profile.certifications.map(cert => `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${cert.name}</div>
                            <div class="item-company">${cert.issuer}</div>
                        </div>
                        <div class="item-date">${cert.date}</div>
                    </div>
                    ${cert.credentialId ? `<div>Credential ID: ${cert.credentialId}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}
    </div>
</body>
</html>
    `;

    const blob = new Blob([resumeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.personal.firstName}_${profile.personal.lastName}_Resume.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          {profile.personal.profileImage ? (
            <img
              src={profile.personal.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
              <Camera size={32} className="text-gray-500" />
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <Camera size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">Click camera icon to upload photo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={profile.personal.firstName}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, firstName: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="Last Name"
          value={profile.personal.lastName}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, lastName: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="email"
          placeholder="Email"
          value={profile.personal.email}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, email: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="tel"
          placeholder="Phone"
          value={profile.personal.phone}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, phone: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="City"
          value={profile.personal.city}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, city: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="State"
          value={profile.personal.state}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, state: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="LinkedIn Profile"
          value={profile.personal.linkedIn}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, linkedIn: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="GitHub Profile"
          value={profile.personal.github}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            personal: { ...prev.personal, github: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <textarea
        placeholder="Professional Bio"
        value={profile.personal.bio}
        onChange={(e) => setProfile(prev => ({
          ...prev,
          personal: { ...prev.personal, bio: e.target.value }
        }))}
        rows="4"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <Briefcase className="mr-2" /> Professional Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Job Title"
          value={profile.professional.jobTitle}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, jobTitle: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Company"
          value={profile.professional.company}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, company: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Industry"
          value={profile.professional.industry}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, industry: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Years of Experience"
          value={profile.professional.yearsExperience}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, yearsExperience: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Current Salary"
          value={profile.professional.currentSalary}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, currentSalary: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Expected Salary"
          value={profile.professional.expectedSalary}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, expectedSalary: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={profile.professional.workType}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, workType: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
        <select
          value={profile.professional.availability}
          onChange={(e) => setProfile(prev => ({
            ...prev,
            professional: { ...prev.professional, availability: e.target.value }
          }))}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="immediately">Immediately</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="1 month">1 month</option>
          <option value="2-3 months">2-3 months</option>
        </select>
      </div>
      <textarea
        placeholder="Professional Summary"
        value={profile.professional.summary}
        onChange={(e) => setProfile(prev => ({
          ...prev,
          professional: { ...prev.professional, summary: e.target.value }
        }))}
        rows="4"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <GraduationCap className="mr-2" /> Education
      </h3>
      {profile.education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEducation = [...profile.education];
                newEducation[index].degree = e.target.value;
                setProfile(prev => ({ ...prev, education: newEducation }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const newEducation = [...profile.education];
                newEducation[index].institution = e.target.value;
                setProfile(prev => ({ ...prev, education: newEducation }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Major"
              value={edu.major}
              onChange={(e) => {
                const newEducation = [...profile.education];
                newEducation[index].major = e.target.value;
                setProfile(prev => ({ ...prev, education: newEducation }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Graduation Year"
              value={edu.graduationYear}
              onChange={(e) => {
                const newEducation = [...profile.education];
                newEducation[index].graduationYear = e.target.value;
                setProfile(prev => ({ ...prev, education: newEducation }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Achievements or honors"
            value={edu.achievements}
            onChange={(e) => {
              const newEducation = [...profile.education];
              newEducation[index].achievements = e.target.value;
              setProfile(prev => ({ ...prev, education: newEducation }));
            }}
            rows="2"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {index > 0 && (
            <button
              onClick={() => {
                const newEducation = profile.education.filter((_, i) => i !== index);
                setProfile(prev => ({ ...prev, education: newEducation }));
              }}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <Minus className="mr-1" size={16} /> Remove Education
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          setProfile(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', institution: '', graduationYear: '', gpa: '', major: '', achievements: '' }]
          }));
        }}
        className="flex items-center text-green-500 hover:text-green-700"
      >
        <Plus size={20} className="mr-1" /> Add Education
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <Code className="mr-2" /> Projects
      </h3>
      {profile.projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => {
                const newProjects = [...profile.projects];
                newProjects[index].name = e.target.value;
                setProfile(prev => ({ ...prev, projects: newProjects }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => {
                const newProjects = [...profile.projects];
                newProjects[index].technologies = e.target.value;
                setProfile(prev => ({ ...prev, projects: newProjects }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="month"
              placeholder="Start Date"
              value={project.startDate}
              onChange={(e) => {
                const newProjects = [...profile.projects];
                newProjects[index].startDate = e.target.value;
                setProfile(prev => ({ ...prev, projects: newProjects }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="month"
              placeholder="End Date"
              value={project.endDate}
              onChange={(e) => {
                const newProjects = [...profile.projects];
                newProjects[index].endDate = e.target.value;
                setProfile(prev => ({ ...prev, projects: newProjects }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => {
              const newProjects = [...profile.projects];
              newProjects[index].description = e.target.value;
              setProfile(prev => ({ ...prev, projects: newProjects }));
            }}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
            {project.highlights.map((highlight, highlightIndex) => (
              <div key={highlightIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Key highlight or feature"
                  value={highlight}
                  onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[index].highlights[highlightIndex] = e.target.value;
                    setProfile(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    const newProjects = [...profile.projects];
                    newProjects[index].highlights = newProjects[index].highlights.filter((_, i) => i !== highlightIndex);
                    setProfile(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newProjects = [...profile.projects];
                newProjects[index].highlights.push('');
                setProfile(prev => ({ ...prev, projects: newProjects }));
              }}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} className="mr-1" /> Add Highlight
            </button>
          </div>
          {index > 0 && (
            <button
              onClick={() => {
                const newProjects = profile.projects.filter((_, i) => i !== index);
                setProfile(prev => ({ ...prev, projects: newProjects }));
              }}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <Minus className="mr-1" size={16} /> Remove Project
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          setProfile(prev => ({
            ...prev,
            projects: [...prev.projects, { name: '', description: '', technologies: '', url: '', github: '', startDate: '', endDate: '', highlights: [''] }]
          }));
        }}
        className="flex items-center text-green-500 hover:text-green-700"
      >
        <Plus size={20} className="mr-1" /> Add Project
      </button>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <Award className="mr-2" /> Certifications
      </h3>
      {profile.certifications.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) => {
                const newCertifications = [...profile.certifications];
                newCertifications[index].name = e.target.value;
                setProfile(prev => ({ ...prev, certifications: newCertifications }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Issuer"
              value={cert.issuer}
              onChange={(e) => {
                const newCertifications = [...profile.certifications];
                newCertifications[index].issuer = e.target.value;
                setProfile(prev => ({ ...prev, certifications: newCertifications }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="Date Acquired"
              value={cert.date}
              onChange={(e) => {
                const newCertifications = [...profile.certifications];
                newCertifications[index].date = e.target.value;
                setProfile(prev => ({ ...prev, certifications: newCertifications }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="Expiry Date"
              value={cert.expiryDate}
              onChange={(e) => {
                const newCertifications = [...profile.certifications];
                newCertifications[index].expiryDate = e.target.value;
                setProfile(prev => ({ ...prev, certifications: newCertifications }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Credential ID"
              value={cert.credentialId}
              onChange={(e) => {
                const newCertifications = [...profile.certifications];
                newCertifications[index].credentialId = e.target.value;
                setProfile(prev => ({ ...prev, certifications: newCertifications }));
              }}
              className="col-span-1 md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {index > 0 && (
            <button
              onClick={() => {
                const newCertifications = profile.certifications.filter((_, i) => i !== index);
                setProfile(prev => ({ ...prev, certifications: newCertifications }));
              }}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <Minus className="mr-1" size={16} /> Remove Certification
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          setProfile(prev => ({
            ...prev,
            certifications: [...prev.certifications, { name: '', issuer: '', date: '', expiryDate: '', credentialId: '' }]
          }));
        }}
        className="flex items-center text-green-500 hover:text-green-700"
      >
        <Plus size={20} className="mr-1" /> Add Certification
      </button>
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <MapPin className="mr-2" /> Languages
      </h3>
      {profile.languages.map((lang, index) => (
        <div key={index} className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Language Name"
            value={lang.name}
            onChange={(e) => {
              const newLanguages = [...profile.languages];
              newLanguages[index].name = e.target.value;
              setProfile(prev => ({ ...prev, languages: newLanguages }));
            }}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={lang.proficiency}
            onChange={(e) => {
              const newLanguages = [...profile.languages];
              newLanguages[index].proficiency = e.target.value;
              setProfile(prev => ({ ...prev, languages: newLanguages }));
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="native">Native</option>
            <option value="fluent">Fluent</option>
            <option value="proficient">Proficient</option>
            <option value="intermediate">Intermediate</option>
            <option value="basic">Basic</option>
          </select>
          {index > 0 && (
            <button
              onClick={() => {
                const newLanguages = profile.languages.filter((_, i) => i !== index);
                setProfile(prev => ({ ...prev, languages: newLanguages }));
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Minus size={20} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          setProfile(prev => ({
            ...prev,
            languages: [...prev.languages, { name: '', proficiency: 'native' }]
          }));
        }}
        className="flex items-center text-green-500 hover:text-green-700"
      >
        <Plus size={20} className="mr-1" /> Add Language
      </button>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
      <button
        onClick={() => setCurrentSection('personal')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'personal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <User size={14} className="inline mr-1" /> Personal Info
      </button>
      <button
        onClick={() => setCurrentSection('professional')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'professional' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <Briefcase size={14} className="inline mr-1" /> Professional Details
      </button>
      <button
        onClick={() => setCurrentSection('skills')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'skills' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <Star size={14} className="inline mr-1" /> Skills
      </button>
      <button
        onClick={() => setCurrentSection('experience')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'experience' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <Briefcase size={14} className="inline mr-1" /> Experience
      </button>
      <button
        onClick={() => setCurrentSection('education')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'education' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <GraduationCap size={14} className="inline mr-1" /> Education
      </button>
      <button
        onClick={() => setCurrentSection('projects')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'projects' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <Code size={14} className="inline mr-1" /> Projects
      </button>
      <button
        onClick={() => setCurrentSection('certifications')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'certifications' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <Award size={14} className="inline mr-1" /> Certifications
      </button>
      <button
        onClick={() => setCurrentSection('languages')}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentSection === 'languages' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        <MapPin size={14} className="inline mr-1" /> Languages
      </button>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'professional':
        return renderProfessionalInfo();
      case 'skills':
        return renderSkills();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'projects':
        return renderProjects();
      case 'certifications':
        return renderCertifications();
      case 'languages':
        return renderLanguages();
      default:
        return renderPersonalInfo();
    }
  };
  
  const loadProfile = (profileToLoad) => {
    setProfile(profileToLoad);
    setCurrentView('edit');
    setCurrentSection('personal');
  };

  const deleteProfile = (profileId) => {
    const updatedProfiles = savedProfiles.filter(p => p.id !== profileId);
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('userProfiles', JSON.stringify(updatedProfiles));
    alert('Profile deleted successfully!');
  };

  const renderSavedProfiles = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Saved Profiles</h2>
      {savedProfiles.length === 0 ? (
        <p className="text-gray-600">You haven't saved any profiles yet. Start by filling out the form in the "Edit Profile" tab.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedProfiles.map(p => (
            <div key={p.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{p.personal.firstName} {p.personal.lastName}</h3>
              <p className="text-sm text-gray-500 truncate">{p.professional.jobTitle || 'No Title'}</p>
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={() => loadProfile(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 flex items-center justify-center"
                >
                  <Eye size={16} className="mr-1" /> View/Edit
                </button>
                <button
                  onClick={() => deleteProfile(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 flex items-center justify-center"
                >
                  <Minus size={16} className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Enhanced Profile Manager</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCurrentView('edit')}
            className={`px-4 py-2 rounded-lg ${currentView === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <Edit size={16} className="inline mr-1" /> Edit Profile
          </button>
          <button
            onClick={() => setCurrentView('saved')}
            className={`px-4 py-2 rounded-lg ${currentView === 'saved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <User size={16} className="inline mr-1" /> Saved Profiles
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={saveProfile}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
          >
            <Save size={16} className="mr-1" /> Save Profile
          </button>
          
          <button
            onClick={generateResume}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center"
          >
            <FileText size={16} className="mr-1" /> Generate Resume
          </button>
          
          <button
            onClick={() => {
              const dataStr = JSON.stringify(profile, null, 2);
              const dataBlob = new Blob([dataStr], {type: 'application/json'});
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `profile_${profile.personal.firstName}_${profile.personal.lastName}.json`;
              link.click();
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
          >
            <Download size={16} className="mr-1" /> Export
          </button>
          
          <label className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center cursor-pointer">
            <Upload size={16} className="mr-1" /> Import
            <input
              type="file"
              accept=".json"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    try {
                      const importedProfile = JSON.parse(e.target.result);
                      setProfile(importedProfile);
                      alert('Profile imported successfully!');
                    } catch (error) {
                      alert('Error importing profile. Please check the file format.');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="space-y-8">
        {currentView === 'edit' && (
          <>
            {renderNavigation()}
            {renderCurrentSection()}
          </>
        )}
        
        {currentView === 'saved' && renderSavedProfiles()}
      </div>
    </div>
  );
};

export default ProfileManager;

  const renderSkills = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <Code className="mr-2" /> Skills & Expertise
      </h3>
      
      {profile.skills.map((category, categoryIndex) => (
        <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Skill Category (e.g., Technical, Soft Skills)"
              value={category.category}
              onChange={(e) => {
                const newSkills = [...profile.skills];
                newSkills[categoryIndex].category = e.target.value;
                setProfile(prev => ({ ...prev, skills: newSkills }));
              }}
              className="text-lg font-semibold border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            />
            {categoryIndex > 0 && (
              <button
                onClick={() => {
                  const newSkills = profile.skills.filter((_, i) => i !== categoryIndex);
                  setProfile(prev => ({ ...prev, skills: newSkills }));
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Minus size={20} />
              </button>
            )}
          </div>
          
          {category.items.map((skill, skillIndex) => (
            <div key={skillIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-gray-50 p-3 rounded">
              <input
                type="text"
                placeholder="Skill name"
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[categoryIndex].items[skillIndex].name = e.target.value;
                  setProfile(prev => ({ ...prev, skills: newSkills }));
                }}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Proficiency:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        const newSkills = [...profile.skills];
                        newSkills[categoryIndex].items[skillIndex].proficiency = level;
                        setProfile(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className={`text-lg ${level <= skill.proficiency ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      <Star size={16} fill="currentColor" />
                    </button>
                  ))}
                </div>
              </div>
              
              <input
                type="number"
                placeholder="Years"
                value={skill.years}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[categoryIndex].items[skillIndex].years = e.target.value;
                  setProfile(prev => ({ ...prev, skills: newSkills }));
                }}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <button
                onClick={() => {
                  const newSkills = [...profile.skills];
                  newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter((_, i) => i !== skillIndex);
                  setProfile(prev => ({ ...prev, skills: newSkills }));
                }}
                className="text-red-500 hover:text-red-700 justify-self-end"
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
          
          <button
            onClick={() => {
              const newSkills = [...profile.skills];
              newSkills[categoryIndex].items.push({ name: '', proficiency: 3, years: '' });
              setProfile(prev => ({ ...prev, skills: newSkills }));
            }}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <Plus size={16} className="mr-1" /> Add Skill
          </button>
        </div>
      ))}
      
      <button
        onClick={() => {
          setProfile(prev => ({
            ...prev,
            skills: [...prev.skills, { category: '', items: [{ name: '', proficiency: 3, years: '' }] }]
          }));
        }}
        className="flex items-center text-green-500 hover:text-green-700"
      >
        <Plus size={20} className="mr-1" /> Add Skill Category
      </button>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <Briefcase className="mr-2" /> Work Experience
      </h3>
      
      {profile.experience.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.jobTitle}
              onChange={(e) => {
                const newExperience = [...profile.experience];
                newExperience[index].jobTitle = e.target.value;
                setProfile(prev => ({ ...prev, experience: newExperience }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const newExperience = [...profile.experience];
                newExperience[index].company = e.target.value;
                setProfile(prev => ({ ...prev, experience: newExperience }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="month"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => {
                const newExperience = [...profile.experience];
                newExperience[index].startDate = e.target.value;
                setProfile(prev => ({ ...prev, experience: newExperience }));
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="month"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => {
                  const newExperience = [...profile.experience];
                  newExperience[index].endDate = e.target.value;
                  setProfile(prev => ({ ...prev, experience: newExperience }));
                }}
                disabled={exp.current}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => {
                    const newExperience = [...profile.experience];
                    newExperience[index].current = e.target.checked;
                    if (e.target.checked) {
                      newExperience[index].endDate = '';
                    }
                    setProfile(prev => ({ ...prev, experience: newExperience }));
                  }}
                  className="mr-2"
                />
                Current
              </label>
            </div>
          </div>
          
          <textarea
            placeholder="Job description and responsibilities"
            value={exp.description}
            onChange={(e) => {
              const newExperience = [...profile.experience];
              newExperience[index].description = e.target.value;
              setProfile(prev => ({ ...prev, experience: newExperience }));
            }}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
            {exp.achievements.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Achievement or accomplishment"
                  value={achievement}
                  onChange={(e) => {
                    const newExperience = [...profile.experience];
                    newExperience[index].achievements[achievementIndex] = e.target.value;
                    setProfile(prev => ({ ...prev, experience: newExperience }));
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    const newExperience = [...profile.experience];
                    newExperience[index].achievements = newExperience[index].achievements.filter((_, i) => i !== achievementIndex);
                    setProfile(prev => ({ ...prev, experience: newExperience }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newExperience = [...profile.experience];
                newExperience[index].achievements.push('');
                setProfile(prev => ({ ...prev, experience: newExperience }));
              }}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <Plus size={16} className="mr-1" /> Add Achievement
            </button>
          </div>
          
          {index > 0 && (
            <button
              onClick={() => {
                const newExperience = profile.experience.filter((_, i) => i !== index);
                setProfile(prev => ({ ...prev, experience: newExperience }));
              }}
              className="text-red-500 hover:text-red-700 flex items-center"
            >
              <Minus className="mr-1" size={16} /> Remove Experience
            </button>
          )}
        </div>
      ))}
      
      <button
        onClick={() => {
          setProfile(prev => ({
            ...prev,
            experience: [...prev.experience, {
              jobTitle: '',
              company: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
              achievements: ['']
            }]
          }));
        }}
        className="flex items-center text-green-500 hover:text-green-700"
      >
        <Plus size={20} className="mr-1" /> Add Experience
      </button>
    </div>
  );