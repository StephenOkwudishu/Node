import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './Common';
import { Terminal } from 'lucide-react';

export const SystemLoader = ({ onComplete }: { onComplete: () => void }) => {
  const { T } = useTheme();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const sysLogs = [
    "INITIALIZING CORE SYSTEMS...",
    "CALIBRATING ATTENTION VECTORS...",
    "FETCHING NEURAL SIGNALS...",
    "SYNCHRONIZING FINANCIAL STREAMS...",
    "OPTIMIZING COGNITIVE LOAD...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });

      if (currentLog < sysLogs.length) {
        setLogs(prev => [...prev, sysLogs[currentLog]]);
        currentLog++;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.9)', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px',
        color: '#10B981',
        fontFamily: T.fonts.mono
      }}
    >
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <Terminal size={32} />
          <h1 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '0.2em' }}>BEARING_OS</h1>
        </div>
        
        <div style={{ height: '2px', backgroundColor: 'rgba(16,185,129,0.1)', width: '100%', marginBottom: '24px', overflow: 'hidden' }}>
          <motion.div 
            style={{ height: '100%', backgroundColor: '#10B981', width: `${progress}%` }} 
          />
        </div>

        <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.8 }}>
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              &gt; {log}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
