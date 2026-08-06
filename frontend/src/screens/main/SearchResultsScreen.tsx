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
  providerName: string;
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

export interface HotelItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  currency: string;
  roomType: string;
  amenities: string[];
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
];

// Otel Mock Verileri
const MOCK_HOTELS: HotelItem[] = [
  {
    id: 'h1',
    name: 'Grand Hyatt Istanbul',
    location: 'Taksim, Istanbul',
    rating: 4.8,
    reviewsCount: 1240,
    pricePerNight: 145.00,
    currency: '€',
    roomType: 'Deluxe King Room',
    amenities: ['Wi-Fi', 'Pool', 'Breakfast'],
  },
  {
    id: 'h2',
    name: 'Swissôtel The Bosphorus',
    location: 'Beşiktaş, Istanbul',
    rating: 4.9,
    reviewsCount: 2150,
    pricePerNight: 210.00,
    currency: '€',
    roomType: 'Executive Bosphorus Suite',
    amenities: ['Wi-Fi', 'Spa', 'Breakfast'],
  },
  {
    id: 'h3',
    name: 'Radisson Blu Hotel',
    location: 'Şişli, Istanbul',
    rating: 4.5,
    reviewsCount: 890,
    pricePerNight: 98.50,
    currency: '€',
    roomType: 'Standard Double Room',
    amenities: ['Wi-Fi', 'Gym'],
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
    fromLocation = 'ISTANBUL',
    toLocation = 'ANKARA',
    departureDate = '13 Sep, 2025',
  } = route?.params || {};

  const [selectedDate, setSelectedDate] = useState(13);
  const [fareModalVisible, setFareModalVisible] = useState(false);
  const [seatModalVisible, setSeatModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  const isHotel = category === 'hotel';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.azure[950]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isHotel ? 'Hotel Results' : 'Search Results'}
        </Text>
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
              ) : isHotel ? (
                <FontAwesome5 name="bed" size={16} color={COLORS.cardBg} />
              ) : (
                <Ionicons name="airplane" size={18} color={COLORS.cardBg} />
              )}
              <View style={styles.summaryLine} />
            </View>

            <View style={[styles.summaryRightAlign, styles.locationAlign]}>
              <Text style={styles.summaryCityText} numberOfLines={1}>
                {isHotel ? '1 Room, 2 Guests' : toLocation}
              </Text>
            </View>
          </View>

          <View style={styles.summaryMetaRow}>
            <View>
              <Text style={styles.summaryMetaLabel}>{isHotel ? 'Check-in' : 'Departure'}</Text>
              <Text style={styles.summaryMetaValue}>{departureDate}</Text>
            </View>

            <View style={styles.summaryRightAlign}>
              <Text style={styles.summaryMetaLabel}>{isHotel ? 'Duration' : 'Type'}</Text>
              <Text style={styles.summaryMetaValue}>
                {isHotel ? '2 Nights' : tripType === 'one-way' ? 'One-way' : 'Round-trip'}
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

        {/* HOTEL LISTING */}
        {isHotel &&
          MOCK_HOTELS.map((hotel) => (
            <TouchableOpacity
              key={hotel.id}
              style={styles.hotelCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('HotelDetails', { hotel })}
            >
              <View style={styles.hotelCardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.hotelLocation}>{hotel.location}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.priceText}>
                    {hotel.currency} {hotel.pricePerNight.toFixed(2)}
                  </Text>
                  <Text style={styles.perNightText}>/ night</Text>
                </View>
              </View>

              <View style={styles.hotelDetailsRow}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.ratingText}>{hotel.rating}</Text>
                  <Text style={styles.reviewsText}>({hotel.reviewsCount})</Text>
                </View>

                <Text style={styles.roomTypeText}>{hotel.roomType}</Text>
              </View>

              <View style={styles.amenitiesRow}>
                {hotel.amenities.map((amenity, idx) => (
                  <View key={idx} style={styles.amenityChip}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}

        {/* BUS & FLIGHT LISTING */}
        {!isHotel &&
          (category === 'bus' ? MOCK_BUSES : MOCK_FLIGHTS).map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              style={styles.flightCard}
              onPress={() => {
                setSelectedTicket(ticket);
                if (category === 'bus') {
                  setSeatModalVisible(true);
                } else {
                  setFareModalVisible(true);
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
  hotelCard: {
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  hotelCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  hotelName: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  hotelLocation: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  perNightText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  hotelDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  ratingText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  reviewsText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  roomTypeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.azure[950],
  },
  amenitiesRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  amenityChip: {
    backgroundColor: COLORS.azure[200],
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  amenityText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.azure[950],
  },
});