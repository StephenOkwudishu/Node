import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { SystemSignals, EventEntry } from '../types';
import { BrainCircuit, Sparkles, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface IntelligenceViewProps {
  signals: SystemSignals;
  events: EventEntry[];
}

export const IntelligenceView = ({ signals, events }: IntelligenceViewProps) => {
  const { T } = useTheme();

  const recommendations = [
    { 
      type: 'optimization', 
      title: 'Attention Re-allocation', 
      desc: 'System detects 14.5% attention leakage in secondary projects. Re-route to core trajectory.', 
      impact: 'High', 
      icon: TrendingUp,
      color: T.colors.accent.primary 
    },
    { 
      type: 'risk', 
      title: 'Burnout Warning', 
      desc: 'Cognitive load index is trending 12% above monthly baseline. Recommend immediate recovery cycle.', 
      impact: 'Critical', 
      icon: AlertCircle,
      color: T.colors.accent.danger 
    },
    { 
      type: 'growth', 
      title: 'Compounding Gain', 
      desc: 'Consistent execution on "Project Coordination" is yielding 2.1x compounding efficiency.', 
      impact: 'Positive', 
      icon: Sparkles,
      color: T.colors.accent.success 
    }
  ];

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em' }}>System Intelligence</h2>
        <p style={{ fontSize: '14px', color: T.colors.text.muted, marginTop: '4px' }}>AI-driven optimization vectors and predictive analytics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Signal Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted }}>Sector Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Neural Stability', value: signals.momentumScore, status: 'Stable' },
              { label: 'Attention Focus', value: signals.attentionEfficiency, status: 'Optimal' },
              { label: 'Cognitive Reserve', value: 100 - signals.cognitiveLoadIndex, status: 'Moderate' },
              { label: 'Execution Velocity', value: signals.compoundingRate, status: 'Excellent' }
            ].map((s, i) => (
              <GlassCard key={i} style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: T.colors.text.muted, textTransform: 'uppercase' }}>{s.label}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900 }}>{s.value}%</span>
                  <Badge color={T.colors.accent.success}>{s.status}</Badge>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* AI Directives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted }}>Directives</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard style={{ padding: '24px', display: 'flex', gap: '20px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    backgroundColor: `${rec.color}10`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <rec.icon size={20} color={rec.color} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800 }}>{rec.title}</h4>
                      <Badge color={rec.color}>{rec.impact}</Badge>
                    </div>
                    <p style={{ fontSize: '13px', color: T.colors.text.muted, marginTop: '4px', lineHeight: 1.5 }}>{rec.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
