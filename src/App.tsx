import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import portfolioData from './data/portfolio.json';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ThreeBackground from './components/ThreeBackground';
import QuantumPanel from './components/QuantumPanel';
import BootSequence from './components/BootSequence';
import Navbar from './components/Navbar';
import ProjectCard, { ExperienceCard, SkillCategory } from './components/ContentCards';
import BlogSection from './components/BlogSection';
import TypingText from './components/TypingText';

type PanelView = 'galaxy' | 'projects' | 'skills' | 'experience' | 'blog' | 'contact';

function AppContent() {
  const { theme } = useTheme();
  const [showBoot, setShowBoot] = useState(false);
  const [activePanelView, setActivePanelView] = useState<PanelView>('galaxy');

  const handleClosePanel = () => {
    setActivePanelView('galaxy');
  };

  const getAccentColor = () => {
    return theme === 'dark' ? '#ffa500' : '#0059a8';
  };

  return (
    <>
      {showBoot && (
        <BootSequence
          onComplete={() => setShowBoot(false)}
          name={portfolioData.personal.name}
        />
      )}

      {!showBoot && (
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <ThreeBackground />

          <Navbar
            name={portfolioData.personal.name}
            resumePath={portfolioData.personal.resumePath}
            onNavigate={(view) => setActivePanelView(view as PanelView)}
          />

          <AnimatePresence>
            {activePanelView === 'galaxy' && (
              <motion.div
                className="fixed inset-0 z-10 flex items-center justify-center pt-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-center px-4 max-w-2xl mx-auto mt-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                >
                  <div className="relative mb-8">
                    <div
                      className="relative w-56 h-56 mx-auto rounded-full overflow-hidden"
                      style={{ 
                        border: `3px solid ${getAccentColor()}`,
                        background: theme === 'dark'
                          ? '#1a1a1a'
                          : '#ffffff',
                        boxShadow: theme === 'dark'
                          ? `0 0 30px ${getAccentColor()}60`
                          : `0 0 30px ${getAccentColor()}40`,
                      }}
                    >
                      <img
                        src={portfolioData.personal.profileImage}
                        alt={portfolioData.personal.name}
                        className="w-full h-full object-cover"
                        style={{ 
                          mixBlendMode: 'normal',
                          filter: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <motion.h1
                    className="text-4xl md:text-5xl font-heading font-bold mb-3 relative z-10"
                    style={{
                      color: 'var(--text-primary)',
                      textShadow: theme === 'dark' 
                        ? '0 0 20px rgba(255, 165, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.8)' 
                        : '0 0 20px rgba(0, 89, 168, 0.5), 0 2px 10px rgba(255, 255, 255, 0.8)',
                      fontWeight: 700,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <TypingText
                      text={portfolioData.personal.name}
                      delay={500}
                      speed={60}
                    />
                  </motion.h1>

                  <motion.p
                    className="text-lg md:text-xl mb-6 font-heading relative z-10"
                    style={{ 
                      color: getAccentColor(),
                      textShadow: theme === 'dark'
                        ? '0 0 20px rgba(255, 165, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)'
                        : '0 0 20px rgba(0, 89, 168, 0.6), 0 2px 8px rgba(255, 255, 255, 0.8)',
                      fontWeight: 600,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <TypingText
                      text={portfolioData.personal.title}
                      delay={portfolioData.personal.name.length * 60 + 600}
                      speed={50}
                    />
                  </motion.p>

                  <motion.p
                    className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-heading relative z-10"
                    style={{ 
                      color: 'var(--text-primary)',
                      textShadow: theme === 'dark'
                        ? '0 0 10px rgba(255, 165, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.8)'
                        : '0 0 10px rgba(0, 89, 168, 0.3), 0 2px 8px rgba(255, 255, 255, 0.8)',
                      fontWeight: 400,
                      lineHeight: 1.7,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <TypingText
                      text={portfolioData.personal.bio}
                      delay={(portfolioData.personal.name.length * 60) + (portfolioData.personal.title.length * 50) + 700}
                      speed={35}
                    />
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <QuantumPanel
            isOpen={activePanelView === 'projects'}
            onClose={handleClosePanel}
            title="Projects"
            accentColor={getAccentColor()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  project={project}
                  accentColor={getAccentColor()}
                />
              ))}
            </div>
          </QuantumPanel>

          <QuantumPanel
            isOpen={activePanelView === 'skills'}
            onClose={handleClosePanel}
            title="Technical Modules"
            accentColor={getAccentColor()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolioData.skills.map((category, idx) => (
                <SkillCategory
                  key={idx}
                  category={category}
                  accentColor={getAccentColor()}
                />
              ))}
            </div>
          </QuantumPanel>

          <QuantumPanel
            isOpen={activePanelView === 'experience'}
            onClose={handleClosePanel}
            title="Mission Log"
            accentColor={getAccentColor()}
          >
            <div className="pt-4">
              <div className="space-y-6 mb-12">
                <h3 className="text-2xl font-heading font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Professional Experience
                </h3>
                {portfolioData.experience.map((exp, idx) => (
                  <ExperienceCard
                    key={idx}
                    experience={exp}
                    accentColor={getAccentColor()}
                  />
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Volunteer Contributions
                </h3>
                {portfolioData.volunteer.map((vol, idx) => (
                  <ExperienceCard
                    key={idx}
                    experience={{
                      ...vol,
                      company: 'company' in vol ? String(vol.company) : String(vol.organization),
                    }}
                    accentColor={getAccentColor()}
                  />
                ))}
              </div>
            </div>
          </QuantumPanel>

          <QuantumPanel
            isOpen={activePanelView === 'blog'}
            onClose={handleClosePanel}
            title="Notes"
            accentColor={getAccentColor()}
          >
            <BlogSection 
              githubConfig={portfolioData.github} 
              accentColor={getAccentColor()} 
            />
          </QuantumPanel>

          <QuantumPanel
            isOpen={activePanelView === 'contact'}
            onClose={handleClosePanel}
            title="Transmission Terminal"
            accentColor={getAccentColor()}
          >
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: `radial-gradient(circle, ${getAccentColor()}20 0%, transparent 70%)` }}
                >
                  <Mail size={64} style={{ color: getAccentColor() }} />
                </div>

                <h2 className="text-3xl font-heading font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Let's Connect
                </h2>
                <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                  I'm always interested in hearing about new projects, opportunities, and collaborations.
                  Feel free to reach out through any of the channels below.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="glass-panel p-6 rounded-xl hover:scale-105 transition-transform"
                  style={{ borderColor: getAccentColor() }}
                >
                  <Mail size={32} className="mx-auto mb-3" style={{ color: getAccentColor() }} />
                  <p className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                    Email
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    Send Message
                  </p>
                </a>

                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-6 rounded-xl hover:scale-105 transition-transform"
                  style={{ borderColor: getAccentColor() }}
                >
                  <Github size={32} className="mx-auto mb-3" style={{ color: getAccentColor() }} />
                  <p className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                    GitHub
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    View Repositories
                  </p>
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-6 rounded-xl hover:scale-105 transition-transform"
                  style={{ borderColor: getAccentColor() }}
                >
                  <Linkedin size={32} className="mx-auto mb-3" style={{ color: getAccentColor() }} />
                  <p className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                    LinkedIn
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    Connect Professionally
                  </p>
                </a>
              </motion.div>

              <motion.a
                href={`mailto:${portfolioData.personal.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-heading text-lg font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${getAccentColor()}, var(--accent-plasma))`,
                  color: 'white',
                  boxShadow: `0 0 30px ${getAccentColor()}40`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 50px ${getAccentColor()}60`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Mail size={24} />
                Initiate Contact
              </motion.a>
            </div>
          </QuantumPanel>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
