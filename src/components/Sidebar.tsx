import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, FolderKanban, Award, Github, GraduationCap, FileText } from 'lucide-react';
import { Tab } from './types';

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, setActiveTab }) => {
  const iconMap = {
    User: User,
    Code: Code,
    FolderKanban: FolderKanban,
    Award: Award,
    Github: Github,
    GraduationCap: GraduationCap,
    FileText: FileText,
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-t from-[#141414] to-black rounded-2xl border border-gray-700 p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = iconMap[tab.icon as keyof typeof iconMap];
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#045de9] to-[#09c6f9] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                {tab.label}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;