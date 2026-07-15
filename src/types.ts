/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'home' | 'about' | 'projects' | 'works' | 'aigc';

export interface ProjectType {
  id: string;
  title: string;
  subtitle: string;
  platform: '小红书' | '公众号' | '知乎' | '抖音' | '全能整合';
  tags: string[];
  description: string;
  longDescription: string;
  imageUrl: string;
  bgColor: string; // Tailind class for brutalist blocks (e.g., bg-[#6366F1])
  shadowColor: string; // Color HEX or Tailwind spec (e.g., bg-[#FACC15])
  metrics: {
    label: string;
    value: string;
    growth?: string;
  }[];
  challenges: string[];
  solutions: string[];
  achievements: string[];
}

export interface WorkPost {
  id: string;
  title: string;
  platform: 'Xiaohongshu' | 'WeChat' | 'Zhihu' | 'Douyin';
  publishDate: string;
  category: string;
  likes: string;
  collects: string; // bookmark
  comments: string;
  clicks: string;
  coverImage: string;
  sourceUrl?: string;
  bgHex: string;
  summary: string;
  richContent?: {
    paragraphs: string[];
    carouselImages?: string[];
    tips?: string[];
  };
}

export interface ExperienceType {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
  logoBg: string;
  iconType: 'growth' | 'chat' | 'viral' | 'edit';
}

export interface SkillCategory {
  name: string;
  score: number; // 0-100 for visual bars
  details: string[];
}
