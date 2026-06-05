/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REVIEWS } from '../data';
import { Star, MessageSquarePlus, Share2, Heart, ShieldCheck, SquareTerminal } from 'lucide-react';

export function ReviewsSection() {
  const [filterPlatform, setFilterPlatform] = useState<'All' | 'Google' | 'Doctoralia'>('All');

  const filteredReviews = filterPlatform === 'All' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.platform === filterPlatform);

  return (
    <section id="depoimentos" className="py-20 bg-pattern text-brand-dark transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#556948] bg-brand-sage/20 px-3.5 py-1.5 rounded-full font-mono inline-block mb-3">
            Histórias Reais, Mudanças Reais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark tracking-tight leading-none mb-4">
            O que dizem os pacientes de Regina Bastos
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
            Mais do que prescrever planos alimentares, nosso propósito é inspirar um estilo de vida sustentável e trazer paz para a sua mente e corpo. Veja opiniões autênticas coletadas no Google e Doctoralia.
          </p>
        </div>

        {/* Dynamic Reviews Statistics Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-sage/15 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
          
          {/* Average Rating Box */}
          <div className="text-center md:border-r md:border-brand-sage/15 md:pr-8 py-4">
            <h3 className="font-serif text-5xl text-[#273932] font-bold">5.0</h3>
            <div className="flex justify-center my-2 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-500 font-mono">Nota Geral (Excelente)</p>
            <p className="text-xs text-brand-sage font-semibold mt-1">Baseado em +120 consultas pontuadas</p>
          </div>

          {/* Social Proof highlights */}
          <div className="text-center md:border-r md:border-brand-sage/15 md:px-8 py-2 text-sm text-gray-600 space-y-3">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <ShieldCheck className="w-5 h-5 text-brand-sage flex-shrink-0" />
              <span className="font-medium text-left">Foco em Nutrição Científica e Humanizada</span>
            </div>
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Heart className="w-5 h-5 text-brand-sage flex-shrink-0" />
              <span className="font-medium text-left">Suporte diário via App de Acompanhamento</span>
            </div>
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Star className="w-5 h-5 text-brand-sage flex-shrink-0" />
              <span className="font-medium text-left">Avaliação Corporal de Bioimpedância Avançada</span>
            </div>
          </div>

          {/* External Verification Call to Google link */}
          <div className="text-center py-2 flex flex-col items-center justify-center">
            <span className="text-xs font-mono text-gray-400 block mb-2">PAGINA OFICIAL GOOGLE BUSINESS</span>
            <a 
              id="google-profile-link"
              href="https://share.google/2I3Qc5OvlTTym6Dhv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3.5 bg-brand-dark text-white rounded-xl font-semibold text-xs shadow-md hover:bg-brand-dark/95 hover:shadow-xl transition-all duration-300"
            >
              <MessageSquarePlus className="w-4 h-4 text-brand-sage" />
              <span>Verificar Mais no Google</span>
            </a>
            <p className="text-[10px] text-gray-400 mt-2">Clique para ver os dados reais no Google</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center space-x-2.5 mb-8">
          {(['All', 'Google', 'Doctoralia'] as const).map((plat) => (
            <button
              id={`filter-btn-${plat}`}
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-300 cursor-pointer ${
                filterPlatform === plat
                  ? 'bg-brand-dark text-white shadow-md shadow-brand-dark/10'
                  : 'bg-white border border-brand-sage/10 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {plat === 'All' ? 'Todos os Depoimentos' : plat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div 
              id={`review-card-${rev.id}`}
              key={rev.id} 
              className="bg-white rounded-2xl p-6 sm:p-8 border border-white hover:border-brand-sage/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={rev.avatar} 
                      alt={rev.author} 
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border-2 border-brand-light/70"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-brand-dark">{rev.author}</h4>
                      <p className="text-[11px] text-brand-sage font-mono uppercase font-semibold">{rev.role}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold font-sans ${
                    rev.platform === 'Google' 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {rev.platform}
                  </span>
                </div>

                <div className="flex space-x-0.5 mb-3 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                  ))}
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-gray-50 flex justify-between items-center text-[11px] text-gray-400">
                <span>Avaliado em {rev.date}</span>
                <span className="flex items-center text-green-700/60 font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1"></span>
                  Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
