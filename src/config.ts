export const SITE = {
  url: 'https://iamskalaminblog.pages.dev', // পরে আসল ঠিকানা বসাবেন
  name: {
    en: 'Sheikh Al-Amin Ariyan',
    bn: 'শেখ আল আমিন আরিয়ান',
  },
  description: {
    en: 'Technology, travel and life, written by Sheikh Al-Amin Ariyan.',
    bn: 'প্রযুক্তি, ভ্রমণ ও জীবনযাপন নিয়ে শেখ আল আমিন আরিয়ানের লেখা।',
  },
  author: {
    en: 'Sheikh Al-Amin Ariyan',
    bn: 'শেখ আল আমিন আরিয়ান',
  },
  email: '', // ফাঁকা থাকলে ফুটারে দেখাবে না

    profile: {
    image: '', // ছবি আপলোডের পর '/images/profile.jpg' লিখবেন
    alt: {
      en: 'Portrait of Sheikh Al-Amin Ariyan',
      bn: 'শেখ আল আমিন আরিয়ানের ছবি',
    },
  },
  
  // সোশ্যাল লিংক: শুধু url বসান, ফাঁকা থাকলে ফুটারে আসবে না
  socials: {
    github: '',
    facebook: '',
    x: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  },
} as const;
