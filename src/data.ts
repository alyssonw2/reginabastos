/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Review, GoalOption, GenderOption, ServiceTypeOption } from './types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Mariana Siqueira',
    text: 'Regina Bastos é simplesmente maravilhosa! Estou fazendo acompanhamento online há 3 meses e já eliminei 8kg comendo comida de verdade. Ela adaptou tudo para a minha rotina corrida e sempre tira minhas dúvidas com muita paciência. Mudou minha vida!',
    rating: 5,
    date: 'Maio de 2026',
    platform: 'Google',
    role: 'Acompanhamento Online',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'rev-2',
    author: 'Roberto Guedes',
    text: 'Excelente profissional. Fui ao consultório presencial em Copacabana e fiquei impressionado com o nível de detalhamento da avaliação de bioimpedância e a paciência dela para explicar os exames de sangue. Foco total em saúde intestinal e bem-estar.',
    rating: 5,
    date: 'Abril de 2026',
    platform: 'Doctoralia',
    role: 'Consulta Presencial (Copacabana)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'rev-3',
    author: 'Carlos André Mendonça',
    text: 'Profissional extremamente capacitada e humana. Sem dietas malucas ou radicalismos desnecessários. Consegui atingir minha meta de ganho de massa muscular na academia mantendo uma alimentação saborosa e prática. Indico de olhos fechados!',
    rating: 5,
    date: 'Fevereiro de 2026',
    platform: 'Google',
    role: 'Acompanhamento Esportivo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'rev-4',
    author: 'Vanessa Fontes',
    text: 'Depois de passar por muitos nutricionistas restritivos, encontrar Regina foi um alento. Ela trata a relação com a comida de forma muito leve e científica. Minhas taxas de colesterol normalizaram e minha ansiedade por doces sumiu.',
    rating: 5,
    date: 'Março de 2026',
    platform: 'Doctoralia',
    role: 'Reeducação Alimentar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
  }
];

export const GOAL_OPTIONS: GoalOption[] = [
  {
    key: 'emagrecimento',
    label: 'Emagrecimento Saudável',
    icon: 'Flame',
    description: 'Redução de gordura de forma duradoura e sem passar fome.'
  },
  {
    key: 'hipertrofia',
    label: 'Ganho de Massa (Hipertrofia)',
    icon: 'Dumbbell',
    description: 'Aumento de massa muscular, força e performance esportiva.'
  },
  {
    key: 'reeducacao',
    label: 'Reeducação Alimentar',
    icon: 'Apple',
    description: 'Aprender a comer bem, melhorar relação com a comida e saúde intestinal.'
  },
  {
    key: 'saude_longevidade',
    label: 'Saúde e Longevidade',
    icon: 'HeartPulse',
    description: 'Controle de exames (colesterol, diabetes), disposição e bem-estar.'
  }
];

export const GENDER_OPTIONS: GenderOption[] = [
  {
    key: 'feminino',
    label: 'Mulher',
    icon: 'User'
  },
  {
    key: 'masculino',
    label: 'Homem',
    icon: 'UserCheck'
  },
  {
    key: 'outro',
    label: 'Prefiro não dizer',
    icon: 'Users'
  }
];

export const SERVICE_TYPE_OPTIONS: ServiceTypeOption[] = [
  {
    key: 'presencial',
    label: 'Atendimento Presencial',
    icon: 'MapPin',
    description: 'Consultório em Boa Vista, Sete Lagoas - MG (Inclui Bioimpedância).'
  },
  {
    key: 'online',
    label: 'Atendimento Online (Teleconsulta)',
    icon: 'Video',
    description: 'Videoconferência interativa com suporte via aplicativo para todo o Brasil.'
  }
];
