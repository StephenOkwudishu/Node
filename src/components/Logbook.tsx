import React from 'react';
import { useTheme, GlassCard, Badge, EventItem } from './Common';
import { EventEntry, Session } from '../types';
import { History, Clock, Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface LogbookProps {
  events: EventEntry[];
  nodes: any[];
}

export const Logbook = ({ events, nodes }: LogbookProps) => {
  const { T } = useTheme();

  const sessions = nodes.flatMap(n => n.sessions.map((s: any) => ({ ...s, project: n.title })));
  const sortedSessions = sessions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em' }}>System Logbook</h2>
          <p style={{ fontSize: '14px', color: T.colors.text.muted, marginTop: '4px' }}>Chronological audit of all cognitive and physical events.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Feed */}
        <GlassCard style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${T.colors.bg.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <History size={18} color={T.colors.accent.primary} />
              <h3 style={{ fontSize: '14px', fontWeight: 800 }}>Event Stream</h3>
            </div>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {events.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        </GlassCard>

        {/* Sessions Feed */}
        <GlassCard style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${T.colors.bg.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color={T.colors.accent.success} />
              <h3 style={{ fontSize: '14px', fontWeight: 800 }}>Focus Sessions</h3>
            </div>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto', padding: '12px' }}>
            {sortedSessions.map((session, i) => (
              <motion.div 
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ 
                  padding: '16px', 
                  backgroundColor: 'rgba(0,0,0,0.02)', 
                  borderRadius: '12px', 
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{session.project}</span>
                    <Badge color={T.colors.accent.success}>{session.duration}m</Badge>
                  </div>
                  <p style={{ fontSize: '11px', color: T.colors.text.muted }}>{new Date(session.timestamp).toLocaleDateString()} • {session.note}</p>
                </div>
                <Calendar size={14} color={T.colors.text.muted} />
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
