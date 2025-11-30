import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { Habit, HabitCompletion, DailyStats, DEFAULT_HABITS } from '@/types/habits';
import { Platform } from 'react-native';

const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },
};

const HABITS_KEY = 'apex_habits';
const COMPLETIONS_KEY = 'apex_completions';
const STATS_KEY = 'apex_daily_stats';

export const [HabitsProvider, useHabits] = createContextHook(() => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [habitsData, completionsData, statsData] = await Promise.all([
        storage.getItem(HABITS_KEY),
        storage.getItem(COMPLETIONS_KEY),
        storage.getItem(STATS_KEY),
      ]);

      if (habitsData) {
        setHabits(JSON.parse(habitsData));
      } else {
        const defaultHabits = DEFAULT_HABITS.map((habit, index) => ({
          ...habit,
          id: `habit_${Date.now()}_${index}`,
          createdAt: Date.now(),
          streak: 0,
          bestStreak: 0,
          totalCompletions: 0,
        }));
        setHabits(defaultHabits);
        await storage.setItem(HABITS_KEY, JSON.stringify(defaultHabits));
      }

      if (completionsData) {
        setCompletions(JSON.parse(completionsData));
      }

      if (statsData) {
        setDailyStats(JSON.parse(statsData));
      }
    } catch (error) {
      console.error('Error loading habits data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHabits = useCallback(async (newHabits: Habit[]) => {
    try {
      await storage.setItem(HABITS_KEY, JSON.stringify(newHabits));
      setHabits(newHabits);
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  }, []);

  const saveCompletions = useCallback(async (newCompletions: HabitCompletion[]) => {
    try {
      await storage.setItem(COMPLETIONS_KEY, JSON.stringify(newCompletions));
      setCompletions(newCompletions);
    } catch (error) {
      console.error('Error saving completions:', error);
    }
  }, []);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isCompletedToday = useCallback((habitId: string) => {
    const today = getTodayString();
    return completions.some(c => c.habitId === habitId && c.date === today);
  }, [completions]);

  const toggleHabitCompletion = useCallback(async (habitId: string) => {
    const today = getTodayString();
    const isCompleted = isCompletedToday(habitId);

    if (isCompleted) {
      const newCompletions = completions.filter(
        c => !(c.habitId === habitId && c.date === today)
      );
      await saveCompletions(newCompletions);

      const habit = habits.find(h => h.id === habitId);
      if (habit) {
        const updatedHabit = {
          ...habit,
          streak: Math.max(0, habit.streak - 1),
          totalCompletions: Math.max(0, habit.totalCompletions - 1),
        };
        const updatedHabits = habits.map(h => h.id === habitId ? updatedHabit : h);
        await saveHabits(updatedHabits);
      }
    } else {
      const newCompletion: HabitCompletion = {
        habitId,
        date: today,
        timestamp: Date.now(),
      };
      await saveCompletions([...completions, newCompletion]);

      const habit = habits.find(h => h.id === habitId);
      if (habit) {
        const newStreak = habit.streak + 1;
        const updatedHabit = {
          ...habit,
          streak: newStreak,
          bestStreak: Math.max(habit.bestStreak, newStreak),
          totalCompletions: habit.totalCompletions + 1,
          lastCompletedDate: today,
        };
        const updatedHabits = habits.map(h => h.id === habitId ? updatedHabit : h);
        await saveHabits(updatedHabits);
      }
    }
  }, [habits, completions, isCompletedToday, saveHabits, saveCompletions]);

  const addCustomHabit = useCallback(async (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'bestStreak' | 'totalCompletions'>) => {
    const newHabit: Habit = {
      ...habit,
      id: `habit_${Date.now()}`,
      createdAt: Date.now(),
      streak: 0,
      bestStreak: 0,
      totalCompletions: 0,
    };
    await saveHabits([...habits, newHabit]);
  }, [habits, saveHabits]);

  const deleteHabit = useCallback(async (habitId: string) => {
    const updatedHabits = habits.filter(h => h.id !== habitId);
    await saveHabits(updatedHabits);
    
    const updatedCompletions = completions.filter(c => c.habitId !== habitId);
    await saveCompletions(updatedCompletions);
  }, [habits, completions, saveHabits, saveCompletions]);

  const todayCompletionRate = useMemo(() => {
    const activeHabits = habits.filter(h => h.isActive);
    if (activeHabits.length === 0) return 0;
    
    const completedToday = activeHabits.filter(h => isCompletedToday(h.id)).length;
    return Math.round((completedToday / activeHabits.length) * 100);
  }, [habits, isCompletedToday]);

  const totalStreak = useMemo(() => {
    return habits.reduce((sum, habit) => sum + habit.streak, 0);
  }, [habits]);

  const longestStreak = useMemo(() => {
    return habits.reduce((max, habit) => Math.max(max, habit.bestStreak), 0);
  }, [habits]);

  const getTodayCompletedCount = useMemo(() => {
    const activeHabits = habits.filter(h => h.isActive);
    return activeHabits.filter(h => isCompletedToday(h.id)).length;
  }, [habits, isCompletedToday]);

  const getTodayTotalCount = useMemo(() => {
    return habits.filter(h => h.isActive).length;
  }, [habits]);

  return useMemo(() => ({
    habits,
    completions,
    dailyStats,
    isLoading,
    isCompletedToday,
    toggleHabitCompletion,
    addCustomHabit,
    deleteHabit,
    todayCompletionRate,
    totalStreak,
    longestStreak,
    getTodayCompletedCount,
    getTodayTotalCount,
  }), [
    habits,
    completions,
    dailyStats,
    isLoading,
    isCompletedToday,
    toggleHabitCompletion,
    addCustomHabit,
    deleteHabit,
    todayCompletionRate,
    totalStreak,
    longestStreak,
    getTodayCompletedCount,
    getTodayTotalCount,
  ]);
});
