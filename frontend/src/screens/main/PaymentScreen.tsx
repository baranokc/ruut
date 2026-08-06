import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function PaymentScreen({ route, navigation }: any) {
  // Navigation üzerinden gelen bilet ve kategori verileri
  const { ticket, category = 'plane', seatNumber } = route?.params || {};

  // Form State'leri
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('2028');
  const [cvc, setCvc] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('visa');

  // Varsayılan / Dinamik Veri Seçimi
  const isBus = category === 'bus';
  const providerName = ticket?.providerName || ticket?.airline || (isBus ? 'Metro Turizm' : 'Turkish Airlines');
  const priceDisplay = ticket?.price ? `${ticket.currency || '€'} ${ticket.price.toFixed(2)}` : (isBus ? '€ 15.00' : '€ 89.00');
  const originCode = ticket?.originCode || (isBus ? 'ESE' : 'SAW');
  const originCity = ticket?.originCity || 'Istanbul';
  const destinationCode = ticket?.destinationCode || (isBus ? 'AŞTİ' : 'MUC');
  const destinationCity = ticket?.destinationCity || (isBus ? 'Ankara' : 'Munich');
  const duration = ticket?.duration || (isBus ? '6h 30m' : '2h 55m');
  const departureTime = ticket?.departureTime || '08:30 AM';
  const departureDate = ticket?.departureDate || '13 Sep, 2025';
  const arrivalTime = ticket?.arrivalTime || (isBus ? '03:00 PM' : '10:25 AM');
  const arrivalDate = ticket?.arrivalDate || '13 Sep, 2025';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Dynamic Summary Ticket Card */}
        <View style={styles.flightCard}>
          <View style={styles.cardHeader}>
            <View style={styles.providerRow}>
              <Text style={styles.airlineName}>{providerName}</Text>
              {seatNumber && (
                <View style={styles.seatBadge}>
                  <Text style={styles.seatBadgeText}>Seat {seatNumber}</Text>
                </View>
              )}
            </View>
            <Text style={styles.priceText}>{priceDisplay}</Text>
          </View>

          <View style={styles.flightDetailsRow}>
            <View style={styles.locationBlock}>
              <Text style={styles.locationCode}>({originCode})</Text>
              <Text style={styles.locationCity}>{originCity}</Text>
            </View>

            <View style={styles.durationContainer}>
              <View style={styles.durationLineWrapper}>
                <View style={styles.durationLine} />
                {isBus ? (
                  <FontAwesome5 name="bus" size={14} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                ) : (
                  <Ionicons name="airplane" size={16} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                )}
                <View style={styles.durationLine} />
              </View>
              <Text style={styles.durationText}>{duration}</Text>
            </View>

            <View style={[styles.locationBlock, styles.alignRight]}>
              <Text style={styles.locationCode}>({destinationCode})</Text>
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

        {/* Payment Provider Badges */}
        <View style={styles.paymentMethodsRow}>
          <TouchableOpacity
            style={[styles.paymentBadge, selectedProvider === 'paypal' && styles.selectedBadge]}
            onPress={() => setSelectedProvider('paypal')}
          >
            <FontAwesome5 name="cc-paypal" size={22} color="#003087" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentBadge, selectedProvider === 'visa' && styles.selectedBadge]}
            onPress={() => setSelectedProvider('visa')}
          >
            <FontAwesome5 name="cc-visa" size={22} color="#1A1F71" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentBadge, selectedProvider === 'mastercard' && styles.selectedBadge]}
            onPress={() => setSelectedProvider('mastercard')}
          >
            <FontAwesome5 name="cc-mastercard" size={22} color="#EB001B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentBadge, selectedProvider === 'maestro' && styles.selectedBadge]}
            onPress={() => setSelectedProvider('maestro')}
          >
            <Ionicons name="card" size={20} color="#006FCF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentBadge, selectedProvider === 'amex' && styles.selectedBadge]}
            onPress={() => setSelectedProvider('amex')}
          >
            <FontAwesome5 name="cc-amex" size={22} color="#016FD0" />
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Cardholder Name</Text>
          <View style={styles.inputCard}>
            <Ionicons name="person-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. John Doe"
              placeholderTextColor={COLORS.textSecondary}
              value={cardholderName}
              onChangeText={setCardholderName}
            />
          </View>

          <Text style={styles.label}>Card Number</Text>
          <View style={styles.inputCard}>
            <Ionicons name="card-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="**** **** **** 1234"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Exp Month</Text>
              <TouchableOpacity style={styles.dropdownCard}>
                <Text style={styles.dropdownText}>{expMonth}</Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.azure[950]} />
              </TouchableOpacity>
            </View>

            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Exp Year</Text>
              <TouchableOpacity style={styles.dropdownCard}>
                <Text style={styles.dropdownText}>{expYear}</Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.azure[950]} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>CVC</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="123"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
                maxLength={4}
                value={cvc}
                onChangeText={setCvc}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('BookingSuccess', { category, ticket })}
          >
            <Text style={styles.continueButtonText}>Continue to Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.azure[950],
    fontWeight: '700',
  },
  headerPlaceholder: {
    width: 36,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  flightCard: {
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  airlineName: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  seatBadge: {
    backgroundColor: COLORS.azure[200],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  seatBadgeText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
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
  paymentMethodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  paymentBadge: {
    width: 58,
    height: 38,
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadge: {
    borderWidth: 1.5,
    borderColor: COLORS.azure[950],
  },
  formContainer: {
    marginTop: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.azure[950],
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfInputContainer: {
    flex: 1,
  },
  dropdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  dropdownText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  continueButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBg,
    fontWeight: '700',
  },
});