import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, MapPin } from 'lucide-react';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    github: string;
  };
  accentColor: string;
}

export default function ProjectCard({ project, accentColor }: ProjectCardProps) {
  return (
    <motion.div
      className="glass-panel rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300"
      style={{
        borderColor: `${accentColor}60`,
        backgroundColor: 'var(--surface-glass)',
        backdropFilter: 'blur(10px)',
      }}
      whileHover={{
        boxShadow: `0 0 30px ${accentColor}40`,
        borderColor: `${accentColor}80`,
      }}
    >
      <h3 className="text-xl font-heading font-bold mb-3" style={{ 
        color: accentColor,
        textShadow: `0 0 20px ${accentColor}40`,
      }}>
        {project.title}
      </h3>
      
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          style={{
            backgroundColor: 'var(--interactive-hover)',
            color: accentColor,
            border: `1px solid ${accentColor}40`,
          }}
        >
          <Github size={16} />
          <span className="text-sm font-mono">View Code</span>
        </a>
      </div>
    </motion.div>
  );
}

interface ExperienceCardProps {
  experience: {
    company: string;
    role: string;
    location: string;
    duration: string;
    description: string;
  };
  accentColor: string;
}

export function ExperienceCard({ experience, accentColor }: ExperienceCardProps) {
  return (
    <motion.div
      className="glass-panel rounded-xl p-6 relative overflow-hidden"
      style={{ 
        borderColor: `${accentColor}60`,
        backgroundColor: 'var(--surface-glass)',
        backdropFilter: 'blur(10px)',
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: `0 0 30px ${accentColor}30`,
      }}
    >
      {/* Timeline Dot - Inside Card */}
      <motion.div
        className="absolute left-4 top-8 w-1 h-[calc(100%-4rem)]"
        style={{ backgroundColor: `${accentColor}20` }}
      />
      <motion.div
        className="absolute left-[13px] top-8 w-3 h-3 rounded-full"
        style={{ backgroundColor: accentColor }}
        animate={{
          boxShadow: [`0 0 0px ${accentColor}`, `0 0 20px ${accentColor}`, `0 0 0px ${accentColor}`],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="ml-8">
        <h3 className="text-xl font-heading font-bold mb-1" style={{ 
          color: accentColor,
          textShadow: `0 0 15px ${accentColor}40`,
        }}>
          {experience.role}
        </h3>
        <div className="flex flex-wrap items-center gap-4 mb-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{experience.company}</span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {experience.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {experience.duration}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
}

interface SkillCategoryProps {
  category: {
    category: string;
    items: string[];
  };
  accentColor: string;
}

export function SkillCategory({ category, accentColor }: SkillCategoryProps) {
  return (
    <motion.div
      className="glass-panel rounded-xl p-6"
      style={{ 
        borderColor: `${accentColor}60`,
        backgroundColor: 'var(--surface-glass)',
        backdropFilter: 'blur(10px)',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: `0 0 30px ${accentColor}30`,
      }}
    >
      <h3 className="text-lg font-heading font-bold mb-4" style={{ 
        color: accentColor,
        textShadow: `0 0 15px ${accentColor}40`,
      }}>
        {category.category}
      </h3>
      <div className="space-y-2">
        {category.items.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full mt-2"
              style={{ backgroundColor: accentColor }}
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.2,
              }}
            />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
