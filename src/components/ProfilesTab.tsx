import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ToggleLeft, ToggleRight, TrendingUp, Github, Edit, Save, X, ArrowUp, ArrowDown, Eye, ExternalLink, Palette, Star, CheckCircle, AlertTriangle, Loader, Database, Code, Calendar, Users, Award, Zap, Target, BarChart3, Activity, RefreshCw as Refresh, Download, Upload, Search, Filter, Grid, List } from 'lucide-react';
import { useData, CodingProfile, LeetCodeStats, GitHubStats } from '../contexts/DataContext';

const availableIcons = [
  'FaGithub', 'FaCode', 'SiLeetcode', 'SiCodechef', 'SiGeeksforgeeks', 'SiHackerrank',
  'SiCodeforces', 'SiAtcoder', 'SiToptal', 'SiHackerearth', 'SiInterviewbit',
  'FaStackOverflow', 'FaGitlab', 'FaBitbucket', 'SiReplit', 'SiCodepen', 'FaDatabase'
];

const colorSchemes = [
  { name: 'Blue', value: 'blue', colors: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400' },
  { name: 'Green', value: 'green', colors: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400' },
  { name: 'Yellow', value: 'yellow', colors: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400' },
  { name: 'Purple', value: 'purple', colors: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400' },
  { name: 'Orange', value: 'orange', colors: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400' },
  { name: 'Gray', value: 'gray', colors: 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400' },
  { name: 'Red', value: 'red', colors: 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400' },
  { name: 'Indigo', value: 'indigo', colors: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400' },
];

const ProfilesTab: React.FC = () => {
  const { 
    codingProfiles, 
    addCodingProfile, 
    updateCodingProfile, 
    deleteCodingProfile, 
    refreshCodingProfilesFromDatabase,
    isLoading 
  } = useData();

  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [operationLoading, setOperationLoading] = useState<{ [key: string]: boolean }>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'order' | 'updated'>('order');
  const [showStatsEditor, setShowStatsEditor] = useState<string | null>(null);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOperationLoadingStatus = (operation: string, loading: boolean) => {
    setOperationLoading(prev => ({ ...prev, [operation]: loading }));
  };

  const handleAddProfile = async () => {
    updateOperationLoadingStatus('add', true);
    try {
      const newProfile: Omit<CodingProfile, 'id' | 'created_at' | 'updated_at'> = {
        name: 'New Platform',
        icon: 'FaCode',
        link: 'https://example.com',
        username: '',
        description: 'Platform description',
        isActive: true,
        hasLiveStats: false,
        orderIndex: codingProfiles.length,
        colorScheme: 'blue',
        achievements: [],
        customStats: {},
      };

      await addCodingProfile(newProfile);
      showNotification('success', 'Coding profile added successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to add coding profile');
    } finally {
      updateOperationLoadingStatus('add', false);
    }
  };

  const handleUpdateProfile = async (profileId: string, updates: Partial<CodingProfile>) => {
    updateOperationLoadingStatus(`update-${profileId}`, true);
    try {
      await updateCodingProfile(profileId, updates);
      showNotification('success', 'Profile updated successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to update profile');
    } finally {
      updateOperationLoadingStatus(`update-${profileId}`, false);
    }
  };

  const handleDeleteProfile = async (profileId: string, profileName: string) => {
    if (!confirm(`Are you sure you want to delete "${profileName}"?`)) return;
    
    updateOperationLoadingStatus(`delete-${profileId}`, true);
    try {
      await deleteCodingProfile(profileId);
      showNotification('success', `Profile "${profileName}" deleted successfully`);
    } catch (error) {
      showNotification('error', 'Failed to delete profile');
    } finally {
      updateOperationLoadingStatus(`delete-${profileId}`, false);
    }
  };

  const moveProfile = async (profileId: string, direction: 'up' | 'down') => {
    const currentIndex = codingProfiles.findIndex(p => p.id === profileId);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < codingProfiles.length) {
      const currentProfile = codingProfiles[currentIndex];
      const targetProfile = codingProfiles[targetIndex];
      
      // Swap order indices
      await handleUpdateProfile(currentProfile.id, { orderIndex: targetProfile.orderIndex });
      await handleUpdateProfile(targetProfile.id, { orderIndex: currentProfile.orderIndex });
    }
  };

  const handleRefreshFromDatabase = async () => {
    updateOperationLoadingStatus('refresh', true);
    try {
      await refreshCodingProfilesFromDatabase();
      showNotification('success', 'Profiles refreshed from database successfully!');
    } catch (error) {
      showNotification('error', 'Failed to refresh profiles from database');
    } finally {
      updateOperationLoadingStatus('refresh', false);
    }
  };

  const exportProfiles = () => {
    const dataStr = JSON.stringify(codingProfiles, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'coding-profiles.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProfiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedProfiles = JSON.parse(e.target?.result as string);
          for (const profile of importedProfiles) {
            const { id, created_at, updated_at, ...profileData } = profile;
            await addCodingProfile(profileData);
          }
          showNotification('success', 'Profiles imported successfully!');
        } catch (error) {
          showNotification('error', 'Error importing profiles. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Filter and sort profiles
  const filteredAndSortedProfiles = codingProfiles
    .filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.username?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterActive === 'all' || 
                           (filterActive === 'active' && profile.isActive) ||
                           (filterActive === 'inactive' && !profile.isActive);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'order':
          return a.orderIndex - b.orderIndex;
        case 'updated':
          return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
        default:
          return 0;
      }
    });

  const renderStatsEditor = (profile: CodingProfile) => {
    if (profile.name === 'LeetCode') {
      const stats = profile.customStats?.leetcode || {} as LeetCodeStats;
      
      return (
        <div className="space-y-4">
          <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-yellow-400" />
            LeetCode Statistics
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Total Solved</label>
              <input
                type="number"
                value={stats.totalSolved || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    leetcode: { ...stats, totalSolved: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Easy Solved</label>
              <input
                type="number"
                value={stats.easySolved || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    leetcode: { ...stats, easySolved: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Medium Solved</label>
              <input
                type="number"
                value={stats.mediumSolved || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    leetcode: { ...stats, mediumSolved: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Hard Solved</label>
              <input
                type="number"
                value={stats.hardSolved || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    leetcode: { ...stats, hardSolved: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Contest Rating</label>
              <input
                type="number"
                value={stats.contestRating || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    leetcode: { ...stats, contestRating: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Acceptance Rate %</label>
              <input
                type="number"
                step="0.1"
                value={stats.acceptanceRate || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    leetcode: { ...stats, acceptanceRate: parseFloat(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
          </div>
        </div>
      );
    }

    if (profile.name === 'GitHub') {
      const stats = profile.customStats?.github || {} as GitHubStats;
      
      return (
        <div className="space-y-4">
          <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Github size={16} className="text-white" />
            GitHub Statistics
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Public Repos</label>
              <input
                type="number"
                value={stats.public_repos || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    github: { ...stats, public_repos: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Followers</label>
              <input
                type="number"
                value={stats.followers || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    github: { ...stats, followers: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Following</label>
              <input
                type="number"
                value={stats.following || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    github: { ...stats, following: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Total Stars</label>
              <input
                type="number"
                value={stats.totalStars || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    github: { ...stats, totalStars: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Total Commits</label>
              <input
                type="number"
                value={stats.totalCommits || 0}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    github: { ...stats, totalCommits: parseInt(e.target.value) || 0 }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Location</label>
              <input
                type="text"
                value={stats.location || ''}
                onChange={(e) => handleUpdateProfile(profile.id, {
                  customStats: {
                    ...profile.customStats,
                    github: { ...stats, location: e.target.value }
                  }
                })}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8 text-gray-400">
        <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
        <p>No custom statistics available for this platform</p>
        <p className="text-sm">Configure platform-specific stats above</p>
      </div>
    );
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
          <h2 className="text-2xl font-bold">Coding Profiles Management</h2>
          <p className="text-gray-400">Manage your coding platform profiles with database integration and live stats</p>
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
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#09c6f9] w-full sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value as any)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#09c6f9] appearance-none"
              >
                <option value="all">All Profiles</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#09c6f9]"
            >
              <option value="order">Sort by Order</option>
              <option value="name">Sort by Name</option>
              <option value="updated">Sort by Updated</option>
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
              {operationLoading.refresh ? <Loader size={16} className="animate-spin" /> : <Refresh size={16} />}
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
                  onChange={importProfiles}
                  className="hidden"
                />
              </label>
              <button
                onClick={exportProfiles}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Add Profile */}
            <motion.button
              onClick={handleAddProfile}
              disabled={operationLoading.add}
              className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {operationLoading.add ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
              Add Profile
            </motion.button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
          <span>
            Showing {filteredAndSortedProfiles.length} of {codingProfiles.length} profiles
          </span>
          {(searchTerm || filterActive !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterActive('all');
              }}
              className="text-[#09c6f9] hover:text-[#045de9] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Profiles List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
        {filteredAndSortedProfiles.map((profile, index) => {
          const isEditing = editingProfile === profile.id;
          const colorScheme = colorSchemes.find(cs => cs.value === profile.colorScheme) || colorSchemes[0];

          return (
            <div key={profile.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
              {/* Profile Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorScheme.colors.split(' ')[0]} ${colorScheme.colors.split(' ')[1]} flex items-center justify-center`}>
                      <span className="text-lg">🔗</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{profile.name}</h4>
                      <p className="text-sm text-gray-400">{profile.username}</p>
                      {profile.hasLiveStats && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">Live Stats</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveProfile(profile.id, 'up')}
                      disabled={index === 0}
                      className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => moveProfile(profile.id, 'down')}
                      disabled={index === filteredAndSortedProfiles.length - 1}
                      className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => handleUpdateProfile(profile.id, { isActive: !profile.isActive })}
                      className={`p-1 transition-colors ${profile.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-500 hover:text-gray-400'}`}
                    >
                      {profile.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    </button>
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <button
                      onClick={() => setEditingProfile(isEditing ? null : profile.id)}
                      className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                      disabled={operationLoading[`update-${profile.id}`]}
                    >
                      {operationLoading[`update-${profile.id}`] ? <Loader size={16} className="animate-spin" /> : isEditing ? <X size={16} /> : <Edit size={16} />}
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id, profile.name)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      disabled={operationLoading[`delete-${profile.id}`]}
                    >
                      {operationLoading[`delete-${profile.id}`] ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{profile.description}</p>

                {/* Achievements */}
                {profile.achievements && profile.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.achievements.slice(0, 3).map((achievement, i) => (
                      <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        {achievement}
                      </span>
                    ))}
                    {profile.achievements.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{profile.achievements.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Edit Form */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-gray-900/50 border-t border-gray-700"
                  >
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name</label>
                          <input
                            value={profile.name}
                            onChange={(e) => handleUpdateProfile(profile.id, { name: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Platform name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                          <input
                            value={profile.username || ''}
                            onChange={(e) => handleUpdateProfile(profile.id, { username: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Your username"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Profile URL</label>
                          <input
                            value={profile.link}
                            onChange={(e) => handleUpdateProfile(profile.id, { link: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="https://platform.com/username"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                          <select
                            value={profile.icon}
                            onChange={(e) => handleUpdateProfile(profile.id, { icon: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                          >
                            {availableIcons.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={profile.description || ''}
                          onChange={(e) => handleUpdateProfile(profile.id, { description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white h-20 resize-none"
                          placeholder="Platform description"
                        />
                      </div>

                      {/* Color Scheme */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Color Scheme</label>
                        <div className="grid grid-cols-4 gap-2">
                          {colorSchemes.map(scheme => (
                            <button
                              key={scheme.value}
                              onClick={() => handleUpdateProfile(profile.id, { colorScheme: scheme.value })}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                profile.colorScheme === scheme.value 
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

                      {/* Achievements */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Achievements</label>
                        <textarea
                          value={profile.achievements?.join('\n') || ''}
                          onChange={(e) => handleUpdateProfile(profile.id, { 
                            achievements: e.target.value.split('\n').filter(a => a.trim()) 
                          })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white h-20 resize-none"
                          placeholder="One achievement per line"
                        />
                      </div>

                      {/* Live Stats Toggle */}
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={profile.hasLiveStats}
                            onChange={(e) => handleUpdateProfile(profile.id, { hasLiveStats: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm">Has Live Stats</span>
                        </label>
                        {profile.hasLiveStats && (
                          <button
                            onClick={() => setShowStatsEditor(showStatsEditor === profile.id ? null : profile.id)}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                          >
                            <BarChart3 size={14} />
                            Edit Stats
                          </button>
                        )}
                      </div>

                      {/* Stats Editor */}
                      {showStatsEditor === profile.id && profile.hasLiveStats && (
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                          {renderStatsEditor(profile)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedProfiles.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Github size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">
            {codingProfiles.length === 0 ? 'No coding profiles added yet' : 'No profiles match your filters'}
          </p>
          <p className="text-sm">
            {codingProfiles.length === 0 ? 'Click "Add Profile" to showcase your coding platforms' : 'Try adjusting your search or filter criteria'}
          </p>
        </div>
      )}

      {/* Database Status */}
      <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <CheckCircle size={16} />
          <span className="font-medium">Database Integration Active</span>
        </div>
        <p className="text-green-300 text-sm">
          All coding profiles are stored in Supabase with real-time synchronization and live stats support. 
          Changes are automatically saved and synced across all sessions.
        </p>
      </div>
    </div>
  );
};

export default ProfilesTab;