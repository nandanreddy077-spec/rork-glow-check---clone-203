export type HabitCategory = 
  | 'fitness'
  | 'sobriety'
  | 'productivity'
  | 'mindfulness'
  | 'social'
  | 'learning';

export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  icon: string;
  color: string;
  createdAt: number;
  isActive: boolean;
  streak: number;
  bestStreak: number;
  totalCompletions: number;
  lastCompletedDate?: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  timestamp: number;
  notes?: string;
}

export interface DailyStats {
  date: string;
  completedHabits: number;
  totalActiveHabits: number;
  totalPoints: number;
  mood?: 'great' | 'good' | 'okay' | 'bad';
  notes?: string;
}

export const DEFAULT_HABITS: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'bestStreak' | 'totalCompletions'>[] = [
  {
    name: 'Workout',
    description: 'Train hard, stay strong',
    category: 'fitness',
    frequency: 'daily',
    icon: 'Dumbbell',
    color: '#FF3366',
    isActive: true,
  },
  {
    name: 'No Alcohol',
    description: 'Stay sharp, stay focused',
    category: 'sobriety',
    frequency: 'daily',
    icon: 'ShieldCheck',
    color: '#00FF94',
    isActive: true,
  },
  {
    name: 'Cold Shower',
    description: 'Build mental toughness',
    category: 'fitness',
    frequency: 'daily',
    icon: 'Snowflake',
    color: '#00D9FF',
    isActive: true,
  },
  {
    name: 'Read',
    description: 'Expand your mind',
    category: 'learning',
    frequency: 'daily',
    icon: 'BookOpen',
    color: '#7B61FF',
    isActive: true,
  },
  {
    name: 'Meditate',
    description: 'Master your mind',
    category: 'mindfulness',
    frequency: 'daily',
    icon: 'Brain',
    color: '#FFB800',
    isActive: true,
  },
  {
    name: 'No PMO',
    description: 'Channel your energy',
    category: 'sobriety',
    frequency: 'daily',
    icon: 'Lock',
    color: '#00CC77',
    isActive: true,
  },
];
