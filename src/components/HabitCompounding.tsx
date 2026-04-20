import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, CartesianGrid 
} from 'recharts';
import { useTheme, GlassCard } from './Common';
import { TrendingUp, Flame, Zap, Award } from 'lucide-react';
import { motion } from 'motion/react';

const habitData = [
  { day: 'Mon', consistency: 80, compounding: 100 },
  { day: 'Tue', consistency: 85, compounding: 115 },
  { day: 'Wed', consistency: 70, compounding: 125 },
  { day: 'Thu', consistency: 95, compounding: 150 },
  { day: 'Fri', consistency: 90, compounding: 180 },
  { day: 'Sat', consistency: 100, compounding: 220 },
  { day: 'Sun', consistency: 95, compounding: 280 },
];

export const HabitCompounding = () => {
  const { T } = useTheme();

  return (
    <GlassCard style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted, letterSpacing: '0.1em' }}>Habit Compounding Matrix</h3>
          <p style={{ fontSize: '12px', color: T.colors.text.muted, marginTop: '4px' }}>Visualizing the exponential payoff of daily consistency.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: T.colors.text.muted }}>Current Pulse</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: T.colors.accent.success }}>
              <Flame size={14} />
              <span style={{ fontSize: '16px', fontWeight: 900 }}>12 Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={habitData}>
            <defs>
              <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.colors.accent.success} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={T.colors.accent.success} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: T.colors.text.muted }} 
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                background: 'rgba(255,255,255,0.9)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="compounding" 
              stroke={T.colors.accent.success} 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorComp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Weekly Velocity', value: '+14.2%', icon: TrendingUp, color: T.colors.accent.primary },
          { label: 'Energy Surplus', value: '420 kcal', icon: Zap, color: T.colors.accent.warning },
          { label: 'Milestones', value: '3/5', icon: Award, color: T.colors.accent.success },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <stat.icon size={14} color={stat.color} />
              <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.text.muted }}>{stat.label}</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 900, color: T.colors.text.primary }}>{stat.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
