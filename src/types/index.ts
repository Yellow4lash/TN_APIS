export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}