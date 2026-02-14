import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface QuantumPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  accentColor?: string;
}

const CORNER_POSITIONS = [
  { top: 0, left: 0, rotate: 0 },
  { top: 0, right: 0, rotate: 90 },
  { bottom: 0, right: 0, rotate: 180 },
  { bottom: 0, left: 0, rotate: 270 },
];

export default function QuantumPanel({
  isOpen,
  onClose,
  title,
  children,
  accentColor = 'var(--accent-cyan)',
}: QuantumPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Panel - No backdrop blur, show animation */}
          <motion.div
            className="fixed inset-0 z-[50] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Content Container with padding for header */}
            <div className="pt-20 px-4 pb-4 h-full overflow-y-auto">
              <motion.div
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
              >
            <div
              className="w-full rounded-2xl glass-panel relative overflow-hidden"
              style={{
                borderColor: accentColor,
                boxShadow: `0 0 60px ${accentColor}40, inset 0 0 40px ${accentColor}10`,
                backgroundColor: 'var(--surface-glass)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${accentColor}10 50%, transparent 100%)`,
                  height: '100px',
                }}
                animate={{ y: ['-100px', 'calc(100% + 100px)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {CORNER_POSITIONS.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16"
                  style={{
                    ...pos,
                    borderColor: accentColor,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    style={{ transform: `rotate(${pos.rotate}deg)` }}
                  >
                    <path
                      d="M0 8C0 3.58172 3.58172 0 8 0H20M0 20V8"
                      stroke={accentColor}
                      strokeWidth="2"
                    />
                    <circle cx="8" cy="8" r="2" fill={accentColor} />
                  </svg>
                </motion.div>
              ))}

              <div
                className="relative px-6 md:px-8 py-6 border-b"
                style={{
                  borderColor: 'var(--border-medium)',
                  background: 'var(--surface-glass)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span
                      className="text-xs font-mono uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      SYSTEM ACTIVE
                    </span>
                  </div>

                  <motion.button
                    className="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                    style={{
                      backgroundColor: 'var(--interactive-hover)',
                      color: 'var(--text-primary)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <motion.h2
                  className="mt-4 text-3xl md:text-4xl font-heading font-bold"
                  style={{
                    color: accentColor,
                    textShadow: `0 0 20px ${accentColor}60`,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {title}
                </motion.h2>
              </div>

              <div className="max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <motion.div
                  className="p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {children}
                </motion.div>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="holographic-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M0 20h40M20 0v40" stroke={accentColor} strokeWidth="1" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#holographic-grid)" />
                </svg>
              </div>
            </div>
            </motion.div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: var(--bg-secondary);
      border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: var(--border-strong);
      border-radius: 4px;
      transition: background 0.3s;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: var(--accent-cyan);
    }
  `;
  document.head.appendChild(style);
}
