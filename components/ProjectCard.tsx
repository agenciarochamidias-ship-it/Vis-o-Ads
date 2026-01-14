
import React, { useState } from 'react';
import { Project, ProjectStage } from '../types';
import { 
  ArrowRight, Copy, Share2, Edit3, Info, 
  Zap, ChevronDown, ChevronUp, Target, MessageCircle, Mail
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (id: string) => void;
  onMove: (id: string, newStage: ProjectStage) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onMove, onDuplicate, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const lastMetric = project.metrics[project.metrics.length - 1];
  
  const statusColors = {
    healthy: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-500',
    opportunity: 'bg-blue-500'
  };

  const nextStageMap: Record<ProjectStage, ProjectStage | null> = {
    [ProjectStage.IMPLEMENTATION]: ProjectStage.VALIDATION,
    [ProjectStage.VALIDATION]: ProjectStage.PRE_SCALE,
    [ProjectStage.PRE_SCALE]: ProjectStage.SCALE,
    [ProjectStage.SCALE]: null
  };

  const nextStage = nextStageMap[project.stage];

  return (
    <div className={`bg-white rounded-[28px] border-2 transition-all mb-4 relative flex flex-col overflow-hidden ${isExpanded ? 'shadow-lg border-slate-100' : 'shadow-sm border-transparent'}`}>
      
      {/* Badge de Insight IA */}
      {project.lastAIInsight && (
        <div className={`absolute top-0 left-0 w-1.5 h-full ${statusColors[project.lastAIInsight.status] || 'bg-slate-200'}`}></div>
      )}

      <div className="p-4 flex justify-between items-center bg-white border-b border-slate-50 sticky top-0 z-20">
        <div className="flex flex-col pl-2">
          <div className="flex items-center gap-2 mb-1">
            {project.platforms.slice(0, 1).map(p => (
              <span key={p} className="text-[8px] px-2 py-0.5 bg-slate-900 text-white rounded-md font-black uppercase">{p}</span>
            ))}
            {project.lastAIInsight && (
              <span className={`text-[8px] px-2 py-0.5 rounded-md font-black text-white flex items-center gap-1 ${statusColors[project.lastAIInsight.status]}`}>
                <Zap size={8} fill="white" /> IA: {project.lastAIInsight.status.toUpperCase()}
              </span>
            )}
          </div>
          <h4 className="font-black text-slate-800 text-sm leading-tight">{project.clientName}</h4>
        </div>
        
        <div className="flex gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(project.id); }}
            className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform"
          >
            <Zap size={16} />
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`} onClick={() => onSelect(project.id)}>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-[9px] font-black text-emerald-600 uppercase">ROI ATUAL</span>
              <p className="text-xl font-black text-emerald-700">{lastMetric?.roi || '0.0'}x</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="text-[9px] font-black text-blue-600 uppercase">INVESTIDO</span>
              <p className="text-xl font-black text-blue-700">R${(lastMetric?.spend || 0).toLocaleString()}</p>
            </div>
          </div>

          {project.lastAIInsight && (
            <div className="bg-slate-900 text-white p-3 rounded-2xl">
              <p className="text-[9px] font-black text-blue-400 uppercase mb-1 flex items-center gap-1"><Zap size={10} fill="#60a5fa" /> Insight Gemini</p>
              <p className="text-[11px] font-bold leading-tight">{project.lastAIInsight.summary}</p>
            </div>
          )}

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Target size={12} className="text-slate-400" />
               <p className="text-[11px] font-bold text-slate-600 truncate max-w-[150px]">{project.targetMetric}</p>
             </div>
             <ArrowRight size={14} className="text-slate-300" />
          </div>
        </div>
      </div>

      <div className="mt-auto p-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div className="flex gap-1">
          <button onClick={(e) => { e.stopPropagation(); onEdit(project.id); }} className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600"><Edit3 size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(project.id); }} className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400"><Copy size={14} /></button>
        </div>
        {nextStage && (
          <button 
            onClick={(e) => { e.stopPropagation(); onMove(project.id, nextStage); }}
            className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black hover:bg-blue-600 transition-all flex items-center gap-1"
          >
            AVANÇAR <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
