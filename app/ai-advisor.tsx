import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Send, 
  Sparkles, 
  Camera, 
  Mic, 
  Heart, 
  Star, 
  Crown,
  ArrowLeft,
  Bot,
  User as UserIcon,
  Wand2,
  Gem
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useRorkAgent, createRorkTool } from '@rork-ai/toolkit-sdk';
import { z } from 'zod';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useUser } from '@/contexts/UserContext';
import { getPalette, getGradient, shadow, spacing, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'recommendation';
  metadata?: {
    products?: string[];
    tips?: string[];
    urgency?: 'low' | 'medium' | 'high';
  };
}

const COACH_TOPICS = [
  { id: 'workout', title: 'Workout Plan', icon: '💪', color: '#FF3366' },
  { id: 'nutrition', title: 'Nutrition', icon: '🍖', color: '#00D9FF' },
  { id: 'mindset', title: 'Mindset', icon: '🧠', color: '#7B61FF' },
  { id: 'style', title: 'Style & Grooming', icon: '✨', color: '#FFB800' },
  { id: 'recovery', title: 'Recovery', icon: '😴', color: '#00FF94' },
  { id: 'testosterone', title: 'Testosterone', icon: '🔥', color: '#FF6B35' },
];

const QUICK_QUESTIONS = [
  "Create a muscle-building workout plan",
  "What should I eat to lose fat & build muscle?",
  "How do I increase my testosterone naturally?",
  "Best morning routine for peak performance?",
  "How to improve my style and grooming?",
  "Tips for better sleep and recovery?",
];

export default function TransformationCoachScreen() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { state } = useSubscription();
  const hasActiveSubscription = state.isPremium;
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [dailyQuestionsUsed, setDailyQuestionsUsed] = useState(0);
  const MAX_FREE_QUESTIONS = 3;
  
  const palette = getPalette(theme);
  const gradient = getGradient(theme);

  const COACH_SYSTEM = `You are a high-performance transformation coach for men. Think David Goggins meets Andrew Huberman.

Your style:
- Direct, honest, no-nonsense
- Science-backed advice
- Focus on action, not theory
- Challenge users to push harder
- Call out excuses immediately
- Celebrate wins, but keep pushing

You help with:
- Muscle building & fat loss
- Testosterone optimization
- Mental toughness & discipline
- Style & grooming
- Sleep & recovery
- Performance nutrition

Always end with specific action steps.`;

  const { messages, sendMessage, addToolResult } = useRorkAgent({
    systemPrompt: COACH_SYSTEM,
    tools: {
      createWorkoutPlan: createRorkTool({
        description: "Create a personalized workout plan",
        zodSchema: z.object({
          plan: z.object({
            title: z.string(),
            duration: z.string(),
            workoutsPerWeek: z.number(),
            goal: z.string(),
            exercises: z.array(z.object({
              name: z.string(),
              sets: z.number(),
              reps: z.string()
            }))
          })
        }),
        execute: (input) => {
          console.log('Workout plan:', input);
          return `Created ${input.plan.workoutsPerWeek}x/week plan`;
        }
      }),
      
      createNutritionPlan: createRorkTool({
        description: "Create a personalized nutrition plan",
        zodSchema: z.object({
          plan: z.object({
            dailyCalories: z.number(),
            protein: z.number(),
            carbs: z.number(),
            fats: z.number(),
            meals: z.array(z.string())
          })
        }),
        execute: (input) => {
          console.log('Nutrition plan:', input);
          return `${input.plan.dailyCalories} cal plan created`;
        }
      }),

      trackProgress: createRorkTool({
        description: "Track transformation progress",
        zodSchema: z.object({
          assessment: z.string(),
          wins: z.array(z.string()),
          nextSteps: z.array(z.string()),
          motivation: z.string()
        }),
        execute: (input) => {
          console.log('Progress tracked:', input);
          return `Progress: ${input.assessment}`;
        }
      })
    }
  });

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Check subscription limits
    if (!hasActiveSubscription && dailyQuestionsUsed >= MAX_FREE_QUESTIONS) {
      Alert.alert(
        'Daily Limit Reached',
        `You've used your ${MAX_FREE_QUESTIONS} free coaching sessions today. Upgrade to Premium for unlimited AI coaching!`,
        [
          { text: 'Maybe Later', style: 'cancel' },
          { text: 'Upgrade Now', onPress: () => router.push('/subscribe') }
        ]
      );
      return;
    }

    const userMessage = input;
    setInput('');
    setIsTyping(true);
    
    try {
      await sendMessage(userMessage);
      
      if (!hasActiveSubscription) {
        setDailyQuestionsUsed(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleTopicPress = (topic: typeof COACH_TOPICS[0]) => {
    const topicQuestions = {
      workout: "Create a workout plan for building muscle",
      nutrition: "What should I eat to build muscle and lose fat?",
      mindset: "How do I build mental toughness and discipline?",
      style: "Help me improve my style and grooming routine",
      recovery: "How can I optimize my sleep and recovery?",
      testosterone: "How do I increase my testosterone naturally?"
    };
    
    setInput(topicQuestions[topic.id as keyof typeof topicQuestions] || `Tell me about ${topic.title}`);
  };

  const renderMessage = (message: any, index: number) => {
    const isUser = message.role === 'user';
    
    return (
      <View key={message.id || index} style={[styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage]}>
        <View style={styles.messageHeader}>
          <View style={[styles.messageAvatar, isUser ? styles.userAvatar : styles.assistantAvatar]}>
            {isUser ? (
              <UserIcon color={palette.textLight} size={16} />
            ) : (
              <LinearGradient colors={gradient.primary} style={styles.avatarGradient}>
                <Sparkles color={palette.textLight} size={16} />
              </LinearGradient>
            )}
          </View>
          <Text style={styles.messageSender}>{isUser ? 'You' : 'Coach AI'}</Text>
        </View>
        
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          {message.parts?.map((part: any, partIndex: number) => {
            if (part.type === 'text') {
              return (
                <Text key={partIndex} style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
                  {part.text}
                </Text>
              );
            }
            
            if (part.type === 'tool' && part.state === 'output-available') {
              return (
                <View key={partIndex} style={styles.toolOutput}>
                  <View style={styles.toolHeader}>
                    <Wand2 color={palette.primary} size={16} />
                    <Text style={styles.toolTitle}>Transformation Plan</Text>
                  </View>
                  <Text style={styles.toolText}>{JSON.stringify(part.output, null, 2)}</Text>
                </View>
              );
            }
            
            return null;
          }) || (
            <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
              {message.content}
            </Text>
          )}
        </View>
        
        <Text style={styles.messageTime}>
          {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={gradient.hero} style={StyleSheet.absoluteFillObject} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={palette.textPrimary} size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <LinearGradient colors={gradient.primary} style={styles.headerIcon}>
            <Bot color={palette.textLight} size={20} />
          </LinearGradient>
          <View>
            <Text style={styles.headerTitle}>AI Transformation Coach</Text>
            <Text style={styles.headerSubtitle}>Your personal performance coach</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          {!hasActiveSubscription && (
            <View style={styles.limitBadge}>
              <Text style={styles.limitText}>{dailyQuestionsUsed}/{MAX_FREE_QUESTIONS}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <LinearGradient colors={gradient.shimmer} style={styles.welcomeIcon}>
              <Crown color={palette.primary} size={32} />
            </LinearGradient>
            <Text style={styles.welcomeTitle}>Welcome to Your AI Coach!</Text>
            <Text style={styles.welcomeSubtitle}>
              I&apos;m here to help you build muscle, optimize performance, and become your best self. 
              What&apos;s your goal?
            </Text>
            
            {/* Beauty Topics */}
            <View style={styles.topicsContainer}>
              <Text style={styles.topicsTitle}>Popular Topics</Text>
              <View style={styles.topicsGrid}>
                {COACH_TOPICS.map((topic) => (
                  <TouchableOpacity
                    key={topic.id}
                    style={[styles.topicCard, { backgroundColor: topic.color + '20' }]}
                    onPress={() => handleTopicPress(topic)}
                  >
                    <Text style={styles.topicIcon}>{topic.icon}</Text>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Quick Questions */}
            <View style={styles.quickQuestionsContainer}>
              <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
              {QUICK_QUESTIONS.slice(0, 3).map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickQuestionCard}
                  onPress={() => handleQuickQuestion(question)}
                >
                  <Text style={styles.quickQuestionText}>{question}</Text>
                  <Sparkles color={palette.primary} size={16} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          messages.map(renderMessage)
        )}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.assistantMessage]}>
            <View style={styles.messageHeader}>
              <View style={[styles.messageAvatar, styles.assistantAvatar]}>
                <LinearGradient colors={gradient.primary} style={styles.avatarGradient}>
                  <Sparkles color={palette.textLight} size={16} />
                </LinearGradient>
              </View>
              <Text style={styles.messageSender}>Glow AI</Text>
            </View>
            <View style={[styles.messageBubble, styles.assistantBubble, styles.typingBubble]}>
              <Text style={styles.typingText}>Analyzing your goals...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <LinearGradient colors={gradient.card} style={styles.inputCard}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask me anything about fitness, nutrition, mindset..."
              placeholderTextColor={palette.textMuted}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
            />
            
            <TouchableOpacity 
              style={[styles.sendButton, { opacity: input.trim() ? 1 : 0.5 }]}
              onPress={handleSendMessage}
              disabled={!input.trim() || isTyping}
            >
              <LinearGradient colors={gradient.primary} style={styles.sendButtonGradient}>
                <Send color={palette.textLight} size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          {!hasActiveSubscription && (
            <View style={styles.limitInfo}>
              <Gem color={palette.primary} size={14} />
              <Text style={styles.limitInfoText}>
                {dailyQuestionsUsed}/{MAX_FREE_QUESTIONS} free coaching sessions today
              </Text>
              {dailyQuestionsUsed >= MAX_FREE_QUESTIONS && (
                <TouchableOpacity onPress={() => router.push('/subscribe')}>
                  <Text style={styles.upgradeText}>Upgrade</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0D10',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.glow,
  },
  headerTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: typography.medium,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  limitBadge: {
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4A574',
  },
  limitText: {
    fontSize: 12,
    fontWeight: typography.semibold,
    color: '#D4A574',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxxl,
  },
  welcomeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadow.floating,
  },
  welcomeTitle: {
    fontSize: typography.h3,
    fontWeight: typography.extrabold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  welcomeSubtitle: {
    fontSize: typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xxxxl,
    paddingHorizontal: spacing.lg,
  },
  topicsContainer: {
    width: '100%',
    marginBottom: spacing.xxxxl,
  },
  topicsTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: '#FFFFFF',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  topicCard: {
    width: '48%',
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...shadow.card,
  },
  topicIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  topicTitle: {
    fontSize: typography.bodySmall,
    fontWeight: typography.semibold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  quickQuestionsContainer: {
    width: '100%',
  },
  quickQuestionsTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: '#FFFFFF',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  quickQuestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickQuestionText: {
    flex: 1,
    fontSize: typography.bodySmall,
    color: '#FFFFFF',
    fontWeight: typography.medium,
  },
  messageContainer: {
    marginBottom: spacing.xl,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: '#D4A574',
  },
  assistantAvatar: {
    overflow: 'hidden',
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageSender: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: spacing.lg,
    borderRadius: 16,
    ...shadow.card,
  },
  userBubble: {
    backgroundColor: '#D4A574',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  typingBubble: {
    backgroundColor: 'rgba(212, 165, 116, 0.1)',
    borderColor: 'rgba(212, 165, 116, 0.3)',
  },
  messageText: {
    fontSize: typography.body,
    lineHeight: 22,
    fontWeight: typography.regular,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#FFFFFF',
  },
  typingText: {
    color: '#D4A574',
    fontStyle: 'italic',
  },
  messageTime: {
    fontSize: typography.caption,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  toolOutput: {
    backgroundColor: 'rgba(212, 165, 116, 0.1)',
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(212, 165, 116, 0.3)',
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  toolTitle: {
    fontSize: typography.bodySmall,
    fontWeight: typography.semibold,
    color: '#D4A574',
  },
  toolText: {
    fontSize: typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'monospace',
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  inputCard: {
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...shadow.elevated,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
  },
  textInput: {
    flex: 1,
    fontSize: typography.body,
    color: '#FFFFFF',
    maxHeight: 100,
    paddingVertical: spacing.sm,
    fontWeight: typography.regular,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  limitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  limitInfoText: {
    flex: 1,
    fontSize: typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: spacing.xs,
  },
  upgradeText: {
    fontSize: typography.caption,
    fontWeight: typography.bold,
    color: '#D4A574',
    textDecorationLine: 'underline',
  },
});