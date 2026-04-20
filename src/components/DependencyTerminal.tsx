import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { ProjectNode } from '../types';
import { Link, Zap, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DependencyTerminalProps {
  nodes: ProjectNode[];
}

export const DependencyTerminal = ({ nodes }: DependencyTerminalProps) => {
  const { T } = useTheme();

  const dependencies = [
    {
      label: 'Critical Path Item',
      title: 'Income Stability',
      desc: 'Without hitting the $2,500+/mo floor, all creative and diplomatic paths collapse due to financial stress.',
      tag: 'Stability Floor',
      color: T.colors.accent.danger,
      icon: ShieldAlert
    },
    {
      label: 'Lagging Indicator',
      title: 'Brand Visibility',
      desc: 'Current state is 324 followers, 0 posts. This is the primary block to scaling creative revenue streams.',
      tag: 'Growth Block',
      color: T.colors.accent.warning,
      icon: Zap
    },
    {
      label: 'Neglected Risk Area',
      title: 'ADHD Medication Management',
      desc: 'Unmanaged ADHD leads to task switching that breaks the deep work compounding chain required for complex learning.',
      tag: 'Chain Integrity',
      color: T.colors.accent.primary,
      icon: Link
    }
  ];

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em' }}>Compounding Chain</h2>
        <p style={{ fontSize: '14px', color: T.colors.text.muted }}>Logical mapping of system dependencies and "The Why" behind every directive.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {dependencies.map((dep, i) => (
          <motion.div
            key={dep.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard style={{ padding: '32px', display: 'flex', gap: '32px', alignItems: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                backgroundColor: `${dep.color}10`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <dep.icon size={28} color={dep.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted }}>{dep.label}</span>
                  <Badge color={dep.color}>{dep.tag}</Badge>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px' }}>{dep.title}</h3>
                <p style={{ fontSize: '14px', color: T.colors.text.muted, lineHeight: 1.6, maxWidth: '800px' }}>{dep.desc}</p>
              </div>
              <ArrowRight size={20} color={T.colors.bg.border} />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
