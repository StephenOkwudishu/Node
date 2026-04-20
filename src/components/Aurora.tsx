import React from 'react';
import { motion } from 'motion/react';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
}

export const Aurora: React.FC<AuroraProps> = ({
  colorStops = ["#7cff67", "#B497CF", "#5227FF"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 1,
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      backgroundColor: '#f5f5f7',
      pointerEvents: 'none',
    }}>
      {/* Aurora Layers */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.1, 0.2, 0.15, 0.1],
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          width: '150%',
          height: '150%',
          top: '-25%',
          left: '-25%',
          background: `radial-gradient(circle at 30% 20%, ${colorStops[0]}, transparent 40%),
                       radial-gradient(circle at 70% 80%, ${colorStops[1]}, transparent 40%),
                       radial-gradient(circle at 40% 60%, ${colorStops[2]}, transparent 40%)`,
          filter: 'blur(100px)',
        }}
      />
      
      {/* Secondary Atmosphere */}
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1.1, 0.9, 1.2, 1.1],
          opacity: [0.05, 0.1, 0.08, 0.05],
        }}
        transition={{
          duration: 30 / speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          width: '150%',
          height: '150%',
          top: '-25%',
          left: '-25%',
          background: `radial-gradient(circle at 80% 30%, ${colorStops[2]}, transparent 50%),
                       radial-gradient(circle at 20% 70%, ${colorStops[0]}, transparent 50%)`,
          filter: 'blur(120px)',
        }}
      />

      {/* Subtle readabilty overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: `rgba(255, 255, 255, ${1 - blend})`,
        backdropFilter: 'blur(20px)',
      }} />
    </div>
  );
};
