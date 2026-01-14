
export type FunnelType = 'Direct' | 'WhatsApp' | 'LeadGen' | 'E-commerce' | 'Infoproduct';

export enum ProjectStage {
  IMPLEMENTATION = 'Implementation',
  VALIDATION = 'Validation',
  PRE_SCALE = 'Pre-Scale',
  SCALE = 'Scale'
}

export interface AISuggestion {
  category: 'budget' | 'creative' | 'audience' | 'copy';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface AIInsight {
  status: 'healthy' | 'warning' | 'critical' | 'opportunity';
  summary: string;
  diagnosis: string;
  why: string;
  actionPlan: AISuggestion[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'optimization' | 'incident' | 'milestone';
}

export interface MetricData {
  clicks: number;
  leads: number;
  sales: number;
  spend: number;
  roi: number;
  cpa: number;
  cpc: number;
  ctr: number;
  cpm: number;
  cpcLink: number;
  avgDailySpend: number;
  frequency: number;
  reach: number;
  date: string;
  screenshotUrl?: string;
  managerAnalysis?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  completed: boolean;
  estimatedTime?: string;
  targetMonth?: string;
}

export interface Project {
  id: string;
  clientName: string;
  company: string;
  niche: string;
  goal: string;
  platforms: string[];
  monthlyBudget: number;
  targetMetric: string;
  stage: ProjectStage;
  funnelType: FunnelType;
  metrics: MetricData[];
  checklist: ChecklistItem[];
  timeline: TimelineEvent[];
  invoices: any[];
  personalization?: any;
  createdAt: string;
  lastAIInsight?: AIInsight; // Novo campo para persistir a última análise
}

export interface DashboardStats {
  totalActiveProjects: number;
  totalClients: number;
  totalManagedSpend: number;
  averageROI: number;
}
