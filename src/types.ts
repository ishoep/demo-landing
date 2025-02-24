export type Language = 'ru' | 'uz' | 'en';

export interface Course {
  id: number;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  description: {
    ru: string;
    uz: string;
    en: string;
  };
  image: string;
}

export interface Teacher {
  id: number;
  name: string;
  position: {
    ru: string;
    uz: string;
    en: string;
  };
  bio: {
    ru: string;
    uz: string;
    en: string;
  };
  image: string;
}

export interface NewsItem {
  id: number;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  excerpt: {
    ru: string;
    uz: string;
    en: string;
  };
  content: {
    ru: string;
    uz: string;
    en: string;
  };
  image: string;
  date: string;
}