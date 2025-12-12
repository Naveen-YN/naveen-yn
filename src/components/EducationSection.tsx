import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaBook
} from "react-icons/fa";

// Lightweight Particle Background
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
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 1.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,200,255,0.4)";
        ctx.shadowColor = "rgba(0,200,255,0.5)";
        ctx.shadowBlur = 4;
        ctx.fill();
      }

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

// Main Education Section
const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const education = [
    { 
      id: '1', 
      degree: 'Bachelor of Technology - B.Tech', 
      course: 'Computer Science and Engineering Specialization in AI & ML', 
      institution: 'Malla Reddy University', 
      location: 'Hyderabad, Telangana', 
      duration: 'Sep 2021 – Jul 2025', 
      cgpa: '8.35', 
      level: 'undergraduate', 
      status: 'graduated', 
      isActive: true 
    },
    { 
      id: '2', 
      degree: 'Intermediate', 
      course: 'MPC', 
      institution: 'Narayana Junior College', 
      location: 'Hyderabad, Telangana', 
      duration: '2019 – 2021', 
      cgpa: '74.4%', 
      level: 'intermediate', 
      status: 'graduated', 
      isActive: true 
    },
    { 
      id: '3', 
      degree: 'SSC', 
      course: '', 
      institution: 'SR Digi School', 
      location: 'Hyderabad, Telangana', 
      duration: '2019', 
      cgpa: '8.33', 
      level: 'secondary', 
      status: 'graduated', 
      isActive: true 
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const getEducationIcon = (level: string) => {
    switch (level) {
      case 'undergraduate': case 'postgraduate': return FaUniversity;
      case 'intermediate': return FaGraduationCap;
      case 'secondary': return FaSchool;
      default: return FaBook;
    }
  };

  const getEducationColor = (level: string) => {
    switch (level) {
      case 'undergraduate': return 'from-blue-500/30 to-cyan-500/30 border-blue-500/50 text-blue-400';
      case 'intermediate': return 'from-green-500/30 to-emerald-500/30 border-green-500/50 text-green-400';
      case 'secondary': return 'from-purple-500/30 to-pink-500/30 border-purple-500/50 text-purple-400';
      default: return 'from-gray-500/30 to-slate-500/30 border-gray-500/50 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'graduated': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current': return 'Currently Pursuing';
      case 'completed': return 'Completed';
      case 'graduated': return 'Graduated';
      default: return status;
    }
  };

  return (
    <section id="education" className="py-20 bg-black relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Education</span>
          </h2>
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="space-y-8">
          {education.filter(edu => edu.isActive).map((edu) => {
            const EducationIcon = getEducationIcon(edu.level);
            const colors = getEducationColor(edu.level).split(' ');

            return (
              <motion.div
                key={edu.id}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative w-full max-w-4xl mx-auto transition-transform duration-500"
              >
                <div className={`relative bg-black/90 backdrop-blur-xl p-6 rounded-2xl border ${colors[2]} shadow-2xl transition-all duration-500`}>
                  <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                    <div className="flex flex-col items-center text-center flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[0]} ${colors[1]} flex items-center justify-center border-2 ${colors[2]} shadow-lg mb-3`}>
                        <EducationIcon className={`${colors[2]} text-2xl`} size={28} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(edu.status)}`}>
                        {getStatusText(edu.status)}
                      </span>
                      {edu.cgpa && (
                        <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs border border-yellow-500/30 mt-2">
                          <FaStar size={10} /> {edu.cgpa}
                        </div>
                      )}
                    </div>

                    <div className="flex-grow text-center lg:text-left">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">{edu.degree}</h3>
                      {edu.course && <p className="text-gray-300 mb-1">{edu.course}</p>}
                      <p className="text-gray-400 text-sm mb-2">{edu.institution}</p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800/30 px-3 py-1 rounded-lg border border-gray-700/50 justify-center">
                          <FaCalendarAlt size={14} className={colors[2]} /> {edu.duration}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800/20 px-3 py-1 rounded-lg border border-gray-700/30 justify-center">
                          <FaMapMarkerAlt size={14} className={colors[2]} /> {edu.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
