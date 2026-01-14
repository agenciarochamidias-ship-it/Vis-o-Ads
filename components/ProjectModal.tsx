
import React, { useState } from 'react';
import { Project, ProjectStage, FunnelType } from '../types';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { FUNNEL_TEMPLATES } from '../constants';

interface ProjectModalProps {
  onClose: () => void;
  onSave: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    clientName: '',
    company: '',
    niche: '',
    goal: '',
    platforms: [],
    monthlyBudget: 0,
    targetMetric: '',
    stage: ProjectStage.IMPLEMENTATION,
    funnelType: 'Direct',
    checklist: []
  });

  const availablePlatforms = ['Meta', 'Google', 'TikTok', 'LinkedIn', 'YouTube'];

  const handleTemplateChange = (type: FunnelType) => {
    const template = FUNNEL_TEMPLATES[type];
    setFormData(prev => ({
      ...prev,
      funnelType: type,
      checklist: template.tasks.map(t => ({ id: Math.random().toString(), label: t, completed: false }))
    }));
  };

  const togglePlatform = (p: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms?.includes(p) 
        ? prev.platforms.filter(x => x !== p) 
        : [...(prev.platforms || []), p]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData as Project,
      id: Math.random().toString(),
      createdAt: new Date().toISOString(),
      metrics: []
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Novo Projeto</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Informações do Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Nome do Cliente"
                value={formData.clientName}
                onChange={e => setFormData({...formData, clientName: e.target.value})}
              />
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Empresa"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              />
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Nicho"
                value={formData.niche}
                onChange={e => setFormData({...formData, niche: e.target.value})}
              />
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="Objetivo Principal"
                value={formData.goal}
                onChange={e => setFormData({...formData, goal: e.target.value})}
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Plataformas</h3>
            <div className="flex flex-wrap gap-2">
              {availablePlatforms.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${formData.platforms?.includes(p) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Orçamento e Metas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                <input 
                  type="number"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none" 
                  placeholder="Orçamento Mensal"
                  onChange={e => setFormData({...formData, monthlyBudget: Number(e.target.value)})}
                />
              </div>
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none" 
                placeholder="Meta de Resultado (Ex: ROI 3.0)"
                value={formData.targetMetric}
                onChange={e => setFormData({...formData, targetMetric: e.target.value})}
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Template de Funil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(Object.keys(FUNNEL_TEMPLATES) as FunnelType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTemplateChange(type)}
                  className={`p-4 rounded-xl border text-left transition-all ${formData.funnelType === type ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <p className="font-bold text-slate-800">{FUNNEL_TEMPLATES[type].label}</p>
                  <p className="text-xs text-slate-500 mt-1">{FUNNEL_TEMPLATES[type].tasks.length} etapas automáticas</p>
                </button>
              ))}
            </div>
          </section>

          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
