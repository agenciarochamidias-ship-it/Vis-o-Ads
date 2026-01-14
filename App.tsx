
import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, BarChart3, Settings, LayoutDashboard, 
  Plus, Search, Bell, TrendingUp, DollarSign, LogOut, Target,
  Share2, ShieldCheck, Globe, ChevronLeft
} from 'lucide-react';
import { Project, ProjectStage, DashboardStats } from './types';
import { INITIAL_PROJECTS } from './constants';
import StatCard from './components/StatCard';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ProjectDetailView from './components/ProjectDetailView';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'kanban' | 'dashboard' | 'clients'>('kanban');
  const [isClientMode, setIsClientMode] = useState(false);

  // Lógica para detectar se é um link público via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('view_project');
    if (clientId) {
      setSelectedProjectId(clientId);
      setIsClientMode(true);
    }
  }, []);

  const stats: DashboardStats = {
    totalActiveProjects: projects.length,
    totalClients: new Set(projects.map(p => p.clientName)).size,
    totalManagedSpend: projects.reduce((acc, p) => acc + p.monthlyBudget, 0),
    averageROI: 3.4
  };

  const filteredProjects = projects.filter(p => 
    p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  if (isClientMode && selectedProjectId) {
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return <div className="p-20 text-center font-black">Projeto não encontrado ou link expirado.</div>;

    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-white p-8 rounded-[40px] shadow-xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-blue-600 rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-600/30">
                <TrendingUp className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-slate-900">Relatório de Performance</h1>
                <p className="text-blue-600 font-bold uppercase text-[10px] tracking-[0.2em]">{project.clientName} • Atualizado em Tempo Real</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
              <ShieldCheck className="text-emerald-500" size={20} />
              <span className="text-emerald-700 font-black text-xs">ACESSO SEGURO E AUTORIZADO</span>
            </div>
          </div>
          
          {/* Exibe apenas o detalhe, sem menus laterais ou edição */}
          <ProjectDetailView 
            project={project} 
            onBack={() => {}} 
            onUpdate={() => {}} // Desabilita updates no modo cliente
            isClientView={true} 
          />

          <footer className="text-center pt-10 border-t border-slate-200">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Powered by TrafficManager Pro Intelligence</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-inter">
      {/* Sidebar - Oculta no Mobile se necessário */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 rotate-3">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h2 className="font-black text-2xl tracking-tighter text-slate-900 leading-none">TRAFFIC<span className="text-blue-600">PRO</span></h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Intelligence SaaS</p>
            </div>
          </div>

          <nav className="space-y-3">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
              { id: 'kanban', label: 'Projetos', icon: <Briefcase size={20} /> },
              { id: 'clients', label: 'Gestão de Clientes', icon: <Users size={20} /> },
              { id: 'reports', label: 'Relatórios IA', icon: <BarChart3 size={20} /> },
              { id: 'settings', label: 'Configurações', icon: <Settings size={20} /> }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => { setActiveView(item.id as any); setSelectedProjectId(null); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black text-sm ${
                  activeView === item.id ? 'bg-slate-900 text-white shadow-xl translate-x-1' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-10">
          <div className="bg-slate-900 p-6 rounded-3xl flex items-center gap-4 mb-8 shadow-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-lg">GA</div>
            <div className="overflow-hidden">
              <p className="font-black text-sm text-white truncate">Gabriel Almeida</p>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Premium Partner</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-rose-500 transition-colors text-xs font-black uppercase tracking-widest">
            <LogOut size={16} /> Logout da Conta
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por cliente ou empresa..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
               <div className="flex items-center gap-2">
                 <Globe className="text-blue-500" size={14} />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vercel Deployment: Active</span>
               </div>
               <p className="text-xs font-bold text-slate-900">trafficpro.vercel.app</p>
            </div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel" alt="Avatar" className="w-12 h-12 rounded-2xl border-2 border-white shadow-xl shadow-blue-600/10" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
          {selectedProjectId && projects.find(p => p.id === selectedProjectId) ? (
            <ProjectDetailView 
              project={projects.find(p => p.id === selectedProjectId)!} 
              onBack={() => setSelectedProjectId(null)} 
              onUpdate={handleUpdateProject}
            />
          ) : (
            <>
              {activeView === 'kanban' && (
                <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500">
                   <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-4xl font-black text-slate-900 tracking-tight">Projetos Ativos</h1>
                      <p className="text-slate-400 font-bold mt-1">Sua central estratégica de tráfego pago.</p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-600 text-white px-8 py-4 rounded-[20px] font-black flex items-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
                    >
                      <Plus size={22} /> CRIAR NOVO PROJETO
                    </button>
                  </div>

                  <div className="flex gap-6 overflow-x-auto pb-10 -mx-4 px-4 scroll-smooth">
                    {Object.values(ProjectStage).map(stage => (
                      <div key={stage} className="kanban-column flex flex-col flex-1 min-w-[340px]">
                        <div className="flex items-center justify-between mb-6 bg-slate-100/50 p-4 rounded-2xl border border-slate-200/50 sticky top-0 z-10 backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <span className={`w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm ${
                              stage === ProjectStage.IMPLEMENTATION ? 'bg-amber-400' :
                              stage === ProjectStage.VALIDATION ? 'bg-blue-500' :
                              stage === ProjectStage.PRE_SCALE ? 'bg-orange-500' : 'bg-emerald-500'
                            }`}></span>
                            <h3 className="font-black text-slate-800 uppercase tracking-widest text-[11px]">{stage}</h3>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {filteredProjects.filter(p => p.stage === stage).map(project => (
                            <ProjectCard 
                              key={project.id} 
                              project={project} 
                              onSelect={setSelectedProjectId}
                              onMove={(id, ns) => setProjects(prev => prev.map(p => p.id === id ? {...p, stage: ns} : p))}
                              onDuplicate={() => {}}
                              onEdit={() => setSelectedProjectId(project.id)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeView === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="Projetos Ativos" value={stats.totalActiveProjects} icon={<Briefcase size={24} />} trend={{ value: 12, isUp: true }} />
                  <StatCard label="Clientes" value={stats.totalClients} icon={<Users size={24} />} />
                  <StatCard label="Investimento" value={`R$ ${stats.totalManagedSpend.toLocaleString()}`} icon={<DollarSign size={24} />} />
                  <StatCard label="ROI Médio" value={`${stats.averageROI}x`} icon={<TrendingUp size={24} />} />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {isModalOpen && (
        <ProjectModal onClose={() => setIsModalOpen(false)} onSave={(p) => setProjects([p, ...projects])} />
      )}
    </div>
  );
};

export default App;
