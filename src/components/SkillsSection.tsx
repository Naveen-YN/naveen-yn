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
  FaReact: FaIcons.FaReact,
  FaHtml5: FaIcons.FaHtml5,
  FaCss3Alt: FaIcons.FaCss3Alt,
  FaNodeJs: FaIcons.FaNodeJs,
  SiMongodb: SiIcons.SiMongodb,
  SiMysql: SiIcons.SiMysql,
  FaGitAlt: FaIcons.FaGitAlt,
  SiDocker: SiIcons.SiDocker,
  SiTensorflow: SiIcons.SiTensorflow,
  SiPytorch: SiIcons.SiPytorch,
  FaGlobe: FaIcons.FaGlobe,
  FaDatabase: FaIcons.FaDatabase,
  FaCogs: FaIcons.FaCogs,
  SiUnity: SiIcons.SiUnity,
  SiAdobephotoshop: SiIcons.SiAdobephotoshop,
  FaHandshake: FaIcons.FaHandshake,
  FaMobile: FaIcons.FaMobile,
  FaCode: FaIcons.FaCode,
  FaUsers: FaIcons.FaUsers,
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
  { name: "Python", category: "Programming Languages", icon: "FaPython" },
  { name: "Java", category: "Programming Languages", icon: "FaJava" },
  { name: "C++", category: "Programming Languages", icon: "SiCplusplus" },
  { name: "HTML5", category: "Web Development", icon: "FaHtml5" },
  { name: "CSS3", category: "Web Development", icon: "FaCss3Alt" },
  { name: "React", category: "Web Development", icon: "FaReact" },
  { name: "Node.js", category: "Web Development", icon: "FaNodeJs" },
  { name: "MongoDB", category: "Databases", icon: "SiMongodb" },
  { name: "MySQL", category: "Databases", icon: "SiMysql" },
  { name: "Git", category: "Tools & Technologies", icon: "FaGitAlt" },
  { name: "Docker", category: "DevOps", icon: "SiDocker" },
  { name: "TensorFlow", category: "AI & Machine Learning", icon: "SiTensorflow" },
  { name: "PyTorch", category: "AI & Machine Learning", icon: "SiPytorch" },
  // { name: "Unity", category: "Game Development", icon: "SiUnity" },
  // { name: "Photoshop", category: "Design", icon: "SiAdobephotoshop" },
  { name: "Collaboration", category: "Soft Skills", icon: "FaHandshake" },
  { name: "Teamwork", category: "Soft Skills", icon: "FaUsers"}
];

// --- CATEGORY ICONS ---
const categoryIcons: Record<string, keyof typeof iconComponents> = {
  "Programming Languages": "FaCode",
  "Web Development": "FaGlobe",
  Databases: "FaDatabase",
  "Tools & Technologies": "FaCogs",
  "AI & Machine Learning": "SiTensorflow",
  "Mobile Development": "FaMobile",
  "Game Development": "SiUnity",
  Design: "SiAdobephotoshop",
  "Soft Skills": "FaHandshake",
  DevOps: "SiDocker",
  "Frameworks": "FaCode"
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
  Databases: {
    gradient: "from-yellow-500/20 to-amber-500/20",
    glow: "shadow-yellow-500/40",
    accent: "text-yellow-400",
    skillBg: "bg-yellow-500/10",
    skillText: "text-yellow-300",
  },
  "Tools & Technologies": {
    gradient: "from-indigo-500/20 to-purple-500/20",
    glow: "shadow-indigo-500/40",
    accent: "text-indigo-400",
    skillBg: "bg-indigo-500/10",
    skillText: "text-indigo-300",
  },
  "AI & Machine Learning": {
    gradient: "from-red-500/20 to-pink-500/20",
    glow: "shadow-red-500/40",
    accent: "text-red-400",
    skillBg: "bg-red-500/10",
    skillText: "text-red-300",
  },
  DevOps: {
    gradient: "from-cyan-500/20 to-blue-500/20",
    glow: "shadow-cyan-500/40",
    accent: "text-cyan-400",
    skillBg: "bg-cyan-500/10",
    skillText: "text-cyan-300",
  },
  "Game Development": {
    gradient: "from-emerald-500/20 to-teal-500/20",
    glow: "shadow-emerald-500/40",
    accent: "text-emerald-400",
    skillBg: "bg-emerald-500/10",
    skillText: "text-emerald-300",
  },
  Design: {
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    glow: "shadow-fuchsia-500/40",
    accent: "text-fuchsia-400",
    skillBg: "bg-fuchsia-500/10",
    skillText: "text-fuchsia-300",
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
  if (!IconComponent) return <FaIcons.FaCode size={size} className={className} />;
  return <IconComponent size={size} className={className} />;
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
