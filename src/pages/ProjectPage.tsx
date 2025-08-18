import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  RotateCcw
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
    tags: ['Portfolio', 'React', 'Vue', 'TypeScript', 'MongoDB'],
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
    link: 'https://github.com/your-username/portfolio', // Replace with your link
    liveDemo: 'https://your-portfolio.com', // Replace with your link
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


// --- COMPONENT ---
const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [liked, setLiked] = useState(false);

  // **** ADD THIS CODE ****
  useEffect(() => {
    // Scroll to the top of the page when the component mounts or slug changes
    window.scrollTo(0, 0);
  }, [slug]);
  // ************************

  // Auto-play functionality for image carousel
  useEffect(() => {
    if (isAutoPlay && project?.screenshots && project.screenshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === (project.screenshots?.length ?? 0) ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, project?.screenshots]);

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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'n/a': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Project URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with project image */}
        {project.image && (
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-20">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 backdrop-blur-sm border border-gray-700/50"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  liked ? 'bg-red-500/20 text-red-400' : 'bg-gray-800/50 text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={shareProject}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {project.status && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status === 'n/a' ? 'N/A' : project.status.replace('-', ' ')}
                </span>
              )}
              {project.category && (
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                  {project.category}
                </span>
              )}
              {project.priority && project.priority !== 'none' && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(project.priority)}`}></div>
                  <span className="text-sm text-gray-400 capitalize">{project.priority} Priority</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveDemo && (
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#045de9] to-[#09c6f9] rounded-lg hover:shadow-lg hover:shadow-[#045de9]/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                >
                  <Github size={20} />
                  <span>View Code</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Gallery */}
            {allImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Eye className="text-[#09c6f9]" size={28} />
                  Project Gallery
                </h2>
                
                {/* Main Image Display */}
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900">
                    <img
                      src={allImages[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                      onClick={() => setIsImageModalOpen(true)}
                    />
                    
                    {/* Image Controls */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
                        >
                          <ChevronRight size={24} />
                        </button>
                        
                        {/* Auto-play controls */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                          <button
                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                            className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
                          >
                            {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex(0)}
                            className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
                          >
                            <RotateCcw size={16} />
                          </button>
                        </div>
                      </>
                    )}
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 rounded-full text-sm">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  {allImages.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'border-[#09c6f9] scale-105' 
                              : 'border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Detailed Description */}
            {project.longDescription && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Target className="text-[#09c6f9]" size={28} />
                  Project Overview
                </h2>
                <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                  <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {project.longDescription}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Zap className="text-[#09c6f9]" size={28} />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-[#09c6f9]/30 transition-all duration-300"
                    >
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Layers className="text-[#09c6f9]" size={28} />
                  Technologies Used
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-[#09c6f9]/30 transition-all duration-300"
                    >
                      <Code className="text-[#09c6f9]" size={20} />
                      <span className="text-gray-300">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
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
              </motion.section>
            )}

            {/* Outcomes & Results */}
            {project.outcomes && project.outcomes.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold flex items-center gap-3">
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
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 sticky top-8"
            >
              <h3 className="text-xl font-bold mb-6">Project Details</h3>
              
              <div className="space-y-4">
                {project.startDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#09c6f9]" size={20} />
                    <div>
                      <div className="text-sm text-gray-400">Duration</div>
                      <div className="text-white">
                        {project.startDate} - {project.endDate || 'Present'}
                      </div>
                    </div>
                  </div>
                )}
                
                {project.teamSize && (
                  <div className="flex items-center gap-3">
                    <Users className="text-[#09c6f9]" size={20} />
                    <div>
                      <div className="text-sm text-gray-400">Team Size</div>
                      <div className="text-white">{project.teamSize} member{project.teamSize > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                )}
                
                {project.role && (
                  <div className="flex items-center gap-3">
                    <Star className="text-[#09c6f9]" size={20} />
                    <div>
                      <div className="text-sm text-gray-400">My Role</div>
                      <div className="text-white">{project.role}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Metrics */}
              {project.keyMetrics && project.keyMetrics.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
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

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-lg font-semibold mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#09c6f9]/10 text-[#09c6f9] rounded-full text-sm border border-[#09c6f9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[currentImageIndex]}
                alt={`${project.title} - Full size`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
              >
                <X size={24} />
              </button>
              
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPage;