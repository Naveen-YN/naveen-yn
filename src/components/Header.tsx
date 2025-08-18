import React from 'react'
import { motion } from 'framer-motion'
import { Save, LogOut, Clock, CheckCircle, Loader } from 'lucide-react'

interface HeaderProps {
  onSave: () => void
  onLogout: () => void
  isLoading?: boolean
  lastSaved?: Date | null
}

const Header: React.FC<HeaderProps> = ({
  onSave,
  onLogout,
  isLoading = false,
  lastSaved = null,
}) => {
  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Never'
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <header className="bg-gradient-to-r from-[#141414] to-black border-b border-gray-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-1">
            {isLoading ? (
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <Loader size={14} className="animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={14} />
                <span>Auto-saved</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock size={14} />
              <span>Last saved: {formatLastSaved(lastSaved)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isLoading ? 'Saving...' : 'Save Now'}
          </motion.button>
          <motion.button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default Header
