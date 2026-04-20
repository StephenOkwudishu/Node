import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { ProjectNode } from '../types';
import { Share2, Zap, AlertTriangle, Network } from 'lucide-react';
import { motion } from 'motion/react';

interface TopologyProps {
  nodes: ProjectNode[];
}

export const Topology = ({ nodes }: TopologyProps) => {
  const { T } = useTheme();

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em' }}>System Topology</h2>
        <p style={{ fontSize: '14px', color: T.colors.text.muted, marginTop: '4px' }}>Network representation of project dependencies and neural debt.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {nodes.map((node, i) => {
          const depCount = node.dependencies.length;
          const isCritical = node.chain_position > 0;
          
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard style={{ 
                padding: '24px', 
                height: '100%', 
                border: isCritical ? `1px solid ${T.colors.accent.warning}40` : `1px solid ${T.colors.bg.border}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: isCritical ? T.colors.accent.warning + '10' : 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Network size={20} color={isCritical ? T.colors.accent.warning : T.colors.text.secondary} />
                  </div>
                  {isCritical && <Badge color={T.colors.accent.warning}>CRITICAL PATH</Badge>}
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800 }}>{node.title}</h3>
                  <p style={{ fontSize: '12px', color: T.colors.text.muted, marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{node.desc}</p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${T.colors.bg.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Share2 size={12} color={T.colors.text.muted} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: T.colors.text.muted }}>{depCount} Dependencies</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {node.domains.map(d => <Badge key={d} color="rgba(0,0,0,0.05)" style={{ fontSize: '9px' }}>{d}</Badge>)}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
