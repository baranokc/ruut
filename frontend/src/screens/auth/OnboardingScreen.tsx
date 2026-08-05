import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  ViewToken,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RuutLogo from '../../components/illustrations/RuutLogo';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

type Props = NativeStackScreenProps<any, 'Onboarding'>;

interface SlideItem {
  id: string;
  title: string;
  description: string;
  // Illüstrasyon bileşenlerini dinamik import edebilirsiniz
}

const SLIDES: SlideItem[] = [
  {
    id: '1',
    title: 'Discover Your New Path',
    description:
      'Discover the most efficient routes and enjoy a faster, seamless journey to your destination.',
  },
  {
    id: '2',
    title: 'All-in-One Booking',
    description:
      'Compare bus and flight options instantly to find your perfect trip in one place.',
  },
  {
    id: '3',
    title: 'Ready to Explore?',
    description:
      'Secure payments, instant tickets. Your journey begins with Ruut.',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

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

  return (
    <View style={styles.container}>
      {/* Top Logo */}
      <View style={styles.header}>
        <RuutLogo width={120} height={40} />
      </View>

      {/* Slide Content */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.illustrationPlaceholder}>
              {/* İlgili illüstrasyon SVG'sini buraya yerleştirebilirsiniz */}
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.footer}>
        {currentIndex < SLIDES.length - 1 ? (
          <View style={styles.multiButtonContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={[styles.primaryButton, styles.fullWidth]} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  illustrationPlaceholder: {
    width: 240,
    height: 240,
    marginBottom: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[300],
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  multiButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.azure[100],
  },
  skipText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButtonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.cardBg,
    fontWeight: '700',
  },
});