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

export default function PaymentScreen({ navigation }: any) {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('2028');
  const [cvc, setCvc] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
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

        <View style={styles.paymentMethodsRow}>
          <View style={styles.paymentBadge}>
            <FontAwesome5 name="cc-paypal" size={22} color="#003087" />
          </View>
          <View style={styles.paymentBadge}>
            <FontAwesome5 name="cc-visa" size={22} color="#1A1F71" />
          </View>
          <View style={styles.paymentBadge}>
            <FontAwesome5 name="cc-mastercard" size={22} color="#EB001B" />
          </View>
          <View style={styles.paymentBadge}>
            <Ionicons name="card" size={20} color="#006FCF" />
          </View>
          <View style={styles.paymentBadge}>
            <FontAwesome5 name="cc-amex" size={22} color="#016FD0" />
          </View>
        </View>

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
            <Ionicons name="person-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
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

          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('BookingSuccess')}>
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