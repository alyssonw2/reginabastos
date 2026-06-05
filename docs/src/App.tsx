/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { 
  Sparkles, 
  MapPin, 
  Video, 
  CheckCircle, 
  Phone, 
  ShieldCheck, 
  Mail, 
  Heart, 
  Award, 
  Lock, 
  ArrowUpRight, 
  Instagram, 
  ChevronRight,
  Menu,
  X,
  FileText
} from 'lucide-react';

import { LeadQuiz } from './components/LeadQuiz';
import { Specialties } from './components/Specialties';
import { ReviewsSection } from './components/ReviewsSection';
import { AdminLeads } from './components/AdminLeads';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Load leads count to show indicator
  useEffect(() => {
    try {
      const stored = localStorage.getItem('regina_bastos_leads');
      if (stored) {
        setLeadsCount(JSON.parse(stored).length);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isAdminOpen]);

  // GSAP animation for mobile menu open
  useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      // Clear previous animations if any
      gsap.killTweensOf([menuRef.current, '.menu-link']);
      
      // Setup initial styles directly to avoid flicker
      gsap.set(menuRef.current, { y: '-100%', opacity: 1 });
      
      // Animate background down
      gsap.to(menuRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        ease: 'power4.out'
      });

      // Animate staggering links
      const links = linksRef.current?.querySelectorAll('.menu-link');
      if (links && links.length > 0) {
        gsap.fromTo(links,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.08, 
            ease: 'power3.out',
            delay: 0.15
          }
        );
      }
    }
  }, [mobileMenuOpen]);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // GSAP menu close animation handler
  const closeMenu = () => {
    if (!menuRef.current) {
      setMobileMenuOpen(false);
      return;
    }
    const links = linksRef.current?.querySelectorAll('.menu-link');
    
    const t = gsap.timeline({
      onComplete: () => {
        setMobileMenuOpen(false);
      }
    });

    if (links && links.length > 0) {
      t.to(links, {
        y: -30,
        opacity: 0,
        duration: 0.25,
        stagger: 0.04,
        ease: 'power3.in'
      });
    }

    t.to(menuRef.current, {
      y: '-100%',
      opacity: 1,
      duration: 0.4,
      ease: 'power4.in'
    }, "-=0.2");
  };

  // GSAP click handler on links inside mobile menu
  const handleMobileLinkClick = (id: string) => {
    if (!menuRef.current) {
      scrollTo(id);
      return;
    }
    const links = linksRef.current?.querySelectorAll('.menu-link');
    
    const t = gsap.timeline({
      onComplete: () => {
        setMobileMenuOpen(false);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    });

    if (links && links.length > 0) {
      t.to(links, {
        y: -30,
        opacity: 0,
        duration: 0.25,
        stagger: 0.04,
        ease: 'power3.in'
      });
    }

    t.to(menuRef.current, {
      y: '-100%',
      opacity: 1,
      duration: 0.4,
      ease: 'power4.in'
    }, "-=0.2");
  };

  const updateLeadsCounter = () => {
    try {
      const stored = localStorage.getItem('regina_bastos_leads');
      if (stored) {
        setLeadsCount(JSON.parse(stored).length);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans antialiased text-brand-dark flex flex-col selection:bg-brand-sage selection:text-white">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-sage/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo or Branded Name */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-9 h-9 rounded-full bg-brand-dark flex items-center justify-center text-white">
              <span className="font-serif text-lg font-bold">R</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase block text-[#273932]">Regina Bastos</span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-brand-sage block font-semibold">Nutricionista Clínica</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase text-gray-600">
            <button onClick={() => scrollTo('especialidades')} className="hover:text-brand-dark transition-colors cursor-pointer">Especialidades</button>
            <button onClick={() => scrollTo('sobre')} className="hover:text-brand-dark transition-colors cursor-pointer">Dra. Regina</button>
            <button onClick={() => scrollTo('depoimentos')} className="hover:text-brand-dark transition-colors cursor-pointer">Avaliações</button>
            <button onClick={() => scrollTo('atendimento')} className="hover:text-brand-dark transition-colors cursor-pointer">Atendimento</button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="nav-cta-btn"
              onClick={() => setIsQuizOpen(true)}
              className="px-5 py-2.5 bg-brand-dark hover:bg-brand-dark/95 text-white rounded-xl text-xs font-semibold tracking-wider uppercase hover:shadow transition-all duration-300 cursor-pointer"
            >
              Fazer Pré-Diagnóstico
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-[#273932] hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu with GSAP Animations - Placed outside header to avoid stacking context & backdrop-filter issues */}
      {mobileMenuOpen && (
        <div 
          ref={menuRef}
          id="mobile-menu-fullscreen"
          className="fixed inset-0 z-[100] bg-[#273932] text-white flex flex-col justify-between p-8 md:hidden"
          style={{ transform: 'translateY(-100%)', opacity: 1 }}
        >
          {/* Header: Brand and Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-brand-sage flex items-center justify-center text-[#273932]">
                <span className="font-serif text-lg font-bold">R</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider uppercase block text-white">Regina Bastos</span>
                <span className="text-[10px] uppercase tracking-widest font-mono text-brand-sage block font-semibold">Nutricionista Clínica</span>
              </div>
            </div>
            
            <button 
              id="mobile-menu-close"
              onClick={closeMenu} 
              className="p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links Area */}
          <nav ref={linksRef} className="flex flex-col space-y-7 my-auto text-left py-8 max-w-sm">
            <span className="menu-link text-[10px] uppercase tracking-widest font-mono text-brand-sage/60 font-semibold mb-2 block">
              Navegação Principal
            </span>
            
            <button 
              onClick={() => handleMobileLinkClick('especialidades')} 
              className="menu-link text-4xl font-serif tracking-tight text-white hover:text-brand-sage text-left transition-colors cursor-pointer"
            >
              Especialidades
            </button>
            
            <button 
              onClick={() => handleMobileLinkClick('sobre')} 
              className="menu-link text-4xl font-serif tracking-tight text-white hover:text-brand-sage text-left transition-colors cursor-pointer"
            >
              Dra. Regina
            </button>
            
            <button 
              onClick={() => handleMobileLinkClick('depoimentos')} 
              className="menu-link text-4xl font-serif tracking-tight text-white hover:text-brand-sage text-left transition-colors cursor-pointer"
            >
              Avaliações
            </button>
            
            <button 
              onClick={() => handleMobileLinkClick('atendimento')} 
              className="menu-link text-4xl font-serif tracking-tight text-white hover:text-brand-sage text-left transition-colors cursor-pointer"
            >
              Atendimento
            </button>
            
            <div className="menu-link pt-6">
              <button 
                id="mobile-fullscreen-cta-btn"
                onClick={() => {
                  closeMenu();
                  setIsQuizOpen(true);
                }}
                className="w-full text-center py-4 bg-brand-sage text-[#273932] hover:bg-white hover:text-[#273932] transition-all duration-300 rounded-[20px] font-semibold uppercase tracking-wider text-xs shadow-lg shadow-brand-dark/20"
              >
                Fazer Pré-Diagnóstico
              </button>
            </div>
          </nav>

          {/* Footer Information */}
          <div className="menu-link flex flex-col space-y-4 border-t border-white/10 pt-6">
            <div className="flex items-center space-x-3 text-white/80 text-xs">
              <Instagram className="w-4 h-4 text-brand-sage" />
              <span className="font-mono">@descomplica_nutri17</span>
            </div>
            <div className="text-[10px] text-white/50 tracking-wider">
              Copacabana & Online • Rio de Janeiro
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative bg-pattern min-h-[calc(100vh-80px)] flex items-center py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Welcome Text Area */}
          <motion.div 
            className="md:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/85 border border-brand-sage/20 rounded-full px-4 py-2 shadow-sm animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-brand-sage" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#556948] font-mono">Nutrição Baseada em Ciência e Empatia</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-brand-dark tracking-tight leading-none">
              Descomplique a alimentação e conquiste o seu <span className="italic text-[#8fa47e]">peso ideal</span> de forma definitiva.
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-xl font-sans leading-relaxed">
              Sem dietas restritivas absurdas ou terrorismo alimentar. Eu ajudo você a mudar sua relação com a comida, redefinir sua rotina metabólica e alcançar as suas metas físicas com um protocolo 100% individualizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => setIsQuizOpen(true)}
                className="px-8 py-4 bg-[#273932] hover:bg-[#1c2a25] hover:shadow-xl hover:shadow-brand-dark/15 text-white font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Fazer Diagnóstico de Perfil</span>
                <ChevronRight className="w-4 h-4 text-brand-sage group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-secondary-cta"
                onClick={() => scrollTo('sobre')}
                className="px-8 py-4 border border-brand-sage/35 bg-white text-brand-dark hover:bg-brand-light font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Conhecer a de Dra. Regina
              </button>
            </div>

            {/* Social proof bullets */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-sage/20 text-center sm:text-left">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-brand-dark font-semibold block">+900</span>
                <span className="text-[10px] font-mono uppercase text-gray-400">Pacientes Atendidos</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-brand-dark font-semibold block">5 Estrelas</span>
                <span className="text-[10px] font-mono uppercase text-gray-400">No Google e Doctoralia</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-brand-dark font-semibold block">CRN-4</span>
                <span className="text-[10px] font-mono uppercase text-gray-400">Conselho Ativo</span>
              </div>
            </div>
            
          </motion.div>

          {/* Image Area */}
          <motion.div 
            className="md:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            {/* Soft backdrop organic blobs with brand colors */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-sage to-transparent rounded-[40px] filter blur-xl opacity-20 animate-pulse"></div>
            
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[36px] overflow-hidden border border-white bg-[#8fa47e]/10 shadow-2xl">
              <img 
                src="/src/assets/images/regina_portrait_real_1780672094164.png" 
                alt="Dra. Regina Bastos" 
                className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 hover:scale-[1.08]"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid floating badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md border border-brand-sage/15 p-4 rounded-2xl flex items-center space-x-3 shadow-lg">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping-slow"></div>
                <div className="text-left">
                  <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold leading-none mb-1">● Atendimento Ativo</span>
                  <span className="text-xs text-brand-dark font-semibold block leading-tight">Copacabana & Online • @descomplica_nutri17</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. DIAGNOSTIC FORM AREA */}
      <section id="diagnostico-area" className="py-24 bg-white text-brand-dark relative transition-all duration-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#556948] bg-brand-light px-3 py-1.5 rounded-full font-mono inline-block mb-3">
              Descubra seu Perfil de Saúde
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark tracking-tight leading-none mb-3">
              Identifique Seu Perfil de Prática Nutricional
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
              O preenchimento leva no máximo 1 minuto. Responder a estas perguntas nos permite estimar sua taxa metabólica inicial e estruturar as orientações ideais para a sua consulta no WhatsApp de maneira automatizada.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-[#273932]/5 rounded-[36px] border border-[#273932]/10 p-8 sm:p-14 max-w-2xl mx-auto flex flex-col items-center shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-brand-sage flex items-center justify-center text-[#273932] mb-6 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-dark font-bold mb-4">
              Iniciar Questionário Pré-Análise
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
              Responda a 4 perguntas simples em tela cheia sobre seu objetivo, identificação, sua idade e modalidade de preferência, sem solicitar dados de contato adicionais.
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-8 py-4 bg-[#273932] hover:bg-[#1a2b25] text-white hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center space-x-2.5"
            >
              <span>Fazer Diagnóstico de Perfil</span>
              <ChevronRight className="w-4 h-4 text-brand-sage" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 4. SPECIALTIES AREA */}
      <Specialties />

      {/* 5. ABOUT/BIOGRAPHY SECTION */}
      <section id="sobre" className="py-24 bg-brand-light/35 border-t border-brand-sage/10 text-brand-dark transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* About graphic with unsplash image */}
          <motion.div 
            className="relative order-2 lg:order-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-[36px] overflow-hidden border border-white bg-brand-sage/10 shadow-xl">
              <img 
                src="/src/assets/images/healthy_nutrition_hero_1780671517611.png" 
                alt="Ingredientes Frescos Orgânicos" 
                className="w-full h-full object-cover scale-[1.02] hover:scale-[1.06] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Clinical overlay card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-brand-dark text-white p-6 rounded-2xl max-w-xs border border-brand-sage/20 shadow-xl text-left">
              <Award className="w-8 h-8 text-brand-sage mb-3" />
              <h4 className="font-serif text-lg mb-1">Conselho de Nutrição</h4>
              <p className="text-xs text-brand-light/80 leading-relaxed">
                Registro ativo pelo CRN-4 do Rio de Janeiro: Nº 2012356. Ética, segurança alimentar e compromisso com o bem-estar do paciente.
              </p>
            </div>
          </motion.div>

          {/* About text */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase font-bold tracking-widest text-[#556948] bg-[#8fa47e]/20 px-3 py-1.5 rounded-full font-mono inline-block">
              Excelência Profissional
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-brand-dark tracking-tight leading-none">
              Quem é a Dra. Regina Bastos?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
              Com formação acadêmica robusta e especializações voltadas à nutrição clínica, comportamental e esportiva, a Dra. Regina Bastos atua auxiliando pessoas a resgatarem o prazer em comer bem aliado à obtenção de resultados de peso corporal consistentes.
            </p>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              Formada com destaque no Rio de Janeiro e com ampla experiência em acompanhamento nutricional de famílias e atletas, sua filosofia rejeita qualquer tipo de radicalismo:
            </p>

            <blockquote className="border-l-4 border-brand-sage pl-4 py-1 italic text-brand-dark text-sm sm:text-base font-serif bg-brand-sage/10 rounded-r-xl pr-4 leading-relaxed">
              "Comer é um dos atos mais antigos de união, cultura e prazer. Minha missão não é arrancar as coisas deliciosas da sua vida, mas estruturar uma harmonia bioquímica saudável que permita a você gozar de plena vitalidade e da autoestima física que você merece."
            </blockquote>

            <div className="grid grid-cols-2 gap-4 pb-2 pt-4 text-xs font-semibold text-brand-dark">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-sage" />
                <span>Pós-graduação em Nutrição Esportiva</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-sage" />
                <span>Especialista em Fitoterapia Integrativa</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-sage" />
                <span>Especialista em Microbiota Intestinal</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-sage" />
                <span>Abordagem Comportamental Humanizada</span>
              </div>
            </div>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center space-x-2 text-brand-sage hover:text-brand-dark text-sm font-bold tracking-wide transition-colors cursor-pointer group"
            >
              <span>Preencher pré-diagnóstico com a Dra. Regina</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION (REVIEWS) */}
      <ReviewsSection />

      {/* 7. LOCATION / CLINIC DETAILS */}
      <section id="atendimento" className="py-24 bg-white text-brand-dark border-t border-brand-sage/10 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#556948] bg-brand-light px-3 py-1.5 rounded-full font-mono inline-block">
              Atendimento e Localização
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-none">
              Onde nos Encontrar no Rio de Janeiro
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
              O consultório presencial está perfeitamente localizado na Praia de Copacabana, a poucos metros do metrô. Um espaço acolhedor, climatizado, totalmente equipado para exames de bioimpedância precisos.
            </p>

            <div className="space-y-4 pt-4 text-xs font-sans text-gray-600">
              <div className="flex items-start space-x-3.5">
                <div className="p-2 sm:p-2.5 bg-brand-light text-brand-dark rounded-xl mt-1">
                  <MapPin className="w-5 h-5 text-[#273932]" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-0.5 text-sm">Consultório Copacabana</h4>
                  <p className="leading-relaxed">Av. Nossa Senhora de Copacabana, 500 - Sala 804<br />Copacabana, Rio de Janeiro - RJ (Próximo à estação Siqueira Campos)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 sm:p-2.5 bg-brand-light text-brand-dark rounded-xl mt-1">
                  <Video className="w-5 h-5 text-[#273932]" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-0.5 text-sm">Consulta Online / Telemedicina</h4>
                  <p className="leading-relaxed">Atendimento por chamada de vídeo interativa de qualquer estado do Brasil, com aplicativo oficial para suporte e receitas digitais válidas.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 sm:p-2.5 bg-brand-light text-[#273932] rounded-xl mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-0.5 text-sm">Contatos Oficiais</h4>
                  <p className="leading-relaxed">WhatsApp: (21) 99999-9999 • Email: regina@bastosnutricao.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Card Presentation Map Mock Right */}
          <div className="lg:col-span-7">
            <div className="bg-brand-light/35 border border-brand-sage/15 p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between aspect-video group">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+273932(-43.1856,22.9698)/-43.1856,22.9698,14,0/600x400?access_token=mock')] bg-cover bg-center brightness-[0.93] transition-all opacity-25 group-hover:scale-105 duration-700"></div>
              
              {/* Fake aesthetic roadmap vector representing beach area */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-transparent"></div>
              
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#556948] bg-white/95 px-3 py-1 rounded font-mono inline-block">Consultório Clínico</span>
                <h4 className="font-serif text-2xl text-brand-dark mt-3 mb-1">Copacabana Wellness Space</h4>
                <p className="text-xs text-gray-500 max-w-sm">Ambiente calmo com segurança, controle de porta, recepção confortável e equipamento InBody importado para bioimpedância.</p>
              </div>

              {/* Instant WhatsApp Navigation */}
              <div className="relative z-10 pt-8 flex items-center justify-between flex-wrap gap-4 mt-auto">
                <div className="text-xs font-mono">
                  <span className="block text-gray-400 uppercase leading-none">HORÁRIOS DE ATENDIMENTO</span>
                  <span className="font-semibold text-brand-dark">Seg a Sex: 08h às 20h • Sab: 09h às 14h</span>
                </div>
                <a
                  id="clinical-wacall-btn"
                  href="https://wa.me/5521999999999?text=Olá%20Dra.%20Regina,%20gostaria%20de%20tirar%20algumas%20duvidas%20sobre%20as%20consultas!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#273932] hover:bg-[#1a2c26] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow hover:shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FOOTER WITH ACCESSIBILITY */}
      <footer className="bg-[#273932] text-[#e4e2e3]/85 py-12 border-t border-brand-sage/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Logo element */}
          <div className="space-y-4">
            <span className="font-serif text-xl tracking-widest uppercase block text-white font-bold">Regina Bastos</span>
            <p className="text-xs leading-relaxed text-[#e4e2e3]/70">
              Nutricionista clínica focada em reeducação alimentar, emagrecimento saudável e nutrição esportiva de alta performance de maneira simples e humana.
            </p>
            <div className="flex space-x-3 text-brand-sage">
              <a href="https://instagram.com/descomplica_nutri17" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center space-x-1">
                <Instagram className="w-4 h-4 text-brand-sage hover:text-white" />
                <span className="text-[11px] font-mono hover:text-white transition-colors">@descomplica_nutri17</span>
              </a>
              <a href="mailto:regina@bastosnutricao.com.br" className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-brand-sage hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-white tracking-wide mb-4 text-sm font-semibold">Links Rápidos</h4>
            <ul className="space-y-2 text-xs font-semibold uppercase text-[#e4e2e3]/70">
              <li><button onClick={() => scrollTo('especialidades')} className="hover:text-white transition-colors cursor-pointer text-left">Especialidades</button></li>
              <li><button onClick={() => scrollTo('sobre')} className="hover:text-white transition-colors cursor-pointer text-left">Dra. Regina</button></li>
              <li><button onClick={() => scrollTo('depoimentos')} className="hover:text-white transition-colors cursor-pointer text-left">Avaliações</button></li>
              <li><button onClick={() => scrollTo('atendimento')} className="hover:text-white transition-colors cursor-pointer text-left">Atendimento</button></li>
            </ul>
          </div>

          {/* Location info */}
          <div>
            <h4 className="font-serif text-white tracking-wide mb-4 text-sm font-semibold">Atendimento Presencial</h4>
            <p className="text-xs leading-relaxed text-[#e4e2e3]/70">
              Avenida Nossa Senhora de Copacabana, 500<br />
              Sala 804 - Copacabana<br />
              Rio de Janeiro - RJ<br />
              CEP: 22020-001
            </p>
          </div>

          {/* Secret / Testing Portal */}
          <div className="space-y-4">
            <h4 className="font-serif text-white tracking-wide mb-3 text-sm font-semibold">Acesso ao Administrador</h4>
            <p className="text-xs text-[#e4e2e3]/70 leading-relaxed">
              Dra. Regina poderá conferir todas as respostas cadastradas no formulário diagnóstico clicando abaixo:
            </p>
            <div>
              <button
                id="toggle-admin-leads-btn"
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 border border-brand-sage/35 bg-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white hover:text-brand-dark transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-brand-sage" />
                <span>Exibir Fichas de Contato ({leadsCount})</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer legal bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-sage/15 flex flex-col md:flex-row justify-between items-center text-center gap-4 text-[10px] text-[#e4e2e3]/50">
          <div>
            <p>© 2026 Dra. Regina Bastos - Nutricionista Clínica CRN-4 2012356. Todos os direitos reservados.</p>
          </div>
          <div>
            <p className="max-w-md md:text-right">Aviso importante: As informações fornecidas neste site não substituem o aconselhamento profissional personalizado oferecido em consulta clínica individual.</p>
          </div>
        </div>
      </footer>

      {/* GLOBAL FLOATING WHATSAPP BUTTON */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/5521999999999?text=Olá%20Dra.%20Regina,%20estava%20navegando%20no%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20consultas!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-500 bg-emerald-600"
        style={{ boxShadow: '0 8px 30px rgba(16, 185, 129, 0.45)' }}
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-xs font-semibold tracking-wider uppercase block pr-0 group-hover:pr-2.5">
          Falar no WhatsApp
        </span>
        <Phone className="w-5 h-5 animate-pulse" />
      </a>

      {/* FULL SCREEN PROFILE QUIZ OVERLAY */}
      <LeadQuiz 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onLeadAdded={updateLeadsCounter}
      />

      {/* ADMIN LEADS CONTROL MODAL */}
      <AdminLeads 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

    </div>
  );
}
