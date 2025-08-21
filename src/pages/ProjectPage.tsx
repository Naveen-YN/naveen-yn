import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Star, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  TrendingUp,
  Code,
  Layers,
  Zap,
  Award,
  Eye,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  RotateCcw,
  Circle,
  Clock,
  Flag,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  Check,
  GitFork,
  GitCommit,
  AlertCircle,
  BookOpen,
  UserCheck
} from 'lucide-react';

// --- INTERFACES ---
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  slug: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  challenges?: string[];
  outcomes?: string[];
  status?: 'completed' | 'in-progress' | 'planned' | 'n/a';
  category?: string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  teamSize?: number;
  role?: string;
  keyMetrics?: { label: string; value: string }[];
  screenshots?: string[];
  startDate?: string;
  endDate?: string;
  link?: string;
  liveDemo?: string;
  milestones?: { date: string; description: string }[];
  contributors?: string[];
  impact?: string;
  completionPercentage?: number;
}

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

// --- GITHUB INTERFACES ---
interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  languages_url: string;
  open_issues_count: number;
  topics: string[];
  html_url: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
}

// --- PROJECT DATA ---
const projects: Project[] = [
    {
    id: '1',
    title: 'Personal Portfolio Website',
    slug: 'portfolio',
    description: 'My personal portfolio website showcasing projects and skills.',
    image: 'https://cdn.dribbble.com/users/149571/screenshots/4819891/media/74a587970b8849c7a23b36113b52ed71.gif',
    tags: ['Portfolio', 'React', 'Vue', 'TypeScript', 'MongoDB'],
    longDescription: 'This portfolio is a dynamic and interactive platform built to showcase my journey, skills, and projects. Developed with a keen eye for design and user experience, it serves as a central hub for my professional and personal work. The site is fully responsive, ensuring a seamless experience across all devices, from desktops to mobile phones.',
    features: ['Responsive Design', 'Dynamic Project Filtering', 'Interactive UI/UX', 'Contact Form Integration', 'Accessibility Optimized', 'SEO Optimized'],
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    challenges: ['Ensuring optimal performance and fast load times with media-rich content.', 'Creating a unique and memorable design that stands out.'],
    outcomes: ['A polished and professional online presence that effectively showcases my skills.', 'A flexible and scalable platform to continuously add new projects.'],
    status: 'in-progress',
    category: 'Personal',
    priority: 'high',
    teamSize: 1,
    role: 'Full Stack Developer',
    keyMetrics: [{ label: 'Page Speed', value: '98/100' }, { label: 'Accessibility', value: '100/100' }],
    screenshots: [
      'https://cdn.dribbble.com/userupload/4255318/file/original-486a014a6e355c3c0b396e00bdfb925f.png',
      'https://cdn.dribbble.com/userupload/3158905/file/original-4a67812da2a8069542a27525381283c2.jpg'
    ],
    startDate: '2024-12',
    endDate: '2025-04',
    link: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/portfolio.gif',
    liveDemo: 'https://your-portfolio.com',
    milestones: [
      { date: '2024-12-01', description: 'Project Initialized & Design Phase' },
      { date: '2025-01-15', description: 'Core Features Implemented' },
      { date: '2025-03-01', description: 'Beta Release' }
    ],
    contributors: ['Naveen YN'],
    impact: 'Increased professional visibility and attracted freelance opportunities.',
    completionPercentage: 70
  },
  {
    id: '2',
    title: 'GestureFlow: Advanced Hand Gesture Control',
    slug: 'gestureflow',
    description: 'A real-time hand gesture control application for contactless interaction.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/gesture.jpg',
    tags: ['Python', 'Computer Vision', 'AI', 'OpenCV', 'MediaPipe'],
    longDescription: 'Built a real-time hand gesture control application using MediaPipe and OpenCV for contactless interaction. The system recognizes various hand gestures to control cursor movement, clicks, scrolling, volume, and even application switching, providing a seamless, futuristic user experience.',
    features: ['Real-time Hand Tracking', 'Cursor & Click Control', 'Scroll & Volume Gestures', 'App Switching', 'Custom Gesture Support', 'Gesture Sensitivity Adjustment', 'Multi-user Support'],
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'pynput', 'pyautogui'],
    challenges: ['Achieving low-latency tracking for a smooth user experience.', 'Minimizing false positives from unintended hand movements.'],
    outcomes: ['A fully functional contactless control system for desktops.', 'The project deepened my understanding of computer vision and real-time data processing.'],
    status: 'completed',
    category: 'Academic',
    priority: 'medium',
    teamSize: 1,
    role: 'Developer',
    keyMetrics: [{ label: 'Gesture Accuracy', value: '96%' }, { label: 'Frame Rate', value: '30 FPS' }],
    screenshots: [
      'https://miro.medium.com/v2/resize:fit:1400/1*x0-sC0_w_RB2d6b3c2C5kQ.gif',
      'https://miro.medium.com/v2/resize:fit:1200/1*B1Csz2--c43z3f_Jg4B3-A.gif'
    ],
    startDate: '2024-12',
    endDate: '2025-04',
    link: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/gesture.jpg',
    liveDemo: '',
    milestones: [
      { date: '2024-12-01', description: 'Initial Research & Setup' },
      { date: '2025-02-15', description: 'Core Gesture Recognition Implemented' },
      { date: '2025-04-01', description: 'Final Release' }
    ],
    contributors: ['Naveen YN'],
    impact: 'Demonstrated potential for accessibility improvements in human-computer interaction.',
    completionPercentage: 100
  },
  {
    id: '3',
    title: 'Potato Leaf Disease Identification using DL',
    slug: 'potato-leaf-disease',
    description: 'A deep learning application for identifying diseases in potato leaves.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/potato.jpg',
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'TensorFlow', 'Keras'],
    longDescription: 'Developed a robust disease identification application for potato crops using a ResNet50 model to classify early blight, late blight, and healthy leaves. It provides high-accuracy predictions to assist farmers in early disease detection and management. The project includes a user-friendly PyQt5 interface for easy image uploads and real-time analysis.',
    features: ['ResNet50-based Classification', 'High-Accuracy Predictions', 'User-Friendly PyQt5 GUI', 'Real-time Insights', 'Data Visualization', 'Exportable Results', 'Batch Processing'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'ResNet50', 'OpenCV', 'PyQt5'],
    challenges: ['Sourcing and preprocessing a large, diverse, and well-labeled dataset.', 'Fine-tuning the model to achieve high accuracy without overfitting.'],
    outcomes: ['Achieved 98.5% accuracy in classifying potato leaf diseases.', 'Created a practical tool that can have a real-world impact on agriculture.'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 6,
    role: 'Developer and Team Lead',
    keyMetrics: [{ label: 'Model Accuracy', value: '98.5%' }],
    screenshots: [
      'https://media.geeksforgeeks.org/wp-content/uploads/20230721123238/fig-1-660.jpg',
      'https://www.researchgate.net/publication/349421278/figure/fig2/AS:993888563720192@1613998745582/The-GUI-for-potato-leaf-disease-detection.jpg'
    ],
    startDate: '2023-08',
    endDate: '2024-01',
    link: 'https://github.com/Naveen-YN/Potato-Leaf-Disease-Identification-using-Deep-Learning',
    liveDemo: '',
    milestones: [
      { date: '2023-08-01', description: 'Dataset Collection' },
      { date: '2023-10-15', description: 'Model Training Completed' },
      { date: '2024-01-01', description: 'GUI Integration & Deployment' }
    ],
    contributors: ['Naveen YN', 'John Doe', 'Jane Smith'],
    impact: 'Empowered farmers with early disease detection, potentially increasing crop yields.',
    completionPercentage: 100
  },
  {
    id: '4',
    title: 'Brain Tumor & Lung Disease Detection',
    slug: 'brain-tumor-lung-disease',
    description: 'AI-based medical image classification for brain tumor and lung disease diagnosis.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/brain-lung.jpg',
    tags: ['Python', 'Deep Learning', 'TensorFlow', 'CNN', 'Medical AI'],
    longDescription: 'Developed deep learning models to detect brain tumors and lung diseases from medical imaging datasets. This project explores the application of Convolutional Neural Networks (CNNs) in healthcare to provide accurate, automated diagnostic support, potentially speeding up the work of medical professionals.',
    features: ['CNN-based Detection Models', 'Medical Dataset Training', 'High Diagnostic Accuracy', 'Interpretable Results', 'Model Visualization', 'Batch Processing', 'Cross-validation Support'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn'],
    challenges: ['Handling the high stakes and precision required for medical imaging analysis.', 'Working with imbalanced and complex medical datasets.'],
    outcomes: ['Developed models with high sensitivity and specificity for disease detection.', 'Gained invaluable experience in the MedTech AI domain.'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'ML Engineer',
    keyMetrics: [{ label: 'Tumor Detection Accuracy', value: '97%' }],
    screenshots: [
      'https://www.researchgate.net/publication/351654160/figure/fig3/AS:1025251649990660@1621453472010/The-graphical-user-interface-GUI-of-the-proposed-system.jpg'
    ],
    startDate: '2023-06',
    endDate: '2023-12',
    link: 'https://github.com/Naveen-YN/Brain-Tumor-and-Lung-Disease-Detection-using-Deep-Learning',
    liveDemo: '',
    milestones: [
      { date: '2023-06-01', description: 'Project Planning & Dataset Acquisition' },
      { date: '2023-09-15', description: 'Model Development' },
      { date: '2023-12-01', description: 'Final Testing & Deployment' }
    ],
    contributors: ['Naveen YN'],
    impact: 'Contributed to advancements in automated medical diagnostics.',
    completionPercentage: 100
  },
  {
    id: '5',
    title: 'Virtual Healthcare Companion Chatbot using NLTK',
    slug: 'healthcare-chatbot',
    description: 'A full-stack AI-powered chatbot for healthcare queries using NLTK and Gemini API.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/healthcare.jpg',
    tags: ['Python', 'Django', 'NLTK', 'NLP', 'Gradio', 'Gemini API'],
    longDescription: 'Built an interactive, full-stack chatbot to answer medical queries. It uses Natural Language Toolkit (NLTK) for initial NLP processing and integrates with the Gemini API for advanced, context-aware responses. The backend is powered by Django, with a user-friendly Gradio interface.',
    features: ['Text & Voice Interface', 'Healthcare Q&A', 'Gemini API Integration', 'User Personalization', 'Multi-language Support', 'Context Memory', 'Sentiment Analysis'],
    technologies: ['Python', 'NLTK', 'Django', 'Gradio', 'Gemini API'],
    challenges: ['Ensuring the chatbot provides safe and reliable information.', 'Managing context and conversation flow effectively.'],
    outcomes: ['A highly interactive and intelligent healthcare assistant.', 'Successfully integrated multiple AI technologies into a cohesive full-stack application.'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'Team Lead and Developer',
    keyMetrics: [{ label: 'Response Accuracy', value: '94%' }],
    screenshots: [
      'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/healthcare.jpg'
    ],
    startDate: '2024-03',
    endDate: '2024-08',
    link: 'https://github.com/Naveen-YN/Virtual-Healthcare-Companion-Chatbot-Utilizing-NLTK',
    liveDemo: '',
    milestones: [
      { date: '2024-03-01', description: 'Backend Setup & API Integration' },
      { date: '2024-06-15', description: 'Frontend Development' },
      { date: '2024-08-01', description: 'Final Deployment' }
    ],
    contributors: ['Naveen YN'],
    impact: 'Improved access to preliminary healthcare information for users.',
    completionPercentage: 100
  },
  {
    id: '6',
    title: 'Image Classification on CIFAR-10',
    slug: 'cifar10-classification',
    description: 'Deep learning image classification project with GUI using PyQt5 and TensorFlow.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/img-classifi.jpg',
    tags: ['Python', 'Deep Learning', 'PyQt5', 'TensorFlow', 'CIFAR-10'],
    longDescription: 'Implemented a CNN to classify images from the well-known CIFAR-10 dataset. This project serves as a foundational exercise in deep learning, complete with a PyQt5 GUI that allows users to upload their own images for real-time classification into one of the ten categories.',
    features: ['CNN Training on CIFAR-10', 'PyQt5 GUI for Interaction', 'Real-time Classification', 'Model Visualization', 'Prediction Confidence Display', 'Batch Prediction'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'PyQt5', 'NumPy'],
    challenges: ['Building and training a CNN architecture from scratch.', 'Integrating the TensorFlow model into a desktop GUI application.'],
    outcomes: ['A solid end-to-end image classification application.', 'Gained fundamental experience in model training and deployment.'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'Developer',
    keyMetrics: [{ label: 'Test Accuracy', value: '92.3%' }],
    screenshots: [],
    startDate: '2023-04',
    endDate: '2023-08',
    link: 'https://github.com/Naveen-YN/Image-Classification-Using-Deep-Learning-Techniques-on-the-CIFAR-10',
    liveDemo: '',
    milestones: [
      { date: '2023-04-01', description: 'Initial Setup & Data Preparation' },
      { date: '2023-06-15', description: 'Model Training' },
      { date: '2023-08-01', description: 'GUI Implementation & Testing' }
    ],
    contributors: ['Naveen YN'],
    impact: 'Enhanced understanding of deep learning model deployment.',
    completionPercentage: 100
  },
];

// --- UTILITY FUNCTIONS ---
const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed': return 'bg-gradient-to-r from-green-600/40 to-green-800/40 text-green-200 hover:from-green-600/60 hover:to-green-800/60 border border-green-600/60 shadow-sm shadow-green-700/30';
    case 'in-progress': return 'bg-gradient-to-r from-yellow-600/40 to-yellow-800/40 text-yellow-200 hover:from-yellow-600/60 hover:to-yellow-800/60 border border-yellow-600/60 shadow-sm shadow-yellow-700/30';
    case 'planned': return 'bg-gradient-to-r from-blue-600/40 to-blue-800/40 text-blue-200 hover:from-blue-600/60 hover:to-blue-800/60 border border-blue-600/60 shadow-sm shadow-blue-700/30';
    case 'n/a': return 'bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-200 hover:from-gray-600/60 hover:to-gray-800/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
    default: return 'bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-200 hover:from-gray-600/60 hover:to-gray-800/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'Academic': return 'bg-gradient-to-r from-blue-700/40 to-blue-900/40 text-blue-100 hover:from-blue-700/60 hover:to-blue-900/60 border border-blue-700/60 shadow-sm shadow-blue-800/30';
    case 'Personal': return 'bg-gradient-to-r from-purple-700/40 to-purple-900/40 text-purple-100 hover:from-purple-700/60 hover:to-purple-900/60 border border-purple-700/60 shadow-sm shadow-purple-800/30';
    default: return 'bg-gradient-to-r from-gray-700/40 to-gray-900/40 text-gray-100 hover:from-gray-700/60 hover:to-gray-900/60 border border-gray-700/60 shadow-sm shadow-gray-800/30';
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'bg-gradient-to-r from-red-600/40 to-red-800/40 text-red-200 hover:from-red-600/60 hover:to-red-800/60 border border-red-600/60 shadow-sm shadow-red-700/30';
    case 'medium': return 'bg-gradient-to-r from-yellow-600/40 to-yellow-800/40 text-yellow-200 hover:from-yellow-600/60 hover:to-yellow-800/60 border border-yellow-600/60 shadow-sm shadow-yellow-700/30';
    case 'low': return 'bg-gradient-to-r from-green-600/40 to-green-800/40 text-green-200 hover:from-green-600/60 hover:to-green-800/60 border border-green-600/60 shadow-sm shadow-green-700/30';
    case 'none': return 'bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-200 hover:from-gray-600/60 hover:to-gray-800/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
    default: return 'bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-200 hover:from-gray-600/60 hover:to-gray-800/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
  }
};

const colorCache: { [key: string]: { background: string; text: string } } = {};
const languageColors = [
    { background: '#3178c6', text: '#ffffff' }, // TypeScript
    { background: '#f1e05a', text: '#000000' }, // JavaScript
    { background: '#e34c26', text: '#ffffff' }, // HTML
    { background: '#563d7c', text: '#ffffff' }, // CSS
    { background: '#3572A5', text: '#ffffff' }, // Python
    { background: '#b07219', text: '#ffffff' }, // Java
    { background: '#f34b7d', text: '#ffffff' }, // C++
    { background: '#4F5D95', text: '#ffffff' }, // PHP
    { background: '#c6538c', text: '#ffffff' }, // SCSS
    { background: '#2b7489', text: '#ffffff' }, // Vue
    { background: '#61DAFB', text: '#000000' }, // React
];

const getLanguageColor = (language: string) => {
    if (colorCache[language]) {
        return colorCache[language];
    }
    const hash = language.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = languageColors[hash % languageColors.length];
    colorCache[language] = color;
    return color;
};

const getTitleFontSize = (title: string) => {
  if (title.length > 40) return 'text-base sm:text-lg md:text-xl';
  if (title.length > 30) return 'text-lg sm:text-xl md:text-2xl';
  if (title.length > 20) return 'text-xl sm:text-2xl md:text-3xl';
  return 'text-2xl sm:text-3xl md:text-4xl';
};

const formatDate = (dateString: string) => {
    if (dateString.match(/^\d{4}-\d{2}$/)) {
        const [year, month] = dateString.split('-');
        return new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    }
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

// --- ANIMATED NUMBER COMPONENT ---
const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const valueRef = useRef(value);

  useEffect(() => {
    if (valueRef.current !== value) {
        valueRef.current = value;
    }
    const end = valueRef.current;
    if (end === 0) {
        setCount(0);
        return;
    }
    let start = 0;
    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count.toLocaleString()}</span>;
};

// --- LANGUAGE BAR COMPONENT ---
const LanguageBar: React.FC<{ languages: Record<string, number> }> = ({ languages }) => {
  const [totalBytes, setTotalBytes] = useState(0);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  useEffect(() => {
    setTotalBytes(Object.values(languages).reduce((acc, bytes) => acc + bytes, 0));
  }, [languages]);

  if (totalBytes === 0) {
    return (
        <ScrollAnimatedSection>
            <div className="h-8 bg-gray-800/50 rounded-md animate-pulse w-1/3"></div>
            <div className="h-4 bg-gray-800/50 rounded-full animate-pulse"></div>
            <div className="flex gap-4">
                <div className="h-4 bg-gray-800/50 rounded-md animate-pulse w-1/4"></div>
                <div className="h-4 bg-gray-800/50 rounded-md animate-pulse w-1/4"></div>
                <div className="h-4 bg-gray-800/50 rounded-md animate-pulse w-1/4"></div>
            </div>
        </ScrollAnimatedSection>
    );
  }

  const languageEntries = Object.entries(languages);

  return (
    <ScrollAnimatedSection>
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <Code className="text-[#09c6f9]" size={28} />
        Language Breakdown
      </h2>
      <div className="w-full bg-gray-800/50 rounded-full h-4 flex overflow-hidden shadow-inner relative">
        {languageEntries.map(([lang, bytes], index) => (
          <motion.div
            key={lang}
            className="h-full cursor-pointer"
            style={{
              width: `${(bytes / totalBytes) * 100}%`,
              backgroundColor: getLanguageColor(lang).background,
            }}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: `${(bytes / totalBytes) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredLang(`${lang}: ${((bytes / totalBytes) * 100).toFixed(2)}%`)}
            onMouseLeave={() => setHoveredLang(null)}
          />
        ))}
         <AnimatePresence>
            {hoveredLang && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md shadow-lg pointer-events-none"
                >
                    {hoveredLang}
                </motion.div>
            )}
        </AnimatePresence>
      </div>
       <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
        {languageEntries.map(([lang, bytes]) => (
          <div key={lang} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(lang).background }} />
            <span className="text-gray-300">{lang}</span>
            <span className="text-gray-500">{((bytes / totalBytes) * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </ScrollAnimatedSection>
  );
};

// --- RECENT ACTIVITY COMPONENT ---
const RecentActivity: React.FC<{ commits: GitHubCommit[], repoUrl?: string }> = ({ commits, repoUrl }) => {
  if (commits.length === 0) {
    return (
        <ScrollAnimatedSection>
             <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <GitCommit className="text-[#09c6f9]" size={28} />
                Recent Activity
            </h2>
            <div className="text-gray-400 p-4 bg-gray-900/50 rounded-xl border border-gray-800/50">No recent commits found.</div>
        </ScrollAnimatedSection>
    );
  }

  return (
    <ScrollAnimatedSection>
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <GitCommit className="text-[#09c6f9]" size={28} />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {commits.map((item, index) => (
          <motion.a
            key={item.sha}
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800/50 hover:border-[#09c6f9]/30 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <GitCommit className="text-gray-500 group-hover:text-[#09c6f9] transition-colors flex-shrink-0" size={24} />
            <div className="flex-grow overflow-hidden">
                <p className="text-white font-medium truncate group-hover:text-[#09c6f9] transition-colors">
                    {item.commit.message}
                </p>
                <div className="text-xs text-gray-400 mt-1 flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{item.commit.author.name}</span>
                  <span>&bull;</span>
                  <span>{timeSince(item.commit.author.date)}</span>
                   <span>&bull;</span>
                   <span className="font-mono text-xs text-gray-500">{item.sha.substring(0, 7)}</span>
                </div>
            </div>
          </motion.a>
        ))}
      </div>
       {repoUrl && (
            <div className="mt-6 text-center">
                <a
                    href={`${repoUrl}/commits`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                    View All Commits <ExternalLink size={14} />
                </a>
            </div>
        )}
    </ScrollAnimatedSection>
  );
};


// --- MY ROLE COMPONENT ---
const MyRole: React.FC<{ role?: string, teamSize?: number, lastUpdated?: string }> = ({ role, teamSize, lastUpdated }) => {
    if (!role && !teamSize && !lastUpdated) return null;

    return (
        <ScrollAnimatedSection>
            <div className="p-6 rounded-2xl bg-gray-900/50 border-gray-800/50 border shadow-lg">
                {role && (
                    <motion.div 
                        className="flex items-start gap-4 mb-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    >
                        <UserCheck className="text-[#09c6f9] flex-shrink-0 mt-1" size={20} />
                        <div>
                            <div className="text-sm text-gray-400">My Role</div>
                            <div className="text-lg font-semibold">{role}</div>
                        </div>
                    </motion.div>
                )}
                {teamSize && (
                  <motion.div
                    className="flex items-start gap-4 mb-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  >
                    <Users className="text-[#09c6f9] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm text-gray-400">Team Size</div>
                      <div className="text-lg font-semibold"><AnimatedNumber value={teamSize} /></div>
                    </div>
                  </motion.div>
                )}
                {lastUpdated && (
                    <motion.div 
                        className="flex items-start gap-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    >
                        <Clock className="text-[#09c6f9] flex-shrink-0 mt-1" size={20} />
                        <div>
                            <div className="text-sm text-gray-400">Last Updated</div>
                            <div className="text-lg font-semibold">{timeSince(lastUpdated)}</div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ScrollAnimatedSection>
    );
};


// --- TIMELINE COMPONENT ---
const InteractiveTimeline: React.FC<{ startDate: string; endDate?: string; milestones?: { date: string; description: string }[] }> = ({ startDate, endDate, milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  
  return (
    <div className="relative">
      <div className="h-2 bg-gray-800/50 rounded-full">
        <motion.div
          className="h-2 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: endDate ? '100%' : '50%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-300">
        <span>{formatDate(startDate)}</span>
        <span>{endDate ? formatDate(endDate) : 'Ongoing'}</span>
      </div>
      {milestones && milestones.length > 0 && (
        <div className="mt-4 space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="relative pl-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#09c6f9] rounded-full" />
              <motion.div
                className="p-4 bg-gray-900/50 rounded-xl border border-gray-800/50 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedMilestone(index === selectedMilestone ? null : index)}
              >
                <div className="text-sm text-gray-400">{formatDate(milestone.date)}</div>
                <div className="text-white font-medium">{milestone.description}</div>
                <AnimatePresence>
                  {selectedMilestone === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-gray-300 text-sm"
                    >
                      Milestone details for {milestone.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- CONTRIBUTORS COMPONENT ---
const ContributorsList: React.FC<{ repoUrl?: string }> = ({ repoUrl }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxVisible = 3;

  useEffect(() => {
    if (!repoUrl) {
      setIsLoading(false);
      return;
    }

    const fetchContributors = async () => {
      try {
        const urlParts = repoUrl.split('/');
        const owner = urlParts[3];
        const repo = urlParts[4];
        if (!owner || !repo) {
            setIsLoading(false);
            return;
        }

        let allContributors: Contributor[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=${page}`,
            {
              headers: {
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }
          );

          if (!response.ok) {
            if (response.status === 403) {
              console.warn('GitHub API rate limit exceeded');
              break;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data: Contributor[] = await response.json();
          allContributors = [...allContributors, ...data];
          hasMore = data.length === 100;
          page++;
        }

        setContributors(allContributors);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching contributors:', error);
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, [repoUrl]);

  const visibleContributors = isExpanded ? contributors : contributors.slice(0, maxVisible);

  return (
    <ScrollAnimatedSection>
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <Users className="text-[#09c6f9]" size={28} />
        Contributors
      </h2>
      {isLoading ? (
        <div className="text-gray-400">Loading contributors...</div>
      ) : contributors.length === 0 ? (
        <div className="text-gray-400">No contributors found.</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4">
            {visibleContributors.map((contributor, index) => (
              <motion.a
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800/50 hover:border-[#09c6f9]/30"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={contributor.avatar_url}
                  alt={`${contributor.login}'s avatar`}
                  className="w-10 h-10 rounded-full"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{contributor.login}</div>
                  <div className="text-xs text-gray-400">
                    <AnimatedNumber value={contributor.contributions} /> commits
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          {contributors.length > maxVisible && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-200 hover:from-gray-600/60 hover:to-gray-800/60 border border-gray-600/60 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {isExpanded ? 'Show Less' : `Show ${contributors.length - maxVisible} More`}
            </motion.button>
          )}
        </>
      )}
    </ScrollAnimatedSection>
  );
};

// --- IMPACT SECTION ---
const ImpactSection: React.FC<{ impact: string }> = ({ impact }) => {
  return (
    <ScrollAnimatedSection>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-600/30 shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 z-10 relative">
                <Award className="text-[#09c6f9]" size={28} />
                Project Impact
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mt-4 z-10 relative">
                {impact}
            </p>
        </div>
    </ScrollAnimatedSection>
  );
};

// --- SCROLL ANIMATED SECTION ---
const ScrollAnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
};

// --- INTERACTIVE IMAGE GALLERY ---
const InteractiveImageGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isAutoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!images) return;
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else if (e.key === 'Escape' && isImageModalOpen) {
        setIsImageModalOpen(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen, images]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 1));

  return (
    <ScrollAnimatedSection>
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <Eye className="text-[#09c6f9]" size={28} />
        Project Gallery
      </h2>
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 border-gray-800/50 border shadow-lg">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
            onClick={() => setIsImageModalOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
          {images.length > 1 && (
            <>
              <motion.button
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </motion.button>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <motion.button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isAutoPlay ? "Pause autoplay" : "Start autoplay"}
                  aria-pressed={isAutoPlay}
                >
                  {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                </motion.button>
                <motion.button
                  onClick={() => setCurrentImageIndex(0)}
                  className="p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Reset gallery"
                >
                  <RotateCcw size={16} />
                </motion.button>
              </div>
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => { setIsImageModalOpen(false); setZoomLevel(1); }}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-gray-900/80 rounded-xl p-6 overflow-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => { setIsImageModalOpen(false); setZoomLevel(1); }}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close image modal"
              >
                <X size={24} />
              </motion.button>
              <motion.div
                style={{ transform: `scale(${zoomLevel})` }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <img
                  ref={imageRef}
                  src={images[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  loading="lazy"
                />
              </motion.div>
              <div className="flex justify-between mt-4">
                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                      className="p-3 bg-black/60 hover:bg-black/80 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Previous image in modal"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleZoomIn}
                        className="p-3 bg-black/60 hover:bg-black/80 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Zoom in"
                      >
                        <ZoomIn size={24} />
                      </motion.button>
                      <motion.button
                        onClick={handleZoomOut}
                        className="p-3 bg-black/60 hover:bg-black/80 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Zoom out"
                      >
                        <ZoomOut size={24} />
                      </motion.button>
                    </div>
                    <motion.button
                      onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                      className="p-3 bg-black/60 hover:bg-black/80 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Next image in modal"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollAnimatedSection>
  );
};

// --- PROGRESS BAR COMPONENT ---
const ProjectProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <ScrollAnimatedSection>
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <TrendingUp className="text-[#09c6f9]" size={28} />
        Project Progress
      </h2>
      <div className="bg-gray-800/50 rounded-full h-4">
        <motion.div
          className="bg-gradient-to-r from-[#045de9] to-[#09c6f9] h-4 rounded-full"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
      <div className="text-right mt-2 text-gray-300">{percentage}% Complete</div>
    </ScrollAnimatedSection>
  );
};

// --- BACK TO TOP BUTTON ---
const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- COPY NOTIFICATION ---
const CopyNotification: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[90%] sm:max-w-xs w-full p-4 bg-gradient-to-r from-[#045de9] to-[#09c6f9] text-white rounded-xl shadow-lg flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Check size={20} />
          <span className="text-sm sm:text-base">Project URL copied to clipboard!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- GITHUB TOPICS COMPONENT ---
const GitHubTopics: React.FC<{ topics: string[] }> = ({ topics }) => {
    if (!topics || topics.length === 0) {
        return null;
    }
    return (
      <ScrollAnimatedSection>
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <Layers className="text-[#09c6f9]" size={28} />
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((tag, index) => (
            <motion.span
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getTagColor(tag)} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </ScrollAnimatedSection>
    );
};

// --- README COMPONENT ---
const ReadmeSection: React.FC<{ content: string }> = ({ content }) => {
    return (
        <ScrollAnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="text-[#09c6f9]" size={28} />
                Project README
            </h2>
            <motion.div 
                className="prose prose-invert prose-sm sm:prose-base max-w-none p-6 bg-gray-900/50 rounded-xl border border-gray-800/50"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </ScrollAnimatedSection>
    );
};

// --- MAIN PROJECT PAGE COMPONENT ---
const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -100]);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const [githubData, setGithubData] = useState<GitHubRepo | null>(null);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    if (project?.link) {
      const urlParts = project.link.split('/');
      const owner = urlParts[3];
      const repo = urlParts[4];

      if (owner && repo) {
        const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
        const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`;
        const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

        Promise.all([
            fetch(repoUrl),
            fetch(commitsUrl),
            fetch(readmeUrl, { headers: { Accept: 'application/vnd.github.html' } })
        ]).then(async ([repoRes, commitsRes, readmeRes]) => {
            if (!repoRes.ok) {
                console.warn("GitHub API error:", repoRes.statusText);
                setIsLoading(false);
                return;
            }
            const repoData = await repoRes.json();
            setGithubData(repoData);

            if (repoData.languages_url) {
                const langRes = await fetch(repoData.languages_url);
                if (langRes.ok) {
                    const langData = await langRes.json();
                    setLanguages(langData);
                }
            }

            if (commitsRes.ok) {
                const commitData = await commitsRes.json();
                if(Array.isArray(commitData)) setCommits(commitData);
            }

            if(readmeRes.ok) {
                const readmeHtml = await readmeRes.text();
                setReadmeContent(readmeHtml);
            }

            setIsLoading(false);
        }).catch(error => {
            console.error("Error fetching GitHub data:", error);
            setIsLoading(false);
        });
      } else {
          setIsLoading(false);
      }
    } else {
        setIsLoading(false);
    }
  }, [slug, project?.link]);

  useEffect(() => {
    if (showCopyNotification) {
      const timer = setTimeout(() => {
        setShowCopyNotification(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopyNotification]);

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.tags.some((tag) => githubData?.topics?.includes(tag) || project?.tags.includes(tag)))
    .slice(0, 3);

  const shareProject = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowCopyNotification(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [project.image, ...(project.screenshots || [])].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-black text-white">
      <CopyNotification isVisible={showCopyNotification} />
      <BackToTopButton />

      <motion.div
        className="sticky top-0 z-20 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg shadow-black/30 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/20 via-white/40 to-white/20 pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
          <div className="flex items-center justify-between">
            <h1
              className={`${getTitleFontSize(project.title)} font-bold truncate max-w-[70%] sm:max-w-[80%] md:max-w-[85%] text-white`}
            >
              {project.title}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border-white/10 text-white rounded-lg transition-all duration-300 border backdrop-blur-sm"
              aria-label="Go back to previous page"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="relative overflow-hidden">
        {project.image && (
          <motion.div 
            className="absolute inset-0"
            style={{ y: parallaxY }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-50 transition-opacity duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
          </motion.div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 sm:py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {project.status && (
                <motion.span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(project.status)} transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                >
                  {project.status === 'completed' && <Circle className="w-4 h-4" />}
                  {project.status === 'in-progress' && <Clock className="w-4 h-4" />}
                  {project.status === 'planned' && <Target className="w-4 h-4" />}
                  {project.status === 'n/a' && <Circle className="w-4 h-4" />}
                  {project.status === 'n/a' ? 'N/A' : project.status.replace('-', ' ')}
                </motion.span>
              )}
              {project.category && (
                <motion.span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getCategoryColor(project.category)} transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                >
                  <Layers className="w-4 h-4" />
                  {project.category}
                </motion.span>
              )}
              {project.priority && project.priority !== 'none' && (
                <motion.span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getPriorityColor(project.priority)} transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                >
                  <Flag className="w-4 h-4" />
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                </motion.span>
              )}
            </div>

            <h1 className={`${getTitleFontSize(project.title)} font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-lg`}>
              {project.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.liveDemo && (
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-lg hover:shadow-lg hover:shadow-[#045de9]/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </motion.a>
              )}
              
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 rounded-lg transition-all duration-300 border"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View source code of ${project.title} on GitHub`}
                >
                  <Github size={20} />
                  <span>View Code</span>
                </motion.a>
              )}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setLiked(!liked)}
                  className={`p-3 rounded-lg transition-all duration-300 ${liked ? 'bg-red-500/20 text-red-400' : 'bg-gray-800/50 text-gray-400 hover:text-red-400'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={liked ? `Unlike ${project.title}` : `Like ${project.title}`}
                  aria-pressed={liked}
                >
                  <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-3 rounded-lg transition-all duration-300 ${bookmarked ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800/50 text-gray-400 hover:text-blue-400'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={bookmarked ? `Remove bookmark for ${project.title}` : `Bookmark ${project.title}`}
                  aria-pressed={bookmarked}
                >
                  <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button
                  onClick={shareProject}
                  className="relative p-3 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-lg transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Share ${project.title}`}
                >
                  <Share2 size={20} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#045de9]/50 to-[#09c6f9]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {allImages.length > 0 && (
              <InteractiveImageGallery images={allImages} title={project.title} />
            )}

            {readmeContent && <ReadmeSection content={readmeContent} />}

            {project.features && project.features.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Star className="text-[#09c6f9]" size={28} />
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="text-[#09c6f9] flex-shrink-0 mt-1" size={20} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </ScrollAnimatedSection>
            )}
            
            {!isLoading && <RecentActivity commits={commits} repoUrl={githubData?.html_url} />}

            {project.challenges && project.challenges.length > 0 && (
              <ScrollAnimatedSection>
                  <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                      <Target className="text-[#09c6f9]" size={28} />
                      Challenges & Outcomes
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50">
                          <h3 className="font-semibold text-lg mb-3 text-red-400">Challenges</h3>
                          <ul className="space-y-3">
                              {project.challenges.map((challenge, index) => (
                                  <motion.li key={index} className="flex items-start gap-3 text-gray-300"
                                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                                      <Target className="text-red-400/80 flex-shrink-0 mt-1" size={16} />
                                      <span>{challenge}</span>
                                  </motion.li>
                              ))}
                          </ul>
                      </div>
                      <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50">
                          <h3 className="font-semibold text-lg mb-3 text-green-400">Outcomes</h3>
                          <ul className="space-y-3">
                              {project.outcomes && project.outcomes.map((outcome, index) => (
                                  <motion.li key={index} className="flex items-start gap-3 text-gray-300"
                                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                                      <CheckCircle className="text-green-400/80 flex-shrink-0 mt-1" size={16} />
                                      <span>{outcome}</span>
                                  </motion.li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </ScrollAnimatedSection>
            )}

            {project.impact && (
              <ImpactSection impact={project.impact} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-12">
            
            <MyRole role={project.role} teamSize={project.teamSize} lastUpdated={githubData?.pushed_at} />

            {project.link && (
              <ContributorsList repoUrl={project.link} />
            )}
            
            {!isLoading && Object.keys(languages).length > 0 && <LanguageBar languages={languages} />}

            <GitHubTopics topics={githubData?.topics || []} />

            {(project.startDate || project.milestones) && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Clock className="text-[#09c6f9]" size={28} />
                  Project Timeline
                </h2>
                <InteractiveTimeline
                  startDate={project.startDate || '2023-01'}
                  endDate={project.endDate}
                  milestones={project.milestones}
                />
              </ScrollAnimatedSection>
            )}

            {project.completionPercentage !== undefined && (
              <ProjectProgress percentage={project.completionPercentage} />
            )}
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <ScrollAnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 mt-12">
              <Star className="text-[#09c6f9]" size={28} />
              Related Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {relatedProjects.map((relatedProject) => (
                <motion.div
                  key={relatedProject.id}
                  className="p-6 rounded-2xl bg-gray-900/50 border-gray-800/50 border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {relatedProject.image && (
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{relatedProject.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {relatedProject.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/project/${relatedProject.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <Eye size={16} />
                      View Project
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimatedSection>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
