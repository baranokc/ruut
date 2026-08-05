import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function BookingSuccessScreen({ navigation }: any) {
  const handleBackToHome = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="airplane" size={48} color={COLORS.azure[950]} />
          </View>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your e-ticket has been sent to your email address.
        </Text>

        <View style={styles.flightCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.airlineName}>Turkish Airlines</Text>
            <Text style={styles.priceText}>€ 89.00</Text>
          </View>

          <View style={styles.flightDetailsRow}>
            <View style={styles.locationBlock}>
              <Text style={styles.locationCode}>(SAW)</Text>
              <Text style={styles.locationCity}>Istanbul</Text>
            </View>

            <View style={styles.durationContainer}>
              <View style={styles.durationLineWrapper}>
                <View style={styles.durationLine} />
                <Ionicons name="airplane" size={16} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                <View style={styles.durationLine} />
              </View>
              <Text style={styles.durationText}>2h 55m</Text>
            </View>

            <View style={[styles.locationBlock, styles.alignRight]}>
              <Text style={styles.locationCode}>(MUC)</Text>
              <Text style={styles.locationCity}>Munich</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeText}>08:30 AM</Text>
              <Text style={styles.dateText}>13 Sep, 2025</Text>
            </View>

            <View style={[styles.timeBlock, styles.alignRight]}>
              <Text style={styles.timeText}>10:25 AM</Text>
              <Text style={styles.dateText}>13 Sep, 2025</Text>
            </View>
          </View>
        </View>

        <Text style={styles.pnrText}>PNR / Booking Reference: ABC123D</Text>
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.viewTicketButton}>
          <Text style={styles.viewTicketButtonText}>View E-Ticket</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl * 2,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h3,
    fontWeight: '700',
    color: COLORS.azure[950],
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  flightCard: {
    width: '100%',
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  airlineName: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  priceText: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  flightDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  locationBlock: {
    flex: 1,
  },
  locationCode: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  locationCity: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  durationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationLineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationLine: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.azure[400],
  },
  durationPlaneIcon: {
    marginHorizontal: 4,
  },
  durationText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  timeBlock: {},
  timeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  pnrText: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
    gap: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  viewTicketButton: {
    flex: 1,
    height: 50,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.azure[300],
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTicketButtonText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  homeButton: {
    flex: 1,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
});