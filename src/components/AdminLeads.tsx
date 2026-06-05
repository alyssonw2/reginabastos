/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lead } from '../types';
import { Shield, Trash2, CalendarCheck, CheckCircle2, User, Phone, Mail, Award, X, Copy, Download } from 'lucide-react';

interface AdminLeadsProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdate?: () => void;
}

export function AdminLeads({ isOpen, onClose }: AdminLeadsProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    const stored = localStorage.getItem('regina_bastos_leads');
    if (stored) {
      try {
        setLeads(JSON.parse(stored).reverse());
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'regina' || password === '12345') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. (Dica de teste: use "regina")');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta ficha de contato?')) {
      const stored = localStorage.getItem('regina_bastos_leads');
      if (stored) {
        try {
          const current = JSON.parse(stored) as Lead[];
          const updated = current.filter(l => l.id !== id);
          localStorage.setItem('regina_bastos_leads', JSON.stringify(updated));
          loadLeads();
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const clearAllLeads = () => {
    if (window.confirm('Atenção: isto removerá todos os contatos salvos localmente. Continuar?')) {
      localStorage.removeItem('regina_bastos_leads');
      setLeads([]);
    }
  };

  const updateStatus = (id: string, newStatus: 'Novo' | 'Contatado' | 'Agendado') => {
    const stored = localStorage.getItem('regina_bastos_leads');
    if (stored) {
      try {
        const current = JSON.parse(stored) as Lead[];
        const updated = current.map(l => {
          if (l.id === id) {
            return { ...l, status: newStatus };
          }
          return l;
        });
        localStorage.setItem('regina_bastos_leads', JSON.stringify(updated));
        loadLeads();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getObjectiveLabel = (obj: string) => {
    const map: Record<string, string> = {
      emagrecimento: 'Emagrecimento',
      hipertrofia: 'Massa / Hipertrofia',
      reeducacao: 'Reeducação Alimentar',
      saude_longevidade: 'Saúde e Disposição'
    };
    return map[obj] || obj;
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Data', 'Nome', 'Gênero', 'Idade', 'Objetivo', 'Ideal', 'E-mail', 'WhatsApp'];
    const rows = leads.map(l => [
      new Date(l.timestamp).toLocaleDateString('pt-BR'),
      l.name,
      l.gender,
      l.age,
      getObjectiveLabel(l.goal),
      l.serviceType === 'presencial' ? 'Presencial (Sete Lagoas - MG)' : 'Online (Telemedicina)',
      l.email,
      l.whatsapp
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `contatos_regina_bastos_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLeadText = (lead: Lead) => {
    const text = `Lead: ${lead.name}
Gênero: ${lead.gender}
Idade: ${lead.age} anos
Objetivo: ${getObjectiveLabel(lead.goal)}
Canal: ${(lead.serviceType === 'presencial' ? 'Presencial (Sete Lagoas - MG)' : 'Online')}
E-mail: ${lead.email}
WhatsApp: ${lead.whatsapp}`;
    navigator.clipboard.writeText(text);
    alert('Dados copiados para a área de transferência!');
  };

  if (!isOpen) return null;

  return (
    <div id="admin-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-brand-light text-brand-dark w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-brand-sage/30 animate-scale-in">
        
        {/* Header */}
        <div className="bg-brand-dark text-white p-5 flex justify-between items-center bg-gradient-to-r from-brand-dark to-[#1d2a25]">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-brand-sage" />
            <div>
              <h2 className="font-serif text-xl tracking-wide">Painel de Leads Recebidos</h2>
              <p className="text-xs text-brand-light/70 font-sans">Simulador de CRM para Dra. Regina Bastos</p>
            </div>
          </div>
          <button 
            id="close-admin-btn"
            onClick={onClose} 
            className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Login View */
          <div className="p-8 flex-1 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
            <Award className="w-12 h-12 text-brand-sage mb-3 animate-pulse" />
            <h3 className="font-serif text-2xl mb-2">Acesso Restrito</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Este é o painel de controle virtual onde a Dra. Regina pode visualizar as pessoas que preencheram o quiz de diagnóstico.
            </p>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 text-left mb-1">Senha de Acesso</label>
                <input
                  id="admin-passwd-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha (use: regina)"
                  className="w-full px-4 py-3 rounded-xl border border-brand-sage/40 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-sage"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs text-left">{error}</p>}
              <button
                id="admin-unlock-btn"
                type="submit"
                className="w-full py-3 bg-brand-dark hover:bg-brand-dark/95 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Desbloquear Painel
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-6 italic">Simulação segura. Os contatos ficam salvos no seu próprio navegador.</p>
          </div>
        ) : (
          /* Leads List View */
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-sage/20">
              <div>
                <span className="text-sm font-semibold bg-brand-sage/20 text-[#213a2d] px-3 py-1 rounded-full">
                  {leads.length} {leads.length === 1 ? 'contato cadastrado' : 'contatos cadastrados'}
                </span>
                <p className="text-xs text-gray-500 mt-1">Dados de simulação capturados em tempo real pelo formulário.</p>
              </div>
              <div className="flex items-center space-x-2">
                {leads.length > 0 && (
                  <>
                    <button
                      id="export-csv-btn"
                      onClick={exportCSV}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-sage text-white rounded-lg text-xs hover:bg-[#809470] hover:shadow transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar Excel/CSV</span>
                    </button>
                    <button
                      id="clear-leads-btn"
                      onClick={clearAllLeads}
                      className="flex items-center space-x-1.5 px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-xs hover:bg-red-50 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Limpar Tudo</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <CheckCircle2 className="w-12 h-12 text-brand-sage/40 mb-3" />
                <p className="font-serif text-lg">Nenhum contato enviado ainda.</p>
                <p className="text-xs max-w-xs mt-1">Preencha o quiz diagnóstico na página principal para simular um lead!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead) => (
                  <div 
                    id={`lead-card-${lead.id}`}
                    key={lead.id} 
                    className="p-5 bg-white border border-brand-sage/10 rounded-xl hover:shadow-md transition-all relative flex flex-col justify-between"
                  >
                    <div>
                      {/* Top bar of lead card */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 rounded-full bg-brand-sage/20 text-brand-dark flex items-center justify-center font-bold">
                            {lead.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-brand-dark leading-tight">{lead.name}</h4>
                            <span className="text-[10px] text-gray-400 block">
                              {new Date(lead.timestamp).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        
                        {/* Status selector colors */}
                        <div className="flex items-center space-x-2">
                          <select
                            id={`status-select-${lead.id}`}
                            value={lead.status || 'Novo'}
                            onChange={(e) => updateStatus(lead.id, e.target.value as any)}
                            className={`text-xs px-2 py-1 rounded font-medium border-0 focus:ring-1 focus:ring-brand-sage ${
                              (lead.status || 'Novo') === 'Novo' ? 'bg-amber-100 text-amber-800' :
                              (lead.status || 'Novo') === 'Contatado' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            <option value="Novo">Novo</option>
                            <option value="Contatado">Contatado</option>
                            <option value="Agendado">Agendado</option>
                          </select>
                        </div>
                      </div>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 py-2.5 my-2.5 border-y border-gray-100 text-xs text-gray-600">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-mono">GÊNERO / IDADE</span>
                          <span className="font-medium text-brand-dark">{lead.gender} • {lead.age} anos</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block font-mono">MODALIDADE</span>
                          <span className="font-medium text-brand-dark">
                            {lead.serviceType === 'presencial' ? 'Presencial 🏖️' : 'Online 💻'}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] text-gray-400 block font-mono">OBJETIVO DO PROTOCOLO</span>
                          <span className="font-semibold text-brand-sage block text-xs mt-0.5" style={{ color: '#687e58' }}>
                            {getObjectiveLabel(lead.goal)}
                          </span>
                        </div>
                      </div>

                      {/* Contact items */}
                      <div className="space-y-1.5 text-xs text-gray-700">
                        <div className="flex items-center space-x-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <a href={`mailto:${lead.email}`} className="hover:underline hover:text-brand-sage break-all">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <a 
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline hover:text-emerald-600 text-emerald-700 font-medium"
                          >
                            {lead.whatsapp}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 gap-2">
                      <button
                        id={`copy-lead-btn-${lead.id}`}
                        onClick={() => copyLeadText(lead)}
                        className="flex items-center space-x-1 p-1 hover:bg-gray-100 rounded text-xs text-gray-500 hover:text-brand-dark cursor-pointer"
                        title="Copiar dados"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Ficha</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        <a
                          id={`lead-wa-link-${lead.id}`}
                          href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Olá ${lead.name}! Sou a Dra. Regina Bastos, acertei os dados do seu quiz nutricional no meu site. Vi que seu objetivo é ${getObjectiveLabel(lead.goal)}, vamos marcar sua consulta?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold hover:shadow transition-all flex items-center space-x-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Chamar no Whats</span>
                        </a>

                        <button
                          id={`delete-lead-btn-${lead.id}`}
                          onClick={() => handleDelete(lead.id)}
                          className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
