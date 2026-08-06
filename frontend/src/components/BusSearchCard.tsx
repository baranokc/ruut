import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';
import LocationSearchModal from './modals/LocationSearchModal';
import DatePickerModal from './modals/DatePickerModal';

export default function BusSearchCard() {
  const [fromLocation, setFromLocation] = useState<string | null>(null);
  const [toLocation, setToLocation] = useState<string | null>(null);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);

  // Modal State'leri
  const [activeModal, setActiveModal] = useState<'from' | 'to' | null>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [dateTarget, setDateTarget] = useState<'departure' | 'return' | null>(null);

  // Kalkış ve Varış duraklarını yer değiştirme
  const handleSwap = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Nereden & Nereye Input Grubu */}
      <View style={styles.inputsWrapper}>
        {/* From Input */}
        <TouchableOpacity
          style={styles.fieldBox}
          onPress={() => setActiveModal('from')}
          activeOpacity={0.8}
        >
          <FontAwesome6 name="bus-simple" size={18} color={COLORS.azure[950]} />
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldLabel}>From</Text>
            <Text
              style={[
                styles.fieldValue,
                !fromLocation && { color: COLORS.textSecondary },
              ]}
              numberOfLines={1}
            >
              {fromLocation || 'Enter origin city or bus station'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.fieldSpacing} />

        {/* To Input */}
        <TouchableOpacity
          style={styles.fieldBox}
          onPress={() => setActiveModal('to')}
          activeOpacity={0.8}
        >
          <Ionicons name="location-sharp" size={20} color={COLORS.azure[950]} />
          <View style={styles.fieldTextContainer}>
            <Text style={styles.fieldLabel}>To</Text>
            <Text
              style={[
                styles.fieldValue,
                !toLocation && { color: COLORS.textSecondary },
              ]}
              numberOfLines={1}
            >
              {toLocation || 'Where do you want to go?'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Swap (Değiştirme) Butonu */}
        <TouchableOpacity style={styles.swapButton} onPress={handleSwap} activeOpacity={0.8}>
          <MaterialIcons name="swap-vert" size={20} color={COLORS.cardBg} />
        </TouchableOpacity>
      </View>

      {/* One-way / Round-trip Seçimi */}
      <View style={styles.radioRow}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsRoundTrip(false)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={!isRoundTrip ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={COLORS.azure[950]}
          />
          <Text style={styles.radioLabel}>One-way</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsRoundTrip(true)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isRoundTrip ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={COLORS.azure[950]}
          />
          <Text style={styles.radioLabel}>Round-trip</Text>
        </TouchableOpacity>
      </View>

      {/* Tarih Seçim Alanları */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => {
            setDateTarget('departure');
            setIsDatePickerVisible(true);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.fieldLabel}>Departure</Text>
          <Text style={styles.dateValue}>Select Date</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => {
            setDateTarget('return');
            setIsDatePickerVisible(true);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.fieldLabel}>Return</Text>
          <Text style={styles.dateValue}>Select Date</Text>
        </TouchableOpacity>
      </View>

      {/* Yolcu Seçimi */}
      <TouchableOpacity style={styles.passengerBox} activeOpacity={0.8}>
        <Ionicons name="people-outline" size={20} color={COLORS.azure[950]} />
        <Text style={styles.passengerText}>Passengers</Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.textSecondary} />
      </TouchableOpacity>

      {/* Arama Butonu */}
      <TouchableOpacity style={styles.searchButton} activeOpacity={0.85}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Sizin LocationSearchModal Bileşeninizin Entegrasyonu */}
      <LocationSearchModal
        visible={activeModal !== null}
        onClose={() => setActiveModal(null)}
        placeholder={
          activeModal === 'from'
            ? 'Enter origin city or bus station'
            : 'Where do you want to go?'
        }
        onSelectLocation={(selectedLocation) => {
          if (activeModal === 'from') setFromLocation(selectedLocation);
          if (activeModal === 'to') setToLocation(selectedLocation);
        }}
      />

      {/* DatePickerModal Entegrasyonu */}
      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDate={(selectedDate) => {
          setIsDatePickerVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg * 1.2,
    padding: SPACING.md,
  },
  inputsWrapper: {
    position: 'relative',
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
  },
  fieldSpacing: {
    height: SPACING.sm,
  },
  fieldTextContainer: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  fieldLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  fieldValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  swapButton: {
    position: 'absolute',
    right: SPACING.md,
    top: '50%',
    marginTop: -16,
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[400],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: SPACING.md,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.xl,
  },
  radioLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginLeft: SPACING.xs,
  },
  dateRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  dateBox: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    height: 54,
    justifyContent: 'center',
  },
  dateValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  passengerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
    marginBottom: SPACING.md,
  },
  passengerText: {
    flex: 1,
    marginLeft: SPACING.sm,
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: COLORS.azure[950],
    borderRadius: RADIUS.md,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    ...TYPOGRAPHY.h4,
    color: COLORS.cardBg,
  },
});