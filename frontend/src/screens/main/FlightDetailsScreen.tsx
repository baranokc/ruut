import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function FlightDetailsScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Details</Text>
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

        <View style={styles.formContainer}>
          <Text style={styles.label}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="person-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. John Doe"
              placeholderTextColor={COLORS.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderCard, gender === 'male' && styles.selectedGenderCard]}
              onPress={() => setGender('male')}
            >
              <Ionicons
                name={gender === 'male' ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={COLORS.azure[950]}
              />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderCard, gender === 'female' && styles.selectedGenderCard]}
              onPress={() => setGender('female')}
            >
              <Ionicons
                name={gender === 'female' ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={COLORS.azure[950]}
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>
            ID Number <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="person-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 12345678901"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              value={idNumber}
              onChangeText={setIdNumber}
            />
          </View>

          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputCard}>
            <Ionicons name="call-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="+1 123 456 7890"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <Text style={styles.label}>
            E-mail <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="mail-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="example@mail.com"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Text style={styles.subNote}>Your e-ticket will be sent to this address.</Text>

          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Payment')}>
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
  required: {
    color: COLORS.state.high,
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
  genderRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  genderCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.md,
    height: 48,
    paddingHorizontal: SPACING.md,
    gap: SPACING.xs,
  },
  selectedGenderCard: {
    borderWidth: 1,
    borderColor: COLORS.azure[300],
  },
  genderText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  subNote: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  continueButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBg,
    fontWeight: '700',
  },
});