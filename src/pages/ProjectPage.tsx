import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Flag
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
}

// --- PROJECT DATA ---
const projects: Project[] = [
  {
    id: '1',
    title: 'Personal Portfolio Website',
    slug: 'portfolio',
    description: 'My personal portfolio website showcasing projects and skills.',
    image: 'https://cdn.dribbble.com/users/149571/screenshots/4819891/media/74a587970b8849c7a23b36113b52ed71.gif',
    tags: ['Portfolio', 'React', 'Vue', 'TypeScript'],
    longDescription: 'This portfolio is a dynamic and interactive platform built to showcase my journey, skills, and projects. Developed with a keen eye for design and user experience, it serves as a central hub for my professional and personal work. The site is fully responsive, ensuring a seamless experience across all devices, from desktops to mobile phones.',
    features: ['Responsive Design', 'Dynamic Project Filtering', 'Interactive UI/UX', 'Contact Form Integration'],
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
    link: 'https://github.com/your-username/portfolio',
    liveDemo: 'https://your-portfolio.com',
  },
  {
    id: '2',
    title: 'GestureFlow: Advanced Hand Gesture Control',
    slug: 'gestureflow',
    description: 'A real-time hand gesture control application for contactless interaction.',
    image: 'https://i.pinimg.com/originals/1d/1d/f4/1d1df43f0cfb3e15b225574c8c50e27a.gif',
    tags: ['Python', 'Computer Vision', 'AI', 'OpenCV', 'MediaPipe'],
    longDescription: 'Built a real-time hand gesture control application using MediaPipe and OpenCV for contactless interaction. The system recognizes various hand gestures to control cursor movement, clicks, scrolling, volume, and even application switching, providing a seamless, futuristic user experience.',
    features: ['Real-time Hand Tracking', 'Cursor & Click Control', 'Scroll & Volume Gestures', 'App Switching'],
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
    link: 'https://github.com/Naveen-YN/GestureFlow-An-Advanced-Hand-Gesture-Control-System',
    liveDemo: '',
  },
  {
    id: '3',
    title: 'Potato Leaf Disease Identification using DL',
    slug: 'potato-leaf-disease',
    description: 'A deep learning application for identifying diseases in potato leaves.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/potato.jpg',
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'TensorFlow', 'Keras'],
    longDescription: 'Developed a robust disease identification application for potato crops using a ResNet50 model to classify early blight, late blight, and healthy leaves. It provides high-accuracy predictions to assist farmers in early disease detection and management. The project includes a user-friendly PyQt5 interface for easy image uploads and real-time analysis.',
    features: ['ResNet50-based Classification', 'High-Accuracy Predictions', 'User-Friendly PyQt5 GUI', 'Real-time Insights'],
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
  },
  {
    id: '4',
    title: 'Brain Tumor & Lung Disease Detection',
    slug: 'brain-tumor-lung-disease',
    description: 'AI-based medical image classification for brain tumor and lung disease diagnosis.',
    image: 'https://assets-global.website-files.com/62434fa732124a02172f6468/62434fa732124a51e62f689d_brain-tumor-detection-from-MRI-images.jpeg',
    tags: ['Python', 'Deep Learning', 'TensorFlow', 'CNN', 'Medical AI'],
    longDescription: 'Developed deep learning models to detect brain tumors and lung diseases from medical imaging datasets. This project explores the application of Convolutional Neural Networks (CNNs) in healthcare to provide accurate, automated diagnostic support, potentially speeding up the work of medical professionals.',
    features: ['CNN-based Detection Models', 'Medical Dataset Training', 'High Diagnostic Accuracy', 'Interpretable Results'],
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
  },
  {
    id: '5',
    title: 'Virtual Healthcare Companion Chatbot',
    slug: 'healthcare-chatbot',
    description: 'A full-stack AI-powered chatbot for healthcare queries using NLTK and Gemini API.',
    image: 'https://cdn.dribbble.com/users/479536/screenshots/4130087/media/52d2f7f1857322a37077a06f366e644b.gif',
    tags: ['Python', 'Django', 'NLTK', 'NLP', 'Gradio', 'Gemini API'],
    longDescription: 'Built an interactive, full-stack chatbot to answer medical queries. It uses Natural Language Toolkit (NLTK) for initial NLP processing and integrates with the Gemini API for advanced, context-aware responses. The backend is powered by Django, with a user-friendly Gradio interface.',
    features: ['Text & Voice Interface', 'Healthcare Q&A', 'Gemini API Integration', 'User Personalization'],
    technologies: ['Python', 'NLTK', 'Django', 'Gradio', 'Gemini API'],
    challenges: ['Ensuring the chatbot provides safe and reliable information.', 'Managing context and conversation flow effectively.'],
    outcomes: ['A highly interactive and intelligent healthcare assistant.', 'Successfully integrated multiple AI technologies into a cohesive full-stack application.'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'Full Stack & AI Developer',
    keyMetrics: [{ label: 'Response Accuracy', value: '94%' }],
    screenshots: [],
    startDate: '2024-03',
    endDate: '2024-08',
    link: 'https://github.com/Naveen-YN/Virtual-Healthcare-Companion-Chatbot-Utilizing-NLTK',
    liveDemo: '',
  },
  {
    id: '6',
    title: 'Image Classification on CIFAR-10',
    slug: 'cifar10-classification',
    description: 'Deep learning image classification project with GUI using PyQt5 and TensorFlow.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*H9Dk-Qp7PwlRKW_tV2j69g.gif',
    tags: ['Python', 'Deep Learning', 'PyQt5', 'TensorFlow', 'CIFAR-10'],
    longDescription: 'Implemented a CNN to classify images from the well-known CIFAR-10 dataset. This project serves as a foundational exercise in deep learning, complete with a PyQt5 GUI that allows users to upload their own images for real-time classification into one of the ten categories.',
    features: ['CNN Training on CIFAR-10', 'PyQt5 GUI for Interaction', 'Real-time Classification'],
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

const getTagColor = (tag: string) => {
  const colors = [
    'bg-gradient-to-r from-blue-600/40 to-blue-800/40 text-blue-100 hover:from-blue-600/60 hover:to-blue-800/60 border border-blue-700/60 shadow-sm shadow-blue-700/30',
    'bg-gradient-to-r from-purple-600/40 to-purple-800/40 text-purple-100 hover:from-purple-600/60 hover:to-purple-800/60 border border-purple-700/60 shadow-sm shadow-purple-700/30',
    'bg-gradient-to-r from-green-600/40 to-green-800/40 text-green-100 hover:from-green-600/60 hover:to-green-800/60 border border-green-700/60 shadow-sm shadow-green-700/30',
    'bg-gradient-to-r from-yellow-600/40 to-yellow-800/40 text-yellow-100 hover:from-yellow-600/60 hover:to-yellow-800/60 border border-yellow-700/60 shadow-sm shadow-yellow-700/30',
    'bg-gradient-to-r from-red-600/40 to-red-800/40 text-red-100 hover:from-red-600/60 hover:to-red-800/60 border border-red-700/60 shadow-sm shadow-red-700/30',
  ];
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const getTitleFontSize = (title: string) => {
  if (title.length > 40) return 'text-base sm:text-lg md:text-xl';
  if (title.length > 30) return 'text-lg sm:text-xl md:text-2xl';
  if (title.length > 20) return 'text-xl sm:text-2xl md:text-3xl';
  return 'text-2xl sm:text-3xl md:text-4xl';
};

// --- COMPONENT ---
const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (isAutoPlay && project?.screenshots && project.screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === (project.screenshots?.length ?? 0) - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, project?.screenshots]);

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.tags.some((tag) => project?.tags.includes(tag)))
    .slice(0, 3);

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Project URL copied to clipboard!');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link 
            to="/#projects" 
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
{/* Sticky Header */}
<motion.div
  className="sticky top-0 z-20 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg shadow-black/30 relative overflow-hidden"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Glass Highlight (subtle reflection at the top) */}
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/20 via-white/40 to-white/20 pointer-events-none"></div>

  <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
    <div className="flex items-center justify-between">
      <h1
        className={`${getTitleFontSize(
          project.title
        )} font-bold truncate max-w-[70%] sm:max-w-[80%] md:max-w-[85%] text-white`}
      >
        {project.title}
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 rounded-lg transition-all duration-300 border border-white/10 backdrop-blur-sm text-white"
        aria-label="Go back to previous page"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>
    </div>
  </div>
</motion.div>


      {/* Hero Section with Enhanced Background Image */}
      <div className="relative overflow-hidden">
        {project.image && (
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-50 transition-opacity duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
          </div>
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

            <h1 className={`${getTitleFontSize(project.title)} font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-lg truncate`}>
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
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 border border-gray-700/50"
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
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    liked ? 'bg-red-500/20 text-red-400' : 'bg-gray-800/50 text-gray-400 hover:text-red-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={liked ? `Unlike ${project.title}` : `Like ${project.title}`}
                  aria-pressed={liked}
                >
                  <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button
                  onClick={shareProject}
                  className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Share ${project.title}`}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            {allImages.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Eye className="text-[#09c6f9]" size={28} />
                  Project Gallery
                </h2>
                
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800/50 shadow-lg">
                    <motion.img
                      key={currentImageIndex}
                      src={allImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                      onClick={() => setIsImageModalOpen(true)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                    />
                    
                    {allImages.length > 1 && (
                      <>
                        <motion.button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                          onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
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
                            aria-label="Reset to first image"
                          >
                            <RotateCcw size={16} />
                          </motion.button>
                        </div>
                      </>
                    )}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </div>
                  
                  {allImages.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                      {allImages.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-[#09c6f9] scale-105' 
                              : 'border-gray-700 hover:border-gray-500'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          aria-label={`Select thumbnail ${index + 1}`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1} for ${project.title}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollAnimatedSection>
            )}

            {/* Detailed Description */}
            {project.longDescription && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Target className="text-[#09c6f9]" size={28} />
                  Project Overview
                </h2>
                <div className="bg-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gray-800/50">
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                    {project.longDescription}
                  </p>
                </div>
              </ScrollAnimatedSection>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Zap className="text-[#09c6f9]" size={28} />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800/50 hover:border-[#09c6f9]/30 transition-all duration-300"
                    >
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollAnimatedSection>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Layers className="text-[#09c6f9]" size={28} />
                  Technologies Used
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800/50 hover:border-[#09c6f9]/30 transition-all duration-300"
                    >
                      <Code className="text-[#09c6f9]" size={20} />
                      <span className="text-gray-300">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollAnimatedSection>
            )}

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Lightbulb className="text-[#09c6f9]" size={28} />
                  Challenges & Solutions
                </h2>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <span className="text-orange-400 text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{challenge}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollAnimatedSection>
            )}

            {/* Outcomes & Results */}
            {project.outcomes && project.outcomes.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Award className="text-[#09c6f9]" size={28} />
                  Outcomes & Results
                </h2>
                <div className="space-y-4">
                  {project.outcomes.map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
                    >
                      <div className="flex items-start gap-3">
                        <Star className="text-green-400 mt-1 flex-shrink-0" size={20} />
                        <p className="text-gray-300 leading-relaxed">{outcome}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollAnimatedSection>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <ScrollAnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Layers className="text-[#09c6f9]" size={28} />
                  Related Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.div
                      key={relatedProject.id}
                      variants={{
                        hidden: { opacity: 0, y: 40, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                        },
                      }}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.9 + index * 0.15 }}
                      className="relative h-[28rem] group max-w-sm mx-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-md group-hover:blur-none transition-all duration-500"></div>
                      <div className="relative bg-black/90 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30"></div>
                          {relatedProject.image ? (
                            <img
                              src={relatedProject.image}
                              alt={relatedProject.title}
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                              <Github size={32} className="text-gray-600" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                            {relatedProject.status && (
                              <motion.span
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${getStatusColor(relatedProject.status)} transition-colors duration-200`}
                                whileHover={{ scale: 1.1 }}
                              >
                                {relatedProject.status === 'completed' && <Circle className="w-3 h-3" />}
                                {relatedProject.status === 'in-progress' && <Clock className="w-3 h-3" />}
                                {relatedProject.status === 'planned' && <Target className="w-3 h-3" />}
                                {relatedProject.status === 'n/a' && <Circle className="w-3 h-3" />}
                                {relatedProject.status === 'n/a' ? 'N/A' : relatedProject.status.replace('-', ' ')}
                              </motion.span>
                            )}
                            {relatedProject.category && (
                              <motion.span
                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${getCategoryColor(relatedProject.category)} transition-colors duration-200`}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Layers className="w-3 h-3" />
                                {relatedProject.category}
                              </motion.span>
                            )}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className={`font-semibold text-white mb-3 font-sans line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 ${getTitleFontSize(relatedProject.title)}`}>
                            {relatedProject.title}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 font-sans mb-4">{relatedProject.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {relatedProject.tags.slice(0, 3).map((tag, i) => (
                              <motion.span
                                key={i}
                                className={`text-xs font-medium ${getTagColor(tag)} px-2 py-1 rounded-full transition-colors duration-200`}
                                whileHover={{ scale: 1.1 }}
                                aria-label={`Tag: ${tag}`}
                              >
                                {tag}
                              </motion.span>
                            ))}
                            {relatedProject.tags.length > 3 && (
                              <span className="text-xs text-gray-400 font-sans px-2 py-1">+{relatedProject.tags.length - 3} more</span>
                            )}
                          </div>
                          <motion.div className="mt-auto">
                            <Link
                              to={`/project/${relatedProject.slug}`}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg text-sm font-sans transition-all duration-300 w-full justify-center"
                              aria-label={`View details for ${relatedProject.title}`}
                            >
                              <span>Details</span>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollAnimatedSection>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 sticky top-24">
              <h3 className="text-lg sm:text-xl font-bold mb-6">Project Details</h3>
              
              <div className="space-y-6">
                {project.startDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#09c6f9]" size={20} />
                    <div className="w-full">
                      <div className="text-sm text-gray-400">Duration</div>
                      <div className="text-white font-medium mb-2">{project.startDate} - {project.endDate || 'Present'}</div>
                      <Timeline startDate={project.startDate} endDate={project.endDate} />
                    </div>
                  </div>
                )}
                
                {project.teamSize && (
                  <div className="flex items-center gap-3">
                    <Users className="text-[#09c6f9]" size={20} />
                    <div>
                      <div className="text-sm text-gray-400">Team Size</div>
                      <div className="text-white font-medium">{project.teamSize} member{project.teamSize > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                )}
                
                {project.role && (
                  <div className="flex items-center gap-3">
                    <Star className="text-[#09c6f9]" size={20} />
                    <div>
                      <div className="text-sm text-gray-400">My Role</div>
                      <div className="text-white font-medium">{project.role}</div>
                    </div>
                  </div>
                )}
              </div>

              {project.keyMetrics && project.keyMetrics.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-800/50">
                  <h4 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-[#09c6f9]" size={20} />
                    Key Metrics
                  </h4>
                  <div className="space-y-3">
                    {project.keyMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-400">{metric.label}</span>
                        <span className="text-white font-semibold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-800/50">
                  <h4 className="text-base sm:text-lg font-semibold mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getTagColor(tag)} transition-colors duration-200 cursor-pointer`}
                        whileHover={{ scale: 1.1 }}
                        title={`Projects with tag: ${tag}`}
                        aria-label={`Tag: ${tag}`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={currentImageIndex}
                src={allImages[currentImageIndex]}
                alt={`${project.title} - Full size image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
              
              <motion.button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <X size={24} />
              </motion.button>
              
              {allImages.length > 1 && (
                <>
                  <motion.button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous image in modal"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next image in modal"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Scroll Animated Section Component
const ScrollAnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6"
    >
      {children}
    </motion.section>
  );
};

// Timeline Component
const Timeline: React.FC<{ startDate: string; endDate?: string }> = ({ startDate, endDate }) => (
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
      <span>{startDate}</span>
      <span>{endDate || 'Ongoing'}</span>
    </div>
  </div>
);

export default ProjectPage;