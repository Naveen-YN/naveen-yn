import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// --- ICON MAPPING ---
const iconComponents: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
  FaPython: FaIcons.FaPython,
  FaJava: FaIcons.FaJava,
  SiCplusplus: SiIcons.SiCplusplus,
  SiKotlin: SiIcons.SiKotlin,
  SiCsharp: SiIcons.SiSharp,
  SiGo: SiIcons.SiGo,
  FaHtml5: FaIcons.FaHtml5,
  FaCss3Alt: FaIcons.FaCss3Alt,
  FaJs: FaIcons.FaJs,
  SiPhp: SiIcons.SiPhp,
  FaReact: FaIcons.FaReact,
  SiAngular: SiIcons.SiAngular,
  SiDjango: SiIcons.SiDjango,
  SiFlask: SiIcons.SiFlask,
  SiBootstrap: SiIcons.SiBootstrap,
  FaNodeJs: FaIcons.FaNodeJs,
  SiMongodb: SiIcons.SiMongodb,
  SiMysql: SiIcons.SiMysql,
  SiPostgresql: SiIcons.SiPostgresql,
  SiAmazondynamodb: SiIcons.SiAmazondynamodb,
  FaGitAlt: FaIcons.FaGitAlt,
  SiGithub: SiIcons.SiGithub,
  SiDocker: SiIcons.SiDocker,
  SiAmazonwebservices: SiIcons.SiAmazonwebservices,
  SiLinux: SiIcons.SiLinux,
  SiTensorflow: SiIcons.SiTensorflow,
  SiKeras: SiIcons.SiKeras,
  SiOpencv: SiIcons.SiOpencv,
  SiGoogle: SiIcons.SiGoogle, // Used for MediaPipe
  SiQt: SiIcons.SiQt, // Used for PyQt5
  FaClock: FaIcons.FaClock,
  FaUsers: FaIcons.FaUsers,
  FaHandshake: FaIcons.FaHandshake,
  FaLightbulb: FaIcons.FaLightbulb,
  FaExchangeAlt: FaIcons.FaExchangeAlt,
  FaGlobe: FaIcons.FaGlobe,
  FaDatabase: FaIcons.FaDatabase,
  FaCogs: FaIcons.FaCogs,
  FaDesktop: FaIcons.FaDesktop,
  SiCloud: SiIcons.SiCloudflare
};

// --- SKILL INTERFACE ---
interface Skill {
  name: string;
  category: string;
  icon: keyof typeof iconComponents;
  description?: string;
}

// --- STATIC SKILLS DATA ---
const customSkills: Skill[] = [
  // Programming Languages
  { name: "C++", category: "Programming Languages", icon: "SiCplusplus" },
  { name: "Python", category: "Programming Languages", icon: "FaPython" },
  { name: "Java", category: "Programming Languages", icon: "FaJava" },
  // { name: "Kotlin", category: "Programming Languages", icon: "SiKotlin" },
  // { name: "C#", category: "Programming Languages", icon: "SiCsharp" },
  // { name: "Golang", category: "Programming Languages", icon: "SiGo" },

  // Web Development
  { name: "HTML", category: "Web Development", icon: "FaHtml5" },
  { name: "CSS", category: "Web Development", icon: "FaCss3Alt" },
  { name: "JavaScript", category: "Web Development", icon: "FaJs" },
  { name: "PHP", category: "Web Development", icon: "SiPhp" },
  { name: "SQL", category: "Web Development", icon: "SiPostgresql" }, // SQL grouped here as per resume

  // Frameworks
  { name: "ReactJS", category: "Frameworks", icon: "FaReact" },
  { name: "Angular", category: "Frameworks", icon: "SiAngular" },
  { name: "Django", category: "Frameworks", icon: "SiDjango" },
  { name: "Flask", category: "Frameworks", icon: "SiFlask" },
  { name: "Bootstrap", category: "Frameworks", icon: "SiBootstrap" },
  { name: "Node.js", category: "Frameworks", icon: "FaNodeJs" },

  // Cloud & DevOps
  { name: "AWS S3", category: "Cloud & DevOps", icon: "SiAmazonwebservices" },
  { name: "DynamoDB", category: "Cloud & DevOps", icon: "SiAmazondynamodb" },
  { name: "MongoDB Atlas", category: "Cloud & DevOps", icon: "SiMongodb" },
  { name: "Docker", category: "Cloud & DevOps", icon: "SiDocker" },
  { name: "Linux Server", category: "Cloud & DevOps", icon: "SiLinux" },

  // Database Management
  { name: "MySQL", category: "Database Management", icon: "SiMysql" },
  { name: "PostgreSQL", category: "Database Management", icon: "SiPostgresql" },
  { name: "MongoDB", category: "Database Management", icon: "SiMongodb" },
  { name: "DynamoDB", category: "Database Management", icon: "SiAmazondynamodb" },

  // Version Control
  { name: "Git", category: "Version Control", icon: "FaGitAlt" },
  { name: "GitHub", category: "Version Control", icon: "SiGithub" },

  // AI & Machine Learning
  { name: "TensorFlow", category: "AI & Machine Learning", icon: "SiTensorflow" },
  { name: "Keras", category: "AI & Machine Learning", icon: "SiKeras" },
  { name: "OpenCV", category: "AI & Machine Learning", icon: "SiOpencv" },
  { name: "MediaPipe", category: "AI & Machine Learning", icon: "SiGoogle" },
  { name: "PyQt5", category: "AI & Machine Learning", icon: "SiQt" }, // Used in AI project

  // Conceptual Knowledge
  { name: "AI", category: "Conceptual Knowledge", icon: "SiTensorflow" },
  { name: "ML", category: "Conceptual Knowledge", icon: "SiTensorflow" },
  { name: "DL", category: "Conceptual Knowledge", icon: "SiTensorflow" },
  { name: "NLP", category: "Conceptual Knowledge", icon: "SiTensorflow" },
  { name: "RL", category: "Conceptual Knowledge", icon: "SiTensorflow" },
  { name: "CN", category: "Conceptual Knowledge", icon: "FaGlobe" },
  { name: "OOP", category: "Conceptual Knowledge", icon: "FaCode" },
  { name: "DSA", category: "Conceptual Knowledge", icon: "FaCogs" },
  { name: "OS", category: "Conceptual Knowledge", icon: "FaDesktop" },
  { name: "CS", category: "Conceptual Knowledge", icon: "FaCode" },

  // Soft Skills
  { name: "Time Management", category: "Soft Skills", icon: "FaClock" },
  { name: "Leadership", category: "Soft Skills", icon: "FaUsers" },
  { name: "Communication", category: "Soft Skills", icon: "FaHandshake" },
  { name: "Problem-Solving", category: "Soft Skills", icon: "FaLightbulb" },
  { name: "Adaptability", category: "Soft Skills", icon: "FaExchangeAlt" },
];

// --- CATEGORY ICONS ---
const categoryIcons: Record<string, keyof typeof iconComponents> = {
  "Programming Languages": "FaCode",
  "Web Development": "FaGlobe",
  "Frameworks": "FaReact",
  "Database Management": "FaDatabase",
  "Version Control": "FaGitAlt",
  "Cloud & DevOps": "SiCloud",
  "AI & Machine Learning": "SiTensorflow",
  "Conceptual Knowledge": "FaCogs",
  "Soft Skills": "FaHandshake",
};

// --- CATEGORY COLORS (Glow + Accent) ---
const categoryColors: Record<string, any> = {
  "Programming Languages": {
    gradient: "from-blue-500/20 to-cyan-500/20",
    glow: "shadow-blue-500/40",
    accent: "text-blue-400",
    skillBg: "bg-blue-500/10",
    skillText: "text-blue-300",
  },
  "Web Development": {
    gradient: "from-green-500/20 to-emerald-500/20",
    glow: "shadow-green-500/40",
    accent: "text-green-400",
    skillBg: "bg-green-500/10",
    skillText: "text-green-300",
  },
  "Frameworks": {
    gradient: "from-teal-500/20 to-cyan-500/20",
    glow: "shadow-teal-500/40",
    accent: "text-teal-400",
    skillBg: "bg-teal-500/10",
    skillText: "text-teal-300",
  },
  "Database Management": {
    gradient: "from-yellow-500/20 to-amber-500/20",
    glow: "shadow-yellow-500/40",
    accent: "text-yellow-400",
    skillBg: "bg-yellow-500/10",
    skillText: "text-yellow-300",
  },
  "Version Control": {
    gradient: "from-indigo-500/20 to-purple-500/20",
    glow: "shadow-indigo-500/40",
    accent: "text-indigo-400",
    skillBg: "bg-indigo-500/10",
    skillText: "text-indigo-300",
  },
  "Cloud & DevOps": {
    gradient: "from-cyan-500/20 to-blue-500/20",
    glow: "shadow-cyan-500/40",
    accent: "text-cyan-400",
    skillBg: "bg-cyan-500/10",
    skillText: "text-cyan-300",
  },
  "AI & Machine Learning": {
    gradient: "from-red-500/20 to-pink-500/20",
    glow: "shadow-red-500/40",
    accent: "text-red-400",
    skillBg: "bg-red-500/10",
    skillText: "text-red-300",
  },
  "Conceptual Knowledge": {
    gradient: "from-purple-500/20 to-violet-500/20",
    glow: "shadow-purple-500/40",
    accent: "text-purple-400",
    skillBg: "bg-purple-500/10",
    skillText: "text-purple-300",
  },
  "Soft Skills": {
    gradient: "from-amber-500/20 to-yellow-500/20",
    glow: "shadow-amber-500/40",
    accent: "text-amber-400",
    skillBg: "bg-amber-500/10",
    skillText: "text-amber-300",
  },
};

// --- ICON RENDERER ---
const renderIcon = (iconName: keyof typeof iconComponents, size = 20, className = "") => {
  const IconComponent = iconComponents[iconName];
  return IconComponent ? (
    <IconComponent size={size} className={className} />
  ) : (
    <FaIcons.FaCode size={size} className={className} />
  );
};

// --- COMPONENT ---
const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Group skills by category
  const skillsByCategory = customSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  const allSkills = Object.entries(skillsByCategory).map(([category, skills]) => ({
    category,
    skills,
  }));

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        {/* Title */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
              Skills
            </span>
          </h2>
                    <motion.div
                      className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {allSkills.map(({ category, skills }) => {
            const colors = categoryColors[category] || {
              gradient: "from-gray-500/20 to-gray-500/20",
              glow: "shadow-gray-500/40",
              accent: "text-gray-400",
              skillBg: "bg-gray-500/10",
              skillText: "text-gray-300",
            };
            const categoryIcon = categoryIcons[category] || "FaCode";

            return (
              <motion.div key={category} whileHover={{ y: -6 }} className="relative group">
                {/* Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} 
                  opacity-30 blur-md group-hover:opacity-60 transition duration-500`}
                ></div>

                {/* Glass Card */}
                <div
                  className={`relative bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 
                  shadow-lg ${colors.glow} flex flex-col h-full`}
                >
                  {/* Category Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-md mb-4`}
                    >
                      {renderIcon(categoryIcon, 32, `${colors.accent}`)}
                    </div>
                    <h3 className={`text-xl font-bold ${colors.accent} mb-2`}>{category}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 
                            hover:border-white/20 hover:shadow-md transition"
                        >
                          {renderIcon(skill.icon, 20, "text-gray-200")}
                          <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-center">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${colors.skillBg} ${colors.skillText} border border-white/10 backdrop-blur-md`}
                    >
                      {skills.length} Skills
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;