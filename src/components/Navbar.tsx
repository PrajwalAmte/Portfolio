import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  name: string;
  resumePath: string;
  onNavigate?: (view: string) => void;
}

export default function Navbar({ name, resumePath, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Projects', view: 'projects', onClick: () => onNavigate?.('projects') },
    { label: 'Skills', view: 'skills', onClick: () => onNavigate?.('skills') },
    { label: 'Experience', view: 'experience', onClick: () => onNavigate?.('experience') },
    { label: 'Blog', view: 'blog', onClick: () => onNavigate?.('blog') },
  ];



  return (
    <motion.nav
      className="fixed top-0 w-full z-[100] glass-panel"
      style={{
        borderBottom: '1px solid var(--border-medium)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Just Name */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="font-heading font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>
              {name}
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.label}
                onClick={link.onClick}
                className="font-mono text-sm transition-colors cursor-pointer bg-transparent border-none"
                style={{ color: 'var(--text-secondary)' }}
                whileHover={{
                  color: 'var(--accent-cyan)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg"
              style={{
                backgroundColor: 'var(--interactive-hover)',
                color: 'var(--text-primary)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Resume Download */}
            <motion.a
              href={resumePath}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #ffa500, #ff8c00)'
                  : 'linear-gradient(135deg, #0059a8, #003d7a)',
                color: 'white',
                boxShadow: theme === 'dark'
                  ? '0 0 20px rgba(255, 165, 0, 0.4)'
                  : '0 0 20px rgba(0, 89, 168, 0.4)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: theme === 'dark'
                  ? '0 0 30px rgba(255, 165, 0, 0.6)'
                  : '0 0 30px rgba(0, 89, 168, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span className="hidden sm:inline">Resume</span>
            </motion.a>
          </div>
        </div>


      </div>
    </motion.nav>
  );
}
