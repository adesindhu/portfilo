import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, User, Lightbulb, Briefcase, FileText, Mail, Loader2, Github, Linkedin, Mail as MailIcon, Phone, Send, Code } from 'lucide-react'; // Added Code icon

// Mock data to simulate an API response for portfolio content
const portfolioData = {
    home: {
        name: "Sindhu Ade", // Updated with your name
        title: "Full Stack Developer",
        tagline: "Building robust and scalable applications with a passion for innovation."
    },
    about: {
        description: "As a seasoned Full Stack Java Developer, I bring a wealth of experience in designing, developing, and deploying high-performance web applications. My expertise spans across front-end technologies like React and back-end frameworks such as Spring Boot, coupled with strong database management skills. I am passionate about crafting elegant solutions to complex problems and continuously learning new technologies to stay at the forefront of the industry. I thrive in collaborative environments and am committed to delivering high-quality, maintainable code.",
        experience: [ // Changed to an array for multiple experiences
            {
                title: "MERN Stack Developer",
                company: "Edunet Foundation",
                duration: "Feb 2025 – Mar 2025",
                location: "Remote"
            },
            {
                title: "Web Development Intern",
                company: "IBM CSRBOX",
                duration: "Jun 2024 – Aug 2024",
                location: "Remote"
            }
        ],
        education: {
            degree: "Bachelor of Engineering in Information Technology",
            institution: "VPP's College Of Engineering & Visual Arts, Mumbai",
            completion: "Expected Oct 2026"
        }
    },
    skills: [
        { category: "Programming Languages", items: ["JavaScript", "Java", "Python", "C", "HTML", "CSS"] },
        { category: "Web Technologies", items: ["React.js", "Node.js", "Express.js", "MongoDB", "MySQL"] },
        { category: "Backend", items: ["Spring Boot", "RESTful APIs"] },
        { category: "Development Tools", items: ["Git", "GitHub", "Visual Studio Code", "RESTful APIs"] },
        { category: "Additional Tools", items: ["Canva", "Microsoft Office Suite", "Version Control"] },

    ],
    projects: [
        {
            title: "Ritu Veda - Menstrual Health Tracking Application",
            description: "Developed a menstrual health tracking web application with predictive analytics for cycle forecasting. Implemented real-time tracking for menstrual phases, ovulation periods, and fertile window calculations. Integrated automated notification system for reminders and alerts with interactive calendar interface.",
            technologies: ["MERN Stack", "Health Technology", "Predictive Analytics", "Automated Notifications"]
        },
        {
            title: "Campus Connect Social Media Platform",
            description: "Built a social media platform using MongoDB, Express.js, React.js, and Node.js for college students. Developed user authentication, profile management, and real-time messaging capabilities. Created responsive UI with community engagement tools and database management for user interactions.",
            technologies: ["MERN Stack", "Social Networking", "User Authentication",  "Responsive UI"]
        },
        {
            title: "Hotel Management System",
            description: "Developed a hotel management system using Java with object-oriented programming principles. Implemented booking management, guest registration, room tracking, and billing automation. Created graphical interface and designed relational database schema for efficient operations.",
            technologies: ["Java", "Object-Oriented Programming", "Database Management", "Booking Management", "Graphical Interface"]
        },


    ],
    resumeLink: "https://drive.google.com/file/d/1k9lSUEMftpc1DGxdtzLPC0uYegr-bh6x/view?usp=drive_link", // IMPORTANT: Replace with your actual resume link
    contact: {
        email: "adesindhu56@gmail.com", // Updated with your email
        phone: "+91-9834627459", // Updated with your phone number
        linkedin: "https://www.linkedin.com/in/sindhu-ade-22079b280/", // Updated with your LinkedIn profile
        github: "https://github.com/adesindhu" // Updated with your GitHub profile
    }
};

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    // Removed prompt, generatedProjectIdea, isLoading, error states as generate project section is removed
    // const [prompt, setPrompt] = useState('');
    // const [generatedProjectIdea, setGeneratedProjectIdea] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState('');

    // State for the contact form
    const [contactForm, setContactForm] = useState({
        name: '',
        userEmail: '',
        subject: '',
        message: ''
    });

    // Refs for each section to determine visibility on scroll
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const resumeRef = useRef(null);
    const contactRef = useRef(null);
    // Removed generateProjectRef as generate project section is removed
    // const generateProjectRef = useRef(null);

    // Map page names to their respective refs
    const sectionRefs = {
        home: homeRef,
        about: aboutRef,
        skills: skillsRef,
        projects: projectsRef,
        resume: resumeRef,
        contact: contactRef,
        // Removed generate_project from sectionRefs
        // generate_project: generateProjectRef,
    };

    // Function to handle navigation and smooth scroll
    const handleNavigation = (page) => {
        setCurrentPage(page);
        // Removed clearing generated idea and error as generate project section is removed
        // setGeneratedProjectIdea(''); // Clear generated idea when navigating away
        // setError(''); // Clear error when navigating away

        // Scroll to the target section
        if (sectionRefs[page] && sectionRefs[page].current) {
            sectionRefs[page].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Callback to check which section is in view and update currentPage
    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Check center of viewport

        let newCurrentPage = 'home'; // Default to home

        // Iterate through sections to find the one currently in view
        for (const page in sectionRefs) {
            const ref = sectionRefs[page];
            if (ref.current) {
                const sectionTop = ref.current.offsetTop;
                const sectionBottom = sectionTop + ref.current.offsetHeight;
                const navHeight = document.querySelector('.navbar-main')?.offsetHeight || 0; // Account for fixed nav height

                // Check if the section is at least partially visible in the viewport,
                // considering the navigation bar's height.
                if (scrollPosition >= sectionTop + navHeight && scrollPosition < sectionBottom) {
                    newCurrentPage = page;
                    break;
                }
            }
        }
        setCurrentPage(newCurrentPage);
    }, [sectionRefs]);

    // Effect to attach and detach scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Initial check on mount
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); // Re-run if handleScroll changes (due to useCallback dependencies)

    // Removed generateProject function as generate project section is removed
    /*
    const generateProject = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt to generate a project idea.");
            return;
        }

        setIsLoading(true);
        setError('');
        setGeneratedProjectIdea('');

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: `Generate a detailed project idea for a full stack Java developer based on the following concept: "${prompt}". Include potential technologies, features, and a brief architectural overview. The response should be in markdown format.` }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setGeneratedProjectIdea(text);
            } else {
                setError("Failed to generate project idea. Please try again.");
                console.error("API response structure unexpected:", result);
            }
        } catch (err) {
            setError("An error occurred while connecting to the API. Please check your network or try again later.");
            console.error("API call error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    */

    const handleContactFormChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleContactFormSubmit = (e) => {
        e.preventDefault();
        const { name, userEmail, subject, message } = contactForm;

        // Construct the mailto link
        const mailtoLink = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`)}`;

        // Open the user's default email client
        window.location.href = mailtoLink;

        // Optionally, clear the form after submission
        setContactForm({
            name: '',
            userEmail: '',
            subject: '',
            message: ''
        });
    };

    // Helper component for navigation items (moved here)
    const NavItem = ({ icon, label, onClick, active }) => {
        const navItemClasses = `nav-item ${active ? 'nav-item-active' : ''}`;
        return (
            <button onClick={onClick} className={navItemClasses}>
                {icon}
                <span className="nav-item-label">{label}</span>
            </button>
        );
    };

    // Navbar component (moved here)
    const Navbar = ({ currentPage, handleNavigation, portfolioName }) => {
        return (
            <nav className="navbar-main">
                <div className="navbar-container">
                    <div className="navbar-title">
                        <Code size={24} className="navbar-title-icon" style={{ color: '#9370DB' }}/> {/* Added Code icon with purple color */}
                        {portfolioName}
                    </div>
                    <div className="navbar-links">
                        <NavItem icon={<Home size={20} />} label="Home" onClick={() => handleNavigation('home')} active={currentPage === 'home'} />
                        <NavItem icon={<User size={20} />} label="About" onClick={() => handleNavigation('about')} active={currentPage === 'about'} />
                        <NavItem icon={<Lightbulb size={20} />} label="Skills" onClick={() => handleNavigation('skills')} active={currentPage === 'skills'} />
                        <NavItem icon={<Briefcase size={20} />} label="Projects" onClick={() => handleNavigation('projects')} active={currentPage === 'projects'} />
                        <NavItem icon={<FileText size={20} />} label="Resume" onClick={() => handleNavigation('resume')} active={currentPage === 'resume'} />
                        <NavItem icon={<Mail size={20} />} label="Contact" onClick={() => handleNavigation('contact')} active={currentPage === 'contact'} />
                        {/* Social media icons */}
                        <a href={`mailto:${portfolioData.contact.email}`} className="nav-item" title="Email">
                            <MailIcon size={20} />
                        </a>
                        <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="nav-item" title="GitHub">
                            <Github size={20} />
                        </a>
                        <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="nav-item" title="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </nav>
        );
    };


    return (
        <div className="portfolio-app">
            {/* All CSS styles are now embedded directly in this <style> tag */}
            <style>
                {`
                /* Global styles */
                html {
                    scroll-behavior: smooth;
                }

                body {
                    /* Animated background gradient: Black, Dark Purple, Vibrant Purple */
                    background: linear-gradient(270deg, #000000, #330033, #800080, #330033, #000000);
                    background-size: 400% 400%;
                    animation: gradientAnimation 15s ease infinite;
                    overflow-x: hidden; /* Prevent horizontal scroll from gradient */
                    font-family: 'Inter', sans-serif; /* Ensure Inter font is applied */
                    color: #E0E0E0; /* Base text color for dark background */
                }

                /* Custom Cursors */
                body {
                    /* Default custom cursor: A glowing purple star */
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%239370DB" fill-opacity="0.7" stroke="%239370DB" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>') 12 12, auto;
                }
                button, a {
                    /* Cursor effect on hover for interactive elements: A pulsating fuchsia arrow */
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="%23FF00FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4L4 20L20 36L36 20L20 4Z" fill="%23FF00FF" fill-opacity="0.3"><animate attributeName="d" from="M20 4L4 20L20 36L36 20L20 4Z" to="M20 0L0 16L16 32L32 16L16 0Z" dur="0.8s" begin="0s" repeatCount="indefinite" fill="freeze" /></path><path d="M20 4L4 20L20 36L36 20L20 4Z" stroke-opacity="0.9"><animate attributeName="stroke-opacity" from="0.9" to="0.5" dur="0.8s" begin="0s" repeatCount="indefinite" fill="freeze" /></path></svg>') 20 20, pointer;
                }

                /* Keyframes for fade-in animation */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }

                /* Keyframes for background gradient animation */
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Main App Container */
                .portfolio-app {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                /* Main Content Area */
                .main-content {
                    max-width: 1200px;
                    margin: 2rem auto;
                    padding: 1.5rem;
                    flex-grow: 1; /* Allows main content to expand */
                }

                /* Section Cards */
                .section-card {
                    background-color: #1a1a1a; /* Very dark gray/almost black */
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
                    margin-bottom: 3rem;
                    text-align: center; /* Default for home, overridden for others */
                }

                /* Headings */
                .section-heading {
                    font-size: 2.25rem; /* 4xl */
                    font-weight: bold;
                    color: #FF00FF; /* Fuchsia */
                    margin-bottom: 1.5rem;
                    border-bottom: 4px solid #800080; /* Darker Purple border */
                    padding-bottom: 0.5rem;
                    display: inline-block;
                    text-align: center;
                    width: auto; /* Adjust width based on content */
                }

                /* Home Section Specifics */
                .home-section {
                    text-align: center;
                }
                .home-title {
                    font-size: 3.5rem; /* 5xl */
                    font-weight: 800;
                    color: #FF00FF; /* Fuchsia */
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }
                .home-name {
                    color: #9370DB; /* Standard Purple */
                }
                .home-subtitle {
                    font-size: 2rem; /* 3xl */
                    font-weight: 600;
                    color: #E5E7EB; /* Gray-200 */
                    margin-bottom: 1.5rem;
                }
                .home-tagline {
                    font-size: 1.125rem; /* lg */
                    color: #D1D5DB; /* Gray-300 */
                    max-width: 48rem; /* max-w-2xl */
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 2rem;
                }

                /* Buttons */
                .button-group {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }
                .primary-button {
                    background-color: #800080; /* Darker Purple */
                    color: white;
                    font-weight: bold;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease-in-out;
                    transform: scale(1);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none; /* For anchor buttons */
                }
                .primary-button:hover {
                    background-color: #9932CC; /* Even darker Purple on hover */
                    transform: scale(1.05);
                }
                .primary-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .button-icon {
                    margin-right: 0.5rem;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* About Section */
                .about-section {
                    text-align: left; /* Align text left */
                }
                .about-description {
                    font-size: 1.125rem; /* lg */
                    color: #E5E7EB; /* Gray-200 */
                    line-height: 1.6;
                    margin-top: 1rem;
                    margin-bottom: 2rem; /* Added margin-bottom */
                }

                .about-details-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem; /* Space between boxes */
                }

                @media (min-width: 768px) { /* For larger screens, two columns */
                    .about-details-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                .detail-box {
                    background-color: #2a2a2a; /* Dark gray card */
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    border: 1px solid #3a3a3a; /* Darker border */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between; /* Distribute space */
                }

                .detail-box-experience {
                    text-align: left; /* Align experience left */
                }

                .detail-box-education {
                    text-align: right; /* Align education right */
                }

                @media (max-width: 767px) { /* On small screens, center both */
                    .detail-box-experience,
                    .detail-box-education {
                        text-align: center;
                    }
                }

                .detail-box h3 {
                    font-size: 1.25rem; /* xl */
                    font-weight: 600;
                    color: #FF00FF; /* Fuchsia */
                    margin-bottom: 0.5rem;
                }

                .detail-box p {
                    font-size: 1rem; /* base */
                    color: #E5E7EB; /* Gray-200 */
                    line-height: 1.5;
                }

                .detail-box p strong {
                    color: #9370DB; /* Standard Purple for strong text */
                }

                .experience-item {
                    margin-bottom: 1rem; /* Space between multiple experience entries */
                }
                .experience-item:last-child {
                    margin-bottom: 0; /* No margin after the last item */
                }


                /* Skills Section */
                .skills-section {
                    text-align: left;
                }
                .skills-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                @media (min-width: 768px) { /* md breakpoint */
                    .skills-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) { /* lg breakpoint */
                    .skills-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                .skill-category-card {
                    background-color: #2a2a2a; /* Dark gray card */
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    border: 1px solid #3a3a3a; /* Darker border */
                }
                .skill-category-title {
                    font-size: 1.5rem; /* 2xl */
                    font-weight: 600;
                    color: #FF00FF; /* Fuchsia */
                    margin-bottom: 1rem;
                }
                .skill-list {
                    list-style: none; /* Remove default list style */
                    padding-left: 0;
                    margin-top: 0;
                    color: #E5E7EB; /* Gray-200 */
                }
                .skill-list-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                .skill-bullet {
                    color: #9370DB; /* Light Purple */
                    margin-right: 0.5rem;
                    font-size: 1.2em; /* Make bullet slightly larger */
                }

                /* Projects Section */
                .projects-section {
                    text-align: left;
                }
                .projects-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                @media (min-width: 768px) { /* md breakpoint */
                    .projects-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                .project-card {
                    background-color: #2a2a2a; /* Dark gray card */
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    border: 1px solid #3a3a3a; /* Darker border */
                    transition: box-shadow 0.3s ease;
                }
                .project-card:hover {
                    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
                }
                .project-title {
                    font-size: 1.5rem; /* 2xl */
                    font-weight: 600;
                    color: #FF00FF; /* Fuchsia */
                    margin-bottom: 0.75rem;
                }
                .project-description {
                    color: #E5E7EB; /* Gray-200 */
                    margin-bottom: 1rem;
                }
                .project-tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .tech-tag {
                    background-color: #663399; /* Medium Purple */
                    color: #E5B2FF; /* Lighter Purple for text */
                    font-size: 0.875rem; /* sm */
                    font-weight: 500;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px; /* full rounded */
                }

                /* Resume Section */
                .resume-section {
                    text-align: center;
                }
                .resume-text {
                    font-size: 1.125rem; /* lg */
                    color: #E5E7EB; /* Gray-200 */
                    margin-bottom: 1.5rem;
                }
                .download-button {
                    /* Styles inherited from primary-button */
                }
                .resume-note {
                    font-size: 0.875rem; /* sm */
                    color: #9CA3AF; /* Gray-400 */
                    margin-top: 1rem;
                }

                /* Contact Section */
                .contact-section {
                    text-align: center;
                }
                .contact-heading {
                    width: 100%; /* Ensure heading spans full width for centering */
                }
                .contact-form-container {
                    display: flex;
                    justify-content: center;
                }
                .contact-form-card {
                    background-color: #2a2a2a; /* Dark gray card */
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    border: 1px solid #3a3a3a; /* Darker border */
                    width: 100%;
                    max-width: 28rem; /* max-w-md */
                }
                .contact-form-title {
                    font-size: 1.5rem; /* 2xl */
                    font-weight: 600;
                    color: #FF00FF; /* Fuchsia */
                    margin-bottom: 1rem;
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .form-group {
                    text-align: left;
                }
                .form-label {
                    display: block;
                    color: #E5E7EB; /* Gray-200 */
                    font-size: 0.875rem; /* sm */
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                .form-input,
                .form-textarea {
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                    border: 1px solid #4a4a4a; /* Darker border */
                    border-radius: 0.25rem;
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    background-color: #3a3a3a; /* Darker input background */
                    color: #F3F4F6; /* Gray-100 */
                    line-height: 1.25;
                    outline: none;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .form-input:focus,
                .form-textarea:focus {
                    border-color: #9370DB; /* Standard Purple focus */
                    box-shadow: 0 0 0 3px rgba(147, 112, 219, 0.5); /* Purple glow */
                }
                .send-message-button {
                    margin-top: 1rem;
                }
                .contact-note {
                    font-size: 0.875rem; /* sm */
                    color: #9CA3AF; /* Gray-400 */
                    margin-top: 0.5rem;
                }

                /* Removed Generate Project Section styles */
                /*
                .generate-project-section {
                    text-align: left;
                }
                .generate-project-text {
                    font-size: 1.125rem;
                    color: #E5E7EB;
                    margin-bottom: 1.5rem;
                }
                .project-prompt-textarea {
                }
                .generate-idea-button {
                    margin-top: 1rem;
                }
                .error-message {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background-color: #660000;
                    border: 1px solid #990000;
                    color: #FFCCCC;
                    border-radius: 0.5rem;
                }
                .error-title {
                    font-weight: bold;
                }
                .generated-idea-container {
                    margin-top: 1.5rem;
                    padding: 1.5rem;
                    background-color: #2a2a2a;
                    border: 1px solid #3a3a3a;
                    border-radius: 0.75rem;
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
                }
                .generated-idea-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #FF00FF;
                    margin-bottom: 1rem;
                }
                */

                /* Markdown styling for generated content */
                .prose-content h1, .prose-content h2, .prose-content h3, .prose-content h4, .prose-content h5, .prose-content h6 {
                    color: #FF00FF; /* Magenta */
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    font-weight: 700;
                }
                .prose-content p {
                    color: #E5E7EB; /* Gray-200 */
                    margin-bottom: 1em;
                }
                .prose-content ul, .prose-content ol {
                    color: #E5E7EB; /* Gray-200 */
                    margin-left: 1.5em;
                    margin-bottom: 1em;
                    list-style-type: disc; /* Ensure bullets for lists */
                }
                .prose-content li {
                    margin-bottom: 0.5em;
                }
                .prose-content code {
                    background-color: #374151; /* Gray-700 */
                    color: #F9FAFB; /* Gray-50 */
                    padding: 0.2em 0.4em;
                    border-radius: 0.3em;
                }
                .prose-content pre {
                    background-color: #1F2937; /* Gray-800 */
                    color: #F9FAFB; /* Gray-50 */
                    padding: 1em;
                    border-radius: 0.5em;
                    overflow-x: auto;
                }
                .prose-content a {
                    color: #CC33FF; /* Electric Purple for links */
                    text-decoration: underline;
                }

                /* Removed Footer styles */
                /*
                .footer-main {
                    background-color: #000000;
                    color: #9CA3AF;
                    padding: 1.5rem;
                    margin-top: 3rem;
                    border-top-left-radius: 1rem;
                    border-top-right-radius: 1rem;
                    text-align: center;
                }
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .footer-social-links {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .social-link {
                    color: #D1D5DB;
                    transition: color 0.3s ease;
                }
                .social-link:hover {
                    color: #9370DB;
                }
                */

                /* Navbar Container */
                .navbar-main {
                    background-color: #000000; /* Black nav background */
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4); /* Shadow */
                    padding: 1rem;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    border-bottom-left-radius: 1rem;
                    border-bottom-right-radius: 1rem;
                }

                .navbar-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                }

                @media (min-width: 768px) { /* md breakpoint */
                    .navbar-container {
                        justify-content: space-between;
                    }
                }

                /* Navbar Title */
                .navbar-title {
                    font-size: 1.5rem; /* 2xl */
                    font-weight: bold;
                    color: #9370DB; /* Changed to purple */
                    margin-bottom: 1rem;
                    display: flex; /* Added flex to align icon and text */
                    align-items: center; /* Vertically center icon and text */
                }
                .navbar-title-icon {
                    margin-right: 0.5rem; /* Space between icon and text */
                    color: #9370DB; /* Ensure icon is also purple */
                }

                @media (min-width: 768px) {
                    .navbar-title {
                        margin-bottom: 0;
                    }
                }

                /* Navbar Links */
                .navbar-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem; /* Reduced gap for closer icons */
                }

                @media (min-width: 768px) {
                    .navbar-links {
                        gap: 0.5rem; /* Reduced gap for larger screens too */
                    }
                }

                /* Nav Item Button */
                .nav-item {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 1rem; /* px-4 py-2 */
                    border-radius: 0.5rem; /* rounded-lg */
                    transition: all 0.3s ease-in-out;
                    color: #D1D5DB; /* Gray-300 */
                    background-color: transparent; /* Default transparent background */
                    border: none;
                    cursor: pointer;
                }

                .nav-item:hover {
                    background-color: #2a2a2a; /* Gray-800 on hover */
                    color: #FF00FF; /* Fuchsia on hover */
                }

                .nav-item-active {
                    background-color: #800080; /* Darker Purple active */
                    color: white;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Shadow */
                }

                .nav-item-label {
                    margin-left: 0.5rem; /* ml-2 */
                    font-weight: 500; /* font-medium */
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .main-content {
                        padding: 1rem;
                    }
                    .home-title {
                        font-size: 2.5rem;
                    }
                    .home-subtitle {
                        font-size: 1.5rem;
                    }
                    .section-heading {
                        font-size: 1.75rem;
                    }
                    .primary-button {
                        padding: 0.6rem 1.2rem;
                        font-size: 0.9rem;
                    }
                    .button-group {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                    .skills-grid, .projects-grid {
                        grid-template-columns: 1fr;
                    }
                }
                `}
            </style>

            {/* Navigation Bar */}
            <Navbar
                currentPage={currentPage}
                handleNavigation={handleNavigation}
                portfolioName={portfolioData.home.name.split(' ')[0]}
            />

            {/* Main Content Area */}
            <main className="main-content">
                <section ref={homeRef} id="home" className="section-card home-section animate-fade-in">
                    <h1 className="home-title">
                        Hi, I'm <span className="home-name">{portfolioData.home.name}</span>
                    </h1>
                    <p className="home-subtitle">
                        {portfolioData.home.title}
                    </p>
                    <p className="home-tagline">
                        {portfolioData.home.tagline}
                    </p>
                    <div className="button-group">
                        <button
                            onClick={() => handleNavigation('contact')}
                            className="primary-button"
                        >
                            Get in Touch
                        </button>
                    </div>
                </section>

                <section ref={aboutRef} id="about" className="section-card about-section animate-fade-in">
                    <h2 className="section-heading">About Me</h2>
                    <p className="about-description">{portfolioData.about.description}</p>

                    <div className="about-details-grid">
                        <div className="detail-box detail-box-experience">
                            <h3>Experience</h3>
                            {portfolioData.about.experience.map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <p><strong>{exp.title}</strong> at {exp.company}</p>
                                    <p>{exp.duration} ({exp.location})</p>
                                </div>
                            ))}
                        </div>
                        <div className="detail-box detail-box-education">
                            <h3>Education</h3>
                            <p><strong>{portfolioData.about.education.degree}</strong></p>
                            <p>{portfolioData.about.education.institution}</p>
                            <p>{portfolioData.about.education.completion}</p>
                        </div>
                    </div>
                </section>

                <section ref={skillsRef} id="skills" className="section-card skills-section animate-fade-in">
                    <h2 className="section-heading">My Skills</h2>
                    <div className="skills-grid">
                        {portfolioData.skills.map((skillCategory, index) => (
                            <div key={index} className="skill-category-card">
                                <h3 className="skill-category-title">{skillCategory.category}</h3>
                                <ul className="skill-list">
                                    {skillCategory.items.map((item, idx) => (
                                        <li key={idx} className="skill-list-item">
                                            <span className="skill-bullet">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={projectsRef} id="projects" className="section-card projects-section animate-fade-in">
                    <h2 className="section-heading">My Projects</h2>
                    <div className="projects-grid">
                        {portfolioData.projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech-tags">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={resumeRef} id="resume" className="section-card resume-section animate-fade-in">
                    <h2 className="section-heading">My Resume</h2>
                    <p className="resume-text">
                        You can download my full resume by clicking the button below.
                    </p>
                    <a
                        href={portfolioData.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-button download-button"
                    >
                        <FileText size={20} className="button-icon" /> Download Resume
                    </a>
                    <p className="resume-note"></p>
                </section>

                <section ref={contactRef} id="contact" className="section-card contact-section animate-fade-in">
                    <h2 className="section-heading contact-heading">Contact Me</h2>
                    <div className="contact-form-container">
                        <div className="contact-form-card">
                            <h3 className="contact-form-title">Send a Message</h3>
                            <form onSubmit={handleContactFormSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactFormChange}
                                        className="form-input"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userEmail" className="form-label">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="userEmail"
                                        name="userEmail"
                                        value={contactForm.userEmail}
                                        onChange={handleContactFormChange}
                                        className="form-input"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                    
                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={contactForm.message}
                                        onChange={handleContactFormChange}
                                        className="form-textarea"
                                        placeholder="Your message here..."
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="primary-button send-message-button"
                                >
                                    <Send size={20} className="button-icon" /> Send Message
                                </button>
                                <p className="contact-note"></p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Include marked.js for Markdown parsing (for the generated project idea)
// This script should be loaded in your HTML file before your React app.
// <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
// For Canvas, we assume it's available or you'd include it in a <script> tag if this were a pure HTML file.
const marked = window.marked;


export default App;
