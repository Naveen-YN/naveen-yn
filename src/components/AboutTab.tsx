import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Image, 
  AlignLeft, 
  Eye, 
  Type, 
  Code, 
  Target, 
  Lightbulb, 
  Briefcase, 
  Plus, 
  Trash2, 
  Save,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Calendar,
  Award,
  Users,
  Heart,
  Languages,
  Briefcase as BriefcaseIcon,
  Edit,
  X,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  Palette,
  Star,
  CheckCircle,
  AlertTriangle,
  Loader,
  Database
} from 'lucide-react';
import { useData, AboutMe, Highlight } from '../contexts/DataContext';

const availableIcons = [
  'Code', 'Target', 'Lightbulb', 'Briefcase', 'Users', 'Award', 'Star', 'Heart', 
  'Zap', 'Shield', 'Rocket', 'Trophy', 'Crown', 'Diamond', 'Flame', 'Bolt',
  'CheckCircle', 'ThumbsUp', 'TrendingUp', 'BarChart', 'PieChart', 'Activity'
];

const colorSchemes = [
  { name: 'Blue', value: 'blue', colors: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400' },
  { name: 'Green', value: 'green', colors: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400' },
  { name: 'Purple', value: 'purple', colors: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400' },
  { name: 'Orange', value: 'orange', colors: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400' },
  { name: 'Yellow', value: 'yellow', colors: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400' },
  { name: 'Indigo', value: 'indigo', colors: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400' },
  { name: 'Pink', value: 'pink', colors: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400' },
  { name: 'Red', value: 'red', colors: 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400' },
];

const AboutTab: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { 
    aboutMeData, 
    updateAboutMe, 
    keyHighlights, 
    additionalHighlights,
    addKeyHighlight,
    updateKeyHighlight,
    deleteKeyHighlight,
    addAdditionalHighlight,
    updateAdditionalHighlight,
    deleteAdditionalHighlight,
    isLoading 
  } = useData();

  const [localAboutData, setLocalAboutData] = useState<AboutMe>(aboutMeData);
  const [editingHighlight, setEditingHighlight] = useState<{ type: 'key' | 'additional'; id: string } | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [operationLoading, setOperationLoading] = useState<{ [key: string]: boolean }>({});

  // Update local state when aboutMeData changes
  useEffect(() => {
    setLocalAboutData(aboutMeData);
  }, [aboutMeData]);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOperationLoadingStatus = (operation: string, loading: boolean) => {
    setOperationLoading(prev => ({ ...prev, [operation]: loading }));
  };

  const handleAboutMeUpdate = async (field: keyof AboutMe, value: any) => {
    try {
      const updates = { [field]: value };
      setLocalAboutData(prev => ({ ...prev, ...updates }));
      await updateAboutMe(updates);
    } catch (error) {
      showNotification('error', `Failed to update ${field}`);
      console.error('Error updating about me:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleAboutMeUpdate('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    handleAboutMeUpdate('profilePicture', '');
  };

  const handleAddHighlight = async (type: 'key' | 'additional') => {
    updateOperationLoadingStatus(`add-${type}`, true);
    try {
      const newHighlight: Omit<Highlight, 'id'> = {
        icon: 'Star',
        title: 'New Highlight',
        description: 'Description of the highlight',
        orderIndex: type === 'key' ? keyHighlights.length : additionalHighlights.length,
        isActive: true,
        colorScheme: type === 'key' ? 'blue' : 'purple',
      };

      if (type === 'key') {
        await addKeyHighlight(newHighlight);
      } else {
        await addAdditionalHighlight(newHighlight);
      }

      showNotification('success', `${type === 'key' ? 'Key' : 'Additional'} highlight added successfully`);
    } catch (error) {
      showNotification('error', `Failed to add ${type} highlight`);
    } finally {
      updateOperationLoadingStatus(`add-${type}`, false);
    }
  };

  const handleUpdateHighlight = async (type: 'key' | 'additional', id: string, updates: Partial<Highlight>) => {
    updateOperationLoadingStatus(`update-${id}`, true);
    try {
      if (type === 'key') {
        await updateKeyHighlight(id, updates);
      } else {
        await updateAdditionalHighlight(id, updates);
      }
      showNotification('success', 'Highlight updated successfully');
    } catch (error) {
      showNotification('error', 'Failed to update highlight');
    } finally {
      updateOperationLoadingStatus(`update-${id}`, false);
    }
  };

  const handleDeleteHighlight = async (type: 'key' | 'additional', id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    updateOperationLoadingStatus(`delete-${id}`, true);
    try {
      if (type === 'key') {
        await deleteKeyHighlight(id);
      } else {
        await deleteAdditionalHighlight(id);
      }
      showNotification('success', 'Highlight deleted successfully');
    } catch (error) {
      showNotification('error', 'Failed to delete highlight');
    } finally {
      updateOperationLoadingStatus(`delete-${id}`, false);
    }
  };

  const moveHighlight = async (type: 'key' | 'additional', id: string, direction: 'up' | 'down') => {
    const highlights = type === 'key' ? keyHighlights : additionalHighlights;
    const currentIndex = highlights.findIndex(h => h.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < highlights.length) {
      const currentHighlight = highlights[currentIndex];
      const targetHighlight = highlights[targetIndex];
      
      // Swap order indices
      await handleUpdateHighlight(type, currentHighlight.id, { orderIndex: targetHighlight.orderIndex });
      await handleUpdateHighlight(type, targetHighlight.id, { orderIndex: currentHighlight.orderIndex });
    }
  };

  const renderHighlightCard = (highlight: Highlight, type: 'key' | 'additional', index: number) => {
    const isEditing = editingHighlight?.type === type && editingHighlight?.id === highlight.id;
    const colorScheme = colorSchemes.find(cs => cs.value === highlight.colorScheme) || colorSchemes[0];

    return (
      <div key={highlight.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorScheme.colors.split(' ')[0]} ${colorScheme.colors.split(' ')[1]} flex items-center justify-center`}>
              <span className="text-lg">⭐</span>
            </div>
            <div>
              <h4 className="font-semibold text-white">{highlight.title}</h4>
              <p className="text-sm text-gray-400">{highlight.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => moveHighlight(type, highlight.id, 'up')}
              disabled={index === 0}
              className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={() => moveHighlight(type, highlight.id, 'down')}
              disabled={index === (type === 'key' ? keyHighlights : additionalHighlights).length - 1}
              className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => handleUpdateHighlight(type, highlight.id, { isActive: !highlight.isActive })}
              className={`p-1 transition-colors ${highlight.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-500 hover:text-gray-400'}`}
            >
              {highlight.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
            </button>
            <button
              onClick={() => setEditingHighlight(isEditing ? null : { type, id: highlight.id })}
              className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
              disabled={operationLoading[`update-${highlight.id}`]}
            >
              {operationLoading[`update-${highlight.id}`] ? <Loader size={16} className="animate-spin" /> : isEditing ? <X size={16} /> : <Edit size={16} />}
            </button>
            <button
              onClick={() => handleDeleteHighlight(type, highlight.id, highlight.title)}
              className="p-1 text-red-400 hover:text-red-300 transition-colors"
              disabled={operationLoading[`delete-${highlight.id}`]}
            >
              {operationLoading[`delete-${highlight.id}`] ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  value={highlight.title}
                  onChange={(e) => handleUpdateHighlight(type, highlight.id, { title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="Highlight title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                <select
                  value={highlight.icon}
                  onChange={(e) => handleUpdateHighlight(type, highlight.id, { icon: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  {availableIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={highlight.description}
                onChange={(e) => handleUpdateHighlight(type, highlight.id, { description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white h-20 resize-none"
                placeholder="Highlight description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Color Scheme</label>
              <div className="grid grid-cols-4 gap-2">
                {colorSchemes.map(scheme => (
                  <button
                    key={scheme.value}
                    onClick={() => handleUpdateHighlight(type, highlight.id, { colorScheme: scheme.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      highlight.colorScheme === scheme.value 
                        ? 'border-white' 
                        : 'border-gray-600 hover:border-gray-500'
                    } bg-gradient-to-br ${scheme.colors.split(' ')[0]} ${scheme.colors.split(' ')[1]}`}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium text-white">{scheme.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="relative overflow-hidden py-8">
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

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block group">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-4">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Me</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
            <Database size={16} />
            Edit your professional profile with database integration
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Image size={20} className="text-[#09c6f9]" />
              <h3 className="text-lg font-semibold">Profile Picture</h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-2xl flex items-center justify-center overflow-hidden">
                  {localAboutData.profilePicture ? (
                    <>
                      <img
                        src={localAboutData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                      <button
                        onClick={removeProfilePicture}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={14} className="text-white" />
                      </button>
                    </>
                  ) : (
                    <User size={32} className="text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Profile Picture</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] rounded-lg cursor-pointer transition-colors">
                        <Image size={18} />
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {localAboutData.profilePicture && (
                        <button
                          onClick={removeProfilePicture}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>• Recommended size: 400x400px</p>
                    <p>• Supported formats: JPG, PNG, GIF</p>
                    <p>• Maximum file size: 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <User size={20} className="text-[#09c6f9]" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Professional Tagline</label>
                <input
                  value={localAboutData.tagline}
                  onChange={(e) => handleAboutMeUpdate('tagline', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  placeholder="e.g., Full Stack Developer & AI Enthusiast"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    value={localAboutData.location}
                    onChange={(e) => handleAboutMeUpdate('location', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Availability Status</label>
                <select
                  value={localAboutData.availability}
                  onChange={(e) => handleAboutMeUpdate('availability', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="Open to opportunities">Open to opportunities</option>
                  <option value="Currently employed">Currently employed</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Not available">Not available</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={localAboutData.experienceYears}
                    onChange={(e) => handleAboutMeUpdate('experienceYears', parseInt(e.target.value) || 0)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={20} className="text-[#09c6f9]" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    value={localAboutData.email}
                    onChange={(e) => handleAboutMeUpdate('email', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="tel"
                    value={localAboutData.phone}
                    onChange={(e) => handleAboutMeUpdate('phone', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="url"
                    value={localAboutData.linkedinUrl}
                    onChange={(e) => handleAboutMeUpdate('linkedinUrl', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="url"
                    value={localAboutData.githubUrl}
                    onChange={(e) => handleAboutMeUpdate('githubUrl', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="url"
                    value={localAboutData.websiteUrl}
                    onChange={(e) => handleAboutMeUpdate('websiteUrl', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Resume URL</label>
                <div className="relative">
                  <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="url"
                    value={localAboutData.resumeUrl}
                    onChange={(e) => handleAboutMeUpdate('resumeUrl', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    placeholder="https://link-to-your-resume.pdf"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <AlignLeft size={20} className="text-[#09c6f9]" />
              <h3 className="text-lg font-semibold">Professional Summary</h3>
            </div>
            <textarea
              value={localAboutData.aboutText}
              onChange={(e) => handleAboutMeUpdate('aboutText', e.target.value)}
              className="w-full h-64 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300"
              placeholder="Write about yourself, your passion, goals, and professional aspirations..."
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Characters: {localAboutData.aboutText.length}</span>
                <span>Words: {localAboutData.aboutText.split(' ').filter(word => word.length > 0).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Type size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">Supports line breaks</span>
              </div>
            </div>
          </div>

          {/* Skills Summary */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Code size={20} className="text-[#09c6f9]" />
              <h3 className="text-lg font-semibold">Skills Summary</h3>
            </div>
            <textarea
              value={localAboutData.skillsSummary}
              onChange={(e) => handleAboutMeUpdate('skillsSummary', e.target.value)}
              className="w-full h-24 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300"
              placeholder="Brief overview of your technical skills and expertise..."
            />
          </div>

          {/* Interests and Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-[#09c6f9]" />
                <h3 className="text-lg font-semibold">Interests</h3>
              </div>
              <textarea
                value={localAboutData.interests.join(', ')}
                onChange={(e) => handleAboutMeUpdate('interests', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                className="w-full h-24 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300"
                placeholder="AI, Machine Learning, Web Development, etc."
              />
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Languages size={20} className="text-[#09c6f9]" />
                <h3 className="text-lg font-semibold">Languages</h3>
              </div>
              <textarea
                value={localAboutData.languages.join(', ')}
                onChange={(e) => handleAboutMeUpdate('languages', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                className="w-full h-24 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300"
                placeholder="English, Spanish, French, etc."
              />
            </div>
          </div>

          {/* Key Highlights Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-[#09c6f9]" />
                <h3 className="text-lg font-semibold">Key Highlights</h3>
              </div>
              <motion.button
                onClick={() => handleAddHighlight('key')}
                disabled={operationLoading['add-key']}
                className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {operationLoading['add-key'] ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
                Add Highlight
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {keyHighlights.map((highlight, index) => renderHighlightCard(highlight, 'key', index))}
              
              {keyHighlights.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Target size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No key highlights added yet.</p>
                  <p className="text-sm">Click "Add Highlight" to showcase your strengths.</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Highlights Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Lightbulb size={20} className="text-[#09c6f9]" />
                <h3 className="text-lg font-semibold">Additional Highlights</h3>
              </div>
              <motion.button
                onClick={() => handleAddHighlight('additional')}
                disabled={operationLoading['add-additional']}
                className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {operationLoading['add-additional'] ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
                Add Highlight
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {additionalHighlights.map((highlight, index) => renderHighlightCard(highlight, 'additional', index))}
              
              {additionalHighlights.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Lightbulb size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No additional highlights added yet.</p>
                  <p className="text-sm">Click "Add Highlight" to showcase more of your qualities.</p>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye size={20} className="text-[#09c6f9]" />
              Live Preview
            </h3>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:border-[#09c6f9]/30">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    {localAboutData.profilePicture ? (
                      <img
                        src={localAboutData.profilePicture}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    ) : (
                      <User size={32} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Naveen Yanamadala</h4>
                    <p className="text-gray-400">{localAboutData.tagline}</p>
                    <p className="text-gray-500 text-sm">{localAboutData.location}</p>
                  </div>
                </div>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line text-justify">
                    {localAboutData.aboutText || 'Your about me content will appear here...'}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <CheckCircle size={16} />
              <span className="font-medium">Database Integration Active</span>
            </div>
            <p className="text-green-300 text-sm">
              All about me data is stored in Supabase with real-time synchronization. 
              Changes are automatically saved and synced across all sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;