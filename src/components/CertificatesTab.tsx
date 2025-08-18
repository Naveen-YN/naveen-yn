import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Award, 
  Eye, 
  Copy, 
  ExternalLink,
  Calendar,
  Users,
  Star,
  Target,
  Zap,
  Image,
  Link as LinkIcon,
  Tag,
  Upload,
  Download,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  ChevronDown,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Loader,
  Database,
  Shield
} from 'lucide-react';
import { useData, Certificate } from '../contexts/DataContext';

const CertificatesTab: React.FC = () => {
  const { 
    certificates, 
    addCertificate, 
    updateCertificate, 
    deleteCertificate, 
    refreshCertificatesFromDatabase,
    isLoading 
  } = useData();

  const [editingCertificate, setEditingCertificate] = useState<string | null>(null);
  const [expandedCertificate, setExpandedCertificate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterVerified, setFilterVerified] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'category' | 'issuer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [operationLoading, setOperationLoading] = useState<{ [key: string]: boolean }>({});

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOperationLoadingStatus = (operation: string, loading: boolean) => {
    setOperationLoading(prev => ({ ...prev, [operation]: loading }));
  };

  // Filter and sort certificates
  const filteredAndSortedCertificates = certificates
    .filter(certificate => {
      const matchesSearch = certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           certificate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (certificate.issuer && certificate.issuer.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (certificate.skills && certificate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = filterCategory === 'all' || certificate.category === filterCategory;
      const matchesVerified = filterVerified === 'all' || 
                             (filterVerified === 'verified' && certificate.verified) ||
                             (filterVerified === 'unverified' && !certificate.verified);
      return matchesSearch && matchesCategory && matchesVerified;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = (a.issueDate || '').localeCompare(b.issueDate || '');
          break;
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '');
          break;
        case 'issuer':
          comparison = (a.issuer || '').localeCompare(b.issuer || '');
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleAddCertificate = async () => {
    updateOperationLoadingStatus('add', true);
    try {
      const newCertificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'> = {
        title: 'New Certificate',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
        description: 'Certificate description',
        issuer: '',
        issueDate: '',
        category: 'Technical',
        skills: [],
        verified: false,
        isActive: true,
        orderIndex: certificates.length
      };

      await addCertificate(newCertificate);
      showNotification('success', 'Certificate added successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to add certificate');
    } finally {
      updateOperationLoadingStatus('add', false);
    }
  };

  const handleUpdateCertificate = async (id: string, updates: Partial<Certificate>) => {
    updateOperationLoadingStatus(`update-${id}`, true);
    try {
      await updateCertificate(id, updates);
      showNotification('success', 'Certificate updated successfully');
    } catch (error) {
      showNotification('error', (error as Error).message || 'Failed to update certificate');
    } finally {
      updateOperationLoadingStatus(`update-${id}`, false);
    }
  };

  const handleDeleteCertificate = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    updateOperationLoadingStatus(`delete-${id}`, true);
    try {
      await deleteCertificate(id);
      showNotification('success', `Certificate "${title}" deleted successfully`);
    } catch (error) {
      showNotification('error', 'Failed to delete certificate');
    } finally {
      updateOperationLoadingStatus(`delete-${id}`, false);
    }
  };

  const handleDuplicateCertificate = async (certificate: Certificate) => {
    updateOperationLoadingStatus(`duplicate-${certificate.id}`, true);
    try {
      const duplicatedCertificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'> = {
        ...certificate,
        title: `${certificate.title} (Copy)`,
        orderIndex: certificates.length
      };
      delete (duplicatedCertificate as any).id;
      delete (duplicatedCertificate as any).created_at;
      delete (duplicatedCertificate as any).updated_at;

      await addCertificate(duplicatedCertificate);
      showNotification('success', 'Certificate duplicated successfully');
    } catch (error) {
      showNotification('error', 'Failed to duplicate certificate');
    } finally {
      updateOperationLoadingStatus(`duplicate-${certificate.id}`, false);
    }
  };

  const moveCertificate = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = certificates.findIndex(c => c.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < certificates.length) {
      const currentCertificate = certificates[currentIndex];
      const targetCertificate = certificates[targetIndex];
      
      // Swap order indices
      await handleUpdateCertificate(currentCertificate.id, { orderIndex: targetCertificate.orderIndex });
      await handleUpdateCertificate(targetCertificate.id, { orderIndex: currentCertificate.orderIndex });
    }
  };

  const handleRefreshFromDatabase = async () => {
    updateOperationLoadingStatus('refresh', true);
    try {
      await refreshCertificatesFromDatabase();
      showNotification('success', 'Certificates refreshed from database successfully!');
    } catch (error) {
      showNotification('error', 'Failed to refresh certificates from database');
    } finally {
      updateOperationLoadingStatus('refresh', false);
    }
  };

  const exportCertificates = () => {
    const dataStr = JSON.stringify(certificates, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'certificates.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importCertificates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedCertificates = JSON.parse(e.target?.result as string);
          for (const cert of importedCertificates) {
            const { id, created_at, updated_at, ...certData } = cert;
            await addCertificate(certData);
          }
          showNotification('success', 'Certificates imported successfully!');
        } catch (error) {
          showNotification('error', 'Error importing certificates. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const getStatusColor = (verified?: boolean) => {
    return verified 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Professional': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Academic': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Security': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Achievement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const categories = ['all', ...Array.from(new Set(certificates.map(c => c.category).filter(Boolean)))];

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

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-xl flex items-center justify-center">
          <Database size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Certificates Management</h2>
          <p className="text-gray-400">Manage your professional certifications and achievements with database integration</p>
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
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#09c6f9] w-full sm:w-64"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Filter size={16} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
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
                  onChange={importCertificates}
                  className="hidden"
                />
              </label>
              <button
                onClick={exportCertificates}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Add Certificate */}
            <motion.button
              onClick={handleAddCertificate}
              disabled={operationLoading.add}
              className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {operationLoading.add ? <Loader size={18} className="animate-spin" /> : <Plus size={18} />}
              Add Certificate
            </motion.button>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-700"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verified Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Verification</label>
                  <select
                    value={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="all">All Certificates</option>
                    <option value="verified">Verified Only</option>
                    <option value="unverified">Unverified Only</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="date">Issue Date</option>
                    <option value="title">Title</option>
                    <option value="category">Category</option>
                    <option value="issuer">Issuer</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
          <span>
            Showing {filteredAndSortedCertificates.length} of {certificates.length} certificates
          </span>
          {(searchTerm || filterCategory !== 'all' || filterVerified !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterVerified('all');
              }}
              className="text-[#09c6f9] hover:text-[#045de9] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Certificates List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
        {filteredAndSortedCertificates.map((certificate, index) => {
          const isEditing = editingCertificate === certificate.id;
          const isExpanded = expandedCertificate === certificate.id;
          
          return (
            <div key={certificate.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
              {/* Certificate Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-white">{certificate.title}</h4>
                      {certificate.verified && (
                        <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                          <Shield size={12} />
                          Verified
                        </div>
                      )}
                      {certificate.category && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(certificate.category)}`}>
                          {certificate.category}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{certificate.description}</p>
                    {certificate.issuer && (
                      <p className="text-gray-500 text-sm">Issued by {certificate.issuer}</p>
                    )}
                    {certificate.issueDate && (
                      <p className="text-gray-500 text-sm">Issue Date: {certificate.issueDate}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => moveCertificate(certificate.id, 'up')}
                      disabled={index === 0}
                      className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => moveCertificate(certificate.id, 'down')}
                      disabled={index === filteredAndSortedCertificates.length - 1}
                      className="p-1 text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => handleUpdateCertificate(certificate.id, { isActive: !certificate.isActive })}
                      className={`p-1 transition-colors ${certificate.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-500 hover:text-gray-400'}`}
                    >
                      {certificate.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    </button>
                    <button
                      onClick={() => setExpandedCertificate(isExpanded ? null : certificate.id)}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDuplicateCertificate(certificate)}
                      className="p-2 text-green-400 hover:text-green-300 transition-colors"
                      title="Duplicate Certificate"
                      disabled={operationLoading[`duplicate-${certificate.id}`]}
                    >
                      {operationLoading[`duplicate-${certificate.id}`] ? <Loader size={18} className="animate-spin" /> : <Copy size={18} />}
                    </button>
                    <button
                      onClick={() => setEditingCertificate(isEditing ? null : certificate.id)}
                      className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                      title="Edit Certificate"
                      disabled={operationLoading[`update-${certificate.id}`]}
                    >
                      {operationLoading[`update-${certificate.id}`] ? <Loader size={18} className="animate-spin" /> : isEditing ? <X size={18} /> : <Edit size={18} />}
                    </button>
                    <button
                      onClick={() => handleDeleteCertificate(certificate.id, certificate.title)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Certificate"
                      disabled={operationLoading[`delete-${certificate.id}`]}
                    >
                      {operationLoading[`delete-${certificate.id}`] ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>

                {/* Skills Tags */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{certificate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-gray-900/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Certificate Details</h5>
                        <div className="space-y-2 text-sm">
                          {certificate.credentialId && (
                            <div><span className="text-gray-400">Credential ID:</span> <span className="text-white font-mono">{certificate.credentialId}</span></div>
                          )}
                          {certificate.expiryDate && (
                            <div><span className="text-gray-400">Expires:</span> <span className="text-white">{certificate.expiryDate}</span></div>
                          )}
                          <div><span className="text-gray-400">Status:</span> <span className={certificate.verified ? 'text-green-400' : 'text-gray-400'}>{certificate.verified ? 'Verified' : 'Unverified'}</span></div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Actions</h5>
                        <div className="space-y-2 text-sm">
                          {certificate.credentialUrl && (
                            <div><a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1"><ExternalLink size={14} /> Verify Certificate</a></div>
                          )}
                          <div><a href={certificate.image} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1"><Image size={14} /> View Certificate</a></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                          <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Title</label>
                          <input
                            value={certificate.title}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { title: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Certificate title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Issuer</label>
                          <input
                            value={certificate.issuer || ''}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { issuer: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Issuing organization"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                          <input
                            value={certificate.image}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { image: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Certificate image URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                          <select
                            value={certificate.category || 'Technical'}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                          >
                            <option value="Technical">Technical</option>
                            <option value="Professional">Professional</option>
                            <option value="Academic">Academic</option>
                            <option value="Security">Security</option>
                            <option value="Achievement">Achievement</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Issue Date</label>
                          <input
                            value={certificate.issueDate || ''}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { issueDate: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="e.g., 2024-01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                          <input
                            value={certificate.expiryDate || ''}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { expiryDate: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="e.g., 2027-01 (optional)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Credential ID</label>
                          <input
                            value={certificate.credentialId || ''}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { credentialId: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Credential ID (optional)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Credential URL</label>
                          <input
                            value={certificate.credentialUrl || ''}
                            onChange={(e) => handleUpdateCertificate(certificate.id, { credentialUrl: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Verification URL (optional)"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={certificate.description}
                          onChange={(e) => handleUpdateCertificate(certificate.id, { description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white h-24 resize-none"
                          placeholder="Certificate description"
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Related Skills</label>
                        <input
                          value={certificate.skills?.join(', ') || ''}
                          onChange={(e) => handleUpdateCertificate(certificate.id, { skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                          placeholder="Skills separated by commas"
                        />
                      </div>

                      {/* Verification */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={certificate.verified || false}
                          onChange={(e) => handleUpdateCertificate(certificate.id, { verified: e.target.checked })}
                          className="rounded"
                        />
                        <label className="text-sm text-gray-300">Verified Certificate</label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedCertificates.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Award size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">
            {certificates.length === 0 ? 'No certificates added yet' : 'No certificates match your filters'}
          </p>
          <p className="text-sm">
            {certificates.length === 0 ? 'Click "Add Certificate" to showcase your achievements' : 'Try adjusting your search or filter criteria'}
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
          All certificates are stored in Supabase with real-time synchronization. 
          Changes are automatically saved and synced across all sessions.
        </p>
      </div>
    </div>
  );
};

export default CertificatesTab;