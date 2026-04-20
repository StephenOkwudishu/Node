import { ProjectNode, Session, UserProfile, SystemSignals, EventEntry, HeatMapData, CompoundingIndex, IncomeStream, FinancialProjection } from './types';

export const USER_PROFILE: UserProfile = {
  name: 'User',
  runway_days: 22, // < 1 month
  neurotype: 'ADHD',
  focus_substitutes: ['Weed', 'Cigarettes'],
  energy_drain_events: ['Family Emotional Dumping (Mum)'],
  critical_path_root: 'income_stability'
};

export const INCOME_STREAMS: IncomeStream[] = [
  { id: 'job_1', name: 'Assistant Property Manager', type: 'job', amount: 4000, projectedGrowth: 3, active: true },
  { id: 'hustle_1', name: 'Photography/Fine Line', type: 'side-hustle', amount: 800, projectedGrowth: 15, active: true },
  { id: 'advance_1', name: 'Project Coordinator Advancement', type: 'advancement', amount: 6500, projectedGrowth: 5, active: false },
];

const generateFinancialProjections = (months: number): FinancialProjection[] => {
  const data: FinancialProjection[] = [];
  const now = new Date();
  
  for (let i = 0; i < months; i++) {
    const d = new Date(now);
    d.setMonth(d.getMonth() + i);
    const dateStr = d.toISOString().split('T')[0].substring(0, 7); // YYYY-MM
    
    // Logic: Baseline job + hustle grows slowly
    // After month 4, assume advancement kicks in (e.g. Project Coordinator role)
    const baseJob = 4000 * Math.pow(1.0025, i);
    const hustle = 800 * Math.pow(1.01, i);
    const advancementPossible = i >= 4 ? 6500 * Math.pow(1.004, i - 4) : 0;
    
    const currentTotal = i < 4 ? (baseJob + hustle) : (advancementPossible + hustle);
    
    data.push({
      date: dateStr,
      totalIncome: Math.round(currentTotal),
      streams: {
        'Current Job': Math.round(baseJob),
        'Side Hustle': Math.round(hustle),
        'Advancement Path': Math.round(advancementPossible)
      }
    });
  }
  return data;
};

export const FINANCIAL_PROJECTIONS = generateFinancialProjections(12);

export const SYSTEM_SIGNALS: SystemSignals = {
  trend: 'up',
  volatility: 12,
  momentum: 8.4,
  burnoutRisk: 34,
  focusEfficiency: 0.82,
  attentionEfficiency: 76,
  cognitiveLoadIndex: 42,
  momentumScore: 88,
  neglectRisk: 15,
  compoundingRate: 12.5
};

const generateHeatMap = (): HeatMapData => {
  const metrics = ['Sleep', 'Focus', 'Cognitive Index', 'Productivity', 'Hydration'];
  const data: HeatMapData = {};
  const now = new Date();
  
  metrics.forEach(metric => {
    data[metric] = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      data[metric][dateStr] = 40 + Math.floor(Math.random() * 60);
    }
  });
  return data;
};

export const HEATMAP_DATA = generateHeatMap();

export const SYSTEM_EVENTS: EventEntry[] = [
  { id: '1', timestamp: new Date().toISOString(), category: 'focus', impact: 2, tag: 'Deep Work', note: 'Uninterrupted 3h session on Property Manager contract.' },
  { id: '2', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), category: 'health', impact: -1, tag: 'Sleep Debt', note: 'Late night caffeine interfered with REM cycles.' },
  { id: '3', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), category: 'cognitive', impact: 1, tag: 'ADHD Protocol', note: 'Medication timing optimal; mental clarity +15%.' },
  { id: '4', timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), category: 'rest', impact: 2, tag: 'System Recovery', note: 'Full 8h sleep after high-intensity training.' },
];

const generateTimeSeries = (days: number) => {
  const points = [];
  const now = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - (days - i));
    points.push({
      date: d.toISOString().split('T')[0],
      value: 60 + Math.sin(i / 5) * 20 + Math.random() * 10
    });
  }
  return points;
};

export const COMPOUNDING_DATA: CompoundingIndex = {
  consistency: generateTimeSeries(90),
  gains: generateTimeSeries(90).map(p => ({ ...p, value: p.value * 1.1 })), // Exponential growth feel
  output: generateTimeSeries(90).map(p => ({ ...p, value: p.value * 0.9 }))
};

export const TIME_SERIES_METRICS = [
  { name: 'Cognitive Index', data: generateTimeSeries(30), color: '#3B82F6' },
  { name: 'Sleep Quality', data: generateTimeSeries(30).map(p => ({ ...p, value: p.value - 10 })), color: '#10B981' },
  { name: 'Focus Time', data: generateTimeSeries(30).map(p => ({ ...p, value: p.value + 5 })), color: '#6366F1' },
];

const createMockSessions = (projectId: string, daysAgoStart: number, count: number): Session[] => {
  const sessions: Session[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (daysAgoStart + Math.floor(Math.random() * count)));
    sessions.push({
      id: `${projectId}-s-${i}`,
      timestamp: date.toISOString(),
      duration: 30 + Math.floor(Math.random() * 60),
      note: `Session for ${projectId}`
    });
  }
  return sessions;
};

export const BEARING_NODES: ProjectNode[] = [
  {
    id: 'income_stability',
    title: 'Property Management Job',
    stage: 'execution',
    domains: ['finance', 'real_estate', 'survival'],
    chain_position: 20, // Root node
    dependencies: [],
    hoursTarget: 40,
    sessions: createMockSessions('income_stability', 1, 15), 
    desc: 'The $25/hr floor required to stabilize all other creative and diplomatic paths.',
    created: '2024-01-01T00:00:00Z'
  },
  {
    id: 'adhd_mgmt',
    title: 'ADHD Protocol & Medication',
    stage: 'execution',
    domains: ['health', 'mental_hygiene'],
    chain_position: 18,
    dependencies: [],
    hoursTarget: 10,
    sessions: createMockSessions('adhd_mgmt', 5, 2), 
    desc: 'Medication consistency and tapering focus substitutes (Weed/Cigs) to prevent recovery theft.',
    created: '2024-01-01T00:00:00Z'
  },
  {
    id: 'photography_tattoo',
    title: 'Photography & Tattooing',
    stage: 'execution',
    domains: ['creative', 'art', 'revenue'],
    chain_position: 15,
    dependencies: ['income_stability'],
    hoursTarget: 25,
    sessions: [], // High neglect
    desc: 'Fine line tattoo work and photography. Current block: Brand visibility (324 followers/0 posts).',
    created: '2024-01-01T00:00:00Z'
  },
  {
    id: 'hypertrophy',
    title: 'Hypertrophy (62kg -> 75kg)',
    stage: 'execution',
    domains: ['physical', 'health'],
    chain_position: 12,
    dependencies: ['adhd_mgmt'],
    hoursTarget: 15,
    sessions: createMockSessions('hypertrophy', 3, 5),
    desc: 'Compound lifts and nutritional surplus. Reliant on recovery chain integrity.',
    created: '2024-01-01T00:00:00Z'
  },
  {
    id: 'python_dev',
    title: 'Python/Django Learning',
    stage: 'exploration',
    domains: ['software', 'systems'],
    chain_position: 10,
    dependencies: ['adhd_mgmt'],
    hoursTarget: 20,
    sessions: createMockSessions('python_dev', 1, 4),
    desc: 'Building systems. Requires deep work blocks uninterrupted by social rumination.',
    created: '2024-02-15T00:00:00Z'
  },
  {
    id: 'dj_beats',
    title: 'DJing & Beat Making',
    stage: 'execution',
    domains: ['creative', 'music'],
    chain_position: 8,
    dependencies: [],
    hoursTarget: 10,
    sessions: createMockSessions('dj_beats', 2, 8),
    desc: 'Amapiano and House pattern music. High restorative energy potential.',
    created: '2024-01-01T00:00:00Z'
  },
  {
    id: 'diplomacy',
    title: 'Intl Relations & Negotiation',
    stage: 'exploration',
    domains: ['policy', 'learning'],
    chain_position: 6,
    dependencies: [],
    hoursTarget: 8,
    sessions: [],
    desc: 'Reading negotiation and policy framework. Long-term diplomatic trajectory.',
    created: '2024-03-01T00:00:00Z'
  },
  {
    id: 'apex_builds',
    title: 'Apex Builds',
    stage: 'shelved',
    domains: ['engineering', 'nigeria'],
    chain_position: 4,
    dependencies: [],
    hoursTarget: 0,
    sessions: [],
    desc: 'On-hold infrastructure project awaiting stability phase completion.',
    created: '2023-10-01T00:00:00Z'
  },
  {
    id: 'data_center',
    title: 'Data Center Concept',
    stage: 'shelved',
    domains: ['systems', 'infrastructure'],
    chain_position: 2,
    dependencies: [],
    hoursTarget: 0,
    sessions: [],
    desc: 'Advanced systems concept on hold.',
    created: '2023-10-01T00:00:00Z'
  }
];

export const calculateAttentionDebt = (node: ProjectNode): number => {
  if (node.stage === 'shipped' || node.stage === 'shelved' || node.sessions.length === 0) return 0;
  
  const lastSessionDate = new Date(Math.max(...node.sessions.map(s => new Date(s.timestamp).getTime())));
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const getProjectHealth = (node: ProjectNode): 'firing' | 'coasting' | 'cold' | 'shipped' | 'shelved' => {
  if (node.stage === 'shipped') return 'shipped';
  if (node.stage === 'shelved') return 'shelved';
  
  const debt = calculateAttentionDebt(node);
  if (debt <= 7) return 'firing';
  if (debt <= 14) return 'coasting';
  return 'cold';
};
