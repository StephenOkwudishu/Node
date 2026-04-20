import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { TrendingDown, Music, Wind, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const LeakingTerminal = () => {
  const { T } = useTheme();

  const leaks = [
    { label: 'Attention Sinkhole', title: 'Self-talk Loops', desc: 'Ruminative loops and negative internal dialogue consuming 2.5h daily.', impact: -15, color: T.colors.accent.danger },
    { label: 'Attention Sinkhole', title: 'Emotional Dumping', desc: 'Unsolicited family calls (Mum) causing 2h post-call focus recovery time.', impact: -12, color: T.colors.accent.warning },
    { label: 'Energy Restorative', title: 'Dark Room Silence', desc: 'Total sensory deprivation for 20 mins restores cognitive reserve by 18%.', impact: 18, color: T.colors.accent.success },
    { label: 'Energy Restorative', title: 'Pattern Music', desc: 'Amapiano/House music creates flow state synchronization for repetitive tasks.', impact: 10, color: T.colors.accent.primary }
  ];

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em' }}>Energy Leak Map</h2>
        <p style={{ fontSize: '14px', color: T.colors.text.muted }}>Tracking attention sinkholes and energy restoratives across the system.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        <GlassCard style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '24px' }}>Vector Analysis</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {leaks.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ 
                  padding: '20px', 
                  backgroundColor: 'rgba(0,0,0,0.02)', 
                  borderRadius: '16px', 
                  border: `1px solid ${T.colors.bg.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, display: 'block', marginBottom: '4px' }}>{item.label}</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800 }}>{item.title}</h4>
                  <p style={{ fontSize: '12px', color: T.colors.text.muted, marginTop: '4px' }}>{item.desc}</p>
                </div>
                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: item.impact > 0 ? T.colors.accent.success : T.colors.accent.danger }}>
                    {item.impact > 0 ? `+${item.impact}%` : `${item.impact}%`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <GlassCard style={{ 
            padding: '32px', 
            background: `linear-gradient(135deg, ${T.colors.accent.warning}10, ${T.colors.accent.danger}10)`,
            border: `1px solid ${T.colors.accent.warning}30` 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Calendar size={20} color={T.colors.accent.warning} />
              <h3 style={{ fontSize: '16px', fontWeight: 900 }}>Hard Constraints (Q3 2026)</h3>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 900 }}>Nigeria Trip & Wedding</span>
                <Badge color={T.colors.accent.danger}>CRITICAL DATE</Badge>
              </div>
              <p style={{ fontSize: '13px', color: T.colors.text.muted, lineHeight: 1.5 }}>
                Fixed expenditure and attention drain starting October. Requires $4,000 liquidity buffer 
                and aggressive project shipping in Q2-Q3 to allow for travel-induced neglect.
              </p>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '24px' }}>Recovery Protocol</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: Wind, label: 'Silence', val: '20m' },
                { icon: Music, label: 'House', val: 'Low-Vol' },
                { icon: Wind, label: 'Journal', val: 'Digital' },
                { icon: Wind, label: 'Lifts', val: 'Compound' }
              ].map((rec, i) => (
                <div key={i} style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <rec.icon size={16} color={T.colors.accent.primary} />
                  <div>
                    <p style={{ fontSize: '10px', color: T.colors.text.muted, textTransform: 'uppercase', fontWeight: 900 }}>{rec.label}</p>
                    <p style={{ fontSize: '12px', fontWeight: 800 }}>{rec.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
