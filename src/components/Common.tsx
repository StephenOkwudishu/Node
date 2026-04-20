import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, TrendingUp, TrendingDown, Clock, Play, Square,
  ArrowUp, ArrowDown, Minus, TrendingUp as TrendUp,
  Sun, Moon
} from 'lucide-react';
import { lightTheme, darkTheme, ThemeType } from '../theme';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectNode, SystemSignals, EventEntry } from '../types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Theme Context
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  T: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('bearing-theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('bearing-theme', newMode);
  };

  const T = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, T }}>
      <div style={{ 
        backgroundColor: T.colors.bg.base, 
        color: T.colors.text.primary, 
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

// --- Analytical Components ---

export const SignalIndicator = ({ 
  label, 
  value, 
  trend, 
  subtitle,
  className = ""
}: { 
  label: string; 
  value: string | number; 
  trend?: 'up' | 'down' | 'steady';
  subtitle?: string;
  className?: string;
}) => {
  const { T } = useTheme();
  
  return (
    <div 
      className={`px-4 py-3 border-r last:border-r-0 border-current opacity-90 min-w-[120px] md:min-w-[160px] flex flex-col gap-1 transition-all ${className}`}
      style={{ 
        backgroundColor: 'transparent',
        borderColor: T.colors.bg.border
      }}
    >
      <div className="flex justify-between items-center">
        <span style={{ fontSize: '9px', fontWeight: 900, color: T.colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        <div>
          {trend === 'up' && <ArrowUp size={10} color={T.colors.accent.success} strokeWidth={4} />}
          {trend === 'down' && <ArrowDown size={10} color={T.colors.accent.danger} strokeWidth={4} />}
          {trend === 'steady' && <Minus size={10} color={T.colors.text.muted} strokeWidth={4} />}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span style={{ 
          fontSize: '18px', 
          fontWeight: 900, 
          color: T.colors.text.primary, 
          fontFamily: T.fonts.mono, 
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {value}
        </span>
        {subtitle && <span style={{ fontSize: '9px', fontWeight: 800, color: T.colors.text.muted }}>{subtitle}</span>}
      </div>
    </div>
  );
};

interface HeatMapProps {
  data: Record<string, Record<string, number>>;
  onDayClick?: (day: string) => void;
}

export const HeatMap = ({ data, onDayClick }: HeatMapProps) => {
  const { T } = useTheme();
  const metrics = Object.keys(data);
  const now = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const getColor = (value: number) => {
    if (value < 20) return '#E5E7EB';
    if (value < 50) return '#DBEAFE';
    if (value < 80) return '#3B82F6';
    return '#1E3A8A';
  };

  return (
    <div style={{ overflowX: 'auto', padding: '12px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, auto) repeat(30, 1fr)', gap: '4px' }}>
        <div />
        {days.map((d, i) => (
          <div key={d} style={{ fontSize: '8px', color: T.colors.text.muted, textAlign: 'center' }}>
            {i % 5 === 0 ? d.split('-')[2] : ''}
          </div>
        ))}
        {metrics.map(metric => (
          <React.Fragment key={metric}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: T.colors.text.secondary, alignSelf: 'center' }}>{metric}</div>
            {days.map(day => {
              const val = data[metric][day] || 0;
              return (
                <motion.div
                  key={`${metric}-${day}`}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  onClick={() => onDayClick?.(day)}
                  style={{
                    aspectRatio: '1/1',
                    backgroundColor: getColor(val),
                    borderRadius: '2px',
                    cursor: 'pointer',
                    boxShadow: val > 80 ? `0 0 8px ${getColor(val)}40` : 'none'
                  }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const EventItem: React.FC<{ event: EventEntry }> = ({ event }) => {
  const { T } = useTheme();
  const impactColor = event.impact > 0 ? T.colors.accent.success : event.impact < 0 ? T.colors.accent.danger : T.colors.text.muted;
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-[var(--border-color)] items-start sm:items-center text-[13px]" style={{ '--border-color': T.colors.bg.border } as any}>
      <span style={{ fontFamily: T.fonts.mono, color: T.colors.text.muted, fontSize: '11px', minWidth: '60px' }}>
        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <div className="flex flex-1 flex-wrap items-center gap-3 w-full">
        <Badge color={T.colors.bg.elevated} style={{ color: T.colors.text.primary, border: `1px solid ${T.colors.bg.border}` }}>
          {event.category.toUpperCase()}
        </Badge>
        <span style={{ fontWeight: 600, color: T.colors.text.primary, border: 'none' }} className="flex-1 min-w-[120px]">{event.note}</span>
        <span style={{ fontSize: '11px', color: T.colors.text.muted, fontStyle: 'italic' }}>#{event.tag}</span>
      </div>
      <span style={{ 
        fontWeight: 900, 
        color: impactColor, 
        fontFamily: T.fonts.mono,
        minWidth: '40px',
        textAlign: 'right'
      }}>
        {event.impact > 0 ? `+${event.impact}` : event.impact}
      </span>
    </div>
  );
};

// Components
export const GlassCard: React.FC<{ 
  children: React.ReactNode, 
  style?: React.CSSProperties, 
  onClick?: () => void,
  className?: string,
  glowColor?: string
}> = ({ children, style, onClick, className = '', glowColor }) => {
  const { T } = useTheme();
  
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: T.colors.bg.surface,
        backdropFilter: T.glass,
        WebkitBackdropFilter: T.glass,
        borderRadius: T.radii.lg,
        padding: '24px',
        border: `1px solid ${T.colors.bg.border}`,
        boxShadow: T.shadow,
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
      whileHover={onClick ? {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        y: -4,
      } : {}}
    >
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export const Card = GlassCard;

export const ProgressRing = ({ value, total, size = 100, stroke = 10, color, label }: { value: number, total: number, size?: number, stroke?: number, color?: string, label?: string }) => {
  const { T } = useTheme();
  const radius = (size / 2) - stroke;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(100, (value / total) * 100);
  const offset = circumference - (percent / 100) * circumference;
  const actualColor = color || T.colors.accent.primary;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke={T.colors.bg.border}
          strokeWidth={stroke}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          stroke={actualColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: size > 80 ? '16px' : '12px', fontWeight: 800, color: T.colors.text.primary }}>
          {value}h
        </div>
        {label && <div style={{ fontSize: '9px', color: T.colors.text.muted, fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>}
      </div>
    </div>
  );
};

export const ActiveTimer = ({ node, onStop }: { node: ProjectNode, onStop: (duration: number) => void }) => {
  const [seconds, setSeconds] = useState(0);
  const { T } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const hs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hs > 0 ? hs + ':' : ''}${mins.toString().padStart(hs > 0 ? 2 : 1, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        background: `${T.colors.accent.primary}08`, 
        padding: '20px 32px', 
        borderRadius: T.radii.lg, 
        border: `1px solid ${T.colors.accent.primary}20`,
        boxShadow: `0 0 20px ${T.colors.accent.primary}08`,
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: T.colors.accent.primary, animation: 'pulse 1.5s infinite' }} />
        <Clock size={20} color="white" style={{ position: 'relative', zIndex: 1 }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: T.colors.accent.primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Focus: {node.title}</p>
        <p style={{ fontSize: '32px', fontWeight: 800, fontFamily: T.fonts.mono, letterSpacing: '-0.02em', color: T.colors.text.primary }}>{formatTime(seconds)}</p>
      </div>
      <button 
        onClick={() => onStop(Math.ceil(seconds / 60))}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 24px', 
          backgroundColor: T.colors.accent.primary, 
          color: 'white', 
          border: 'none', 
          borderRadius: T.radii.md, 
          fontWeight: 700, 
          cursor: 'pointer',
          boxShadow: `0 4px 12px ${T.colors.accent.primary}40`
        }}
      >
        <Square size={16} fill="currentColor" /> Stop & Log
      </button>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
};

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  const { T } = useTheme();
  
  if (!isOpen) return null;

  return createPortal(
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      backgroundColor: 'rgba(255, 255, 255, 0.4)', 
      backdropFilter: 'blur(12px)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1000,
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#FFFFFF',
          borderRadius: T.radii.lg,
          border: `1px solid ${T.colors.bg.border}`,
          padding: '40px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            right: '24px', 
            top: '24px', 
            background: 'none', 
            border: 'none', 
            color: T.colors.text.muted, 
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: T.colors.bg.base
          }}
        >
          <X size={20} />
        </button>
        
        <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px', color: T.colors.text.primary, letterSpacing: '-0.02em' }}>{title}</h2>
        {children}
      </motion.div>
    </div>,
    document.body
  );
};

export const Badge: React.FC<{ children: React.ReactNode, color?: string, style?: React.CSSProperties }> = ({ children, color, style }) => {
  const { T } = useTheme();
  const c = color || T.colors.accent.primary;
  return (
    <span style={{
      backgroundColor: `${c}10`,
      color: c,
      padding: '4px 10px',
      borderRadius: T.radii.sm,
      fontSize: '10px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      ...style
    }}>
      {children}
    </span>
  );
};

export const Stat = ({ label, value, color, icon: Icon }: { label: string, value: string | number, color?: string, icon?: any }) => {
  const { T } = useTheme();
  return (
    <GlassCard style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        {Icon && <Icon size={14} color={T.colors.text.muted} />}
        <p style={{ fontSize: '11px', color: T.colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{label}</p>
      </div>
      <p style={{ 
        fontSize: '24px', 
        fontWeight: 800, 
        color: color || T.colors.text.primary,
        fontFamily: T.fonts.mono,
        fontVariantNumeric: 'tabular-nums'
      }}>{value}</p>
    </GlassCard>
  );
};
