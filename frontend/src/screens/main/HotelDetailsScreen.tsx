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
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function HotelDetailsScreen({ route, navigation }: any) {
  const { hotel } = route?.params || {};

  // Form State'leri
  const [guestName, setGuestName] = useState('Eren Büyüköner');
  const [phone, setPhone] = useState('+90 536 707 0566');
  const [email, setEmail] = useState('eren.buyukoner@outlook.com');
  const [specialRequests, setSpecialRequests] = useState('');

  // Varsayılan / Seçilen Otel Verisi
  const hotelName = hotel?.name || 'Grand Hyatt Istanbul';
  const price = hotel?.pricePerNight ? hotel.pricePerNight * 2 : 290.00; // 2 Gece Toplam Fiyat

  const handleContinueToPayment = () => {
    navigation.navigate('Payment', {
      category: 'hotel',
      ticket: {
        providerName: hotelName,
        price: price,
        currency: hotel?.currency || '€',
        originCode: 'HOTEL',
        originCity: hotel?.location || 'Taksim, Istanbul',
        destinationCode: 'ROOM',
        destinationCity: hotel?.roomType || 'Deluxe King Room',
        duration: '2 Nights',
        departureTime: 'Check-in: 02:00 PM',
        departureDate: '13 Sep, 2025',
        arrivalTime: 'Check-out: 12:00 PM',
        arrivalDate: '15 Sep, 2025',
      },
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
        <Text style={styles.headerTitle}>Hotel Reservation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Hotel Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.hotelTitle}>{hotelName}</Text>
              <Text style={styles.roomType}>{hotel?.roomType || 'Deluxe King Room'}</Text>
            </View>
            <Text style={styles.totalPrice}>€ {price.toFixed(2)}</Text>
          </View>

          <View style={styles.datesRow}>
            <View>
              <Text style={styles.dateLabel}>Check-in</Text>
              <Text style={styles.dateValue}>13 Sep, 2025 (14:00)</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <Text style={styles.dateValue}>15 Sep, 2025 (12:00)</Text>
            </View>
          </View>
        </View>

        {/* Guest Details Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>
            Primary Guest Name <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="person-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              placeholderTextColor={COLORS.textSecondary}
              value={guestName}
              onChangeText={setGuestName}
            />
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputCard}>
            <Ionicons name="call-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="+1 123 456 7890"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <Text style={styles.label}>
            E-mail Address <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputCard}>
            <Ionicons name="mail-outline" size={18} color={COLORS.azure[950]} style={styles.inputIcon} />
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

          <Text style={styles.label}>Special Requests (Optional)</Text>
          <View style={[styles.inputCard, { height: 80, alignItems: 'flex-start', paddingTop: 12 }]}>
            <TextInput
              style={[styles.input, { textAlignVertical: 'top' }]}
              placeholder="e.g. High floor, Quiet room..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
              value={specialRequests}
              onChangeText={setSpecialRequests}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleContinueToPayment}
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
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  hotelTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  roomType: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  totalPrice: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.azure[200],
    paddingTop: SPACING.sm,
  },
  dateLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  dateValue: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.azure[950],
    marginTop: 2,
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
  submitButton: {
    backgroundColor: COLORS.azure[800],
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  submitButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
});