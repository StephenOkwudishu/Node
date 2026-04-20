import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Compass, BookOpen, Share2, BarChart3, Milestone, 
  Play, Square, Plus, Search, ChevronRight, AlertCircle, 
  Flame, Wind, Snowflake, CheckCircle2, PauseCircle,
  TrendingUp, ArrowRight, History, Calendar, Target,
  Zap, Crosshair, Ban, Clock, ShieldAlert, Sparkles, BrainCircuit,
  Terminal as TerminalIcon, Activity, LineChart, LayoutGrid, Cpu, DollarSign, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  Cell, AreaChart, Area, CartesianGrid, PieChart, Pie,
  LineChart as ReLineChart, Line, Legend
} from 'recharts';
import * as d3 from 'd3';
import { GoogleGenAI } from "@google/genai";

import { 
  useTheme, GlassCard, ProgressRing, ActiveTimer, 
  Modal, Stat, Badge, SignalIndicator, HeatMap, EventItem 
} from './components/Common';
import { 
  ProjectNode, Session, ViewTab, Stage, UserProfile, 
  SystemSignals, EventEntry, HeatMapData, CompoundingIndex 
} from './types';
import { 
  BEARING_NODES, calculateAttentionDebt, getProjectHealth, 
  USER_PROFILE, SYSTEM_SIGNALS, HEATMAP_DATA, SYSTEM_EVENTS, 
  COMPOUNDING_DATA, TIME_SERIES_METRICS, INCOME_STREAMS
} from './nodes';
import { Aurora } from './components/Aurora';
import { FinancialDashboard } from './components/FinancialDashboard';
import { HomeDashboard } from './components/HomeDashboard';
import { SystemLoader } from './components/SystemLoader';
import { Logbook } from './components/Logbook';
import { Roadmap } from './components/Roadmap';
import { Topology } from './components/Topology';
import { IntelligenceView } from './components/IntelligenceView';
import { IdentityTerminal } from './components/IdentityTerminal';
import { DependencyTerminal } from './components/DependencyTerminal';
import { LeakingTerminal } from './components/LeakingTerminal';
import { DecisionTerminal } from './components/DecisionTerminal';
import { Sun, Moon, Menu } from 'lucide-react';

export default function CognitiveOS() {
  const { T, mode, toggleTheme } = useTheme();
  const [nodes, setNodes] = useState<ProjectNode[]>(() => {
    const saved = localStorage.getItem('bearing-nodes');
    return saved ? JSON.parse(saved) : BEARING_NODES;
  });
  const [view, setView] = useState<ViewTab>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [activeSessionNode, setActiveSessionNode] = useState<ProjectNode | null>(null);
  
  // Terminal / Analytical State
  const [signals, setSignals] = useState<SystemSignals>(SYSTEM_SIGNALS);
  const [heatmapData, setHeatmapData] = useState<HeatMapData>(HEATMAP_DATA);
  const [events, setEvents] = useState<EventEntry[]>(SYSTEM_EVENTS);
  const [compounding, setCompounding] = useState<CompoundingIndex>(COMPOUNDING_DATA);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('bearing-nodes', JSON.stringify(nodes));
  }, [nodes]);

  // --- AI Companion Actions ---
  const navigateTo = (newView: ViewTab) => {
    if (newView === view) return;
    setIsSwitching(true);
    setTimeout(() => {
      setView(newView);
      setIsSwitching(false);
    }, 800);
  };

  const runAiDecision = async (action: string) => {
    // Handle special terminal commands
    if (action.startsWith('/finance')) {
      navigateTo('financials');
      const newEvent: EventEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        category: 'system',
        impact: 1,
        tag: 'VIEW_NAV',
        note: 'Switching to Financial Projection Terminal.'
      };
      setEvents(prev => [newEvent, ...prev]);
      return;
    }
    if (action.startsWith('/terminal') || action.startsWith('/main')) {
      navigateTo('terminal');
      return;
    }
    if (action.startsWith('/home')) {
      navigateTo('home');
      return;
    }

    setIsAiProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Special logic for financial projection requests
      const isFinRequest = action.toLowerCase().includes('income') || action.toLowerCase().includes('money') || action.toLowerCase().includes('proj');
      
      const prompt = `
        You are the 'Bearing Personal Systems Assistant'.
        Action requested: ${action}
        User Neurotype: ${USER_PROFILE.neurotype}
        Runway: ${USER_PROFILE.runway_days} days
        Current Signals: ${JSON.stringify(signals)}
        Income Streams: ${JSON.stringify(INCOME_STREAMS)}
        Projects: ${nodes.map(n => n.title).join(', ')}
        
        Provide structured system directive. 
        If it's a financial question, provide a growth-oriented projection or advice.
        Respond in JSON: { "directive": "text", "impact": number (-2 to 2) }
      `;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      const result = JSON.parse(response.text);
      const newEvent: EventEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        category: 'system',
        impact: result.impact,
        tag: 'ALGO_DECISION',
        note: result.directive
      };
      setEvents(prev => [newEvent, ...prev]);
    } catch (err) {
      console.error("Algo decision failed:", err);
    } finally {
      setIsAiProcessing(false);
    }
  };


  const startSession = (node: ProjectNode) => {
    setActiveSessionNode(node);
  };

  const stopSession = (duration: number) => {
    if (!activeSessionNode || duration <= 0) {
      setActiveSessionNode(null);
      return;
    }
    const newSession: Session = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      duration,
      note: 'Auto-timed focus session'
    };
    setNodes(prev => prev.map(n => 
      n.id === activeSessionNode.id ? { ...n, sessions: [newSession, ...n.sessions] } : n
    ));
    setActiveSessionNode(null);
  };  // --- Layer 2 Core Elements ---

  const isStrategicView = (view === 'identity' || view === 'dependencies' || view === 'leaks' || view === 'insights' || view === 'prompt');

  const isWideView = (view === 'financials' || view === 'home' || view === 'logbook' || view === 'topology' || view === 'roadmap' || view === 'intelligence' || view === 'identity' || view === 'dependencies' || view === 'leaks' || view === 'insights');

  return (
    <div style={{ 
      minHeight: '100vh', 
      color: T.colors.text.primary,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: mode === 'light' ? '#f5f5f7' : '#0a0a0c',
      overflowX: 'hidden'
    }}>
      <AnimatePresence>
        {isLoading && <SystemLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Aurora blend={0.6} speed={0.5} />
      
      <div style={{ 
        height: 'auto',
        minHeight: '64px',
        borderBottom: `1px solid ${T.colors.bg.border}`,
        backgroundColor: T.colors.bg.surface,
        backdropFilter: 'blur(40px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '12px 24px',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigateTo('home')}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: T.colors.accent.primary, animation: 'pulse 2s infinite' }} />
            <h1 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} className="hidden sm:block">BEARING_OS v4.1</h1>
          </div>

          <AnimatePresence>
            {isSwitching && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: T.colors.accent.success, animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '10px', fontWeight: 900, color: T.colors.accent.success, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sync...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', flex: 1, maxWidth: '400px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '8px', padding: '6px 16px', alignItems: 'center', gap: '12px' }}>
             <span style={{ fontSize: '12px', fontWeight: 800, color: T.colors.text.muted, opacity: 0.5 }}>$</span>
             <input 
                type="text" 
                placeholder="Command..." 
                style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '13px', fontWeight: 600, color: T.colors.text.primary }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    runAiDecision((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
             />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="hidden lg:flex" style={{ gap: '2px' }}>
            <SignalIndicator label="Attention" value={`${signals.attentionEfficiency}%`} trend="up" />
            <SignalIndicator label="Load" value={signals.cognitiveLoadIndex} trend="steady" />
            <SignalIndicator label="Neglect" value={signals.neglectRisk} trend="down" />
          </div>
          
          <button 
            onClick={toggleTheme}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              backgroundColor: 'rgba(0,0,0,0.05)', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: T.colors.text.primary
            }}
          >
            {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      <main style={{ 
        flex: 1, 
        display: 'grid', 
        gridTemplateColumns: isWideView ? '1fr' : '1fr 340px', 
        gap: '2px', // Thin divider feel
        backgroundColor: T.colors.bg.border, 
        opacity: isSwitching ? 0.3 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: isSwitching ? 'none' : 'auto'
      }} className="flex flex-col lg:grid">
        {/* Layer 2: View Routing */}
        <div style={{ 
          backgroundColor: 'transparent', 
          overflowY: 'auto',
          padding: isWideView ? '0' : '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {view === 'home' ? (
             <HomeDashboard signals={signals} nodes={nodes} income={INCOME_STREAMS} onNavigate={navigateTo} />
          ) : view === 'financials' ? (
             <FinancialDashboard onBack={() => navigateTo('home')} onAnalyze={runAiDecision} />
          ) : view === 'logbook' ? (
             <Logbook events={events} nodes={nodes} />
          ) : view === 'topology' ? (
             <Topology nodes={nodes} />
          ) : view === 'roadmap' ? (
             <Roadmap nodes={nodes} />
          ) : view === 'intelligence' || view === 'insights' ? (
             <DecisionTerminal />
          ) : view === 'identity' ? (
            <IdentityTerminal nodes={nodes} />
          ) : view === 'dependencies' ? (
            <DependencyTerminal nodes={nodes} />
          ) : view === 'leaks' ? (
            <LeakingTerminal />
          ) : (
            <>
              {/* Engine Row: Multimeter + Heatmap */}
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.8fr)_1fr] gap-6">
            <GlassCard className="p-8 h-auto lg:h-[520px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <TrendingUp size={20} color={T.colors.accent.primary} />
                  <h3 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.colors.text.muted }}>Performance Multimeter</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['Focus', 'Sleep', 'Energy', 'Cognitive'].map(m => (
                    <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: T.colors.accent.primary }} />
                       <span style={{ fontSize: '11px', fontWeight: 700 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={TIME_SERIES_METRICS[0].data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: T.colors.text.muted }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: T.colors.text.muted }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(30px)', background: 'rgba(255,255,255,0.85)' }}
                    />
                    {TIME_SERIES_METRICS.map(m => (
                      <Line 
                        key={m.name}
                        type="monotone" 
                        dataKey="value" 
                        data={m.data} 
                        name={m.name} 
                        stroke={m.color} 
                        strokeWidth={2.5} 
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                        animationDuration={2000}
                      />
                    ))}
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <GlassCard style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                   <h3 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, letterSpacing: '0.1em' }}>Performance Heatmap</h3>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      {['7D', '30D', '90D'].map(t => <span key={t} style={{ fontSize: '10px', fontWeight: 900, cursor: 'pointer', color: t === '30D' ? T.colors.accent.primary : T.colors.text.muted }}>{t}</span>)}
                   </div>
                </div>
                <HeatMap data={heatmapData} />
                <div style={{ marginTop: '16px', borderTop: `1px solid ${T.colors.bg.border}`, paddingTop: '16px' }}>
                   <p style={{ fontSize: '11px', color: T.colors.text.secondary, lineHeight: 1.6 }}>System is currently showing high focus concentration in evening hours.</p>
                </div>
              </GlassCard>

              <GlassCard style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, letterSpacing: '0.1em', marginBottom: '20px' }}>Compounding Index</h3>
                <div style={{ height: '160px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={compounding.consistency}>
                      <defs>
                        <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={T.colors.accent.primary} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={T.colors.accent.primary} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke={T.colors.accent.primary} strokeWidth={2.5} fill="url(#compGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Map Row: Calendar + Event Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
            <GlassCard style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <h3 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, letterSpacing: '0.1em' }}>Calendar Map</h3>
                 <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#3B82F6' }} />
                       <span style={{ fontSize: '9px', fontWeight: 800 }}>PEAK</span>
                    </div>
                 </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                 {Array.from({ length: 35 }).map((_, i) => {
                   const color = i % 5 === 0 ? '#3B82F6' : i % 3 === 0 ? '#10B981' : '#F59E0B';
                   return (
                     <div 
                       key={i}
                       style={{ 
                         aspectRatio: '1/1', 
                         borderRadius: '8px', 
                         background: `${color}10`, 
                         border: `1px solid ${color}25`,
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         color: color
                       }}
                     >
                       <span style={{ fontSize: '11px', fontWeight: 900 }}>{i + 1}</span>
                     </div>
                   );
                 })}
              </div>
            </GlassCard>

            <GlassCard style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
               <div style={{ padding: '24px 32px', borderBottom: `1px solid ${T.colors.bg.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, letterSpacing: '0.1em' }}>System Event Stream</h3>
               </div>
               <div style={{ flex: 1, overflowY: 'auto', maxHeight: '420px' }}>
                  {events.map((e) => (
                    <EventItem key={e.id} event={e} />
                  ))}
               </div>
            </GlassCard>
          </div>
        </>
      )}
    </div>

    {/* Aside: AI Companion */}
    {!isWideView && (
      <aside style={{ 
        backgroundColor: T.colors.bg.sidebar, 
        backdropFilter: 'blur(40px)',
        borderLeft: `1px solid ${T.colors.bg.border}`,
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }} className="hidden lg:flex">
          <div>
             <h3 style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '-0.02em', color: T.colors.text.primary }}>Intelligence Panel</h3>
             <p style={{ fontSize: '12px', color: T.colors.text.secondary, marginTop: '8px' }}>Optimization vectors online.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 'terminal', label: "Performance OS", icon: Cpu },
              { id: 'intelligence', label: "AI Intelligence", icon: BrainCircuit },
              { id: 'topology', label: "Topology", icon: Share2 },
              { id: 'roadmap', label: "Roadmap", icon: Milestone },
              { id: 'logbook', label: "Logbook", icon: History },
              { id: 'finance', label: "Financials", icon: DollarSign }
            ].map(tab => {
              const isActive = (tab.id === view);
              return (
              <button 
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'finance') navigateTo('financials');
                  else navigateTo(tab.id as any);
                }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  padding: '18px 20px', 
                  backgroundColor: isActive ? `${T.colors.accent.primary}10` : 'rgba(0,0,0,0.02)', 
                  border: `1px solid ${isActive ? T.colors.accent.primary : T.colors.bg.border}`, 
                  borderRadius: T.radii.lg,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <tab.icon size={16} color={isActive ? T.colors.accent.primary : T.colors.text.secondary} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: T.colors.text.primary }}>{tab.label}</span>
              </button>
            )})}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <GlassCard style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
               <h4 style={{ fontSize: '10px', fontWeight: 900, color: T.colors.text.muted, textTransform: 'uppercase', marginBottom: '16px' }}>System Profile</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ fontSize: '12px', color: T.colors.text.secondary }}>Neurotype</span>
                     <span style={{ fontSize: '12px', fontWeight: 900 }}>{USER_PROFILE.neurotype}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ fontSize: '12px', color: T.colors.text.secondary }}>Runway</span>
                     <span style={{ fontSize: '12px', fontWeight: 900, color: T.colors.accent.danger }}>{USER_PROFILE.runway_days} DAYS</span>
                  </div>
               </div>
            </GlassCard>
          </div>
        </aside>
      )}
    </main>

    {/* System Strategic Dock (Bottom Tray) */}
    <div style={{ 
      position: 'fixed', 
      bottom: '24px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      zIndex: 100,
      display: 'flex',
      gap: '8px',
      padding: '8px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    }}>
      {[
        { id: 'home', label: 'Overview', icon: LayoutGrid },
        { id: 'identity', label: 'Identity', icon: User },
        { id: 'dependencies', label: 'Why', icon: Share2 },
        { id: 'leaks', label: 'Where', icon: Activity },
        { id: 'insights', label: 'Insights', icon: Sparkles },
        { id: 'financials', label: 'Capital', icon: DollarSign }
      ].map((tab) => {
        const isActive = view === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.id as any)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: 'none',
              borderRadius: '14px',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <tab.icon size={16} />
            <span style={{ fontSize: '12px', fontWeight: 800 }} className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>

    <AnimatePresence>
        {activeSessionNode && (
          <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
            <ActiveTimer node={activeSessionNode} onStop={stopSession} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
