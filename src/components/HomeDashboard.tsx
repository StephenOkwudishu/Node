import React from 'react';
import { 
  TrendingUp, ArrowUpRight, Target, ShieldCheck, 
  Wallet, Zap, Activity, BrainCircuit 
} from 'lucide-react';
import { useTheme, GlassCard, Stat, Badge } from './Common';
import { HabitCompounding } from './HabitCompounding';
import { motion } from 'motion/react';
import { ProjectNode, SystemSignals, IncomeStream } from '../types';

interface HomeDashboardProps {
  signals: SystemSignals;
  nodes: ProjectNode[];
  income: IncomeStream[];
  onNavigate: (view: any) => void;
}

export const HomeDashboard = ({ signals, nodes, income, onNavigate }: HomeDashboardProps) => {
  const { T } = useTheme();

  const activeProjects = nodes.filter(n => n.stage === 'execution').slice(0, 3);
  const totalIncome = income.reduce((acc, s) => acc + (s.active ? s.amount : 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px' }}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em', color: T.colors.text.primary }}>System Overview</h2>
          <p style={{ fontSize: '14px', color: T.colors.text.muted, marginTop: '4px' }}>All sectors performing within target parameters.</p>
        </div>
        <Badge color={T.colors.accent.success}>Status: Nominal</Badge>
      </div>

      {/* High Level Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat 
          label="Attention" 
          value={`${signals.attentionEfficiency}%`} 
          icon={Target} 
          color={T.colors.accent.primary}
        />
        <Stat 
          label="Financial Capacity" 
          value={`$${totalIncome}`} 
          icon={Wallet} 
          color={T.colors.accent.success}
        />
        <Stat 
          label="Cognitive Load" 
          value={`${signals.cognitiveLoadIndex}%`} 
          icon={BrainCircuit} 
          color={T.colors.accent.warning}
        />
        <Stat 
          label="Momentum" 
          value={signals.momentumScore} 
          icon={TrendingUp} 
          color={T.colors.accent.primary}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8">
        {/* Left Column: Habits & Compounding */}
        <div className="flex flex-col gap-8">
          <HabitCompounding />
          
          <GlassCard style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted }}>Critical Path Nodes</h3>
              <button 
                onClick={() => onNavigate('terminal')}
                style={{ fontSize: '12px', fontWeight: 800, color: T.colors.accent.primary, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Full Access <ArrowUpRight size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeProjects.map(node => (
                <div 
                  key={node.id}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '16px', 
                    backgroundColor: 'rgba(0,0,0,0.02)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.05)' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck size={16} color={T.colors.accent.primary} />
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{node.title}</span>
                      <p style={{ fontSize: '11px', color: T.colors.text.muted }}>{node.desc}</p>
                    </div>
                  </div>
                  <Badge color={T.colors.accent.primary}>{node.stage}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Signal Integrity & Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <GlassCard style={{ padding: '32px' }}>
             <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, marginBottom: '24px' }}>System Integrity</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: "Neglect Risk", value: signals.neglectRisk, status: signals.neglectRisk > 50 ? 'Critical' : 'Safe' },
                  { label: "Burnout Probability", value: signals.burnoutRisk, status: signals.burnoutRisk > 70 ? 'High' : 'Low' },
                  { label: "Stability Index", value: signals.momentumScore, status: 'Increasing' }
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                      <span style={{ color: T.colors.text.muted }}>{item.label}</span>
                      <span style={{ fontWeight: 800 }}>{item.status}</span>
                    </div>
                    <div style={{ height: '4px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }} 
                        style={{ height: '100%', backgroundColor: item.status === 'Critical' || item.status === 'High' ? T.colors.accent.danger : T.colors.accent.primary }} 
                      />
                    </div>
                  </div>
                ))}
             </div>
          </GlassCard>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <button 
              onClick={() => onNavigate('financials')}
              style={{ padding: '24px', borderRadius: '16px', backgroundColor: T.colors.accent.success + '10', border: `1px solid ${T.colors.accent.success}20`, textAlign: 'left', cursor: 'pointer' }}
            >
              <Activity size={24} color={T.colors.accent.success} style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 900 }}>Financial Terminal</h4>
              <p style={{ fontSize: '12px', color: T.colors.text.muted, marginTop: '4px' }}>Analyze revenue vectors and advancement paths.</p>
            </button>
            
            <button 
              onClick={() => onNavigate('terminal')}
              style={{ padding: '24px', borderRadius: '16px', backgroundColor: T.colors.accent.primary + '10', border: `1px solid ${T.colors.accent.primary}20`, textAlign: 'left', cursor: 'pointer' }}
            >
              <Zap size={24} color={T.colors.accent.primary} style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 900 }}>Execution Terminal</h4>
              <p style={{ fontSize: '12px', color: T.colors.text.muted, marginTop: '4px' }}>Deep dive into cognitive load and attention allocation.</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
