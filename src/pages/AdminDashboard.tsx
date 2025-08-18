import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AboutTab from '../components/AboutTab';
import SkillsTab from '../components/SkillsTab';
import ProjectsTab from '../components/ProjectsTab';
import CertificatesTab from '../components/CertificatesTab';
import EducationTab from '../components/EducationTab';
import ProfilesTab from '../components/ProfilesTab';
import ResumeTab from '../components/ResumeTab';
import { Tab } from '../components/types';

const AdminDashboard: React.FC = () => {
  const { logout } = useAdmin();
  const { saveData } = useData();

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const tabs: Tab[] = [
    { id: 'about', label: 'About Me', icon: 'User' },
    { id: 'skills', label: 'Skills', icon: 'Code' },
    { id: 'projects', label: 'Projects', icon: 'FolderKanban' },
    { id: 'certificates', label: 'Certificates', icon: 'Award' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'profiles', label: 'Coding Profiles', icon: 'Github' },
    { id: 'resume', label: 'Resume', icon: 'FileText' },
  ];

  const handleSave = () => {
    saveData();
    alert('Data saved successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onSave={handleSave} onLogout={handleLogout} />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-t from-[#141414] to-black rounded-2xl border border-gray-700 p-6">
              {activeTab === 'about' && (
                <AboutTab />
              )}
              {activeTab === 'skills' && (
                <SkillsTab />
              )}
              {activeTab === 'projects' && (
                <ProjectsTab />
              )}
              {activeTab === 'certificates' && (
                <CertificatesTab />
              )}
              {activeTab === 'education' && (
                <EducationTab />
              )}
              {activeTab === 'profiles' && (
                <ProfilesTab />
              )}
              {activeTab === 'resume' && (
                <ResumeTab />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;