import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Compass, Ticket, Search } from 'lucide-react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Discover Your New Path',
    description: 'Discover the most efficient routes and enjoy a seamless journey to your destination.',
    icon: Compass,
  },
  {
    id: '2',
    title: 'All-in-One Booking',
    description: 'Compare bus and flight tickets effortlessly to find the best options for your trip.',
    icon: Ticket,
  },
  {
    id: '3',
    title: 'Ready to Explore?',
    description: 'Book in minutes, instantly receive your ticket, and start your journey with Ruut.',
    icon: Search,
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Register');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Register');
  };

  const currentSlide = ONBOARDING_SLIDES[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Logo */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Ruut</Text>
      </View>

      {/* Center Illustration Area */}
      <View style={styles.illustrationContainer}>
        <View style={styles.iconCircle}>
          <IconComponent color={COLORS.azure[700]} size={80} strokeWidth={1.5} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.continueButton} activeOpacity={0.85}>
            <Text style={styles.continueText}>
              {currentIndex === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  logoText: {
    fontSize: 42,
    fontFamily: 'Lato_700Bold',
    color: COLORS.azure[700],
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    backgroundColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.azure[200],
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.azure[700],
  },
  inactiveDot: {
    width: 8,
    backgroundColor: COLORS.azure[200],
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  skipButton: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
  },
  skipText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontFamily: 'Lato_700Bold',
  },
  continueButton: {
    backgroundColor: COLORS.azure[700],
    paddingVertical: 16,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    minWidth: 140,
    alignItems: 'center',
  },
  continueText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontFamily: 'Lato_700Bold',
  },
});