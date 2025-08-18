import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ArrowUp, ArrowDown, School, Star, GraduationCap, Edit, Save, X, ToggleLeft, ToggleRight, Eye, Upload, Download, Search, Filter, Grid, List, CheckCircle, AlertTriangle, Loader, Database } from 'lucide-react';
import { useData, Education, EducationHighlight } from '../contexts/DataContext';

const availableIcons = [
  'FaUniversity', 'FaSchool', 'FaGraduationCap', 'FaCalendarAlt', 'FaStar', 'FaAward', 
  'FaBook', 'FaCertificate', 'FaUserGraduate', 'FaMedal', 'FaTrophy', 'FaLightbulb',
  'FaRocket', 'FaTarget', 'FaCode', 'FaBrain', 'FaHeart', 'FaGem'
];

const colorOptions = [
  { name: 'Blue', value: 'text-blue-400 hover:border-blue-400/30' },
  { name: 'Green', value: 'text-green-400 hover:border-green-400/30' },
  { name: 'Purple', value: 'text-purple-400 hover:border-purple-400/30' },
  { name: 'Orange', value: 'text-orange-400 hover:border-orange-400/30' },
  { name: 'Yellow', value: 'text-yellow-400 hover:border-yellow-400/30' },
  { name: 'Red', value: 'text-red-400 hover:border-red-400/30' },
  { name: 'Cyan', value: 'text-cyan-400 hover:border-cyan-400/30' },
  { name: 'Pink', value: 'text-pink-400 hover:border-pink-400/30' },
];

const EducationTab: React.FC = () => {
  const { 
    education, 
    educationHighlights,
    addEducation,
    updateEducation,
    deleteEducation,
    addEducationHighlight,
    updateEducationHighlight,
    deleteEducationHighlight,
    refreshEducationFromDatabase,
    isLoading 
  } = useData();

  const [editingEducation, setEditingEducation] = useState<string | null>(null);
  const [editingHighlight, setEditingHighlight] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [operationLoading, setOperationLoading] = useState<{ [key: string]: boolean }>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOperationLoadingStatus = (operation: string, loading: boolean) => {
    setOperationLoading(prev => ({ ...prev, [operation]: loading }));
  };

  const handleAddEducation = async () => {
    updateOperationLoadingStatus('add-education', true);
    try {
      const newEducation: Omit<Education, 'id' | 'created_at' | 'updated_at'> = {
        degree: 'New Degree',
        course: 'Course Name',
        institution: 'Institution Name',
        duration: '2023 to 2024',
        cgpa: '',
        level: 'undergraduate',
        status: 'current',
        highlights: [],
        skills: [],
        customImage: '',
        orderIndex: education.length,
        isActive: true,
      };

      await addEducation(newEducation);
      showNotification('success', 'Education record added successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to add education record');
    } finally {
      updateOperationLoadingStatus('add-education', false);
    }
  };

  const handleUpdateEducation = async (id: string, updates: Partial<Education>) => {
    updateOperationLoadingStatus(`update-education-${id}`, true);
    try {
      await updateEducation(id, updates);
      showNotification('success', 'Education record updated successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to update education record');
    } finally {
      updateOperationLoadingStatus(`update-education-${id}`, false);
    }
  };

  const handleDeleteEducation = async (id: string, degree: string) => {
    if (!confirm(`Are you sure you want to delete "${degree}"?`)) return;
    
    updateOperationLoadingStatus(`delete-education-${id}`, true);
    try {
      await deleteEducation(id);
      showNotification('success', `Education record "${degree}" deleted successfully`);
    } catch (error) {
      showNotification('error', 'Failed to delete education record');
    } finally {
      updateOperationLoadingStatus(`delete-education-${id}`, false);
    }
  };

  const handleAddEducationHighlight = async () => {
    updateOperationLoadingStatus('add-highlight', true);
    try {
      const newHighlight: Omit<EducationHighlight, 'id' | 'created_at' | 'updated_at'> = {
        title: 'New Highlight',
        subtitle: 'Subtitle',
        description: 'Description',
        icon: 'FaAward',
        color: 'text-blue-400 hover:border-blue-400/30',
        value: 'Value',
        orderIndex: educationHighlights.length,
        isActive: true,
      };

      await addEducationHighlight(newHighlight);
      showNotification('success', 'Education highlight added successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to add education highlight');
    } finally {
      updateOperationLoadingStatus('add-highlight', false);
    }
  };

  const handleUpdateEducationHighlight = async (id: string, updates: Partial<EducationHighlight>) => {
    updateOperationLoadingStatus(`update-highlight-${id}`, true);
    try {
      await updateEducationHighlight(id, updates);
      showNotification('success', 'Education highlight updated successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to update education highlight');
    } finally {
      updateOperationLoadingStatus(`update-highlight-${id}`, false);
    }
  };

  const handleDeleteEducationHighlight = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    updateOperationLoadingStatus(`delete-highlight-${id}`, true);
    try {
      await deleteEducationHighlight(id);
      showNotification('success', `Education highlight "${title}" deleted successfully`);
    } catch (error) {
      showNotification('error', 'Failed to delete education highlight');
    } finally {
      updateOperationLoadingStatus(`delete-highlight-${id}`, false);
    }
  };

  const moveEducation = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = education.findIndex(e => e.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < education.length) {
      const currentEducation = education[currentIndex];
      const targetEducation = education[targetIndex];
      
      // Swap order indices
      await handleUpdateEducation(currentEducation.id, { orderIndex: targetEducation.orderIndex });
      await handleUpdateEducation(targetEducation.id, { orderIndex: currentEducation.orderIndex });
    }
  };

  const moveEducationHighlight = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = educationHighlights.findIndex(h => h.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < educationHighlights.length) {
      const currentHighlight = educationHighlights[currentIndex];
      const targetHighlight = educationHighlights[targetIndex];
      
      // Swap order indices
      await handleUpdateEducationHighlight(currentHighlight.id, { orderIndex: targetHighlight.orderIndex });
      await handleUpdateEducationHighlight(targetHighlight.id, { orderIndex: currentHighlight.orderIndex });
    }
  };

  const handleRefreshFromDatabase = async () => {
    updateOperationLoadingStatus('refresh', true);
    try {
      await refreshEducationFromDatabase();
      showNotification('success', 'Education data refreshed from database successfully!');
    } catch (error) {
      showNotification('error', 'Failed to refresh education data from database');
    } finally {
      updateOperationLoadingStatus('refresh', false);
    }
  };

  const exportEducation = () => {
    const dataStr = JSON.stringify({ education, educationHighlights }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'education-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importEducation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (importedData.education) {
            for (const edu of importedData.education) {
              const { id, created_at, updated_at, ...eduData } = edu;
              await addEducation(eduData);
            }
          }
          if (importedData.educationHighlights) {
            for (const highlight of importedData.educationHighlights) {
              const { id, created_at, updated_at, ...highlightData } = highlight;
              await addEducationHighlight(highlightData);
            }
          }
          showNotification('success', 'Education data imported successfully!');
        } catch (error) {
          showNotification('error', 'Error importing education data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Filter education records
  const filteredEducation = education.filter(edu => {
    const matchesSearch = edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edu.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edu.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || edu.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || edu.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

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
          <h2 className="text-2xl font-bold">Education Management</h2>
          <p className="text-gray-400">Manage your educational background and highlights with database integration</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Left side - Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search education..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#09c6f9] w-full sm:w-64"
              />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#09c6f9] appearance-none"
              >
                <option value="all">All Levels</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="diploma">Diploma</option>
                <option value="intermediate">Intermediate</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#09c6f9]"
            >
              <option value="all">All Status</option>
              <option value="current">Current</option>
              <option value="completed">Completed</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>

          {/* Right side - Actions */}
          <div className="flex flex-wrap gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#045de9] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#045de9] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid size={16} />
              </button>
            </div>

            {/* Database Actions */}
            <motion.button
              onClick={handleRefreshFromDatabase}
              disabled={operationLoading.refresh || isLoading}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {operationLoading.refresh ? <Loader size={16} className="animate-spin" /> : <Database size={16} />}
              Refresh
            </motion.button>

            {/* Import/Export */}
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
                <Upload size={16} />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importEducation}
                  className="hidden"
                />
              </label>
              <button
                onClick={exportEducation}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Add Education */}
            <motion.button
              onClick={handleAddEducation}
              disabled={operationLoading['add-education']}
              className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {operationLoading['add-education'] ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
              Add Education
            </motion.button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
          <span>
            Showing {filteredEducation.length} of {education.length} education records
          </span>
          {(searchTerm || filterLevel !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterLevel('all');
                setFilterStatus('all');
              }}
              className="text-[#09c6f9] hover:text-[#045de9] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Education Records Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <School size={20} className="text-[#09c6f9]" />
              Education Records
            </h3>
          </div>
          
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
            {filteredEducation.map((edu, index) => {
              const isEditing = editingEducation === edu.id;
              
              return (
                <div key={edu.id} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-xl flex items-center justify-center overflow-hidden">
                        {edu.customImage ? (
                          <img
                            src={edu.customImage}
                            alt={edu.degree}
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const icon = document.createElement('div');
                                icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-white"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>';
                                parent.appendChild(icon);
                              }
                            }}
                          />
                        ) : (
                          <GraduationCap size={24} className="text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                        <p className="text-sm text-gray-400">{edu.institution}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveEducation(edu.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => moveEducation(edu.id, 'down')}
                        disabled={index === filteredEducation.length - 1}
                        className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        onClick={() => handleUpdateEducation(edu.id, { isActive: !edu.isActive })}
                        className={`p-1 transition-colors ${edu.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-500 hover:text-gray-400'}`}
                      >
                        {edu.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      </button>
                      <button
                        onClick={() => setEditingEducation(isEditing ? null : edu.id)}
                        className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                        disabled={operationLoading[`update-education-${edu.id}`]}
                      >
                        {operationLoading[`update-education-${edu.id}`] ? <Loader size={16} className="animate-spin" /> : isEditing ? <X size={16} /> : <Edit size={16} />}
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(edu.id, edu.degree)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        disabled={operationLoading[`delete-education-${edu.id}`]}
                      >
                        {operationLoading[`delete-education-${edu.id}`] ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Edit Form */}
                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t border-gray-600"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
                            <input
                              value={edu.degree}
                              onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              placeholder="Degree name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
                            <input
                              value={edu.course}
                              onChange={(e) => handleUpdateEducation(edu.id, { course: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              placeholder="Course/Specialization"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
                            <input
                              value={edu.institution}
                              onChange={(e) => handleUpdateEducation(edu.id, { institution: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              placeholder="Institution name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                            <input
                              value={edu.duration}
                              onChange={(e) => handleUpdateEducation(edu.id, { duration: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              placeholder="e.g., 2021 to 2025"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">CGPA/Grade</label>
                            <input
                              value={edu.cgpa || ''}
                              onChange={(e) => handleUpdateEducation(edu.id, { cgpa: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              placeholder="e.g., CGPA: 8.25"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                            <select
                              value={edu.level}
                              onChange={(e) => handleUpdateEducation(edu.id, { level: e.target.value as any })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                            >
                              <option value="undergraduate">Undergraduate</option>
                              <option value="postgraduate">Postgraduate</option>
                              <option value="diploma">Diploma</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="secondary">Secondary</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                            <select
                              value={edu.status}
                              onChange={(e) => handleUpdateEducation(edu.id, { status: e.target.value as any })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                            >
                              <option value="current">Currently Pursuing</option>
                              <option value="completed">Completed</option>
                              <option value="graduated">Graduated</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Custom Image URL</label>
                            <input
                              value={edu.customImage || ''}
                              onChange={(e) => handleUpdateEducation(edu.id, { customImage: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              placeholder="Institution logo URL (optional)"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Key Highlights</label>
                          <textarea
                            value={edu.highlights.join('\n')}
                            onChange={(e) => handleUpdateEducation(edu.id, { highlights: e.target.value.split('\n').filter(h => h.trim()) })}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white h-24 resize-none"
                            placeholder="Enter each highlight on a new line"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Related Skills</label>
                          <input
                            value={edu.skills.join(', ')}
                            onChange={(e) => handleUpdateEducation(edu.id, { skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                            placeholder="Skills separated by commas"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {filteredEducation.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <GraduationCap size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">
                {education.length === 0 ? 'No education records added yet' : 'No education records match your filters'}
              </p>
              <p className="text-sm">
                {education.length === 0 ? 'Click "Add Education" to add your first education record' : 'Try adjusting your search or filter criteria'}
              </p>
            </div>
          )}
        </div>

        {/* Education Highlights Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Star size={20} className="text-[#09c6f9]" />
              Educational Highlights Section
            </h3>
            <motion.button
              onClick={handleAddEducationHighlight}
              disabled={operationLoading['add-highlight']}
              className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {operationLoading['add-highlight'] ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
              Add Highlight
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {educationHighlights
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map((highlight, index) => {
                const isEditing = editingHighlight === highlight.id;
                
                return (
                  <div key={highlight.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-xl flex items-center justify-center">
                          <Star size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{highlight.title}</h4>
                          <p className="text-sm text-gray-400">{highlight.subtitle}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveEducationHighlight(highlight.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={() => moveEducationHighlight(highlight.id, 'down')}
                          disabled={index === educationHighlights.length - 1}
                          className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          onClick={() => handleUpdateEducationHighlight(highlight.id, { isActive: !highlight.isActive })}
                          className={`p-1 transition-colors ${highlight.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-500 hover:text-gray-400'}`}
                        >
                          {highlight.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                        <button
                          onClick={() => setEditingHighlight(isEditing ? null : highlight.id)}
                          className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                          disabled={operationLoading[`update-highlight-${highlight.id}`]}
                        >
                          {operationLoading[`update-highlight-${highlight.id}`] ? <Loader size={16} className="animate-spin" /> : isEditing ? <X size={16} /> : <Edit size={16} />}
                        </button>
                        <button
                          onClick={() => handleDeleteEducationHighlight(highlight.id, highlight.title)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          disabled={operationLoading[`delete-highlight-${highlight.id}`]}
                        >
                          {operationLoading[`delete-highlight-${highlight.id}`] ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Edit Form */}
                    <AnimatePresence>
                      {isEditing && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 pt-4 border-t border-gray-600"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                              <input
                                value={highlight.title}
                                onChange={(e) => handleUpdateEducationHighlight(highlight.id, { title: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                                placeholder="Main title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                              <input
                                value={highlight.subtitle}
                                onChange={(e) => handleUpdateEducationHighlight(highlight.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                                placeholder="Subtitle"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                              <input
                                value={highlight.description}
                                onChange={(e) => handleUpdateEducationHighlight(highlight.id, { description: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                                placeholder="Description"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                              <select
                                value={highlight.icon}
                                onChange={(e) => handleUpdateEducationHighlight(highlight.id, { icon: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              >
                                {availableIcons.map(icon => (
                                  <option key={icon} value={icon}>{icon}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                              <select
                                value={highlight.color}
                                onChange={(e) => handleUpdateEducationHighlight(highlight.id, { color: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                              >
                                {colorOptions.map(color => (
                                  <option key={color.value} value={color.value}>{color.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
                              <input
                                value={highlight.value}
                                onChange={(e) => handleUpdateEducationHighlight(highlight.id, { value: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                                placeholder="Display value"
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
          
          {educationHighlights.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Star size={48} className="mx-auto mb-4 opacity-50" />
              <p>No educational highlights added yet.</p>
              <p className="text-sm">Click "Add Highlight" to create your first highlight card.</p>
            </div>
          )}
        </div>

        {/* Database Status */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <CheckCircle size={16} />
            <span className="font-medium">Database Integration Active</span>
          </div>
          <p className="text-green-300 text-sm">
            All education data is stored in Supabase with real-time synchronization. 
            Changes are automatically saved and synced across all sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationTab;