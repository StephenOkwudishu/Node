import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Briefcase, Rocket, 
  ArrowUpRight, AlertCircle, ChevronRight, Activity,
  LineChart as LineChartIcon, PieChart as PieChartIcon,
  Sparkles, ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend, AreaChart, Area 
} from 'recharts';
import { useTheme, GlassCard, Stat, Badge } from './Common';
import { INCOME_STREAMS, FINANCIAL_PROJECTIONS } from '../nodes';
import { motion } from 'motion/react';

export const FinancialDashboard = ({ onBack, onAnalyze }: { onBack: () => void, onAnalyze: (q: string) => void }) => {
  const { T } = useTheme();
  const [activeStream, setActiveStream] = useState<string | null>(null);

  const totalMonthly = INCOME_STREAMS.reduce((acc, s) => acc + (s.active ? s.amount : 0), 0);
  const potentialMonthly = INCOME_STREAMS.reduce((acc, s) => acc + s.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px' }}>
      {/* Financial Navigation / Quick Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <button 
           onClick={onBack}
           style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: T.colors.text.muted, fontSize: '12px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}
         >
           <ChevronRight style={{ transform: 'rotate(180deg)' }} size={16} />
           Back to Systems Terminal
         </button>
         <button 
            onClick={() => onAnalyze("Run comprehensive financial projection and career advancement analysis.")}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: T.colors.accent.primary, 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '8px', 
              border: 'none', 
              fontSize: '12px', 
              fontWeight: 800, 
              cursor: 'pointer' 
            }}
         >
           <Sparkles size={14} />
           AI Projection Engine
         </button>
      </div>

      {/* Header: Financial High-Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat 
          label="Current Net Monthly" 
          value={`$${totalMonthly}`} 
          icon={DollarSign} 
        />
        <Stat 
          label="Target Advancement" 
          value="$6,500" 
          color={T.colors.accent.primary}
          icon={Rocket} 
        />
        <Stat 
          label="Side Hustle Yield" 
          value={`$${INCOME_STREAMS.find(s => s.type === 'side-hustle')?.amount || 0}`} 
          color={T.colors.accent.success}
          icon={Activity} 
        />
        <Stat 
          label="Survival Runway" 
          value="22 Days" 
          color={T.colors.accent.danger}
          icon={AlertCircle} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
        {/* Main Chart: Trajectory */}
        <GlassCard className="p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
             <div>
                <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.colors.text.muted }}>12-Month Projection Vector</h3>
                <p style={{ fontSize: '12px', color: T.colors.text.muted }}>Modeling transition to Project Coordinator role in T+4 months</p>
             </div>
             <div style={{ display: 'flex', gap: '12px' }}>
               <Badge color={T.colors.accent.primary}>Job</Badge>
               <Badge color={T.colors.accent.success}>Hustle</Badge>
             </div>
          </div>
          
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FINANCIAL_PROJECTIONS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: T.colors.text.muted }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: T.colors.text.muted }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                  }}
                />
                <Legend iconType="circle" />
                <Line 
                  type="monotone" 
                  dataKey="totalIncome" 
                  name="Total Revenue" 
                  stroke={T.colors.accent.primary} 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: T.colors.accent.primary }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="streams.Side Hustle" 
                  name="Side Hustle" 
                  stroke={T.colors.accent.success} 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Stream Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <GlassCard style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', color: T.colors.text.muted }}>Active Revenue Streams</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {INCOME_STREAMS.map(stream => (
                  <div 
                    key={stream.id}
                    style={{ 
                      padding: '16px', 
                      borderRadius: '12px', 
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      border: `1px solid ${stream.active ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)'}`,
                      opacity: stream.active ? 1 : 0.6
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                         {stream.type === 'job' && <Briefcase size={14} color={T.colors.accent.primary} />}
                         {stream.type === 'side-hustle' && <TrendingUp size={14} color={T.colors.accent.success} />}
                         {stream.type === 'advancement' && <Rocket size={14} color={T.colors.accent.warning} />}
                         <span style={{ fontSize: '13px', fontWeight: 700 }}>{stream.name}</span>
                      </div>
                      <Badge color={stream.active ? T.colors.accent.success : T.colors.text.muted}>
                        {stream.active ? 'Active' : 'Pipeline'}
                      </Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 900, fontFamily: T.fonts.mono }}>${stream.amount}</span>
                      <span style={{ fontSize: '10px', color: T.colors.text.muted }}>/mo</span>
                    </div>
                  </div>
                ))}
              </div>
           </GlassCard>

           {/* AI Financial Reasoning */}
           <GlassCard style={{ 
             padding: '24px', 
             background: `linear-gradient(135deg, ${T.colors.accent.primary}08, ${T.colors.accent.success}08)`,
             border: `1px solid ${T.colors.accent.primary}20` 
           }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Sparkles size={16} color={T.colors.accent.primary} />
                <h3 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: T.colors.accent.primary }}>AI Financial Intelligence</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px', borderLeft: `4px solid ${T.colors.accent.warning}` }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: T.colors.text.primary, marginBottom: '4px' }}>Advancement Lever: Project Coordinator</p>
                  <p style={{ fontSize: '11px', color: T.colors.text.muted }}>Switching from $25/hr to $6.5k/mo increases runway by 180% and allows for side-hustle scaling.</p>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px', borderLeft: `4px solid ${T.colors.accent.primary}` }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: T.colors.text.primary, marginBottom: '4px' }}>Compound Allocation Recommend</p>
                  <p style={{ fontSize: '11px', color: T.colors.text.muted }}>Reallocate 15% of Current Job attention to "Project Coordinator" certification to de-risk survival.</p>
                </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};
