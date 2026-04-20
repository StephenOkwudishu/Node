import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { ProjectNode } from '../types';
import { Target, Activity, BrainCircuit, BookOpen, User } from 'lucide-react';
import { motion } from 'motion/react';

interface IdentityTerminalProps {
  nodes: ProjectNode[];
}

export const IdentityTerminal = ({ nodes }: IdentityTerminalProps) => {
  const { T } = useTheme();

  const categories = [
    { 
      label: 'Active Ventures', 
      icon: Target, 
      items: nodes.filter(n => n.domains.includes('creative') || n.domains.includes('finance')),
      color: T.colors.accent.primary 
    },
    { 
      label: 'Physical Goals', 
      icon: Activity, 
      items: nodes.filter(n => n.domains.includes('physical')),
      color: T.colors.accent.success 
    },
    { 
      label: 'Mental Hygiene', 
      icon: BrainCircuit, 
      items: nodes.filter(n => n.domains.includes('mental_hygiene')),
      color: T.colors.accent.warning 
    },
    { 
      label: 'Learning Tracks', 
      icon: BookOpen, 
      items: nodes.filter(n => n.domains.includes('software') || n.domains.includes('policy')),
      color: T.colors.accent.primary 
    }
  ];

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <User size={32} color={T.colors.accent.primary} />
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em' }}>Identity Inventory</h2>
          <p style={{ fontSize: '14px', color: T.colors.text.muted }}>Mapping the facets of the current operative state.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard style={{ padding: '24px', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <cat.icon size={18} color={cat.color} />
                <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.label}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cat.items.map(item => (
                  <div 
                    key={item.id}
                    style={{ 
                      padding: '16px', 
                      backgroundColor: 'rgba(0,0,0,0.02)', 
                      borderRadius: '12px',
                      border: `1px solid ${item.stage === 'shelved' ? 'transparent' : T.colors.bg.border}`,
                      opacity: item.stage === 'shelved' ? 0.6 : 1
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800 }}>{item.title}</span>
                      <Badge color={item.stage === 'execution' ? T.colors.accent.success : T.colors.text.muted}>
                        {item.stage.toUpperCase()}
                      </Badge>
                    </div>
                    <p style={{ fontSize: '11px', color: T.colors.text.muted, marginTop: '4px' }}>{item.desc}</p>
                  </div>
                ))}
                {cat.items.length === 0 && <p style={{ fontSize: '12px', color: T.colors.text.muted, fontStyle: 'italic' }}>No active nodes in this sector.</p>}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
