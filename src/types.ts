export type Stage = 'execution' | 'planning' | 'exploration' | 'ideation' | 'shipped' | 'shelved';
export type Health = 'firing' | 'coasting' | 'cold' | 'shipped' | 'shelved';

export interface Session {
  id: string;
  timestamp: string; // ISO string
  duration: number; // minutes
  note: string;
}

export interface ProjectNode {
  id: string;
  title: string;
  stage: Stage;
  domains: string[];
  chain_position: number; // 0 for none, higher is more critical
  dependencies: string[]; // IDs of other projects
  hoursTarget: number; // Monthly goal in hours
  sessions: Session[];
  desc: string;
  created: string; // ISO string
}

export type ViewTab = 'home' | 'identity' | 'dependencies' | 'leaks' | 'insights' | 'prompt' | 'terminal' | 'financials' | 'logbook' | 'topology' | 'roadmap' | 'intelligence';

export interface IncomeStream {
  id: string;
  name: string;
  type: 'job' | 'side-hustle' | 'advancement';
  amount: number; // Monthly
  projectedGrowth: number; // % annual
  active: boolean;
}

export interface FinancialProjection {
  date: string;
  totalIncome: number;
  streams: Record<string, number>;
}
export interface UserProfile {
  name: string;
  runway_days: number;
  neurotype: 'ADHD' | 'Neurotypical';
  focus_substitutes: string[];
  energy_drain_events: string[];
  critical_path_root: string; // The ID of the most important project
}

export interface MetricPoint {
  date: string;
  value: number;
}

export interface SystemSignals {
  trend: 'up' | 'down' | 'steady';
  volatility: number; 
  momentum: number; 
  burnoutRisk: number; 
  focusEfficiency: number; 
  attentionEfficiency: number; // 0-100
  cognitiveLoadIndex: number;  // 0-100
  momentumScore: number;       // 0-100
  neglectRisk: number;         // 0-100
  compoundingRate: number;     // %
}

export interface EventEntry {
  id: string;
  timestamp: string;
  category: 'health' | 'focus' | 'cognitive' | 'rest' | 'system';
  impact: number; // -2 to +2
  tag: string;
  note: string;
}

export interface HeatMapData {
  [metric: string]: {
    [day: string]: number; // 0-100
  };
}

export interface CompoundingIndex {
  consistency: MetricPoint[];
  gains: MetricPoint[];
  output: MetricPoint[];
}
