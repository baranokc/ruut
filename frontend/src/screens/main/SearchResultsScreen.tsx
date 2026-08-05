import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import FareTypeModal from '../../components/modals/FareTypeModal';

export interface FlightTicket {
  id: string;
  airline: string;
  price: number;
  currency: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  duration: string;
}

const MOCK_FLIGHTS: FlightTicket[] = [
  {
    id: '1',
    airline: 'Turkish Airlines',
    price: 89.00,
    currency: '€',
    originCode: 'SAW',
    originCity: 'Istanbul',
    destinationCode: 'MUC',
    destinationCity: 'Munich',
    departureTime: '08:30 AM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '10:25 AM',
    arrivalDate: '13 Sep, 2025',
    duration: '2h 55m',
  },
  {
    id: '2',
    airline: 'Pegasus Airlines',
    price: 94.50,
    currency: '€',
    originCode: 'SAW',
    originCity: 'Istanbul',
    destinationCode: 'MUC',
    destinationCity: 'Munich',
    departureTime: '1:15 PM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '4:25 PM',
    arrivalDate: '13 Sep, 2025',
    duration: '3h 10m',
  },
  {
    id: '3',
    airline: 'SunExpress',
    price: 124.50,
    currency: '€',
    originCode: 'SAW',
    originCity: 'Istanbul',
    destinationCode: 'MUC',
    destinationCity: 'Munich',
    departureTime: '10:50 PM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '01:45 AM',
    arrivalDate: '14 Sep, 2025',
    duration: '2h 55m',
  },
];

const DATES = [
  { dayNumber: 13, dayName: 'Fr' },
  { dayNumber: 14, dayName: 'Sa' },
  { dayNumber: 15, dayName: 'Su' },
  { dayNumber: 16, dayName: 'Mo' },
  { dayNumber: 17, dayName: 'Tu' },
  { dayNumber: 18, dayName: 'We' },
];

export default function SearchResultsScreen({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState(13);
  const [fareModalVisible, setFareModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRouteRow}>
            <View>
              <Text style={styles.summaryCodeText}>(SAW)</Text>
              <Text style={styles.summaryCityText}>Istanbul</Text>
            </View>

            <View style={styles.summaryPlaneContainer}>
              <View style={styles.summaryLine} />
              <Ionicons name="airplane" size={18} color={COLORS.cardBg} />
              <View style={styles.summaryLine} />
            </View>

            <View style={styles.summaryRightAlign}>
              <Text style={styles.summaryCodeText}>(MUC)</Text>
              <Text style={styles.summaryCityText}>Munich</Text>
            </View>
          </View>

          <View style={styles.summaryMetaRow}>
            <View>
              <Text style={styles.summaryMetaLabel}>Departure</Text>
              <Text style={styles.summaryMetaValue}>13 September, 2025</Text>
            </View>

            <View style={styles.summaryRightAlign}>
              <Text style={styles.summaryMetaLabel}>Type</Text>
              <Text style={styles.summaryMetaValue}>One-way</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelectorContainer}>
          {DATES.map((item) => {
            const isSelected = selectedDate === item.dayNumber;
            return (
              <TouchableOpacity
                key={item.dayNumber}
                style={[styles.dateTab, isSelected && styles.activeDateTab]}
                onPress={() => setSelectedDate(item.dayNumber)}
              >
                <Text style={[styles.dateNumberText, isSelected && styles.activeDateText]}>
                  {item.dayNumber}
                </Text>
                <Text style={[styles.dateNameText, isSelected && styles.activeDateText]}>
                  {item.dayName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {MOCK_FLIGHTS.map((flight) => (
          <TouchableOpacity
            key={flight.id}
            style={styles.flightCard}
            onPress={() => setFareModalVisible(true)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.airlineName}>{flight.airline}</Text>
              <Text style={styles.priceText}>
                {flight.currency} {flight.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.flightDetailsRow}>
              <View style={styles.locationBlock}>
                <Text style={styles.locationCode}>({flight.originCode})</Text>
                <Text style={styles.locationCity}>{flight.originCity}</Text>
              </View>

              <View style={styles.durationContainer}>
                <View style={styles.durationLineWrapper}>
                  <View style={styles.durationLine} />
                  <Ionicons name="airplane" size={16} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                  <View style={styles.durationLine} />
                </View>
                <Text style={styles.durationText}>{flight.duration}</Text>
              </View>

              <View style={[styles.locationBlock, styles.alignRight]}>
                <Text style={styles.locationCode}>({flight.destinationCode})</Text>
                <Text style={styles.locationCity}>{flight.destinationCity}</Text>
              </View>
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>{flight.departureTime}</Text>
                <Text style={styles.dateText}>{flight.departureDate}</Text>
              </View>

              <View style={[styles.timeBlock, styles.alignRight]}>
                <Text style={styles.timeText}>{flight.arrivalTime}</Text>
                <Text style={styles.dateText}>{flight.arrivalDate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FareTypeModal
        visible={fareModalVisible}
        onClose={() => setFareModalVisible(false)}
        onSelectFare={(fare) => {
          console.log('Selected Fare Package:', fare);
        }}
      />
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
  summaryCard: {
    backgroundColor: COLORS.azure[950],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  summaryRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  summaryCodeText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
  summaryCityText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.azure[200],
  },
  summaryPlaneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryLine: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.azure[300],
  },
  summaryRightAlign: {
    alignItems: 'flex-end',
  },
  summaryMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: SPACING.sm,
  },
  summaryMetaLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.azure[300],
  },
  summaryMetaValue: {
    ...TYPOGRAPHY.caption,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.cardBg,
    marginTop: 2,
  },
  dateSelectorContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  dateTab: {
    width: 48,
    height: 56,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  activeDateTab: {
    backgroundColor: COLORS.azure[950],
  },
  dateNumberText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dateNameText: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  activeDateText: {
    color: COLORS.cardBg,
  },
  flightCard: {
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
});