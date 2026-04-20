import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { Sparkles, BrainCircuit, ShieldAlert, CheckCircle2, TrendingUp, ArrowRight, User } from 'lucide-react';
import { motion } from 'motion/react';

export const DecisionTerminal = () => {
  const { T } = useTheme();

  const alerts = [
    { type: 'Critical Neglect', title: 'Property Management Under-Allocated', desc: 'Focus is leaking into beat-making instead of closing the $25/hr contract. Survival mode triggered.', color: T.colors.accent.danger },
    { type: 'Compounding Break', title: 'ADHD Regulation Warning', desc: 'Reliance on focus substitutes borrows focus from recovery cycles. Gym + Nutrition chain at risk.', color: T.colors.accent.warning },
    { type: 'Identity Drift', title: 'High Reactive Allocation', desc: 'User claims "Systems Builder" identity, but 42% of attention logged to Reactive Social Media / Rumination.', color: T.colors.accent.primary }
  ];

  const dailyPrompt = {
    date: 'Monday, April 20, 2026',
    tasks: [
      { id: 1, type: 'Non-Negotiable', label: 'Sign $25/hr Contract', time: '9:00 AM - 10:00 AM', why: 'Stability root node for entire 2026 tree.', icon: ShieldAlert, color: T.colors.accent.danger },
      { id: 2, type: 'Neglect Correction', label: 'Upload 1 Portfolio Photo', time: '3:30 PM - 3:45 PM', why: 'Signal existence to creative algorithm. Zero activity detected.', icon: TrendingUp, color: T.colors.accent.primary },
      { id: 3, type: 'Energy Management', label: 'Defensive Scheduling', time: '12:00 PM - 3:00 PM', why: 'Filter calls to prevent emotional rumination loops.', icon: BrainCircuit, color: T.colors.accent.warning }
    ]
  };

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '40px' }} className="flex flex-col lg:grid">
        {/* Left: Insights Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Sparkles size={24} color={T.colors.accent.primary} />
              <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em' }}>Insights Engine</h2>
            </div>
            <p style={{ fontSize: '14px', color: T.colors.text.muted }}>Bearing algorithm calculating allocation imbalance and identity drift.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {alerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard style={{ padding: '24px', borderLeft: `4px solid ${alert.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: alert.color }}>{alert.type}</span>
                    <Badge color={alert.color}>ACTION REQUIRED</Badge>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 900 }}>{alert.title}</h4>
                  <p style={{ fontSize: '13px', color: T.colors.text.muted, marginTop: '8px', lineHeight: 1.5 }}>{alert.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Daily Prompt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ backgroundColor: '#000', color: '#fff', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>DAILY PROMPT</p>
              <h3 style={{ fontSize: '20px', fontWeight: 900, marginTop: '4px' }}>{dailyPrompt.date}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dailyPrompt.tasks.map((task) => (
                <div key={task.id} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <task.icon size={14} color="#fff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: task.color }}>{task.type}</span>
                    <h5 style={{ fontSize: '14px', fontWeight: 800 }}>{task.label}</h5>
                    <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '2px' }}>{task.time}</p>
                    <p style={{ fontSize: '12px', marginTop: '6px', lineHeight: 1.4 }}>{task.why}</p>
                  </div>
                </div>
              ))}
            </div>

            <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              Acknowledge Directive <ArrowRight size={16} />
            </button>
          </div>

          <GlassCard style={{ padding: '24px' }}>
             <h4 style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, marginBottom: '16px' }}>Onboarding Status</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px' }}>Core Runway</span>
                  <CheckCircle2 size={14} color={T.colors.accent.success} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px' }}>Neurotype Profile</span>
                  <CheckCircle2 size={14} color={T.colors.accent.success} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontSize: '12px' }}>Sinkhole Mapping</span>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: T.colors.accent.warning }} />
                </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
