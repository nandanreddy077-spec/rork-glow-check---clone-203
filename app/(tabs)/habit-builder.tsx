import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dumbbell,
  Target,
  Zap,
  Trophy,
  Plus,
  ShieldCheck,
  Snowflake,
  BookOpen,
  Brain,
  Lock,
  Flame,
  CheckCircle2,
  Circle,
} from 'lucide-react-native';
import { useHabits } from '@/contexts/HabitsContext';

const iconMap: Record<string, any> = {
  Dumbbell,
  ShieldCheck,
  Snowflake,
  BookOpen,
  Brain,
  Lock,
  Target,
  Flame,
};

export default function HabitBuilderScreen() {
  const {
    habits,
    isLoading,
    isCompletedToday,
    toggleHabitCompletion,
    todayCompletionRate,
    totalStreak,
    longestStreak,
    getTodayCompletedCount,
    getTodayTotalCount,
  } = useHabits();

  const activeHabits = useMemo(() => 
    habits.filter(h => h.isActive),
    [habits]
  );

  const getHabitIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Target;
    return Icon;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={StyleSheet.absoluteFillObject} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#0A0A0A', '#1A1A1A']} style={StyleSheet.absoluteFillObject} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Habit Builder</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#FFF" strokeWidth={3} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Build the man you want to become</Text>
        </View>

        <View style={styles.statsSection}>
          <LinearGradient
            colors={['#1A1A1A', '#0F0F0F']}
            style={styles.statsCard}
          >
            <View style={styles.mainStat}>
              <LinearGradient
                colors={['#FF3366', '#FF1744']}
                style={styles.progressCircle}
              >
                <Text style={styles.progressText}>{todayCompletionRate}%</Text>
              </LinearGradient>
              <Text style={styles.mainStatLabel}>Today&apos;s Progress</Text>
              <Text style={styles.mainStatSubtext}>
                {getTodayCompletedCount}/{getTodayTotalCount} habits completed
              </Text>
            </View>

            <View style={styles.miniStats}>
              <View style={styles.miniStat}>
                <View style={[styles.miniStatIcon, { backgroundColor: 'rgba(255, 51, 102, 0.15)' }]}>
                  <Flame size={18} color="#FF3366" />
                </View>
                <Text style={styles.miniStatValue}>{totalStreak}</Text>
                <Text style={styles.miniStatLabel}>Total Streak</Text>
              </View>

              <View style={styles.miniStat}>
                <View style={[styles.miniStatIcon, { backgroundColor: 'rgba(0, 217, 255, 0.15)' }]}>
                  <Trophy size={18} color="#00D9FF" />
                </View>
                <Text style={styles.miniStatValue}>{longestStreak}</Text>
                <Text style={styles.miniStatLabel}>Best Streak</Text>
              </View>

              <View style={styles.miniStat}>
                <View style={[styles.miniStatIcon, { backgroundColor: 'rgba(123, 97, 255, 0.15)' }]}>
                  <Target size={18} color="#7B61FF" />
                </View>
                <Text style={styles.miniStatValue}>{activeHabits.length}</Text>
                <Text style={styles.miniStatLabel}>Active Habits</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.habitsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today&apos;s Habits</Text>
            <View style={styles.streakBadge}>
              <Flame size={14} color="#FF3366" fill="#FF3366" />
              <Text style={styles.streakBadgeText}>{totalStreak} Day Streak</Text>
            </View>
          </View>

          {activeHabits.map((habit, index) => {
            const Icon = getHabitIcon(habit.icon);
            const isCompleted = isCompletedToday(habit.id);
            
            return (
              <View key={habit.id}>
                <TouchableOpacity
                  style={[styles.habitCard, isCompleted && styles.habitCardCompleted]}
                  onPress={() => toggleHabitCompletion(habit.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={isCompleted 
                      ? ['rgba(0, 255, 148, 0.1)', 'rgba(0, 255, 148, 0.05)'] 
                      : ['#1A1A1A', '#141414']
                    }
                    style={styles.habitCardGradient}
                  >
                    <View style={styles.habitCardLeft}>
                      <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                        <Icon size={24} color={habit.color} strokeWidth={2.5} />
                      </View>
                      
                      <View style={styles.habitInfo}>
                        <Text style={styles.habitName}>{habit.name}</Text>
                        <Text style={styles.habitDescription}>{habit.description}</Text>
                        
                        {habit.streak > 0 && (
                          <View style={styles.habitStreak}>
                            <Flame size={12} color="#FF3366" fill="#FF3366" />
                            <Text style={styles.habitStreakText}>
                              {habit.streak} day streak
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.habitCardRight}>
                      {isCompleted ? (
                        <View style={[styles.checkCircle, { backgroundColor: '#00FF94' }]}>
                          <CheckCircle2 size={28} color="#000" fill="#000" strokeWidth={3} />
                        </View>
                      ) : (
                        <View style={styles.checkCircle}>
                          <Circle size={28} color="#333" strokeWidth={2.5} />
                        </View>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          })}

          {activeHabits.length === 0 && (
            <View style={styles.emptyState}>
              <Target size={48} color="#333" strokeWidth={2} />
              <Text style={styles.emptyTitle}>No Habits Yet</Text>
              <Text style={styles.emptyText}>
                Start building the man you want to become. Add your first habit.
              </Text>
              <TouchableOpacity style={styles.emptyButton}>
                <LinearGradient
                  colors={['#FF3366', '#FF1744']}
                  style={styles.emptyButtonGradient}
                >
                  <Plus size={20} color="#FFF" strokeWidth={3} />
                  <Text style={styles.emptyButtonText}>Add Habit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.motivationSection}>
          <LinearGradient
            colors={['rgba(255, 51, 102, 0.1)', 'rgba(255, 51, 102, 0.05)']}
            style={styles.motivationCard}
          >
            <View style={styles.motivationIcon}>
              <Zap size={24} color="#FF3366" fill="#FF3366" />
            </View>
            <View style={styles.motivationContent}>
              <Text style={styles.motivationTitle}>Stay Consistent</Text>
              <Text style={styles.motivationText}>
                The man you want to become is built one day at a time. Keep showing up.
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 32,
    paddingBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222',
  },
  mainStat: {
    alignItems: 'center',
    marginBottom: 32,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFF',
  },
  mainStatLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  mainStatSubtext: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  miniStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniStat: {
    flex: 1,
    alignItems: 'center',
  },
  miniStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  miniStatValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 4,
  },
  miniStatLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  habitsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 51, 102, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  streakBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF3366',
    letterSpacing: 0.3,
  },
  habitCard: {
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#222',
  },
  habitCardCompleted: {
    borderColor: '#00FF94',
  },
  habitCardGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  habitIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  habitDescription: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    marginBottom: 8,
  },
  habitStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  habitStreakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF3366',
  },
  habitCardRight: {
    marginLeft: 16,
  },
  checkCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#333',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  emptyButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
  },
  motivationSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  motivationCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 51, 102, 0.3)',
  },
  motivationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 51, 102, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  motivationContent: {
    flex: 1,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 6,
  },
  motivationText: {
    fontSize: 14,
    color: '#AAA',
    lineHeight: 20,
    fontWeight: '600',
  },
});
