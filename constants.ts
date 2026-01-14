
import { Project, ProjectStage, FunnelType } from './types';

export const FUNNEL_TEMPLATES: Record<FunnelType, { label: string; tasks: string[] }> = {
  'Direct': {
    label: 'Tráfego Direto',
    tasks: ['Criar Anúncios', 'Otimizar Página de Vendas', 'Configurar Pixel', 'Teste de Checkout']
  },
  'WhatsApp': {
    label: 'Meta + WhatsApp',
    tasks: ['Criar Criativos', 'Configurar Link WhatsApp', 'Treinar Scripts de Vendas', 'Instalar API de Conversão']
  },
  'LeadGen': {
    label: 'Geração de Leads',
    tasks: ['Landing Page', 'Configurar CRM', 'E-mail de Boas-vindas', 'Lead Magnet Setup']
  },
  'E-commerce': {
    label: 'E-commerce Pro',
    tasks: ['Feed de Produtos', 'Campanha de Catálogo', 'Remarketing Dinâmico', 'Upsell Strategy']
  },
  'Infoproduct': {
    label: 'Modelo MED / Info',
    tasks: ['Quiz Interativo', 'VSL Setup', 'E-mail Sequence', 'Member Area Check']
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    clientName: 'Eco Life',
    company: 'Eco Life S.A.',
    niche: 'Sustentabilidade',
    goal: 'Vendas Diretas',
    platforms: ['Meta', 'Google'],
    monthlyBudget: 5000,
    targetMetric: 'ROAS 3.0',
    stage: ProjectStage.IMPLEMENTATION,
    funnelType: 'Direct',
    metrics: [
      {
        date: '01/05/2024',
        clicks: 1200,
        leads: 45,
        sales: 12,
        spend: 1500,
        roi: 2.8,
        cpa: 33.3,
        cpc: 1.25,
        ctr: 1.8,
        cpm: 15.0,
        cpcLink: 1.4,
        avgDailySpend: 50,
        frequency: 1.2,
        reach: 25000,
        managerAnalysis: 'Início de operação. O CTR está saudável, mas precisamos otimizar a página de vendas para subir o ROI para 3.0.'
      }
    ],
    checklist: [
      { id: 't1', label: 'Criação de Contas', completed: true },
      { id: 't2', label: 'Estrutura de Campanhas', completed: false },
      { id: 't3', label: 'Integração de APIs', completed: false }
    ],
    timeline: [
      { id: 'e1', date: '01/05/2024', title: 'Setup Inicial', description: 'Contas criadas e pixels configurados.', type: 'milestone' },
      { id: 'e2', date: '05/05/2024', title: 'Troca de Criativos', description: 'Novos vídeos de UGC adicionados.', type: 'optimization' }
    ],
    invoices: [],
    createdAt: new Date().toISOString()
  }
];
