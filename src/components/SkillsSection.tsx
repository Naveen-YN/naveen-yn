import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Define icon components mapping
const iconComponents: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
  // Programming Languages
  FaPython: FaIcons.FaPython,
  FaJava: FaIcons.FaJava,
  SiCplusplus: SiIcons.SiCplusplus,
  SiKotlin: SiIcons.SiKotlin,
  FaCode: FaIcons.FaCode,
  SiSwift: SiIcons.SiSwift,
  SiRust: SiIcons.SiRust,
  SiGo: SiIcons.SiGo,
  SiRuby: SiIcons.SiRuby,
  SiScala: SiIcons.SiScala,
  SiHaskell: SiIcons.SiHaskell,
  SiPerl: SiIcons.SiPerl,
  SiLua: SiIcons.SiLua,
  SiDart: SiIcons.SiDart,
  SiElixir: SiIcons.SiElixir,
  
  // Web Development
  FaHtml5: FaIcons.FaHtml5,
  FaCss3Alt: FaIcons.FaCss3Alt,
  FaReact: FaIcons.FaReact,
  SiVuedotjs: SiIcons.SiVuedotjs,
  SiAngular: SiIcons.SiAngular,
  FaNodeJs: FaIcons.FaNodeJs,
  SiExpress: SiIcons.SiExpress,
  SiPhp: SiIcons.SiPhp,
  SiDjango: SiIcons.SiDjango,
  SiFlask: SiIcons.SiFlask,
  SiSvelte: SiIcons.SiSvelte,
  SiNextdotjs: SiIcons.SiNextdotjs,
  SiNuxtdotjs: SiIcons.SiNuxtdotjs,
  SiLaravel: SiIcons.SiLaravel,
  SiRubyonrails: SiIcons.SiRubyonrails,
  SiSpring: SiIcons.SiSpring,
  SiAstro: SiIcons.SiAstro,
  SiTailwindcss: SiIcons.SiTailwindcss,
  SiBootstrap: SiIcons.SiBootstrap,
  SiSass: SiIcons.SiSass,
  SiLess: SiIcons.SiLess,
  SiStyledcomponents: SiIcons.SiStyledcomponents,
  SiWebpack: SiIcons.SiWebpack,
  SiVite: SiIcons.SiVite,
  SiRollup: SiIcons.SiRollup,
  SiEsbuild: SiIcons.SiEsbuild,
  
  // Databases
  SiMongodb: SiIcons.SiMongodb,
  SiMysql: SiIcons.SiMysql,
  SiPostgresql: SiIcons.SiPostgresql,
  SiRedis: SiIcons.SiRedis,
  FaDatabase: FaIcons.FaDatabase,
  SiSqlite: SiIcons.SiSqlite,
  SiMariadb: SiIcons.SiMariadb,
  SiFirebase: SiIcons.SiFirebase,
  SiSupabase: SiIcons.SiSupabase,
  SiElasticsearch: SiIcons.SiElasticsearch,
  SiNeo4J: SiIcons.SiNeo4J,
  SiCouchbase: SiIcons.SiCouchbase,
  
  // Tools & Technologies
  FaGitAlt: FaIcons.FaGitAlt,
  FaAws: FaIcons.FaAws,
  SiDocker: SiIcons.SiDocker,
  SiKubernetes: SiIcons.SiKubernetes,
  FaServer: FaIcons.FaServer,
  FaTools: FaIcons.FaTools,
  FaMobile: FaIcons.FaMobile,
  SiGithub: SiIcons.SiGithub,
  SiGitlab: SiIcons.SiGitlab,
  SiJenkins: SiIcons.SiJenkins,
  SiCircleci: SiIcons.SiCircleci,
  SiTravisci: SiIcons.SiTravisci,
  SiTerraform: SiIcons.SiTerraform,
  SiAnsible: SiIcons.SiAnsible,
  SiPuppet: SiIcons.SiPuppet,
  SiChef: SiIcons.SiChef,
  SiGrafana: SiIcons.SiGrafana,
  SiPrometheus: SiIcons.SiPrometheus,
  FaChartArea: FaIcons.FaChartArea,
  SiVercel: SiIcons.SiVercel,
  SiNetlify: SiIcons.SiNetlify,
  SiHeroku: SiIcons.SiHeroku,
  SiDigitalocean: SiIcons.SiDigitalocean,
  SiGooglecloud: SiIcons.SiGooglecloud,
  
  // AI & ML
  SiTensorflow: SiIcons.SiTensorflow,
  SiPytorch: SiIcons.SiPytorch,
  SiKeras: SiIcons.SiKeras,
  SiScikitlearn: SiIcons.SiScikitlearn,
  SiOpencv: SiIcons.SiOpencv,
  SiPandas: SiIcons.SiPandas,
  SiNumpy: SiIcons.SiNumpy,
  SiJupyter: SiIcons.SiJupyter,
  
  // Mobile Development
  SiAndroid: SiIcons.SiAndroid,
  SiIos: SiIcons.SiIos,
  SiFlutter: SiIcons.SiFlutter,
  SiReactnative: SiIcons.SiReactnative,
  SiXamarin: SiIcons.SiXamarin,
  SiIonic: SiIcons.SiIonic,
  
  // Game Development
  SiUnity: SiIcons.SiUnity,
  SiUnrealengine: SiIcons.SiUnrealengine,
  SiGodotengine: SiIcons.SiGodotengine,
  
  // Design
  SiAdobephotoshop: SiIcons.SiAdobephotoshop,
  SiAdobeillustrator: SiIcons.SiAdobeillustrator,
  SiAdobexd: SiIcons.SiAdobexd,
  SiFigma: SiIcons.SiFigma,
  SiSketch: SiIcons.SiSketch,
  SiInvision: SiIcons.SiInvision,
  
  // General Skills
  FaUsers: FaIcons.FaUsers,
  FaComments: FaIcons.FaComments,
  FaClock: FaIcons.FaClock,
  FaLightbulb: FaIcons.FaLightbulb,
  FaBrain: FaIcons.FaBrain,
  FaGlobe: FaIcons.FaGlobe,
  FaLayerGroup: FaIcons.FaLayerGroup,
  FaCogs: FaIcons.FaCogs,
  FaJs: FaIcons.FaJs,
  SiTypescript: SiIcons.SiTypescript,
  FaChartBar: FaIcons.FaChartBar,
  FaProjectDiagram: FaIcons.FaProjectDiagram,
  FaHandshake: FaIcons.FaHandshake,
  FaChalkboardTeacher: FaIcons.FaChalkboardTeacher,
  FaUserTie: FaIcons.FaUserTie,
  FaUserGraduate: FaIcons.FaUserGraduate,
  FaUserCog: FaIcons.FaUserCog,
  FaUserCheck: FaIcons.FaUserCheck,
  FaUserShield: FaIcons.FaUserShield,
  FaUserClock: FaIcons.FaUserClock,
  FaUserEdit: FaIcons.FaUserEdit,
  FaUserFriends: FaIcons.FaUserFriends,
  FaUserPlus: FaIcons.FaUserPlus,
  FaUserTag: FaIcons.FaUserTag,
  FaUserAstronaut: FaIcons.FaUserAstronaut,
  FaUserNinja: FaIcons.FaUserNinja,
  FaUserSecret: FaIcons.FaUserSecret,
  FaUserMd: FaIcons.FaUserMd,
  FaUserNurse: FaIcons.FaUserNurse,
  FaHandsHelping: FaIcons.FaHandsHelping,
  FaHeadset: FaIcons.FaHeadset,
  FaChartLine: FaIcons.FaChartLine,
  FaTasks: FaIcons.FaTasks,
  FaCalendarAlt: FaIcons.FaCalendarAlt,
  FaClipboardCheck: FaIcons.FaClipboardCheck,
  FaSearchPlus: FaIcons.FaSearchPlus
};

// Type for icon names
type IconName = keyof typeof iconComponents;

// Interface for skill data
interface Skill {
  name: string;
  category: string;
  icon: IconName;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
}

// Category icons
const categoryIcons = {
  'General Skills': 'FaBrain',
  'Programming Languages': 'FaCode',
  'Web Development': 'FaGlobe',
  'Frameworks & Libraries': 'FaLayerGroup',
  'Databases': 'FaDatabase',
  'Tools & Technologies': 'FaCogs',
  'AI & Machine Learning': 'SiTensorflow',
  'Mobile Development': 'FaMobile',
  'Game Development': 'SiUnity',
  'Design': 'SiAdobephotoshop',
  'Soft Skills': 'FaHandshake',
  'DevOps': 'SiDocker'
};

// Category colors
const categoryColors = {
  'General Skills': {
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    accent: 'text-purple-400',
    skillBg: 'bg-purple-500/10',
    skillText: 'text-purple-300',
  },
  'Programming Languages': {
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
    skillBg: 'bg-blue-500/10',
    skillText: 'text-blue-300',
  },
  'Web Development': {
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    accent: 'text-green-400',
    skillBg: 'bg-green-500/10',
    skillText: 'text-green-300',
  },
  'Frameworks & Libraries': {
    gradient: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
    skillBg: 'bg-orange-500/10',
    skillText: 'text-orange-300',
  },
  'Databases': {
    gradient: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
    skillBg: 'bg-yellow-500/10',
    skillText: 'text-yellow-300',
  },
  'Tools & Technologies': {
    gradient: 'from-indigo-500/20 to-purple-500/20',
    border: 'border-indigo-500/30',
    accent: 'text-indigo-400',
    skillBg: 'bg-indigo-500/10',
    skillText: 'text-indigo-300',
  },
  'AI & Machine Learning': {
    gradient: 'from-red-500/20 to-pink-500/20',
    border: 'border-red-500/30',
    accent: 'text-red-400',
    skillBg: 'bg-red-500/10',
    skillText: 'text-red-300',
  },
  'Mobile Development': {
    gradient: 'from-sky-500/20 to-blue-500/20',
    border: 'border-sky-500/30',
    accent: 'text-sky-400',
    skillBg: 'bg-sky-500/10',
    skillText: 'text-sky-300',
  },
  'Game Development': {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-400',
    skillBg: 'bg-emerald-500/10',
    skillText: 'text-emerald-300',
  },
  'Design': {
    gradient: 'from-fuchsia-500/20 to-purple-500/20',
    border: 'border-fuchsia-500/30',
    accent: 'text-fuchsia-400',
    skillBg: 'bg-fuchsia-500/10',
    skillText: 'text-fuchsia-300',
  },
  'Soft Skills': {
    gradient: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
    skillBg: 'bg-amber-500/10',
    skillText: 'text-amber-300',
  },
  'DevOps': {
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
    skillBg: 'bg-cyan-500/10',
    skillText: 'text-cyan-300',
  },
};

// Default colors for undefined categories
const defaultColors = {
  gradient: 'from-gray-500/20 to-gray-500/20',
  border: 'border-gray-500/30',
  accent: 'text-gray-400',
  skillBg: 'bg-gray-500/10',
  skillText: 'text-gray-300',
};

// Render icon component based on icon name
const renderIcon = (iconName: string, size: number = 20, className: string = '') => {
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in iconComponents, using FaCode as fallback`);
    return <FaIcons.FaCode size={size} className={className} />;
  }
  return <IconComponent size={size} className={className} />;
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { customSkills } = useData() as { customSkills: Skill[] };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  // Group skills by category
  const skillsByCategory = customSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  const allSkills = Object.entries(skillsByCategory).map(([category, skills]) => ({
    category,
    skills,
  }));

  if (customSkills.length === 0) {
    return (
      <section id="skills" className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block group">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Skills</span>
              </h2>
              <motion.div
                className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and professional capabilities
            </p>
          </motion.div>
          <div className="text-center py-16">
            <FaCode size={64} className="mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No Skills Found</h3>
            <p className="text-gray-500 mb-6">Skills are being loaded from the database...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block group">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Skills</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </motion.div>
        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allSkills.map((skillCategory, categoryIndex) => {
            const colors = categoryColors[skillCategory.category as keyof typeof categoryColors] || defaultColors;
            const categoryIconName = categoryIcons[skillCategory.category as keyof typeof categoryIcons] || 'FaCode';

            return (
              <motion.div
                key={skillCategory.category}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl blur-sm group-hover:blur-none transition-all duration-500`}
                ></div>
                <div
                  className={`relative bg-black/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-3xl h-full flex flex-col`}
                >
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}
                    >
                      {renderIcon(
                        categoryIconName,
                        32,
                        `${colors.accent} group-hover:scale-110 transition-transform duration-300`
                      )}
                    </div>
                    <h3 className={`text-xl font-bold ${colors.accent} mb-2 group-hover:text-white transition-colors duration-300`}>
                      {skillCategory.category}
                    </h3>
                    <div
                      className={`h-0.5 w-16 mx-auto bg-gradient-to-r ${colors.gradient.replace('/20', '/60')} rounded-full`}
                    ></div>
                  </div>
                  <div className="flex-grow">
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={containerVariants}>
                      {skillCategory.skills.map((skill, skillIndex) => {
                        return (
                          <motion.div
                            key={skillIndex}
                            variants={skillVariants}
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg group/skill"
                            style={{
                              backgroundColor: skill.backgroundColor || undefined,
                              color: skill.textColor || undefined,
                            }}
                            title={skill.description}
                          >
                            <div className="flex-shrink-0">
                              <Suspense fallback={<FaCode size={20} />}>
                                {renderIcon(
                                  skill.icon,
                                  20,
                                  "group-hover/skill:scale-110 transition-transform duration-200"
                                )}
                              </Suspense>
                            </div>
                            <div className="flex-grow min-w-0">
                              <span
                                className="text-sm font-medium truncate group-hover/skill:text-white transition-colors duration-200 block"
                                style={{ color: skill.textColor || undefined }}
                              >
                                {skill.name}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                  <div className="mt-6 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.skillBg} ${colors.skillText} backdrop-blur-sm`}
                    >
                      {skillCategory.skills.length} Skills
                    </span>
                  </div>
                </div>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient.replace('/20', '/10')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;