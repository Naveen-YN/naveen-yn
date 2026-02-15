import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Base64-encoded placeholder image (a generic project thumbnail)
const placeholderImage = 'https://wallpapercave.com/wp/wp3006133.jpg';

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
  status?: 'completed' | 'in-progress' | 'planned' | 'n/a';
  category?: string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  teamSize?: number;
  role?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  liveDemo?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio',
    description: 'My personal portfolio website showcasing projects and skills.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/portfolio.gif',
    tags: ['Portfolio', 'React', 'Vue', 'TypeScript'],
    slug: 'portfolio',
    longDescription: 'My personal portfolio website showcasing my projects and skills.',
    features: [
      'Real-time hand gesture recognition',
      'Cursor movement and clicking',
      'Scrolling and volume control',
      'App switching and window management'
    ],
    technologies: ['React', 'Vue', 'TypeScript', 'MongoDB'],
    status: 'in-progress',
    category: 'Personal',
    priority: 'high',
    teamSize: 1,
    role: 'Full Stack Developer',
    startDate: '2025-08-17',
    endDate: '2025-08-25',
    link: 'https://github.com/Naveen-YN/naveen-yn',
    liveDemo: 'https://naveen.neuropia.tech/',
  },
  {
    id: '2',
    title: 'GestureFlow: An Advanced Hand Gesture Control System',
    description: 'A real-time hand gesture control application for contactless interaction.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/gesture.png',
    tags: ['Python', 'Computer Vision', 'AI', 'OpenCV'],
    slug: 'gestureflow',
    longDescription: 'Built a real-time hand gesture control application using MediaPipe and OpenCV...',
    features: [
      'Real-time hand gesture recognition',
      'Cursor movement and clicking',
      'Scrolling and volume control',
      'App switching and window management'
    ],
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'pynput', 'pyautogui'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 5,
    role: 'Developer and Team Lead',
    startDate: '2025-April',
    endDate: '2024-December',
    link: 'https://github.com/Naveen-YN/GestureFlow-An-Advanced-Hand-Gesture-Control-System',
    liveDemo: '',
  },
  // {
  //   id: '3',
  //   title: 'Potato Leaf Disease Identification using Deep learning',
  //   description: 'A deep learning application for identifying diseases in potato leaves.',
  //   image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/potato.jpg',
  //   tags: ['Deep Learning', 'Computer Vision', 'TensorFlow', ],
  //   slug: 'potato-leaf-disease',
  //   longDescription: 'Built a robust disease identification application for potato crops using a ResNet50 model...',
  //   features: [
  //     'Disease classification using ResNet50',
  //     'High-accuracy predictions',
  //     'User-friendly interface with PyQt5',
  //     'Real-time predictions and insights'
  //   ],
  //   technologies: ['Python', 'TensorFlow', 'Keras', 'ResNet50'],
  //   status: 'completed',
  //   category: 'Academic',
  //   priority: 'none',
  //   teamSize: 6,
  //   role: 'Developer and Team Lead',
  //   startDate: '2023-08',
  //   endDate: '2024-01',
  //   link: 'https://github.com/Naveen-YN/Potato-Leaf-Disease-Identification-using-Deep-Learning',
  //   liveDemo: '',
  // },
  // {
  //   id: '4',
  //   title: 'Brain Tumor and Lung Disease Detection using Deep Learning',
  //   description: 'AI-based medical image classification for brain tumor and lung disease diagnosis.',
  //   image: `https://neuropia.s3.ap-south-1.amazonaws.com/project-img/brain-lung.jpg`,
  //   tags: ['Python', 'Deep Learning', 'TensorFlow'],
  //   slug: 'brain-tumor-lung-disease',
  //   longDescription: 'Developed deep learning models to detect brain tumors and lung diseases using medical imaging datasets...',
  //   features: ['CNN-based detection', 'Medical dataset training', 'High diagnostic accuracy'],
  //   technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
  //   status: 'completed',
  //   category: 'Academic',
  //   priority: 'none',
  //   teamSize: 1,
  //   role: 'ML Engineer',
  //   startDate: '2023-06',
  //   endDate: '2023-12',
  //   link: 'https://github.com/Naveen-YN/Brain-Tumor-and-Lung-Disease-Detection-using-Deep-Learning',
  //   liveDemo: '',
  // },
  // {
  //   id: '5',
  //   title: 'Virtual Healthcare Companion Chatbot',
  //   description: 'A full-stack AI-powered chatbot for healthcare queries with NLTK and Gemini API.',
  //   image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/healthcare.jpg',
  //   tags: ['Python', 'Django', 'NLTK', 'NLP', 'Gradio', 'Gemini API'],
  //   slug: 'healthcare-chatbot',
  //   longDescription: 'Built an interactive chatbot that answers medical queries using NLP with NLTK and full-stack Django backend...',
  //   features: ['Text + voice interface', 'Healthcare Q&A', 'Gemini API integration', 'User personalization'],
  //   technologies: ['Python', 'NLTK', 'Django', 'Gradio', 'Gemini API'],
  //   status: 'completed',
  //   category: 'Academic',
  //   priority: 'none',
  //   teamSize: 1,
  //   role: 'Full Stack & AI Developer',
  //   startDate: '2024-03',
  //   endDate: '2024-08',
  //   link: 'https://github.com/Naveen-YN/Virtual-Healthcare-Companion-Chatbot-Utilizing-NLTK',
  //   liveDemo: '',
  // },
  // {
  //   id: '6',
  //   title: 'Image Classification using CIFAR-10 Dataset',
  //   description: 'Deep learning image classification project with GUI using PyQt5 and TensorFlow.',
  //   image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/img-classifi.jpg',
  //   tags: ['Python', 'Deep Learning', 'TensorFlow'],
  //   slug: 'cifar10-classification',
  //   longDescription: 'Implemented CNNs to classify CIFAR-10 dataset images, with PyQt5 GUI for easy inference...',
  //   features: ['CNN training on CIFAR-10', 'PyQt5 GUI', 'Real-time classification'],
  //   technologies: ['Python', 'TensorFlow', 'Keras', 'PyQt5'],
  //   status: 'completed',
  //   category: 'Academic',
  //   priority: 'none',
  //   teamSize: 1,
  //   role: 'Contributor and Developer',
  //   startDate: '2023-04',
  //   endDate: '2023-08',
  //   link: 'https://github.com/Naveen-YN/Image-Classification-Using-Deep-Learning-Techniques-on-the-CIFAR-10',
  //   liveDemo: '',
  // },
];

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-700/40 text-green-200 hover:bg-green-700/60 border border-green-600/60 shadow-sm shadow-green-700/30';
      case 'in-progress': return 'bg-yellow-700/40 text-yellow-200 hover:bg-yellow-700/60 border border-yellow-600/60 shadow-sm shadow-yellow-700/30';
      case 'planned': return 'bg-blue-700/40 text-blue-200 hover:bg-blue-700/60 border border-blue-600/60 shadow-sm shadow-blue-700/30';
      case 'n/a': return 'bg-gray-700/40 text-gray-200 hover:bg-gray-700/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
      default: return 'bg-gray-700/40 text-gray-200 hover:bg-gray-700/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-800/40 text-blue-100 hover:bg-blue-800/60 border border-blue-700/60 shadow-sm shadow-blue-800/30';
      case 'Personal': return 'bg-purple-800/40 text-purple-100 hover:bg-purple-800/60 border border-purple-700/60 shadow-sm shadow-purple-800/30';
      default: return 'bg-gray-800/40 text-gray-100 hover:bg-gray-800/60 border border-gray-700/60 shadow-sm shadow-gray-800/30';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-700/40 text-red-200 hover:bg-red-700/60 border border-red-600/60 shadow-sm shadow-red-700/30';
      case 'medium': return 'bg-yellow-700/40 text-yellow-200 hover:bg-yellow-700/60 border border-yellow-600/60 shadow-sm shadow-yellow-700/30';
      case 'low': return 'bg-green-700/40 text-green-200 hover:bg-green-700/60 border border-green-600/60 shadow-sm shadow-green-700/30';
      case 'none': return 'bg-gray-700/40 text-gray-200 hover:bg-gray-700/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
      default: return 'bg-gray-700/40 text-gray-200 hover:bg-gray-700/60 border border-gray-600/60 shadow-sm shadow-gray-700/30';
    }
  };

  const getTagColor = (category?: string) => {
    switch (category) {
      case 'Academic': return 'bg-gradient-to-r from-blue-600/40 to-blue-800/40 text-blue-100 hover:from-blue-600/60 hover:to-blue-800/60 border border-blue-700/60 shadow-sm shadow-blue-700/30';
      case 'Personal': return 'bg-gradient-to-r from-purple-600/40 to-purple-800/40 text-purple-100 hover:from-purple-600/60 hover:to-purple-800/60 border border-purple-700/60 shadow-sm shadow-purple-700/30';
      default: return 'bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-100 hover:from-gray-600/60 hover:to-gray-800/60 border border-gray-700/60 shadow-sm shadow-gray-700/30';
    }
  };

  const getTitleFontSize = (title: string) => {
    if (title.length > 30) return 'text-lg md:text-xl';
    if (title.length > 20) return 'text-xl md:text-2xl';
    return 'text-2xl md:text-3xl';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section id="projects" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20"></div>
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-blue-600/10 rounded-full blur-4xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-purple-600/10 rounded-full blur-4xl animate-pulse"></div>

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-5xl md:text-5xl font-extrabold tracking-tight mb-6 font-sans">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Projects</span>
          </h2>
          <motion.div
            className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed font-sans">
            Discover innovative solutions and technical expertise through my real-world applications.
          </p>
        </motion.div>

        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={el => (projectRefs.current[index] = el)}
                variants={cardVariants}
                layout
                whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3 } }}
                className="relative h-[38rem] group max-w-sm mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-md group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-black/90 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                  <div className="relative h-96 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30"></div>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <FaGithub size={48} className="text-gray-600" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
                      {project.status && (
                        <motion.span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(project.status)} transition-colors duration-200`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.status === 'n/a' ? 'N/A' : project.status.replace('-', ' ')}
                        </motion.span>
                      )}
                      {project.category && (
                        <motion.span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getCategoryColor(project.category)} transition-colors duration-200`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.category}
                        </motion.span>
                      )}
                      {project.priority && project.priority !== 'none' && (
                        <motion.span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityColor(project.priority)} transition-colors duration-200`}
                          whileHover={{ scale: 1.1 }}
                          title={`${project.priority} priority`}
                        >
                          {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`font-semibold text-white mb-4 font-sans line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 ${getTitleFontSize(project.title)}`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 font-sans mb-6">{project.description}</p>
                    {(project.startDate || project.teamSize || project.role) && (
                      <div className="mb-6 space-y-3">
                        {project.startDate && (
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                            <FaCalendarAlt size={14} />
                            <span>{project.startDate} {project.endDate && `- ${project.endDate}`}</span>
                          </div>
                        )}
                        {project.teamSize && (
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                            <FaUsers size={14} />
                            <span>Team of {project.teamSize}</span>
                          </div>
                        )}
                        {project.role && (
                          <div className="text-xs text-gray-400 font-sans">
                            <span className="font-medium">Role:</span> {project.role}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <motion.span
                          key={i}
                          className={`text-xs font-medium ${getTagColor(project.category)} px-3 py-1.5 rounded-full transition-colors duration-200`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-xs text-gray-400 font-sans px-3 py-1.5">+{project.tags.length - 4} more</span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 text-white rounded-lg text-sm font-sans transition-all duration-300 flex-1 justify-center"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          aria-label={`View ${project.title} code on GitHub`}
                        >
                          <FaGithub size={16} />
                          <span>Code</span>
                        </motion.a>
                      )}
                      {project.liveDemo && (
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 hover:from-cyan-600/40 hover:to-blue-700/40 text-white rounded-lg text-sm font-sans transition-all duration-300 flex-1 justify-center"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          aria-label={`View ${project.title} live demo`}
                        >
                          <FaExternalLinkAlt size={14} />
                          <span>Demo</span>
                        </motion.a>
                      )}
                      <motion.div className="flex-1">
                        <Link
                          to={`/project/${project.slug}`}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg text-sm font-sans transition-all duration-300 w-full justify-center"
                          aria-label={`View details for ${project.title}`}
                        >
                          <span>Details</span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;