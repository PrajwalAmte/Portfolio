import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GalaxyNodeProps {
  id: string;
  icon: LucideIcon;
  label: string;
  position: { x: number; y: number };
  color: string;
  onClick: () => void;
  isActive: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function GalaxyNode({
  id,
  icon: Icon,
  label,
  position,
  color,
  onClick,
  isActive,
  size = 'md',
}: GalaxyNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeMap = {
    sm: { node: 60, icon: 24, orbit: 80 },
    md: { node: 80, icon: 32, orbit: 100 },
    lg: { node: 100, icon: 40, orbit: 120 },
  };

  const dimensions = sizeMap[size];

  // Responsive sizing - bigger nodes to fit text
  const nodeSize = size === 'lg' ? 110 : size === 'md' ? 100 : 90;
  const iconSize = size === 'lg' ? 38 : size === 'md' ? 34 : 30;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        perspective: '1000px',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: parseFloat(id) * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Card Container with Flip Animation */}
      <motion.div
        style={{
          width: nodeSize,
          height: nodeSize,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? 180 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Front - Icon */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: 'var(--surface-glass)',
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          <Icon
            size={iconSize}
            style={{ color }}
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Back - Label */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: color,
            boxShadow: `0 0 30px ${color}60`,
          }}
        >
          <span
            className="font-heading text-sm font-bold text-white px-3 text-center whitespace-nowrap"
            style={{ fontSize: size === 'lg' ? '0.9rem' : '0.85rem' }}
          >
            {label}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
