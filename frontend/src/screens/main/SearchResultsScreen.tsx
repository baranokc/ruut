import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import FareTypeModal from '../../components/modals/FareTypeModal';
import SeatSelectionModal from '../../components/modals/SeatSelectionModal';

export interface TicketItem {
  id: string;
  providerName: string; // Firma veya Hava yolu adı
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

// Uçak Mock Verileri
const MOCK_FLIGHTS: TicketItem[] = [
  {
    id: 'f1',
    providerName: 'Turkish Airlines',
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
    id: 'f2',
    providerName: 'Pegasus Airlines',
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
];

// Otobüs Mock Verileri
const MOCK_BUSES: TicketItem[] = [
  {
    id: 'b1',
    providerName: 'Metro Turizm',
    price: 15.00,
    currency: '€',
    originCode: 'ESE',
    originCity: 'Istanbul',
    destinationCode: 'AŞTİ',
    destinationCity: 'Ankara',
    departureTime: '08:30 AM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '3:00 PM',
    arrivalDate: '13 Sep, 2025',
    duration: '6h 30m',
  },
  {
    id: 'b2',
    providerName: 'Kamil Koç',
    price: 20.00,
    currency: '€',
    originCode: 'ESE',
    originCity: 'Istanbul',
    destinationCode: 'AŞTİ',
    destinationCity: 'Ankara',
    departureTime: '10:30 AM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '4:45 PM',
    arrivalDate: '13 Sep, 2025',
    duration: '6h 15m',
  },
  {
    id: 'b3',
    providerName: 'Pamukkale Turizm',
    price: 17.50,
    currency: '€',
    originCode: 'ESE',
    originCity: 'Istanbul',
    destinationCode: 'AŞTİ',
    destinationCity: 'Ankara',
    departureTime: '12:00 PM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '5:50 PM',
    arrivalDate: '13 Sep, 2025',
    duration: '5h 50m',
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

export default function SearchResultsScreen({ route, navigation }: any) {
  const {
    category = 'bus',
    tripType = 'one-way',
    fromLocation = 'ISTANBUL (ESENLER)',
    toLocation = 'ANKARA (AŞTİ)',
    departureDate = '13 Sep, 2025',
  } = route?.params || {};

  const [selectedDate, setSelectedDate] = useState(13);
  const [fareModalVisible, setFareModalVisible] = useState(false);
  const [seatModalVisible, setSeatModalVisible] = useState(false);
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<number | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  // Kategoriye göre mock veri seçimi
  const ticketsList = category === 'bus' ? MOCK_BUSES : MOCK_FLIGHTS;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Dynamic Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRouteRow}>
            <View style={styles.locationAlign}>
              <Text style={styles.summaryCityText} numberOfLines={1}>{fromLocation}</Text>
            </View>

            <View style={styles.summaryPlaneContainer}>
              <View style={styles.summaryLine} />
              {category === 'bus' ? (
                <FontAwesome5 name="bus" size={16} color={COLORS.cardBg} />
              ) : (
                <Ionicons name="airplane" size={18} color={COLORS.cardBg} />
              )}
              <View style={styles.summaryLine} />
            </View>

            <View style={[styles.summaryRightAlign, styles.locationAlign]}>
              <Text style={styles.summaryCityText} numberOfLines={1}>{toLocation}</Text>
            </View>
          </View>

          <View style={styles.summaryMetaRow}>
            <View>
              <Text style={styles.summaryMetaLabel}>Departure</Text>
              <Text style={styles.summaryMetaValue}>{departureDate}</Text>
            </View>

            <View style={styles.summaryRightAlign}>
              <Text style={styles.summaryMetaLabel}>Type</Text>
              <Text style={styles.summaryMetaValue}>
                {tripType === 'one-way' ? 'One-way' : 'Round-trip'}
              </Text>
            </View>
          </View>
        </View>

        {/* Date Selector Strip */}
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

        {/* Ticket List (Bus or Plane) */}
        {ticketsList.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={styles.flightCard}
            onPress={() => {
              setSelectedTicket(ticket);
              if (category === 'bus') {
                setSeatModalVisible(true);
              } else {
                setFareModalVisible(true); // Uçak ise paket seçimi
              }
            }}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.airlineName}>{ticket.providerName}</Text>
              <Text style={styles.priceText}>
                {ticket.currency} {ticket.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.flightDetailsRow}>
              <View style={styles.locationBlock}>
                <Text style={styles.locationCode}>({ticket.originCode})</Text>
                <Text style={styles.locationCity}>{ticket.originCity}</Text>
              </View>

              <View style={styles.durationContainer}>
                <View style={styles.durationLineWrapper}>
                  <View style={styles.durationLine} />
                  {category === 'bus' ? (
                    <FontAwesome5 name="bus" size={14} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                  ) : (
                    <Ionicons name="airplane" size={16} color={COLORS.azure[950]} style={styles.durationPlaneIcon} />
                  )}
                  <View style={styles.durationLine} />
                </View>
                <Text style={styles.durationText}>{ticket.duration}</Text>
              </View>

              <View style={[styles.locationBlock, styles.alignRight]}>
                <Text style={styles.locationCode}>({ticket.destinationCode})</Text>
                <Text style={styles.locationCity}>{ticket.destinationCity}</Text>
              </View>
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>{ticket.departureTime}</Text>
                <Text style={styles.dateText}>{ticket.departureDate}</Text>
              </View>

              <View style={[styles.timeBlock, styles.alignRight]}>
                <Text style={styles.timeText}>{ticket.arrivalTime}</Text>
                <Text style={styles.dateText}>{ticket.arrivalDate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Uçak Bilet Paketi Seçim Modalı */}
      <FareTypeModal
        visible={fareModalVisible}
        onClose={() => setFareModalVisible(false)}
        onSelectFare={(fare) => {
          setFareModalVisible(false);
          navigation.navigate('FlightDetails', { ticket: selectedTicket, fare });
        }}
      />

      {/* Otobüs Koltuk Seçim Modalı */}
      <SeatSelectionModal
        visible={seatModalVisible}
        onClose={() => setSeatModalVisible(false)}
        onConfirm={(seatNumber) => {
          setSelectedSeatNumber(seatNumber);
          setSeatModalVisible(false);
          navigation.navigate('BusDetails', { ticket: selectedTicket, seatNumber });
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
  locationAlign: {
    flex: 1,
  },
  summaryCityText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
  summaryPlaneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.xs,
  },
  summaryLine: {
    width: 16,
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