import { Course, Teacher, NewsItem } from './types';

export const courses: Course[] = [
  {
    id: 1,
    title: {
      ru: 'История',
      uz: 'Tarix',
      en: 'History'
    },
    description: {
      ru: 'Углубленное изучение мировой и локальной истории',
      uz: 'Jahon va mahalliy tarixni chuqur o\'rganish',
      en: 'In-depth study of world and local history'
    },
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: {
      ru: 'Русский язык и литература',
      uz: 'Rus tili va adabiyoti',
      en: 'Russian Language and Literature'
    },
    description: {
      ru: 'Комплексное изучение русского языка и классической литературы',
      uz: 'Rus tili va klassik adabiyotni kompleks o\'rganish',
      en: 'Comprehensive study of Russian language and classical literature'
    },
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: {
      ru: 'География',
      uz: 'Geografiya',
      en: 'Geography'
    },
    description: {
      ru: 'Изучение физической и экономической географии',
      uz: 'Jismoniy va iqtisodiy geografiyani o\'rganish',
      en: 'Study of physical and economic geography'
    },
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80'
  }
];

export const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    position: {
      ru: 'Преподаватель истории',
      uz: 'Tarix o\'qituvchisi',
      en: 'History Teacher'
    },
    bio: {
      ru: '15 лет опыта преподавания, кандидат исторических наук',
      uz: '15 yillik o\'qitish tajribasi, tarix fanlari nomzodi',
      en: '15 years of teaching experience, Ph.D. in History'
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Михаил Иванов',
    position: {
      ru: 'Преподаватель русского языка',
      uz: 'Rus tili o\'qituvchisi',
      en: 'Russian Language Teacher'
    },
    bio: {
      ru: 'Автор учебных пособий, 20 лет опыта',
      uz: 'Darsliklar muallifi, 20 yillik tajriba',
      en: 'Textbook author, 20 years of experience'
    },
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80'
  }
];

export const categories = [
  { id: 1, name: "Новости", key: "news" },
  { id: 2, name: "Проекты", key: "projects" },
  { id: 3, name: "Награды", key: "awards" },
];


export const awards = JSON.parse(localStorage.getItem("awards") || "[]");
