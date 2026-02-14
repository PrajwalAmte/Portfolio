import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
  name: string;
}

const bootMessages = [
  'INITIALIZING QUANTUM CORE...',
  'LOADING NEURAL NETWORKS...',
  'ESTABLISHING SECURE CONNECTION...',
  'CALIBRATING HOLOGRAPHIC DISPLAYS...',
  'SYNCING RESEARCH DATABASE...',
  'ACTIVATING GALAXY MAP...',
  'SYSTEM READY',
];

export default function BootSequence({ onComplete, name }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }, 600);
    }
  }, [currentStep, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="boot-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 25h50M25 0v50"
                    stroke="var(--accent-cyan)"
                    strokeWidth="1"
                    fill="none"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#boot-grid)" />
            </svg>
          </div>

          {/* Scanning Lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, var(--accent-cyan)20 50%, transparent 100%)',
              height: '200px',
            }}
            animate={{
              y: ['-200px', 'calc(100vh + 200px)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div className="relative z-10 max-w-2xl w-full px-8">
            {/* Logo/Emblem */}
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <div className="relative">
                {/* Rotating Rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      width: 120 + i * 30,
                      height: 120 + i * 30,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderColor: 'var(--accent-cyan)',
                      opacity: 0.3 - i * 0.1,
                    }}
                    animate={{
                      rotate: i % 2 === 0 ? 360 : -360,
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}

                {/* Center Icon */}
                <div
                  className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center glass-panel"
                  style={{
                    borderColor: 'var(--accent-cyan)',
                    boxShadow: '0 0 40px var(--accent-cyan)60',
                  }}
                >
                  <span className="text-4xl font-heading font-bold" style={{ color: 'var(--accent-cyan)' }}>
                    {name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1
                className="text-3xl md:text-4xl font-heading font-bold mb-2"
                style={{
                  color: 'var(--accent-cyan)',
                  textShadow: '0 0 30px var(--accent-cyan)60',
                }}
              >
                QUANTUM RESEARCH TERMINAL
              </h1>
              <p className="text-lg font-mono" style={{ color: 'var(--text-secondary)' }}>
                {name}
              </p>
            </motion.div>

            {/* Boot Messages Container */}
            <div
              className="rounded-lg p-6 font-mono text-sm"
              style={{
                backgroundColor: 'var(--surface-glass)',
                border: '1px solid var(--border-medium)',
              }}
            >
              <div className="space-y-2">
                {bootMessages.slice(0, currentStep).map((message, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Status Indicator */}
                    {index < currentStep - 1 ? (
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'var(--status-success)' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    ) : (
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'var(--accent-cyan)' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}

                    {/* Message */}
                    <span
                      style={{
                        color: index < currentStep - 1 
                          ? 'var(--text-tertiary)' 
                          : 'var(--accent-cyan)',
                      }}
                    >
                      {message}
                    </span>

                    {/* Blinking Cursor for Current Line */}
                    {index === currentStep - 1 && message !== 'SYSTEM READY' && (
                      <motion.span
                        style={{ color: 'var(--accent-cyan)' }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--border-medium)' }}
                >
                  <motion.div
                    className="h-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-plasma))',
                      boxShadow: '0 0 10px var(--accent-cyan)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / bootMessages.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span>PROGRESS</span>
                  <span>{Math.round((currentStep / bootMessages.length) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Hint Text */}
            <motion.p
              className="text-center mt-6 text-sm"
              style={{ color: 'var(--text-tertiary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Establishing secure connection to research database...
            </motion.p>
          </div>

          {/* Corner Brackets */}
          {[
            { top: 20, left: 20, rotate: 0 },
            { top: 20, right: 20, rotate: 90 },
            { bottom: 20, right: 20, rotate: 180 },
            { bottom: 20, left: 20, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12"
              style={{ ...pos }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.1 * i }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                style={{ transform: `rotate(${pos.rotate}deg)` }}
              >
                <path
                  d="M0 8C0 3.58172 3.58172 0 8 0H16M0 16V8"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
