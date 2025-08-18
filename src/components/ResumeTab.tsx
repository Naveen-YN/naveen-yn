import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Link as LinkIcon, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Loader, 
  Database,
  ExternalLink,
  Copy,
  Save,
  Calendar,
  Clock,
  FileType,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const ResumeTab: React.FC = () => {
  const { 
    resumes, 
    activeResume, 
    addResume, 
    updateResume, 
    deleteResume, 
    setResumeActive,
    refreshResumesFromDatabase,
    isLoading 
  } = useData();
  
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [operationLoading, setOperationLoading] = useState<{ [key: string]: boolean }>({});
  const [uploadMode, setUploadMode] = useState<'file' | 'link'>('link');
  const [resumeLink, setResumeLink] = useState('');
  const [resumeName, setResumeName] = useState('My Resume');
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOperationLoadingStatus = (operation: string, loading: boolean) => {
    setOperationLoading(prev => ({ ...prev, [operation]: loading }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'File size exceeds 5MB limit');
      return;
    }

    // Check file type
    if (file.type !== 'application/pdf' && 
        file.type !== 'application/msword' && 
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      showNotification('error', 'Only PDF and Word documents are supported');
      return;
    }

    updateOperationLoadingStatus('upload', true);
    
    try {
      // In a real implementation, you would upload the file to a storage service
      // For this demo, we'll convert to base64 and store the data URL
      // Note: In production, you should use Supabase Storage instead
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        // Add the resume to the database
        await addResume({
          fileName: file.name,
          fileUrl: base64Data,
          fileType: file.type,
          isActive: true,
          uploadDate: new Date().toISOString()
        });
        
        showNotification('success', 'Resume uploaded successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      showNotification('error', 'Failed to upload resume');
      console.error('Error uploading resume:', error);
    } finally {
      updateOperationLoadingStatus('upload', false);
    }
  };

  const handleLinkSave = async () => {
    if (!resumeLink) {
      showNotification('error', 'Please enter a valid URL');
      return;
    }

    if (!resumeName) {
      showNotification('error', 'Please enter a name for your resume');
      return;
    }

    updateOperationLoadingStatus('save', true);
    
    try {
      // Determine file type from URL
      let fileType = 'application/pdf'; // Default
      if (resumeLink.toLowerCase().endsWith('.doc')) {
        fileType = 'application/msword';
      } else if (resumeLink.toLowerCase().endsWith('.docx')) {
        fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }

      await addResume({
        fileName: resumeName,
        fileUrl: resumeLink,
        fileType: fileType,
        isActive: true,
        uploadDate: new Date().toISOString()
      });
      
      setResumeLink('');
      setResumeName('My Resume');
      showNotification('success', 'Resume link saved successfully');
    } catch (error) {
      showNotification('error', 'Failed to save resume link');
      console.error('Error saving resume link:', error);
    } finally {
      updateOperationLoadingStatus('save', false);
    }
  };

  const handleDeleteResume = async (id: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return;
    
    updateOperationLoadingStatus(`delete-${id}`, true);
    
    try {
      await deleteResume(id);
      showNotification('success', 'Resume deleted successfully');
    } catch (error) {
      showNotification('error', 'Failed to delete resume');
      console.error('Error deleting resume:', error);
    } finally {
      updateOperationLoadingStatus(`delete-${id}`, false);
    }
  };

  const handleSetActive = async (id: string) => {
    updateOperationLoadingStatus(`activate-${id}`, true);
    
    try {
      await setResumeActive(id);
      showNotification('success', 'Resume set as active successfully');
    } catch (error) {
      showNotification('error', 'Failed to set resume as active');
      console.error('Error setting resume as active:', error);
    } finally {
      updateOperationLoadingStatus(`activate-${id}`, false);
    }
  };

  const copyResumeLink = (url: string) => {
    navigator.clipboard.writeText(url);
    showNotification('success', 'Resume link copied to clipboard');
  };

  const handleRefreshFromDatabase = async () => {
    updateOperationLoadingStatus('refresh', true);
    try {
      await refreshResumesFromDatabase();
      showNotification('success', 'Resumes refreshed from database successfully!');
    } catch (error) {
      showNotification('error', 'Failed to refresh resumes from database');
    } finally {
      updateOperationLoadingStatus('refresh', false);
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileText size={24} className="text-red-400" />;
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return <FileText size={24} className="text-blue-400" />;
    } else {
      return <FileText size={24} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
          <h2 className="text-2xl font-bold">Resume Management</h2>
          <p className="text-gray-400">Manage your resume with database integration</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FileText size={20} className="text-[#09c6f9]" />
            Resume Database
          </h3>
          <div className="flex gap-3">
            <motion.button
              onClick={handleRefreshFromDatabase}
              disabled={operationLoading.refresh || isLoading}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {operationLoading.refresh ? <Loader size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Refresh
            </motion.button>
            <motion.button
              onClick={() => setUploadMode(uploadMode === 'file' ? 'link' : 'file')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {uploadMode === 'file' ? <LinkIcon size={18} /> : <Upload size={18} />}
              {uploadMode === 'file' ? 'Use Link' : 'Upload File'}
            </motion.button>
          </div>
        </div>

        {/* Add New Resume Section */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 mb-6">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Plus size={18} className="text-[#09c6f9]" />
            Add New Resume
          </h4>

          {/* File Upload UI */}
          {uploadMode === 'file' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[#09c6f9] transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-white mb-2">Upload Your Resume</h3>
                <p className="text-gray-400 text-sm mb-4">PDF or Word documents only (Max 5MB)</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={operationLoading.upload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#045de9] hover:bg-[#09c6f9] text-white rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {operationLoading.upload ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      <span>Select File</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm text-gray-400">
                <p className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-400" />
                  Supported formats: PDF, DOC, DOCX
                </p>
                <p className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-400" />
                  Maximum file size: 5MB
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-400" />
                  Your resume will be stored securely
                </p>
              </div>
            </div>
          )}

          {/* Link Input UI */}
          {uploadMode === 'link' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resume Name
                </label>
                <input
                  type="text"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  placeholder="e.g., My Professional Resume"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#09c6f9] mb-4"
                />
                
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resume URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="url"
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      placeholder="https://example.com/your-resume.pdf"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#09c6f9]"
                    />
                  </div>
                  <button
                    onClick={handleLinkSave}
                    disabled={operationLoading.save || !resumeLink || !resumeName}
                    className="flex items-center gap-2 px-6 py-3 bg-[#045de9] hover:bg-[#09c6f9] text-white rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {operationLoading.save ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Link</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Provide a direct link to your resume (PDF, Google Drive, Dropbox, etc.)
                </p>
              </div>
              <div className="text-sm text-gray-400">
                <p className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-400" />
                  Link will be stored in the database
                </p>
                <p className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-400" />
                  Visitors can download your resume directly
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-400" />
                  Update the link anytime to reflect your latest resume
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Resumes List */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#09c6f9]" />
            Your Resumes
          </h4>

          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div 
                  key={resume.id} 
                  className={`bg-gray-900/50 rounded-lg p-4 border ${
                    resume.isActive 
                      ? 'border-[#09c6f9]/50 shadow-md shadow-[#09c6f9]/10' 
                      : 'border-gray-700'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        {getFileTypeIcon(resume.fileType)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{resume.fileName}</h4>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(resume.uploadDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileType size={12} />
                            {resume.fileType.split('/')[1].toUpperCase()}
                          </span>
                          {resume.isActive && (
                            <span className="flex items-center gap-1 text-green-400">
                              <CheckCircle size={12} />
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSetActive(resume.id)}
                        disabled={resume.isActive || operationLoading[`activate-${resume.id}`]}
                        className={`p-2 rounded transition-colors ${
                          resume.isActive 
                            ? 'text-green-400 cursor-default' 
                            : 'text-gray-400 hover:text-green-400 hover:bg-gray-800'
                        }`}
                        title={resume.isActive ? 'Active Resume' : 'Set as Active'}
                      >
                        {operationLoading[`activate-${resume.id}`] ? (
                          <Loader size={18} className="animate-spin" />
                        ) : resume.isActive ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                      </button>
                      <a
                        href={resume.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-800 rounded transition-colors"
                        title="Open Resume"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <button
                        onClick={() => copyResumeLink(resume.fileUrl)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-800 rounded transition-colors"
                        title="Copy Link"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume.id, resume.fileName)}
                        disabled={operationLoading[`delete-${resume.id}`]}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded transition-colors"
                        title="Delete Resume"
                      >
                        {operationLoading[`delete-${resume.id}`] ? (
                          <Loader size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No resumes found</p>
              <p className="text-sm">Add your first resume using the options above</p>
            </div>
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Resume Management Instructions</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Choose Your Method</h4>
              <p className="text-gray-400 text-sm">
                You can either upload your resume file directly or provide a link to your resume hosted elsewhere.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">File Upload</h4>
              <p className="text-gray-400 text-sm">
                If uploading a file, use PDF or Word format (max 5MB). The file will be stored securely.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-400 font-bold">3</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Link Option</h4>
              <p className="text-gray-400 text-sm">
                If providing a link, ensure it's a direct link to your resume file. Links to Google Drive, Dropbox, or other cloud storage services work well.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-400 font-bold">4</span>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">Active Resume</h4>
              <p className="text-gray-400 text-sm">
                Only one resume can be active at a time. The active resume will be displayed on your portfolio homepage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Database Status */}
      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <CheckCircle size={16} />
          <span className="font-medium">Database Integration Active</span>
        </div>
        <p className="text-green-300 text-sm">
          Your resumes are stored in a dedicated Supabase table with real-time synchronization. 
          Changes are automatically saved and synced across all sessions.
        </p>
      </div>
    </div>
  );
};

export default ResumeTab;