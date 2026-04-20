import React from 'react';
import { useTheme, GlassCard, Badge } from './Common';
import { ProjectNode } from '../types';
import { Milestone, ArrowRight, Flag, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface RoadmapProps {
  nodes: ProjectNode[];
}

export const Roadmap = ({ nodes }: RoadmapProps) => {
  const { T } = useTheme();

  const roadmapNodes = [...nodes].sort((a, b) => {
    const order = { 'execution': 0, 'planning': 1, 'exploration': 2, 'ideation': 3, 'shipped': 4, 'shelved': 5 };
    return (order[a.stage] || 99) - (order[b.stage] || 99);
  });

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em' }}>System Roadmap</h2>
        <p style={{ fontSize: '14px', color: T.colors.text.muted, marginTop: '4px' }}>Deployment schedule and critical path trajectory.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '40px' }}>
        <div style={{ 
          position: 'absolute', 
          left: '19px', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          backgroundColor: T.colors.bg.border,
          zIndex: 0
        }} />

        {roadmapNodes.map((node, i) => (
          <motion.div 
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ marginBottom: '40px', position: 'relative', zIndex: 1 }}
          >
            <div style={{ 
              position: 'absolute', 
              left: '-21px', 
              top: '8px', 
              width: '4px', 
              height: '4px', 
              backgroundColor: T.colors.bg.base,
              border: `2px solid ${T.colors.accent.primary}`,
              borderRadius: '50%'
            }} />

            <GlassCard style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(0,0,0,0.03)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Target size={20} color={T.colors.accent.primary} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }}>{node.title}</h3>
                    <Badge color={node.stage === 'execution' ? T.colors.accent.primary : T.colors.text.muted}>{node.stage.toUpperCase()}</Badge>
                  </div>
                  <p style={{ fontSize: '13px', color: T.colors.text.muted, marginTop: '4px' }}>{node.desc}</p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: T.colors.text.muted, textTransform: 'uppercase' }}>Attention Target</span>
                <p style={{ fontSize: '16px', fontWeight: 900 }}>{node.hoursTarget}h / mo</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
