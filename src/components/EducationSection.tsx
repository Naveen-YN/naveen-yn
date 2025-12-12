import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaBook
} from "react-icons/fa";

// Types
type EducationItem = {
  id: string;
  degree: string;
  course?: string;
  institution: string;
  location?: string;
  duration?: string;
  cgpa?: string;
  level?: "undergraduate" | "postgraduate" | "intermediate" | "secondary" | string;
  status?: "current" | "completed" | "graduated" | string;
  isActive?: boolean;
};

type Props = {
  education?: EducationItem[];
  className?: string;
};

// Lightweight, accessible particle background with proper cleanup
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeTimeout = useRef<number | null>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return; // avoid motion for users who prefer reduced motion

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 300);
    let height = (canvas.height = canvas.offsetHeight || 150);

    const particleCount = Math.max(30, Math.min(120, Math.floor((width * height) / 20000)));
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(9,198,249,0.18)"; // softer
        ctx.shadowColor = "rgba(9,198,249,0.2)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (resizeTimeout.current) window.clearTimeout(resizeTimeout.current);
      resizeTimeout.current = window.setTimeout(() => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout.current) window.clearTimeout(resizeTimeout.current);
    };
  }, [prefersReduced]);

  // Canvas is decorative, hide from assistive tech
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" aria-hidden />;
};

const defaultEducation: EducationItem[] = [
  {
    id: "1",
    degree: "Bachelor of Technology - B.Tech",
    course: "Computer Science and Engineering (AI & ML)",
    institution: "Malla Reddy University",
    location: "Hyderabad, Telangana",
    duration: "Sep 2021 – Jul 2025",
    cgpa: "8.35",
    level: "undergraduate",
    status: "graduated",
    isActive: true
  },
  {
    id: "2",
    degree: "Intermediate",
    course: "MPC",
    institution: "Narayana Junior College",
    location: "Hyderabad, Telangana",
    duration: "2019 – 2021",
    cgpa: "74.4%",
    level: "intermediate",
    status: "graduated",
    isActive: true
  },
  {
    id: "3",
    degree: "SSC",
    institution: "SR Digi School",
    location: "Hyderabad, Telangana",
    duration: "2019",
    cgpa: "8.33",
    level: "secondary",
    status: "graduated",
    isActive: true
  }
];

const EducationSection: React.FC<Props> = ({ education = defaultEducation, className = "" }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iconMap = useMemo(() => ({
    undergraduate: FaUniversity,
    postgraduate: FaUniversity,
    intermediate: FaGraduationCap,
    secondary: FaSchool,
    default: FaBook
  }), []);

  const colorForLevel = useCallback((level?: string) => {
    switch (level) {
      case "undergraduate":
      case "postgraduate":
        return {
          gradient: "from-blue-500/30 to-cyan-500/30",
          border: "border-blue-600/40",
          text: "text-blue-300"
        };
      case "intermediate":
        return {
          gradient: "from-emerald-500/30 to-green-500/30",
          border: "border-emerald-600/40",
          text: "text-emerald-300"
        };
      case "secondary":
        return {
          gradient: "from-purple-500/30 to-pink-500/30",
          border: "border-purple-600/40",
          text: "text-purple-300"
        };
      default:
        return {
          gradient: "from-gray-500/30 to-slate-500/30",
          border: "border-gray-600/30",
          text: "text-gray-300"
        };
    }
  }, []);

  const statusBadge = useCallback((status?: string) => {
    switch (status) {
      case "current":
        return { label: "Currently Pursuing", classes: "bg-green-500/10 text-green-300 border-green-500/30" };
      case "completed":
        return { label: "Completed", classes: "bg-blue-500/10 text-blue-300 border-blue-500/30" };
      case "graduated":
        return { label: "Graduated", classes: "bg-purple-500/10 text-purple-300 border-purple-500/30" };
      default:
        return { label: status || "Status Unknown", classes: "bg-gray-600/10 text-gray-300 border-gray-600/30" };
    }
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`py-16 sm:py-20 bg-black relative overflow-hidden ${className}`}
      aria-labelledby="education-heading"
    >
      <ParticleBackground />

      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-28 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6 }}
        >
          <h2 id="education-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Education</span>
          </h2>
          <div
            className="h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-[#09c6f9] to-[#045de9]"
            aria-hidden
          />
        </motion.div>

        <div className="space-y-8">
          {/* Vertical timeline for visual interest on large screens */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-32 bottom-8 w-px bg-gradient-to-b from-transparent via-slate-700/40 to-transparent -z-0" aria-hidden />

          {education.filter((e) => e.isActive !== false).map((edu, idx) => {
            const Icon = (iconMap as any)[edu.level || "default"] || FaBook;
            const colors = colorForLevel(edu.level);
            const status = statusBadge(edu.status);
            const isLeft = idx % 2 === 0;

            return (
              <motion.article
                key={edu.id}
                className={`group relative w-full max-w-4xl mx-auto transition-transform duration-400`}
                whileHover={prefersReduced ? undefined : { y: -6, scale: 1.01 }}
                aria-labelledby={`edu-${edu.id}-title`}
              >
                <div
                  className={`relative bg-black/80 backdrop-blur-sm p-6 rounded-2xl border ${colors.border} shadow-xl transition-all duration-300`}
                >
                  <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                    <div className="flex flex-col items-center text-center flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center border-2 ${colors.border} shadow-lg mb-3`}
                        aria-hidden
                      >
                        <Icon className={`${colors.text} text-2xl`} size={26} aria-hidden />
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.classes}`}>
                        {status.label}
                      </span>

                      {edu.cgpa && (
                        <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-300 px-3 py-1 rounded-full text-xs border border-yellow-500/20 mt-2">
                          <FaStar size={12} aria-hidden />
                          <span className="sr-only">CGPA:</span>
                          <span>{edu.cgpa}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow text-center lg:text-left">
                      <h3 id={`edu-${edu.id}-title`} className="text-xl md:text-2xl font-bold text-white mb-1">
                        {edu.degree}
                      </h3>

                      {edu.course && <p className="text-gray-300 mb-1">{edu.course}</p>}

                      <p className="text-gray-400 text-sm mb-2">{edu.institution}</p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        {edu.duration && (
                          <div className="flex items-center gap-2 text-gray-300 text-sm bg-gray-800/40 px-3 py-1 rounded-lg border border-gray-700/40 justify-center">
                            <FaCalendarAlt size={14} className={colors.text} aria-hidden />
                            <span>{edu.duration}</span>
                          </div>
                        )}

                        {edu.location && (
                          <div className="flex items-center gap-2 text-gray-300 text-sm bg-gray-800/30 px-3 py-1 rounded-lg border border-gray-700/30 justify-center">
                            <FaMapMarkerAlt size={14} className={colors.text} aria-hidden />
                            <span>{edu.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* small timeline marker for large screens */}
                <div className={`hidden lg:block absolute top-8 ${isLeft ? "-left-48" : "-right-48"} w-44`} aria-hidden>
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
