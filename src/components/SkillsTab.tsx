import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Code, 
  Edit, 
  Save, 
  X, 
  Eye, 
  Palette, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  RotateCcw, 
  Database, 
  Loader,
  Search
} from 'lucide-react';
import { useData, Skill, SkillCategory } from '../contexts/DataContext';
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

const availableIcons = [
  'FaPython', 'FaJava', 'SiCplusplus', 'SiKotlin', 'FaCode', 'FaJs', 'SiTypescript',
  'FaHtml5', 'FaCss3Alt', 'FaReact', 'SiVuedotjs', 'SiAngular', 'FaNodeJs', 'SiExpress',
  'SiPhp', 'SiDjango', 'SiFlask', 'SiMongodb', 'SiMysql', 'SiPostgresql', 'SiRedis',
  'FaDatabase', 'FaGitAlt', 'FaAws', 'SiDocker', 'SiKubernetes', 'FaServer', 'FaTools',
  'FaMobile', 'FaUsers', 'FaComments', 'FaClock', 'FaLightbulb', 'FaBrain', 'FaGlobe',
  'FaLayerGroup', 'FaCogs', 'SiTensorflow', 'SiPytorch', 'SiKeras', 'SiScikitlearn',
  'SiOpencv', 'SiPandas', 'SiNumpy', 'SiJupyter', 'SiAndroid', 'SiIos', 'SiFlutter',
  'SiReactnative', 'SiXamarin', 'SiIonic', 'SiUnity', 'SiUnrealengine', 'SiGodotengine',
  'SiAdobephotoshop', 'SiAdobeillustrator', 'SiAdobexd', 'SiFigma', 'SiSketch',
  'SiInvision', 'FaChartBar', 'FaProjectDiagram', 'FaHandshake', 'FaChalkboardTeacher',
  'FaUserTie', 'FaUserGraduate', 'FaUserCog', 'FaUserCheck', 'FaUserShield', 'FaUserClock',
  'FaUserEdit', 'FaUserFriends', 'FaUserPlus', 'FaUserTag', 'FaUserAstronaut', 'FaUserNinja',
  'FaUserSecret', 'FaUserMd', 'FaUserNurse', 'FaHandsHelping', 'FaHeadset', 'FaChartLine',
  'FaTasks', 'FaCalendarAlt', 'FaClipboardCheck', 'FaChartArea', 'FaSearchPlus'
];

// Category icon mapping
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

const predefinedColors = [
  { name: 'Python Blue', bg: 'rgba(55, 118, 171, 0.15)', text: '#FFFFFF', border: 'rgba(55, 118, 171, 0.3)' },
  { name: 'JavaScript Yellow', bg: 'rgba(247, 223, 30, 0.15)', text: '#000000', border: 'rgba(247, 223, 30, 0.3)' },
  { name: 'React Blue', bg: 'rgba(97, 218, 251, 0.15)', text: '#FFFFFF', border: 'rgba(97, 218, 251, 0.3)' },
  { name: 'Vue Green', bg: 'rgba(79, 192, 141, 0.15)', text: '#FFFFFF', border: 'rgba(79, 192, 141, 0.3)' },
  { name: 'Angular Red', bg: 'rgba(221, 0, 49, 0.15)', text: '#FFFFFF', border: 'rgba(221, 0, 49, 0.3)' },
  { name: 'Node Green', bg: 'rgba(51, 153, 51, 0.15)', text: '#FFFFFF', border: 'rgba(51, 153, 51, 0.3)' },
  { name: 'MongoDB Green', bg: 'rgba(71, 162, 72, 0.15)', text: '#FFFFFF', border: 'rgba(71, 162, 72, 0.3)' },
  { name: 'MySQL Blue', bg: 'rgba(68, 121, 161, 0.15)', text: '#FFFFFF', border: 'rgba(68, 121, 161, 0.3)' },
  { name: 'AWS Orange', bg: 'rgba(255, 153, 0, 0.15)', text: '#000000', border: 'rgba(255, 153, 0, 0.3)' },
  { name: 'Docker Blue', bg: 'rgba(36, 150, 237, 0.15)', text: '#FFFFFF', border: 'rgba(36, 150, 237, 0.3)' },
  { name: 'Git Orange', bg: 'rgba(240, 80, 50, 0.15)', text: '#FFFFFF', border: 'rgba(240, 80, 50, 0.3)' },
  { name: 'TypeScript Blue', bg: 'rgba(49, 120, 198, 0.15)', text: '#FFFFFF', border: 'rgba(49, 120, 198, 0.3)' },
  { name: 'PHP Purple', bg: 'rgba(119, 123, 180, 0.15)', text: '#FFFFFF', border: 'rgba(119, 123, 180, 0.3)' },
  { name: 'Java Orange', bg: 'rgba(237, 139, 0, 0.15)', text: '#FFFFFF', border: 'rgba(237, 139, 0, 0.3)' },
  { name: 'C++ Blue', bg: 'rgba(0, 89, 156, 0.15)', text: '#FFFFFF', border: 'rgba(0, 89, 156, 0.3)' },
  { name: 'Kotlin Purple', bg: 'rgba(127, 82, 255, 0.15)', text: '#FFFFFF', border: 'rgba(127, 82, 255, 0.3)' },
  { name: 'C# Green', bg: 'rgba(35, 145, 32, 0.15)', text: '#FFFFFF', border: 'rgba(35, 145, 32, 0.3)' },
  { name: 'HTML Orange', bg: 'rgba(227, 79, 38, 0.15)', text: '#FFFFFF', border: 'rgba(227, 79, 38, 0.3)' },
  { name: 'CSS Blue', bg: 'rgba(21, 114, 182, 0.15)', text: '#FFFFFF', border: 'rgba(21, 114, 182, 0.3)' },
  { name: 'PostgreSQL Blue', bg: 'rgba(51, 103, 145, 0.15)', text: '#FFFFFF', border: 'rgba(51, 103, 145, 0.3)' },
];

// Render icon component based on icon name - moved to module level
const renderIcon = (iconName: string, size: number = 20, className: string = '') => {
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in iconComponents, using FaCode as fallback`);
    return <FaIcons.FaCode size={size} className={className} />;
  }
  return <IconComponent size={size} className={className} />;
};

// IconSelector Component
interface IconSelectorProps {
  selectedIcon: string;
  onIconChange: (icon: string) => void;
  iconSearch: string;
  onSearchChange: (search: string) => void;
  title?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onIconChange,
  iconSearch,
  onSearchChange,
  title = "Select Icon"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredIcons = useMemo(() => {
    if (!iconSearch.trim()) return availableIcons;
    return availableIcons.filter(icon =>
      icon.toLowerCase().includes(iconSearch.toLowerCase())
    );
  }, [iconSearch]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="w-12 h-14 bg-gray-800 rounded-lg flex items-center justify-center">
          {renderIcon(selectedIcon, 24, "text-[#09c6f9]")}
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">Selected icon</p>
          <p className="text-gray-400 text-sm">{selectedIcon}</p>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white"
        >
          View All Icons
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">
                {title}
              </h3>
              
              <div className="relative mb-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={iconSearch}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search icons..."
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white text-sm focus:outline-none focus:border-[#09c6f9] pr-10"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {filteredIcons.map(icon => (
                  <button
                    key={icon}
                    onClick={() => {
                      onIconChange(icon);
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-lg transition-colors ${
                      selectedIcon === icon 
                        ? 'bg-[#045de9]/20 border-2 border-[#045de9]/50' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {renderIcon(icon, 24, selectedIcon === icon ? "text-[#09c6f9]" : "text-gray-300")}
                      <span className="text-xs text-gray-400 truncate w-full text-center">
                        {icon.replace('Fa', '').replace('Si', '')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {filteredIcons.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-lg mb-2">No icons found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
              
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    onSearchChange('');
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] rounded-lg transition-colors"
                >
                  Apply Icon
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillsTab: React.FC = () => {
  const { 
    skills,
    setSkills,
    customSkills, 
    addCustomSkill, 
    updateCustomSkill, 
    deleteCustomSkill, 
    deduplicateSkills, 
    clearAllSkills,
    refreshSkillsFromDatabase,
    isLoading 
  } = useData();
  
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [operationLoading, setOperationLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedCategoryForIcon, setSelectedCategoryForIcon] = useState<number | null>(null);
  const [newCategoryIcon, setNewCategoryIcon] = useState<string>('FaCode');
  const [iconSearch, setIconSearch] = useState<string>('');
  const [newSkillForm, setNewSkillForm] = useState({
    name: '',
    icon: 'FaCode',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    textColor: '#FFFFFF',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    category: '',
    description: '',
  });

  // Ensure skills is always an array
  const safeSkills = skills || [];

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOperationLoadingStatus = (operation: string, loading: boolean) => {
    setOperationLoading(prev => ({ ...prev, [operation]: loading }));
  };

  const handleAddCustomSkill = async (categoryIndex: number) => {
    if (!newSkillForm.name.trim()) {
      showNotification('error', 'Please enter a skill name');
      return;
    }

    const categoryName = safeSkills[categoryIndex].category;
    updateOperationLoadingStatus('add', true);
    
    try {
      await addCustomSkill({
        name: newSkillForm.name.trim(),
        icon: newSkillForm.icon,
        backgroundColor: newSkillForm.backgroundColor,
        textColor: newSkillForm.textColor,
        borderColor: newSkillForm.borderColor,
        category: categoryName,
        description: newSkillForm.description,
        proficiency: undefined,
        isCustom: true,
      });

      // Reset form
      setNewSkillForm({
        name: '',
        icon: 'FaCode',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        textColor: '#FFFFFF',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        category: '',
        description: '',
      });

      showNotification('success', `Successfully added "${newSkillForm.name}" to ${categoryName}`);
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to add skill. Please try again.');
    } finally {
      updateOperationLoadingStatus('add', false);
    }
  };

  const handleDeleteCustomSkill = async (skillId: string, skillName: string) => {
    if (!confirm(`Are you sure you want to delete "${skillName}"?`)) return;
    
    updateOperationLoadingStatus(`delete-${skillId}`, true);
    try {
      await deleteCustomSkill(skillId);
      showNotification('success', `Successfully deleted "${skillName}"`);
    } catch (error) {
      showNotification('error', 'Failed to delete skill. Please try again.');
    } finally {
      updateOperationLoadingStatus(`delete-${skillId}`, false);
    }
  };

  const handleUpdateSkill = async (skillId: string, updates: Partial<Skill>) => {
    updateOperationLoadingStatus(`update-${skillId}`, true);
    try {
      await updateCustomSkill(skillId, updates);
      showNotification('success', 'Skill updated successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to update skill');
    } finally {
      updateOperationLoadingStatus(`update-${skillId}`, false);
    }
  };

  const addCategory = () => {
    const newCategory: SkillCategory = {
      category: 'New Category',
      skills: []
    };
    setSkills([...safeSkills, newCategory]);
    showNotification('success', 'New category added successfully');
  };

  const deleteCategory = async (categoryIndex: number) => {
    if (!confirm('Are you sure you want to delete this category and all its skills?')) return;
    
    const categoryToDelete = safeSkills[categoryIndex];
    updateOperationLoadingStatus(`delete-category-${categoryIndex}`, true);
    
    try {
      // Remove custom skills from this category
      const skillsToRemove = categoryToDelete.skills.filter(skill => typeof skill === 'object' && 'id' in skill);
      
      for (const skill of skillsToRemove) {
        await deleteCustomSkill((skill as Skill).id);
      }

      // Remove category
      const newSkills = safeSkills.filter((_, i) => i !== categoryIndex);
      setSkills(newSkills);
      
      showNotification('success', `Category "${categoryToDelete.category}" deleted successfully`);
    } catch (error) {
      showNotification('error', 'Failed to delete category');
    } finally {
      updateOperationLoadingStatus(`delete-category-${categoryIndex}`, false);
    }
  };

  const updateCategoryName = (categoryIndex: number, newName: string) => {
    const newSkills = [...safeSkills];
    newSkills[categoryIndex].category = newName;
    setSkills(newSkills);
  };

  const updateCategoryIcon = (categoryIndex: number, newIcon: string) => {
    showNotification('success', `Category icon updated to ${newIcon}`);
    setSelectedCategoryForIcon(null);
  };

  const toggleCategoryExpansion = (categoryIndex: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex]
    }));
  };

  const applyPredefinedColor = async (skillId: string, color: typeof predefinedColors[0]) => {
    await handleUpdateSkill(skillId, {
      backgroundColor: color.bg,
      textColor: color.text,
      borderColor: color.border,
    });
    setShowColorPicker(null);
  };

  const handleDeduplication = async () => {
    updateOperationLoadingStatus('deduplicate', true);
    try {
      await deduplicateSkills();
      showNotification('success', 'Deduplication completed successfully!');
    } catch (error) {
      showNotification('error', 'Failed to deduplicate skills');
    } finally {
      updateOperationLoadingStatus('deduplicate', false);
    }
  };

  const handleClearAllSkills = async () => {
    if (!confirm('⚠️ This will permanently delete ALL skills from the database. Are you sure?')) return;
    
    updateOperationLoadingStatus('clear', true);
    try {
      await clearAllSkills();
      showNotification('warning', 'All skills have been cleared from the database.');
    } catch (error) {
      showNotification('error', 'Failed to clear skills');
    } finally {
      updateOperationLoadingStatus('clear', false);
    }
  };

  const handleRefreshFromDatabase = async () => {
    updateOperationLoadingStatus('refresh', true);
    try {
      await refreshSkillsFromDatabase();
      showNotification('success', 'Skills refreshed from database successfully!');
    } catch (error) {
      showNotification('error', 'Failed to refresh skills from database');
    } finally {
      updateOperationLoadingStatus('refresh', false);
    }
  };

  return (
    <div>
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-sm max-w-md ${
              notification.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30 text-green-400'
                : notification.type === 'error'
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
            }`}
          >
            <div className="flex items-start gap-3">
              {notification.type === 'success' && <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />}
              {notification.type === 'error' && <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />}
              {notification.type === 'warning' && <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />}
              <span className="font-medium text-sm leading-relaxed">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-xl flex items-center justify-center">
          <Database size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Database Skills Management</h2>
          <p className="text-gray-400">Manage skills with Supabase database integration and duplicate prevention</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Skill Categories</h3>
        <div className="flex gap-3">
          <motion.button
            onClick={handleRefreshFromDatabase}
            disabled={operationLoading.refresh || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {operationLoading.refresh ? <Loader size={18} className="animate-spin" /> : <Database size={18} />}
            Refresh from DB
          </motion.button>
          <motion.button
            onClick={handleClearAllSkills}
            disabled={operationLoading.clear || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {operationLoading.clear ? <Loader size={18} className="animate-spin" /> : <RotateCcw size={18} />}
            Clear All Skills
          </motion.button>
          <motion.button
            onClick={handleDeduplication}
            disabled={operationLoading.deduplicate || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 disabled:cursor-not-allowed rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {operationLoading.deduplicate ? <Loader size={18} className="animate-spin" /> : <Sparkles size={18} />}
            Remove Duplicates
          </motion.button>
          <motion.button
            onClick={addCategory}
            className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Plus size={18} />
            Add Category
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        {safeSkills.map((skillCategory, categoryIndex) => (
          <div key={categoryIndex} className="bg-black/20 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl">
            {/* Category Header with Glass Effect */}
            <div className="p-6 bg-gradient-to-r from-white/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleCategoryExpansion(categoryIndex)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {expandedCategories[categoryIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {/* Category Icon Button */}
                  <button 
                    onClick={() => {
                      setSelectedCategoryForIcon(categoryIndex);
                      setNewCategoryIcon(categoryIcons[skillCategory.category as keyof typeof categoryIcons] || 'FaCode');
                    }}
                    className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-colors"
                    title="Change category icon"
                  >
                    {renderIcon(categoryIcons[skillCategory.category as keyof typeof categoryIcons] || 'FaCode', 20, "text-[#09c6f9]")}
                  </button>
                  
                  <input
                    value={skillCategory.category}
                    onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                    className="text-xl font-semibold bg-gray-800/80 backdrop-blur-sm rounded px-3 py-2 text-white focus:outline-none focus:border-[#09c6f9] focus:bg-gray-800/90 flex-1"
                    placeholder="Category name"
                  />
                  <div className="text-sm text-gray-400 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {skillCategory.skills.length} skill{skillCategory.skills.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <button
                  onClick={() => deleteCategory(categoryIndex)}
                  disabled={operationLoading[`delete-category-${categoryIndex}`]}
                  className="text-red-400 hover:text-red-300 transition-colors ml-4 disabled:opacity-50"
                >
                  {operationLoading[`delete-category-${categoryIndex}`] ? <Loader size={20} className="animate-spin" /> : <Trash2 size={20} />}
                </button>
              </div>
            </div>

            {/* Category Content */}
            <AnimatePresence>
              {(expandedCategories[categoryIndex] !== false) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 bg-gradient-to-br from-white/5 to-transparent"
                >
                  {/* Existing Skills */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Eye size={16} className="text-[#09c6f9]" />
                      Current Skills
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skillCategory.skills.map((skill, skillIndex) => {
                        const skillData = skill as Skill;
                        const skillId = skillData.id;

                        return (
                          <div
                            key={skillIndex}
                            className="relative group"
                          >
                            <div
                              className="p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                              style={{
                                backgroundColor: skillData.backgroundColor,
                                color: skillData.textColor
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {renderIcon(skillData.icon, 16, "")}
                                  <span className="font-medium text-sm">{skillData.name}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => setEditingSkill(editingSkill === skillId ? null : skillId)}
                                    className="p-1 rounded hover:bg-black/20 transition-colors"
                                    style={{ color: skillData.textColor }}
                                    disabled={operationLoading[`update-${skillId}`]}
                                  >
                                    {operationLoading[`update-${skillId}`] ? <Loader size={14} className="animate-spin" /> : editingSkill === skillId ? <X size={14} /> : <Edit size={14} />}
                                  </button>
                                  <button
                                    onClick={() => setShowColorPicker(showColorPicker === skillId ? null : skillId)}
                                    className="p-1 rounded hover:bg-black/20 transition-colors"
                                    style={{ color: skillData.textColor }}
                                  >
                                    <Palette size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCustomSkill(skillId, skillData.name)}
                                    className="p-1 rounded hover:bg-red-500/20 transition-colors text-red-400"
                                    disabled={operationLoading[`delete-${skillId}`]}
                                  >
                                    {operationLoading[`delete-${skillId}`] ? <Loader size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                  </button>
                                </div>
                              </div>
                              
                              {skillData.description && (
                                <p className="text-xs opacity-80 line-clamp-2">{skillData.description}</p>
                              )}
                            </div>

                            {/* Color Picker Popup with Glass Effect */}
                            <AnimatePresence>
                              {showColorPicker === skillId && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full left-0 mt-2 bg-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-xl z-50 w-80"
                                >
                                  <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                    <Sparkles size={16} className="text-[#09c6f9]" />
                                    Choose Glass Color Theme
                                  </h5>
                                  <div className="grid grid-cols-4 gap-2 mb-4">
                                    {predefinedColors.map((color, i) => (
                                      <button
                                        key={i}
                                        onClick={() => applyPredefinedColor(skillId, color)}
                                        className="w-full h-8 rounded hover:border-white/50 transition-colors flex items-center justify-center text-xs font-medium backdrop-blur-sm"
                                        style={{
                                          backgroundColor: color.bg,
                                          color: color.text
                                        }}
                                        title={color.name}
                                      >
                                        {skillData.name.slice(0, 2)}
                                      </button>
                                    ))}
                                  </div>
                                  <div className="space-y-3">
                                    <div>
                                      <label className="block text-xs text-gray-300 mb-1">Background (with transparency)</label>
                                      <input
                                        type="text"
                                        value={skillData.backgroundColor}
                                        onChange={(e) => handleUpdateSkill(skillId, { backgroundColor: e.target.value })}
                                        className="w-full px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-white text-xs focus:outline-none focus:border-[#09c6f9]"
                                        placeholder="rgba(59, 130, 246, 0.15)"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-300 mb-1">Text Color</label>
                                      <input
                                        type="color"
                                        value={skillData.textColor}
                                        onChange={(e) => handleUpdateSkill(skillId, { textColor: e.target.value })}
                                        className="w-full h-8 rounded"
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Edit Form with Glass Effect */}
                            <AnimatePresence>
                              {editingSkill === skillId && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full left-0 mt-2 bg-gray-900/90 backdrop-blur-xl rounded-lg p-4 shadow-xl z-40 w-80"
                                >
                                  <div className="space-y-3">
                                    <div>
                                      <label className="block text-xs text-gray-300 mb-1">Skill Name</label>
                                      <input
                                        value={skillData.name}
                                        onChange={(e) => handleUpdateSkill(skillId, { name: e.target.value })}
                                        className="w-full px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-white text-sm focus:outline-none focus:border-[#09c6f9]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-300 mb-1">Description</label>
                                      <textarea
                                        value={skillData.description}
                                        onChange={(e) => handleUpdateSkill(skillId, { description: e.target.value })}
                                        className="w-full px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-white text-sm h-16 resize-none focus:outline-none focus:border-[#09c6f9]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-300 mb-1">Icon</label>
                                      <IconSelector
                                        selectedIcon={skillData.icon}
                                        onIconChange={(icon) => handleUpdateSkill(skillId, { icon })}
                                        iconSearch={iconSearch}
                                        onSearchChange={setIconSearch}
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add New Skill Form with Glass Effect */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Plus size={16} className="text-[#09c6f9]" />
                      Add New Skill to Database
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                        <input
                          value={newSkillForm.name}
                          onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white focus:outline-none focus:border-[#09c6f9]"
                          placeholder="e.g., React"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                        <IconSelector
                          selectedIcon={newSkillForm.icon}
                          onIconChange={(icon) => setNewSkillForm({ ...newSkillForm, icon })}
                          iconSearch={iconSearch}
                          onSearchChange={setIconSearch}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Background (Glass Effect)</label>
                        <input
                          type="text"
                          value={newSkillForm.backgroundColor}
                          onChange={(e) => setNewSkillForm({ ...newSkillForm, backgroundColor: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded text-white focus:outline-none focus:border-[#09c6f9]"
                          placeholder="rgba(59, 130, 246, 0.15)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                        <input
                          type="color"
                          value={newSkillForm.textColor}
                          onChange={(e) => setNewSkillForm({ ...newSkillForm, textColor: e.target.value })}
                          className="w-full h-10 rounded bg-gray-800/80"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={newSkillForm.description}
                        onChange={(e) => setNewSkillForm({ ...newSkillForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white focus:outline-none focus:border-[#09c6f9] h-20 resize-none"
                        placeholder="Brief description of your skill level and experience"
                      />
                    </div>

                    {/* Color Presets */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Quick Glass Color Presets</label>
                      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                        {predefinedColors.slice(0, 10).map((color, i) => (
                          <button
                            key={i}
                            onClick={() => setNewSkillForm({
                              ...newSkillForm,
                              backgroundColor: color.bg,
                              textColor: color.text,
                              borderColor: color.border
                            })}
                            className="w-8 h-8 rounded hover:border-white/50 transition-colors backdrop-blur-sm"
                            style={{ 
                              backgroundColor: color.bg
                            }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Preview with Glass Effect */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
                      <div
                        className="inline-block p-3 rounded-lg backdrop-blur-sm"
                        style={{
                          backgroundColor: newSkillForm.backgroundColor,
                          color: newSkillForm.textColor
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {renderIcon(newSkillForm.icon, 16, "")}
                          <span className="font-medium">{newSkillForm.name || 'Skill Name'}</span>
                        </div>
                        {newSkillForm.description && (
                          <p className="text-xs opacity-80">{newSkillForm.description}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddCustomSkill(categoryIndex)}
                      disabled={!newSkillForm.name.trim() || operationLoading.add}
                      className="w-full px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {operationLoading.add ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
                      {operationLoading.add ? 'Adding to Database...' : `Add Skill to ${skillCategory.category}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {safeSkills.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Database size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No skill categories yet</p>
            <p className="text-sm">Click "Add Category" to create your first skill category</p>
          </div>
        )}
      </div>
{/* Category Icon Selector Modal */}
<AnimatePresence>
  {selectedCategoryForIcon !== null && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedCategoryForIcon(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 max-w-2xl w-full max-h-l h-full overflow-y-auto" // Changed max-h-[100vh] to max-h-[120vh]
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Palette size={20} className="text-[#09c6f9]" />
          Select Category Icon
        </h3>

        <IconSelector
          selectedIcon={newCategoryIcon}
          onIconChange={setNewCategoryIcon}
          iconSearch={iconSearch}
          onSearchChange={setIconSearch}
          title="Select Category Icon"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setSelectedCategoryForIcon(null)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedCategoryForIcon !== null) {
                updateCategoryIcon(selectedCategoryForIcon, newCategoryIcon);
              }
            }}
            className="px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] rounded-lg transition-colors"
          >
            Apply Icon
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      
      {/* Skills Summary with Glass Effect */}
      <div className="mt-8 bg-black/20 backdrop-blur-xl rounded-xl p-6 shadow-2xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database size={20} className="text-[#09c6f9]" />
          Database Skills Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-[#09c6f9]">{safeSkills.length}</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-[#09c6f9]">
              {safeSkills.reduce((total, category) => total + category.skills.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Skills</div>
          </div>
          <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-[#09c6f9]">{customSkills.length}</div>
            <div className="text-sm text-gray-400">Database Skills</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-green-500/10 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <CheckCircle size={16} />
            <span className="font-medium">Database Integration Active</span>
          </div>
          <p className="text-green-300 text-sm">
            All skills are stored in Supabase with automatic duplicate prevention. 
            Changes are synced in real-time across all sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;