import { Game } from '../types';

export const games: Game[] = [
  {
    id: '1',
    title: 'Number Ninja',
    description: 'Master counting and number recognition in this fast-paced adventure.',
    category: 'Math',
    skills: ['Counting', 'Number Recognition', 'Addition'],
    imageUrl: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    title: 'Letter Quest',
    description: 'Journey through an alphabet wonderland to learn letters and phonics.',
    category: 'Language',
    skills: ['Letter Recognition', 'Phonics', 'Vocabulary'],
    imageUrl: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    title: 'Shape Sorter',
    description: 'Identify and match shapes in this colorful puzzle adventure.',
    category: 'Logic',
    skills: ['Shape Recognition', 'Matching', 'Spatial Awareness'],
    imageUrl: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    title: 'Color Splash',
    description: 'Explore the rainbow with painting activities and color matching challenges.',
    category: 'Creativity',
    skills: ['Color Recognition', 'Creativity', 'Fine Motor Skills'],
    imageUrl: 'https://images.pexels.com/photos/1070345/pexels-photo-1070345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    title: 'Animal Explorer',
    description: 'Learn about animals and their habitats in this interactive adventure.',
    category: 'Science',
    skills: ['Biology', 'Memory', 'Classification'],
    imageUrl: 'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    title: 'Puzzle Palace',
    description: 'Solve increasingly challenging puzzles to boost logical thinking.',
    category: 'Logic',
    skills: ['Problem Solving', 'Critical Thinking', 'Patience'],
    imageUrl: 'https://images.pexels.com/photos/2608404/pexels-photo-2608404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    title: 'Word Builder',
    description: 'Construct simple words with this engaging letter-based game.',
    category: 'Language',
    skills: ['Spelling', 'Reading', 'Vocabulary'],
    imageUrl: 'https://images.pexels.com/photos/6633912/pexels-photo-6633912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    title: 'Math Monsters',
    description: 'Defeat friendly monsters by solving addition and subtraction problems.',
    category: 'Math',
    skills: ['Addition', 'Subtraction', 'Number Sense'],
    imageUrl: 'https://images.pexels.com/photos/5428824/pexels-photo-5428824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const categories = [...new Set(games.map(game => game.category))];