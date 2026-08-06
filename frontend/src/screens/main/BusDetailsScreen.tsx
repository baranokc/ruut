import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function BusDetailsScreen({ route, navigation }: any) {
  const { ticket } = route?.params || {};

  // Form State'leri
  const [name, setName] = useState('Eren Büyüköner');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [idNumber, setIdNumber] = useState('12345678913');
  const [phone, setPhone] = useState('+90 536 707 0566');
  const [email, setEmail] = useState('eren.buyukoner@outlook.com');

  const handleContinue = () => {
    navigation.navigate('Payment', {
      ticket,
      passengerInfo: { name, gender, idNumber, phone, email },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Ticket Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.companyName}>
              {ticket?.providerName || ticket?.companyName || 'Metro Turizm'}
            </Text>
            <Text style={styles.priceText}>{ticket?.price ? `€ ${ticket.price.toFixed(2)}` : '€ 15.00'}</Text>
          </View>

          <View style={styles.routeRow}>
            <View>
              <Text style={styles.stationCode}>{ticket?.originCode || '(ESE)'}</Text>
              <Text style={styles.cityName}>{ticket?.originCity || 'Istanbul'}</Text>
            </View>

            <View style={styles.busLineContainer}>
              <View style={styles.dashLine} />
              <View style={styles.busIconCircle}>
                <FontAwesome6 name="bus-simple" size={12} color={COLORS.azure[950]} />
              </View>
              <View style={styles.dashLine} />
              <Text style={styles.durationText}>{ticket?.duration || '6h 30m'}</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.stationCode}>{ticket?.destinationCode || '(AŞTİ)'}</Text>
              <Text style={styles.cityName}>{ticket?.destinationCity || 'Ankara'}</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <View>
              <Text style={styles.timeText}>{ticket?.departureTime || '08:30 AM'}</Text>
              <Text style={styles.dateText}>{ticket?.departureDate || '13 Sep, 2025'}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeText}>{ticket?.arrivalTime || '03:00 PM'}</Text>
              <Text style={styles.dateText}>{ticket?.arrivalDate || '13 Sep, 2025'}</Text>
            </View>
          </View>
        </View>

        {/* Passenger Form */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <Text style={styles.label}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="person" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              placeholderTextColor={COLORS.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Gender Field */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderCard, gender === 'male' && styles.selectedGenderCard]}
              onPress={() => setGender('male')}
              activeOpacity={0.8}
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
              activeOpacity={0.8}
            >
              <Ionicons
                name={gender === 'female' ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={COLORS.azure[950]}
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          {/* ID Number Field */}
          <Text style={styles.label}>
            ID Number <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="person" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. 12345678901"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              value={idNumber}
              onChangeText={setIdNumber}
            />
          </View>

          {/* Phone Field */}
          <Text style={styles.label}>Phone</Text>
          <View style={styles.inputCard}>
            <Ionicons name="person" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="+1 123 456 7890"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* E-mail Field */}
          <Text style={styles.label}>
            E-mail <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="person" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Text style={styles.emailHelperText}>Your e-ticket will be sent to this address.</Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>Continue to Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  summaryCard: {
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
  companyName: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  priceText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  stationCode: {
    ...TYPOGRAPHY.caption,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  cityName: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  busLineContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: SPACING.xs,
  },
  dashLine: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.azure[300],
  },
  busIconCircle: {
    backgroundColor: COLORS.azure[100],
    paddingHorizontal: 6,
    zIndex: 1,
  },
  durationText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  timeText: {
    ...TYPOGRAPHY.body2,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  formContainer: {
    marginTop: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
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
    height: 52,
    marginBottom: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
  },
  genderRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  genderCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.azure[100],
    height: 52,
    borderRadius: RADIUS.md,
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
  emailHelperText: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: -SPACING.xs,
    marginBottom: SPACING.lg,
  },
  submitButton: {
    backgroundColor: COLORS.azure[800],
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
});