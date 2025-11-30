import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  Circle,
  Zap,
  BarChart3,
  Award,
  ChevronRight,
  Plus,
  Dumbbell,
  ShieldCheck,
  Snowflake,
  BookOpen,
  Brain,
  Lock
} from "lucide-react-native";
import { router } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useHabits } from "@/contexts/HabitsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getPalette, getGradient, shadow } from "@/constants/theme";

const { width: screenWidth } = Dimensions.get('window');

const MOTIVATIONS = [
  "Winners focus on habits. Losers focus on goals.",
  "Your only limit is you.",
  "Discipline equals freedom.",
  "Small actions, massive results.",
  "Be 1% better every day.",
];

const iconMap: Record<string, any> = {
  Dumbbell,
  ShieldCheck,
  Snowflake,
  BookOpen,
  Brain,
  Lock,
  Target,
  Trophy,
  TrendingUp,
};

export default function HomeScreen() {
  const { user } = useUser();
  const { user: authUser } = useAuth();
  const { theme } = useTheme();
  const { 
    habits, 
    isCompletedToday, 
    toggleHabitCompletion,
    todayCompletionRate,
    totalStreak,
    getTodayCompletedCount,
    getTodayTotalCount,
  } = useHabits();
  
  const palette = getPalette(theme);
  const gradient = getGradient(theme);
  const [currentMotivation] = useState(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);

  const styles = createStyles(palette);

  const activeHabits = habits.filter(h => h.isActive);

  const renderHabitIcon = (iconName: string, color: string, size: number = 24) => {
    const IconComponent = iconMap[iconName] || Target;
    return <IconComponent color={color} size={size} strokeWidth={2.5} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={gradient.hero} style={StyleSheet.absoluteFillObject} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>APEX PERFORMANCE</Text>
            <Text style={styles.name}>
              {authUser?.user_metadata && typeof authUser.user_metadata === 'object' 
                ? (authUser.user_metadata as { full_name?: string; name?: string }).full_name ?? 
                  (authUser.user_metadata as { full_name?: string; name?: string }).name ?? 
                  user?.name ?? 'Warrior'
                : user?.name ?? 'Warrior'}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/profile')} 
            style={styles.profileButton}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#00D9FF', '#00A3CC']} style={styles.profileGradient}>
              <Trophy color="#FFFFFF" size={20} strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={[styles.mainStatsCard, shadow.card]}>
          <LinearGradient 
            colors={['#151518', '#1A1A1D']} 
            style={styles.mainStatsGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <View style={[styles.statIconContainer, { backgroundColor: 'rgba(255,51,102,0.2)' }]}>
                  <Flame color="#FF3366" size={28} strokeWidth={2.5} fill="#FF3366" />
                </View>
                <Text style={styles.statNumber}>{totalStreak}</Text>
                <Text style={styles.statLabel}>TOTAL STREAKS</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <View style={[styles.statIconContainer, { backgroundColor: 'rgba(0,217,255,0.2)' }]}>
                  <Target color="#00D9FF" size={28} strokeWidth={2.5} />
                </View>
                <Text style={styles.statNumber}>{getTodayCompletedCount}/{getTodayTotalCount}</Text>
                <Text style={styles.statLabel}>TODAY</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <View style={[styles.statIconContainer, { backgroundColor: 'rgba(123,97,255,0.2)' }]}>
                  <Trophy color="#7B61FF" size={28} strokeWidth={2.5} fill="#7B61FF" />
                </View>
                <Text style={styles.statNumber}>{todayCompletionRate}%</Text>
                <Text style={styles.statLabel}>COMPLETE</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.motivationCard}>
          <View style={styles.motivationIconContainer}>
            <Zap color="#FFB800" size={20} fill="#FFB800" strokeWidth={2.5} />
          </View>
          <Text style={styles.motivationText}>{currentMotivation}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY&apos;S HABITS</Text>
            <TouchableOpacity 
              onPress={() => router.push('/glow-coach')}
              style={styles.addButton}
              activeOpacity={0.8}
            >
              <Plus color={palette.textPrimary} size={20} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {activeHabits.length === 0 ? (
            <View style={[styles.emptyState, shadow.card]}>
              <Target color={palette.textMuted} size={48} strokeWidth={2} />
              <Text style={styles.emptyStateText}>No habits yet</Text>
              <Text style={styles.emptyStateSubtext}>Add habits to start tracking your progress</Text>
              <TouchableOpacity 
                onPress={() => router.push('/glow-coach')}
                style={styles.emptyStateButton}
                activeOpacity={0.8}
              >
                <LinearGradient colors={['#00D9FF', '#00A3CC']} style={styles.emptyStateButtonGradient}>
                  <Plus color="#FFFFFF" size={20} strokeWidth={2.5} />
                  <Text style={styles.emptyStateButtonText}>Add Your First Habit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.habitsGrid}>
              {activeHabits.map((habit) => {
                const isCompleted = isCompletedToday(habit.id);
                
                return (
                  <TouchableOpacity
                    key={habit.id}
                    onPress={() => toggleHabitCompletion(habit.id)}
                    activeOpacity={0.8}
                    style={[styles.habitCard, shadow.card]}
                  >
                    <LinearGradient
                      colors={isCompleted ? [habit.color + '40', habit.color + '20'] : ['#151518', '#1A1A1D']}
                      style={styles.habitCardGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.habitHeader}>
                        <View style={[styles.habitIconContainer, { backgroundColor: habit.color + '30' }]}>
                          {renderHabitIcon(habit.icon, habit.color, 24)}
                        </View>
                        <View style={styles.checkContainer}>
                          {isCompleted ? (
                            <CheckCircle2 color={habit.color} size={24} strokeWidth={2.5} fill={habit.color} />
                          ) : (
                            <Circle color={palette.textMuted} size={24} strokeWidth={2} />
                          )}
                        </View>
                      </View>
                      
                      <Text style={[styles.habitName, isCompleted && styles.habitNameCompleted]}>
                        {habit.name}
                      </Text>
                      
                      <View style={styles.habitFooter}>
                        <View style={styles.streakBadge}>
                          <Flame color="#FF3366" size={14} strokeWidth={2.5} fill="#FF3366" />
                          <Text style={styles.streakText}>{habit.streak}</Text>
                        </View>
                        <Text style={styles.habitTotal}>{habit.totalCompletions}x</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          
          <TouchableOpacity 
            onPress={() => router.push('/glow-analysis')}
            activeOpacity={0.9}
            style={[styles.actionCard, shadow.card]}
          >
            <LinearGradient 
              colors={['#FF6B35', '#F97316']}
              style={styles.actionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIcon}>
                  <Target color="#FFFFFF" size={32} strokeWidth={2.5} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Progress Scan</Text>
                  <Text style={styles.actionSubtitle}>Track your transformation</Text>
                </View>
              </View>
              <ChevronRight color="#FFFFFF" size={24} strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/progress')}
            activeOpacity={0.9}
            style={[styles.actionCard, shadow.card]}
          >
            <LinearGradient 
              colors={['#7B61FF', '#5A3FCC']}
              style={styles.actionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIcon}>
                  <BarChart3 color="#FFFFFF" size={32} strokeWidth={2.5} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>View Analytics</Text>
                  <Text style={styles.actionSubtitle}>See your data & trends</Text>
                </View>
              </View>
              <ChevronRight color="#FFFFFF" size={24} strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/community')}
            activeOpacity={0.9}
            style={[styles.actionCard, shadow.card]}
          >
            <LinearGradient 
              colors={['#00FF94', '#00CC77']}
              style={styles.actionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIcon}>
                  <Award color="#FFFFFF" size={32} strokeWidth={2.5} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Leaderboard</Text>
                  <Text style={styles.actionSubtitle}>Compete with others</Text>
                </View>
              </View>
              <ChevronRight color="#FFFFFF" size={24} strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (palette: ReturnType<typeof getPalette>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 12,
    color: palette.textMuted,
    fontWeight: '800' as const,
    letterSpacing: 2,
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: '900' as const,
    color: palette.textPrimary,
    letterSpacing: -1,
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainStatsCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mainStatsGradient: {
    padding: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900' as const,
    color: palette.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800' as const,
    color: palette.textSecondary,
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: palette.divider,
  },
  motivationCard: {
    marginHorizontal: 24,
    backgroundColor: palette.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: palette.border,
  },
  motivationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,184,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  motivationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700' as const,
    color: palette.textPrimary,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900' as const,
    color: palette.textPrimary,
    letterSpacing: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  habitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  habitCard: {
    width: (screenWidth - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  habitCardGradient: {
    padding: 16,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  habitIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContainer: {
    marginTop: 2,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: palette.textPrimary,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  habitNameCompleted: {
    color: palette.textPrimary,
  },
  habitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,51,102,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800' as const,
    color: '#FF3366',
    letterSpacing: 0.3,
  },
  habitTotal: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: palette.textSecondary,
    letterSpacing: 0.3,
  },
  emptyState: {
    backgroundColor: palette.surface,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '800' as const,
    color: palette.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: palette.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyStateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  actionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  actionCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.2,
  },
});
