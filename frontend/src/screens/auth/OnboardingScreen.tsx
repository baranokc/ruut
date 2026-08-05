import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import RuutLogo from '../../components/illustrations/RuutLogo';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  type: 'compass' | 'tickets' | 'form';
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Discover Your New Path',
    subtitle: 'Discover the most efficient routes and enjoy a faster, seamless journey to your destination.',
    type: 'compass',
  },
  {
    id: '2',
    title: 'All-in-One Booking',
    subtitle: 'Compare bus and flight options instantly to find your perfect trip in one place.',
    type: 'tickets',
  },
  {
    id: '3',
    title: 'Ready to Explore?',
    subtitle: 'Secure payments, instant tickets. Your journey begins with Ruut.',
    type: 'form',
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Register');
    }
  };

  const handleSkip = () => {
    navigation.replace('Register');
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const renderIllustration = (type: string) => {
    if (type === 'compass') {
      return (
        <View style={styles.illustrationCircle}>
          <Ionicons name="compass-outline" size={120} color={COLORS.azure[900]} />
        </View>
      );
    } else if (type === 'tickets') {
      return (
        <View style={styles.illustrationCardStack}>
          <View style={[styles.mockTicketCard, styles.ticketBack]}>
            <Text style={styles.mockTicketTitle}>Turkish Airlines</Text>
            <Text style={styles.mockTicketPrice}>€89.00</Text>
          </View>
          <View style={[styles.mockTicketCard, styles.ticketFront]}>
            <Text style={styles.mockTicketTitle}>Metro Turizm</Text>
            <Text style={styles.mockTicketPrice}>€15.00</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.mockFormCard}>
          <Text style={styles.mockFormHeader}>Metro Turizm</Text>
          <Text style={styles.mockFormPrice}>€15.00</Text>
          <View style={styles.mockInputLine} />
          <View style={styles.mockInputLine} />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Üst Logo Alanı */}
        <View style={styles.headerContainer}>
          <RuutLogo width={120} height={44} />
        </View>

        {/* Kaydırılabilir Slaytlar */}
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.illustrationContainer}>
                {renderIllustration(item.type)}
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          )}
        />

        {/* Sayfa Noktaları (Pagination Dots) */}
        <View style={styles.paginationContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Alt Buton Alanı */}
        <View style={styles.bottomContainer}>
          {currentIndex === SLIDES.length - 1 ? (
            // 3. Slayt: Ekranı Kaplayan Get Started Butonu
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.replace('Register')}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          ) : (
            // 1. ve 2. Slayt: Skip + Continue Butonları
            <View style={styles.twoButtonRow}>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  illustrationContainer: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationCardStack: {
    width: 220,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockTicketCard: {
    width: 200,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.azure[100],
    position: 'absolute',
  },
  ticketBack: {
    top: 10,
    transform: [{ rotate: '-6deg' }],
    opacity: 0.7,
  },
  ticketFront: {
    top: 40,
    transform: [{ rotate: '3deg' }],
    elevation: 3,
  },
  mockTicketTitle: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  mockTicketPrice: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.azure[900],
    marginTop: 4,
  },
  mockFormCard: {
    width: 200,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.azure[100],
    gap: 8,
  },
  mockFormHeader: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  mockFormPrice: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.azure[900],
  },
  mockInputLine: {
    height: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.sm,
  },
  title: {
    ...TYPOGRAPHY.h3,
    fontWeight: '700',
    color: COLORS.azure[950],
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
    lineHeight: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.md,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: COLORS.azure[200],
  },
  bottomContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.xs,
  },
  twoButtonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  skipButton: {
    flex: 1,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.azure[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  continueButton: {
    flex: 1,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
  getStartedButton: {
    width: '100%',
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
});