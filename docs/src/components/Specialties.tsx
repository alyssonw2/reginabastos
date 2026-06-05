/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, Dumbbell, Apple, Heart, Activity, ShieldAlert, Sparkles, Smile } from 'lucide-react';

interface Specialty {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

export function Specialties() {
  const list: Specialty[] = [
    {
      id: 'spec-1',
      title: 'Emagrecimento Saudável',
      description: 'Protocolos voltados à redução de gordura corporal de maneira sustentável, respeitando sua individualidade e focado em manter a massa magra intacta.',
      icon: <Flame className="w-5 h-5 text-brand-dark" />,
      benefits: ['Aceleração metabólica', 'Sem dietas restritivas extremas', 'Foco em saciedade duradoura']
    },
    {
      id: 'spec-2',
      title: 'Hipertrofia & Performance',
      description: 'Evolução física direcionada de forma limpa. Prescrição focada em ganho de massa muscular, aumento de força e melhoria de desempenho na academia ou esporte.',
      icon: <Dumbbell className="w-5 h-5 text-brand-dark" />,
      benefits: ['Periodização do consumo de carboidrato', 'Suplementação inteligente com base científica', 'Definição corporal estruturada']
    },
    {
      id: 'spec-3',
      title: 'Reeducação Alimentar',
      description: 'Transformação profunda na relação com a comida. Esqueça o terrorismo nutricional e aprenda a desfrutar de momentos sociais sem culpa.',
      icon: <Apple className="w-5 h-5 text-brand-dark" />,
      benefits: ['Cardápios fáceis com ingredientes reais', 'Adaptação do apetite por doces', 'Organização de compras práticas']
    },
    {
      id: 'spec-4',
      title: 'Saúde Gastrointestinal',
      description: 'Tratamento de desbiose, refluxo, gastrite e síndrome do intestino irritável. Um sistema digestivo saudável é a chave para a absorção e a felicidade física.',
      icon: <Heart className="w-5 h-5 text-brand-dark" />,
      benefits: ['Redução de inchaço abdominal', 'Protocolo FODMAPs (se necessário)', 'Restabelecimento da flora benéfica']
    },
    {
      id: 'spec-5',
      title: 'Nutrição Preventiva',
      description: 'Estratégia alimentar para o controle de exames laboratoriais como colesterol alto, glicose, esteatose hepática (gordura no fígado) e melhora do sono.',
      icon: <Activity className="w-5 h-5 text-brand-dark" />,
      benefits: ['Equilíbrio de triglicerídeos', 'Prevenção de diabetes tipo II', 'Aumento drástico na disposição diária']
    },
    {
      id: 'spec-6',
      title: 'Alergias e Intolerâncias',
      description: 'Planejamento alimentício substitutivo de segurança para portadores de doença celíaca, intolerância ao glúten, lactose ou sensibilidades variadas.',
      icon: <ShieldAlert className="w-5 h-5 text-brand-dark" />,
      benefits: ['Substitutos saborosos e fáceis', 'Orientação de rótulos nos mercados', 'Recuperação de carências nutricionais']
    }
  ];

  return (
    <section id="especialidades" className="py-24 bg-white text-[#273932] transition-all">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Tag & Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#556948] bg-[#8fa47e]/15 px-3 py-1 rounded-full font-mono inline-block mb-3.5">
              Protocolos de Alta Performance e Saúde
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-none mb-3">
              Áreas de Atuação & Metodologia
            </h2>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              Tratamentos focados na individualidade bioquímica. Cada plano alimentar é único e desenvolvido para se adaptar perfeitamente ao seu paladar e realidade financeira.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-brand-light/40 border border-brand-sage/10 rounded-2xl p-4 max-w-sm">
            <Sparkles className="w-4 h-4 text-brand-sage flex-shrink-0 animate-pulse" />
            <p className="text-xs text-gray-600 leading-normal">
              <strong>Sem suplementos caros obrigatórios:</strong> Usamos comida de verdade de fácil acesso nos mercados do Rio.
            </p>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((spec) => (
            <div 
              id={`specialty-box-${spec.id}`}
              key={spec.id} 
              className="bg-brand-light/10 border border-brand-sage/10 p-6 sm:p-8 rounded-[2rem] hover:bg-white hover:border-brand-sage/20 hover:shadow-[0_20px_50px_rgba(39,57,50,0.03)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-xl bg-brand-sage/15 flex items-center justify-center mb-6 text-brand-dark">
                  {spec.icon}
                </div>

                <h3 className="font-serif text-xl font-semibold mb-3 tracking-wide">
                  {spec.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {spec.description}
                </p>
              </div>

              {/* Bullet checklist benefits */}
              <ul className="space-y-2 border-t border-brand-sage/10 pt-5 text-xs text-brand-dark/95 font-medium">
                {spec.benefits.map((b, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-brand-sage rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action call beneath grid */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-dark text-brand-light p-1 px-4 py-2 rounded-full text-xs font-mono">
            <Smile className="w-3.5 h-3.5 text-brand-sage animate-bounce" />
            <span>Atendimento nos formatos presencial e por telemedicina segura</span>
          </div>
        </div>

      </div>
    </section>
  );
}
