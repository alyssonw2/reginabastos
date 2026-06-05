/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  platform: 'Google' | 'Doctoralia';
  avatar?: string;
  role?: string;
}

export interface Lead {
  id: string;
  name: string;
  gender: string;
  age: number;
  goal: string;
  serviceType: string;
  email: string;
  whatsapp: string;
  timestamp: string;
  status?: 'Novo' | 'Contatado' | 'Agendado';
}

export interface GoalOption {
  key: string;
  label: string;
  icon: string;
  description: string;
}

export interface GenderOption {
  key: string;
  label: string;
  icon: string;
}

export interface ServiceTypeOption {
  key: string;
  label: string;
  icon: string;
  description: string;
}
