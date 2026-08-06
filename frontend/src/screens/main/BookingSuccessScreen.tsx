import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function BookingSuccessScreen({ route, navigation }: any) {
  const { category = 'bus', ticket } = route?.params || {};

  const isBus = category === 'bus';

  // Dinamik Veri Seçimi
  const providerName = ticket?.providerName || ticket?.airline || (isBus ? 'Metro Turizm' : 'Turkish Airlines');
  const priceDisplay = ticket?.price ? `€ ${ticket.price.toFixed(2)}` : (isBus ? '€ 15.00' : '€ 89.00');
  const originCode = ticket?.originCode ? `(${ticket.originCode})` : (isBus ? '(ESE)' : '(SAW)');
  const originCity = ticket?.originCity || 'Istanbul';
  const destinationCode = ticket?.destinationCode ? `(${ticket.destinationCode})` : (isBus ? '(AŞTİ)' : '(MUC)');
  const destinationCity = ticket?.destinationCity || (isBus ? 'Ankara' : 'Munich');
  const duration = ticket?.duration || (isBus ? '6h 30m' : '2h 55m');
  const departureTime = ticket?.departureTime || '08:30 AM';
  const departureDate = ticket?.departureDate || '13 Sep, 2025';
  const arrivalTime = ticket?.arrivalTime || (isBus ? '03:00 PM' : '10:25 AM');
  const arrivalDate = ticket?.arrivalDate || '13 Sep, 2025';
  const pnrCode = ticket?.pnr || (isBus ? 'WBC193D' : 'ABC123D');

  const handleBackToHome = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Dynamic Header Circle Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            {isBus ? (
              <FontAwesome6 name="bus-simple" size={52} color={COLORS.azure[950]} />
            ) : (
              <Ionicons name="airplane" size={52} color={COLORS.azure[950]} />
            )}
          </View>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your e-ticket has been sent to your email address.
        </Text>

        {/* Ticket Detail Card */}
        <View style={styles.flightCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.airlineName}>{providerName}</Text>
            <Text style={styles.priceText}>{priceDisplay}</Text>
          </View>

          <View style={styles.flightDetailsRow}>
            <View style={styles.locationBlock}>
              <Text style={styles.locationCode}>{originCode}</Text>
              <Text style={styles.locationCity}>{originCity}</Text>
            </View>

            <View style={styles.durationContainer}>
              <View style={styles.durationLineWrapper}>
                <View style={styles.durationLine} />
                {isBus ? (
                  <FontAwesome6 name="bus-simple" size={12} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                ) : (
                  <Ionicons name="airplane" size={16} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                )}
                <View style={styles.durationLine} />
              </View>
              <Text style={styles.durationText}>{duration}</Text>
            </View>

            <View style={[styles.locationBlock, styles.alignRight]}>
              <Text style={styles.locationCode}>{destinationCode}</Text>
              <Text style={styles.locationCity}>{destinationCity}</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeText}>{departureTime}</Text>
              <Text style={styles.dateText}>{departureDate}</Text>
            </View>

            <View style={[styles.timeBlock, styles.alignRight]}>
              <Text style={styles.timeText}>{arrivalTime}</Text>
              <Text style={styles.dateText}>{arrivalDate}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.pnrText}>PNR / Booking Reference: {pnrCode}</Text>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.viewTicketButton} activeOpacity={0.8}>
          <Text style={styles.viewTicketButtonText}>View E-Ticket</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome} activeOpacity={0.85}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl * 1.5,
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
    backgroundColor: COLORS.azure[50],
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
    backgroundColor: COLORS.azure[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
});