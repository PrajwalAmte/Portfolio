import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  name: string;
  resumePath: string;
  onNavigate?: (view: string) => void;
}

export default function Navbar({ name, resumePath, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', view: 'projects', onClick: () => { onNavigate?.('projects'); setMobileMenuOpen(false); } },
    { label: 'Skills', view: 'skills', onClick: () => { onNavigate?.('skills'); setMobileMenuOpen(false); } },
    { label: 'Experience', view: 'experience', onClick: () => { onNavigate?.('experience'); setMobileMenuOpen(false); } },
    { label: 'Blog', view: 'blog', onClick: () => { onNavigate?.('blog'); setMobileMenuOpen(false); } },
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
          {/* Logo - Hidden on mobile */}
          <motion.div
            className="hidden sm:flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="font-heading font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>
              {name}
            </span>
          </motion.div>

          {/* Navigation Links - Hidden on mobile */}
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
          <div className="flex items-center gap-3 ml-auto">
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

            {/* Resume Download - Show on all screen sizes */}
            <motion.a
              href={resumePath}
              download
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg font-mono text-xs md:text-sm"
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

            {/* Hamburger Menu - Mobile only */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{
                backgroundColor: 'var(--interactive-hover)',
                color: 'var(--text-primary)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t"
              style={{ borderColor: 'var(--border-medium)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.label}
                    onClick={link.onClick}
                    className="w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-colors"
                    style={{
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--interactive-hover)',
                    }}
                    whileHover={{
                      backgroundColor: 'var(--interactive-active)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
