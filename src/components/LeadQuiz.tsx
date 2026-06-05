/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { GOAL_OPTIONS, GENDER_OPTIONS, SERVICE_TYPE_OPTIONS } from '../data';
import { Lead } from '../types';
import { 
  Apple, 
  Dumbbell, 
  Flame, 
  HeartPulse, 
  User, 
  UserCheck, 
  Users, 
  MapPin, 
  Video, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Smartphone, 
  ThumbsUp, 
  X,
  Clock,
  Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';

interface LeadQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded?: () => void;
}

export function LeadQuiz({ isOpen, onClose, onLeadAdded }: LeadQuizProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [serviceType, setServiceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastSavedLead, setLastSavedLead] = useState<Lead | null>(null);
  const [redirectCount, setRedirectCount] = useState(3);

  const overlayRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  // Prevent scroll when quiz overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset quiz state when opened
      setStep(1);
      setGoal('');
      setGender('');
      setAge('');
      setServiceType('');
      setIsCompleted(false);
      setIsSubmitting(false);
      setLastSavedLead(null);
      setRedirectCount(3);

      // GSAP entry animation
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
        gsap.fromTo(overlayRef.current,
          { y: '100%', opacity: 1 },
          { y: '0%', opacity: 1, duration: 0.6, ease: 'power4.out' }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle auto-redirection on completion
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCompleted) {
      const targetUrl = buildWhatsappMessage();
      
      // Auto countdown
      interval = setInterval(() => {
        setRedirectCount((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.open(targetUrl, '_blank');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCompleted]);

  // Validation
  const isStepValid = () => {
    if (step === 1) return goal !== '';
    if (step === 2) return gender !== '';
    if (step === 3) return age !== '' && Number(age) >= 1 && Number(age) <= 110;
    if (step === 4) return serviceType !== '';
    return false;
  };

  // GSAP Step slide transitions
  const animateToStep = (nextStep: number) => {
    if (stepContainerRef.current) {
      const direction = nextStep > step ? -30 : 30;
      
      gsap.to(stepContainerRef.current, {
        opacity: 0,
        x: direction,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setStep(nextStep);
          gsap.fromTo(stepContainerRef.current,
            { opacity: 0, x: -direction },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
          );
        }
      });
    } else {
      setStep(nextStep);
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (step < 4) {
        animateToStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      animateToStep(step - 1);
    }
  };

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        y: '100%',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          document.body.style.overflow = 'unset';
          onClose();
        }
      });
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Create random anonymous properties to satisfy CRM schema without collecting personal info
    const anonId = Math.floor(1000 + Math.random() * 9000);
    const anonName = `Paciente de Diagnóstico #${anonId}`;
    const anonEmail = `anonimo_${anonId}@diagnostico.com.br`;
    const anonPhone = `WhatsApp Direto`;

    const newLead: Lead = {
      id: 'lead-' + Math.random().toString(36).substr(2, 9),
      name: anonName,
      gender,
      age: Number(age),
      goal,
      serviceType,
      email: anonEmail,
      whatsapp: anonPhone,
      timestamp: new Date().toISOString(),
      status: 'Novo'
    };

    // Save to local storage
    setTimeout(() => {
      try {
        const existing = localStorage.getItem('regina_bastos_leads');
        const list = existing ? JSON.parse(existing) : [];
        list.push(newLead);
        localStorage.setItem('regina_bastos_leads', JSON.stringify(list));
        
        setLastSavedLead(newLead);
        setIsCompleted(true);
        setIsSubmitting(false);
        if (onLeadAdded) {
          onLeadAdded();
        }
      } catch (e) {
        console.error(e);
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      case 'Apple': return <Apple className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'User': return <User className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      case 'Users': return <Users className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Video': return <Video className={className} />;
      default: return <Apple className={className} />;
    }
  };

  // Pre-generate custom client recommendations
  const getPersonalizedInsights = () => {
    const targetGoal = lastSavedLead ? lastSavedLead.goal : goal;
    const targetAge = lastSavedLead ? lastSavedLead.age : (Number(age) || 30);
    
    let targetCalStr = '';
    let waterStr = '';
    let tip = '';

    if (targetGoal === 'emagrecimento') {
      targetCalStr = 'Déficit Calórico Moderado (Foco em Densidade de Nutrientes)';
      waterStr = 'Aproximadamente 35ml a 40ml por kg Recomendados';
      tip = 'Priorize fibras e saladas antes do prato principal para ativar a saciedade de maneira natural.';
    } else if (targetGoal === 'hipertrofia') {
      targetCalStr = 'Superávit Calórico Limpo (Aporte Energético de Alta Performance)';
      waterStr = 'Fracionamento hídrico focado na hidratação das fibras musculares';
      tip = 'Mantenha o consumo de fontes proteicas de alto valor biológico divididas ao longo do seu dia.';
    } else if (targetGoal === 'reeducacao') {
      targetCalStr = 'Equilíbrio Isotérmico (Foco em Flexibilidade e Consciência)';
      waterStr = 'Consumo de água sugerido de 35ml por kg de peso corporal';
      tip = 'Evite restringir alimentos inteiramente. O segredo está no controle inteligente das porções de preferência.';
    } else {
      targetCalStr = 'Aporte de Micronutrientes e Anti-inflamatórios (Foco Longevidade)';
      waterStr = 'Consumo hídrico abundante com chás funcionais antioxidantes';
      tip = 'Adicione gorduras excelentes (azeite, abacate, chia) para regular o metabolismo endócrino.';
    }

    const metabSpeed = targetAge < 25 ? 'Acelerado' : targetAge < 45 ? 'Estável' : 'Estratégico adaptado';

    return { targetCalStr, waterStr, tip, metabSpeed };
  };

  const buildWhatsappMessage = () => {
    const goalTitle = GOAL_OPTIONS.find(o => o.key === goal)?.label || goal;
    const typeTitle = serviceType === 'presencial' ? 'Presencial (Sete Lagoas - MG)' : 'Online (Teleconsulta)';
    
    const text = `Olá Dra. Regina Bastos! Concluí o meu Diagnóstico de Perfil no seu site.

Meus dados de diagnóstico pré-clínico:
• Objetivo de Saúde: ${goalTitle}
• Identificação de Perfil: ${gender}
• Idade Informada: ${age} anos
• Modalidade Preferida: ${typeTitle}

Gostaria de agendar o meu atendimento!`;

    return `https://wa.me/5521999999999?text=${encodeURIComponent(text)}`;
  };

  const insights = getPersonalizedInsights();

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      id="lead-quiz-fullscreen-overlay"
      className="fixed inset-0 z-50 bg-[#273932] text-white flex flex-col justify-between overflow-y-auto"
      style={{ opacity: 1, transform: 'translateY(100%)' }}
    >
      
      {/* Quiz Header Bar */}
      <header className="px-6 py-5 border-b border-white/10 bg-[#1d2a25] flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-sage flex items-center justify-center text-[#273932]">
            <span className="font-serif text-sm font-bold">R</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold block text-brand-sage leading-none font-mono">Dra. Regina Bastos</span>
            <span className="text-[10px] text-white/60 block tracking-wide uppercase font-mono">Diagnóstico de Perfil</span>
          </div>
        </div>

        <button 
          id="quiz-overlay-close-btn"
          onClick={handleClose}
          className="p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
          title="Fechar diagnóstico"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Quiz Body */}
      <main className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-6 py-12">
        {!isCompleted ? (
          <div>
            {/* Step Progress indicators */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-sage font-mono bg-white/5 px-3 py-1 rounded-full">
                  Etapa {step} de 4
                </span>
                <span className="text-[11px] font-semibold text-brand-sage tracking-wider font-mono">
                  {step === 1 && 'Objetivo Clínico'}
                  {step === 2 && 'Identificação'}
                  {step === 3 && 'Idade Acadêmica'}
                  {step === 4 && 'Modalidade do Protocolo'}
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    id={`fullscreen-quiz-progress-step-${s}`}
                    key={s}
                    className={`h-full rounded-full flex-1 transition-all duration-500 ${
                      s <= step ? 'bg-brand-sage' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Questions Container - Animated with GSAP */}
            <div 
              ref={stepContainerRef} 
              className="bg-[#1c2a25] rounded-3xl p-6 sm:p-10 border border-white/5 shadow-xl min-h-[300px] flex flex-col justify-center"
            >
              {/* STEP 1: GOAL */}
              {step === 1 && (
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2 tracking-tight">
                    Qual é o seu principal objetivo de saúde e nutrição?
                  </h3>
                  <p className="text-xs text-white/60 mb-6">
                    Selecione a opção que melhor se alinha com o que você deseja conquistar.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {GOAL_OPTIONS.map((opt) => (
                      <button
                        id={`btn-full-quiz-goal-${opt.key}`}
                        key={opt.key}
                        onClick={() => setGoal(opt.key)}
                        className={`p-4 text-left rounded-2xl border transition-all duration-300 cursor-pointer flex items-start space-x-3.5 group text-white ${
                          goal === opt.key
                            ? 'border-brand-sage bg-brand-sage/15 shadow-md scale-[1.01]'
                            : 'border-white/10 bg-white/5 hover:border-brand-sage/40 hover:bg-white/10'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                          goal === opt.key ? 'bg-brand-sage text-[#273932]' : 'bg-white/10 text-brand-sage'
                        }`}>
                          {getIcon(opt.icon, "w-5 h-5")}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm leading-snug text-white transition-colors">
                            {opt.label}
                          </h4>
                          <p className="text-[11px] text-white/50 mt-1 leading-normal">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: GENDER */}
              {step === 2 && (
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2 tracking-tight">
                    Como você se identifica?
                  </h3>
                  <p className="text-xs text-white/60 mb-6">
                    A distribuição de macro e micronutrientes varia de acordo com o sexo biológico.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {GENDER_OPTIONS.map((opt) => (
                      <button
                        id={`btn-full-quiz-gender-${opt.key}`}
                        key={opt.key}
                        onClick={() => setGender(opt.label)}
                        className={`p-5 rounded-2xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center space-y-3.5 text-white ${
                          gender === opt.label
                            ? 'border-brand-sage bg-brand-sage/15 shadow-md scale-[1.01]'
                            : 'border-white/10 bg-white/5 hover:border-brand-sage/40 hover:bg-white/10'
                        }`}
                      >
                        <div className={`p-3 rounded-full transition-all duration-300 ${
                          gender === opt.label ? 'bg-brand-sage text-[#273932]' : 'bg-white/10 text-brand-sage'
                        }`}>
                          {getIcon(opt.icon, "w-5 h-5")}
                        </div>
                        <span className="font-bold text-xs tracking-wide">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: AGE */}
              {step === 3 && (
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2 tracking-tight">
                    Qual é a sua idade atual?
                  </h3>
                  <p className="text-xs text-white/60 mb-6">
                    Sua idade nos ajuda a estimar sua taxa metabólica basal e sugerir estratégias ideais de queima.
                  </p>
                  <div className="max-w-xs mx-auto">
                    <div className="relative rounded-2xl border border-white/20 bg-white/5 px-4 py-3 flex items-center shadow-inner">
                      <input
                        id="input-full-quiz-age"
                        type="number"
                        min="1"
                        max="110"
                        value={age}
                        onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="Ex: 30"
                        className="w-full bg-transparent border-0 font-sans font-bold text-center text-xl text-white focus:outline-none focus:ring-0"
                        autoFocus
                      />
                      <span className="text-xs font-semibold text-brand-sage ml-2 font-mono uppercase">Anos</span>
                    </div>
                    {age !== '' && (Number(age) < 1 || Number(age) > 110) && (
                      <p className="text-red-400 text-xs text-center mt-2 font-medium">Por favor, insira uma idade realista entre 1 e 110 anos.</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: MODALITY */}
              {step === 4 && (
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2 tracking-tight">
                    Qual de nossas modalidades é ideal para você?
                  </h3>
                  <p className="text-xs text-white/60 mb-6">
                    A Dra. Regina atende presencialmente em Sete Lagoas - MG e online de maneira flexível.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SERVICE_TYPE_OPTIONS.map((opt) => (
                      <button
                        id={`btn-full-quiz-service-${opt.key}`}
                        key={opt.key}
                        onClick={() => setServiceType(opt.key)}
                        className={`p-4 text-left rounded-2xl border transition-all duration-300 cursor-pointer flex items-start space-x-3.5 group text-white ${
                          serviceType === opt.key
                            ? 'border-brand-sage bg-brand-sage/15 shadow-md scale-[1.01]'
                            : 'border-white/10 bg-white/5 hover:border-brand-sage/40 hover:bg-white/10'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                          serviceType === opt.key ? 'bg-brand-sage text-[#273932]' : 'bg-white/10 text-brand-sage'
                        }`}>
                          {getIcon(opt.icon, "w-5 h-5")}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm leading-snug group-hover:text-brand-sage transition-colors">
                            {opt.label}
                          </h4>
                          <p className="text-[11px] text-white/50 mt-1 leading-normal">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Navigation Controls */}
            <div className="mt-8 flex items-center justify-between">
              <button
                id="full-quiz-back-btn"
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold uppercase rounded-xl transition-colors cursor-pointer ${
                  step === 1
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                id="full-quiz-next-btn"
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`flex items-center space-x-1.5 px-7 py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                  isStepValid() && !isSubmitting
                    ? 'bg-brand-sage text-[#273932] hover:bg-white hover:shadow-lg shadow-brand-sage/10'
                    : 'bg-white/10 text-white/35 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span>Processando Perfil...</span>
                ) : (
                  <>
                    <span>{step === 4 ? 'Avançar e Agendar' : 'Avançar'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN with Redirect Indicators */
          <div className="text-center py-4 bg-[#1c2a25] rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl animate-scale-in">
            <div className="w-14 h-14 bg-brand-sage/20 text-brand-sage rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[9px] uppercase font-bold tracking-widest text-[#273932] bg-brand-sage px-3.5 py-1 rounded-full font-mono">
              Relatório Nutricional Mapeado
            </span>

            <h3 className="font-serif text-3xl text-white mt-4 mb-2 tracking-tight">
              Análise Concluída com Sucesso! 🌟
            </h3>
            <p className="text-xs text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
              Mapeamos suas necessidades biológicas preliminariais no nosso simulador de perfil metabólico. Veja as estimativas abaixo:
            </p>

            {/* Estimated nutritional brief */}
            <div className="bg-[#121d19] rounded-2xl p-5 text-left border border-white/5 mb-8 text-xs space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-white/40 font-mono text-[9px] block uppercase">Velocidade Metabólica Probabilidade:</span>
                  <span className="font-bold text-white text-sm">{insights.metabSpeed}</span>
                </div>
                <div>
                  <span className="text-white/40 font-mono text-[9px] block uppercase">Meta Recomendada Hidratação:</span>
                  <span className="font-bold text-white text-sm">{insights.waterStr}</span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-white/40 font-mono text-[9px] block uppercase">Diretriz Calórica Estrutural:</span>
                  <span className="font-bold text-brand-sage text-sm">{insights.targetCalStr}</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                <span className="text-brand-sage font-bold block mb-1 flex items-center text-[10px] tracking-wide font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-brand-sage mr-1" />
                  RECOMENDAÇÃO INICIAL DA DRA. REGINA:
                </span>
                <p className="text-white/80 leading-relaxed italic text-[11px]">
                  "{insights.tip}"
                </p>
              </div>
            </div>

            {/* Redirection conversion button */}
            <div className="space-y-4">
              <a
                id="whats-booking-primary-btn"
                href={buildWhatsappMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center shadow-lg hover:shadow-emerald-600/10 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <Smartphone className="w-5 h-5 animate-bounce" />
                <span>Prosseguir e Enviar para o WhatsApp</span>
              </a>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-brand-sage/80 font-mono">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Redirecting automatically in <strong className="text-white text-xs">{redirectCount}</strong>s...</span>
              </div>
            </div>
            
            <p className="text-[9px] text-white/30 mt-6 italic">
              *A estimativa provida é de caráter informativo educativo. O plano nutricional metabólico oficial contendo prescrição detalhada e bioimpedância estrutural é elaborado exclusivamente em consulta.
            </p>
          </div>
        )}
      </main>

      {/* Quiz Footer */}
      <footer className="px-6 py-4 border-t border-white/5 bg-[#1d2a25] text-center text-[10px] text-white/40 shrink-0 font-mono">
        © 2026 Dra. Regina Bastos • CRN-4 2012356 • Sete Lagoas & Online
      </footer>

    </div>
  );
}
