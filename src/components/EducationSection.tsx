import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaBook,
  FaTimes,
  FaLaptopCode,
  FaBrain,
  FaCertificate,
  FaTrophy
} from "react-icons/fa";

// Particle Background (unchanged - optimized)
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: any[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,200,255,0.4)";
        ctx.shadowColor = "#00c8ff";
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
};

// Enhanced Education Data with Detailed Content
const educationData = [
  {
    id: '1',
    degree: 'Bachelor of Technology - B.Tech',
    course: 'Computer Science and Engineering Specialization in AI & ML',
    institution: 'Malla Reddy University',
    location: 'Hyderabad, Telangana',
    duration: 'Sep 2021 – Jul 2025',
    cgpa: '8.35 / 10.0',
    level: 'undergraduate',
    status: 'graduated',
    isActive: true,
    details: {
      description: "Specialized in Artificial Intelligence and Machine Learning with hands-on experience in deep learning frameworks, neural networks, NLP, and computer vision. Built multiple real-world AI projects and contributed to research initiatives.",
      highlights: [
        "Ranked in Top 5% of the department",
        "Received Merit Scholarship for 3 consecutive years",
        "Led AI Research Cell as Technical Head"
      ],
      relevantCourses: [
        "Deep Learning & Neural Networks",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning",
        "Data Structures & Algorithms",
        "Cloud Computing (AWS)"
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "Docker", "ML Ops"]
    }
  },
  {
    id: '2',
    degree: 'Intermediate (12th)',
    course: 'MPC (Mathematics, Physics, Chemistry)',
    institution: 'Narayana Junior College',
    location: 'Hyderabad, Telangana',
    duration: '2019 – 2021',
    cgpa: '74.4%',
    level: 'intermediate',
    status: 'graduated',
    isActive: true,
    details: {
      description: "Focused on building strong analytical and problem-solving foundation through rigorous mathematics and science curriculum.",
      highlights: ["Secured 1st place in State-level Math Olympiad", "95%+ in Mathematics & Physics"],
      relevantCourses: ["Higher Mathematics", "Mechanics", "Organic Chemistry", "Electromagnetism"],
      skills: ["Advanced Problem Solving", "Logical Reasoning", "Scientific Thinking"]
    }
  },
  {
    id: '3',
    degree: 'SSC (10th Standard)',
    course: 'General Curriculum',
    institution: 'SR Digi School',
    location: 'Hyderabad, Telangana',
    duration: 'Completed 2019',
    cgpa: '8.33 / 10 GPA',
    level: 'secondary',
    status: 'graduated',
    isActive: true,
    details: {
      description: "Strong academic performance with distinction in Mathematics and Science. Actively participated in science fairs and coding clubs.",
      highlights: ["School Topper in Mathematics", "Winner of Regional Science Exhibition"],
      relevantCourses: ["Mathematics", "Science", "Computer Applications", "English Literature"],
      skills: ["Foundation in Programming (QBASIC)", "Public Speaking", "Team Leadership"]
    }
  }
];

const EducationSection = () => {
  const [selectedEdu, setSelectedEdu] = useState<typeof educationData[0] | null>(null);

  const getEducationIcon = (level: string) => {
    switch (level) {
      case 'undergraduate': return FaUniversity;
      case 'intermediate': return FaGraduationCap;
      case 'secondary': return FaSchool;
      default: return FaBook;
    }
  };

  const getEducationColor = (level: string) => {
    switch (level) {
      case 'undergraduate': return { gradient: 'from-blue-500/30 to-cyan-500/30', border: 'border-blue-500/70', text: 'text-blue-400', glow: 'shadow-blue-500/50' };
      case 'intermediate': return { gradient: 'from-green-500/30 to-emerald-500/30', border: 'border-green-500/70', text: 'text-green-400', glow: 'shadow-green-500/50' };
      case 'secondary': return { gradient: 'from-purple-500/30 to-pink-500/30', border: 'border-purple-500/70', text: 'text-purple-400', glow: 'shadow-purple-500/50' };
      default: return { gradient: 'from-gray-500/30 to-slate-500/30', border: 'border-gray-500/70', text: 'text-gray-400', glow: 'shadow-gray-500/50' };
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      current: 'bg-green-500/20 text-green-400 border-green-500/40',
      graduated: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      completed: 'bg-blue-500/20 text-blue-400 border-blue-500/40'
    };
    return styles[status as keyof typeof styles] || styles.completed;
  };

  return (
    <>
      <section id="education" className="py-20 bg-black relative overflow-hidden">
        <ParticleBackground />
        
        <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Education</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          <div className="space-y-10 max-w-5xl mx-auto">
            {educationData.filter(edu => edu.isActive).map((edu, index) => {
              const Icon = getEducationIcon(edu.level);
              const color = getEducationColor(edu.level);

              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
OnHover={() => setSelectedEdu(edu)}
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedEdu(edu)}
                    className={`relative bg-black/90 backdrop-blur-2xl p-8 rounded-3xl border ${color.border} ${color.glow} shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-${color.glow.split('/')[0]}`}
                  >
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${color.gradient} p-4 flex items-center justify-center border-4 ${color.border} shadow-xl`}>
                          <Icon className={`text-4xl ${color.text}`} />
                        </div>
                        <span className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(edu.status)}`}>
                          {edu.status.charAt(0).toUpperCase() + edu.status.slice(1)}
                        </span>
                        {edu.cgpa && (
                          <div className="flex items-center gap-2 mt-3 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm border border-yellow-500/40">
                            <FaStar /> <span className="font-bold">{edu.cgpa}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-grow text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-white mb-2">{edu.degree}</h3>
                        {edu.course && <p className={`text-xl ${color.text} font-medium mb-2`}>{edu.course}</p>}
                        <p className="text-gray-300 text-lg">{edu.institution}</p>

                        <div className="flex flex-wrap gap-4 mt-5 justify-center lg:justify-start">
                          <div className="flex items-center gap-3 text-gray-400 bg-gray-800/40 px-5 py-3 rounded-xl border border-gray-700/50">
                            <FaCalendarAlt className={color.text} /> <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-400 bg-gray-800/40 px-5 py-3 rounded-xl border border-gray-700/50">
                            <FaMapMarkerAlt className={color.text} /> <span>{edu.location}</span>
                          </div>
                        </div>

                        <p className="mt-6 text-cyan-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          ← Hover / Click for more details →
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Modal / Popover */}
      <AnimatePresence>
        {selectedEdu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEdu(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto"
              onClick={() => setSelectedEdu(null)}
            >
              <div
                className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-gray-800 shadow-2xl max-w-4xl w-full mx-4 my-10 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEdu(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <FaTimes className="text-white text-xl" />
                </button>

                {selectedEdu && (() => {
                  const color = getEducationColor(selectedEdu.level);
                  const Icon = getEducationIcon(selectedEdu.level);
                  return (
                    <>
                      <div className={`bg-gradient-to-r ${color.gradient} p-1`}>
                        <div className="bg-black rounded-t-3xl p-10 text-center">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-4 border-white/20 mb-6">
                            <Icon className={`text-5xl ${color.text}`} />
                          </div>
                          <h2 className="text-4xl font-bold text-white mb-3">{selectedEdu.degree}</h2>
                          <p className={`text-2xl ${color.text} font-semibold`}>{selectedEdu.course}</p>
                          <p className="text-xl text-gray-400 mt-2">{selectedEdu.institution} • {selectedEdu.location}</p>
                        </div>
                      </div>

                      <div className="p-10 text-white space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                              <FaBrain className="text-cyan-400" /> Overview
                            </h3>
                            <p className="text-gray-300 leading-relaxed">{selectedEdu.details.description}</p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                <FaTrophy className="text-yellow-400" /> Achievements
                              </h4>
                              <ul className="space-y-2">
                                {selectedEdu.details.highlights.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="text-cyan-400 mt-1">▹</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                            <FaBook className="text-purple-400" /> Key Subjects
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedEdu.details.relevantCourses.map((course) => (
                              <div key={course} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center hover:bg-white/10 transition-all">
                                {course}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                            <FaLaptopCode className="text-green-400" /> Skills Acquired
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {selectedEdu.details.skills.map((skill) => (
                              <span key={skill} className="px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-sm font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-800 flex justify-between items-center text-sm text-gray-500">
                          <span>{selectedEdu.duration}</span>
                          <span className="text-yellow-400 font-bold">CGPA: {selectedEdu.cgpa}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EducationSection;