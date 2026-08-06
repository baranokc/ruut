import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export interface TripItem {
  id: string;
  type: 'plane' | 'bus' | 'car';
  providerName: string;
  status: 'Active' | 'Completed' | 'Cancelled';
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

const MOCK_TRIPS: TripItem[] = [
  // Uçak Biletleri (Plane Filter)
  {
    id: 'p1',
    type: 'plane',
    providerName: 'Turkish Airlines',
    status: 'Active',
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
    id: 'p2',
    type: 'plane',
    providerName: 'Turkish Airlines',
    status: 'Completed',
    originCode: 'ESB',
    originCity: 'Ankara',
    destinationCode: 'ADB',
    destinationCity: 'Izmir',
    departureTime: '11:50 AM',
    departureDate: '1 Sep, 2025',
    arrivalTime: '01:00 PM',
    arrivalDate: '1 Sep, 2025',
    duration: '1h 10m',
  },
  {
    id: 'p3',
    type: 'plane',
    providerName: 'Pegasus Airlines',
    status: 'Completed',
    originCode: 'SAW',
    originCity: 'Istanbul',
    destinationCode: 'AMS',
    destinationCity: 'Amsterdam',
    departureTime: '11:15 AM',
    departureDate: '10 June, 2025',
    arrivalTime: '03:00 PM',
    arrivalDate: '10 June, 2025',
    duration: '3h 45m',
  },

  // Otobüs Biletleri (Bus Filter)
  {
    id: 'b1',
    type: 'bus',
    providerName: 'Metro Turizm',
    status: 'Active',
    originCode: 'ESE',
    originCity: 'Istanbul',
    destinationCode: 'AŞTİ',
    destinationCity: 'Ankara',
    departureTime: '08:30 AM',
    departureDate: '13 Sep, 2025',
    arrivalTime: '03:00 PM',
    arrivalDate: '13 Sep, 2025',
    duration: '6h 30m',
  },
  {
    id: 'b2',
    type: 'bus',
    providerName: 'Kamil Koç',
    status: 'Completed',
    originCode: 'ALI',
    originCity: 'Istanbul',
    destinationCode: 'BUR',
    destinationCity: 'Bursa',
    departureTime: '10:45 AM',
    departureDate: '22 Aug, 2025',
    arrivalTime: '02:00 PM',
    arrivalDate: '22 Aug, 2025',
    duration: '3h 15m',
  },
  {
    id: 'b3',
    type: 'bus',
    providerName: 'Pamukkale Turizm',
    status: 'Completed',
    originCode: 'ESE',
    originCity: 'Istanbul',
    destinationCode: 'ANT',
    destinationCity: 'Antalya',
    departureTime: '10:00 PM',
    departureDate: '15 July, 2025',
    arrivalTime: '07:30 AM',
    arrivalDate: '15 July, 2025',
    duration: '9h 30m',
  },
];

type FilterType = 'all' | 'plane' | 'bus' | 'car';

export default function TripsScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTrips = MOCK_TRIPS.filter((trip) => {
    if (activeFilter === 'all') return true;
    return trip.type === activeFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trips</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Filter Chips Horizontal Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {/* All Chip */}
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'all' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('all')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterChipText, activeFilter === 'all' && styles.activeFilterChipText]}>
              All
            </Text>
          </TouchableOpacity>

          {/* Plane Chip */}
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'plane' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('plane')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="airplane-outline"
              size={16}
              color={activeFilter === 'plane' ? COLORS.cardBg : COLORS.textPrimary}
            />
            <Text style={[styles.filterChipText, activeFilter === 'plane' && styles.activeFilterChipText]}>
              Plane
            </Text>
          </TouchableOpacity>

          {/* Bus Chip */}
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'bus' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('bus')}
            activeOpacity={0.8}
          >
            <FontAwesome6
              name="bus-simple"
              size={14}
              color={activeFilter === 'bus' ? COLORS.cardBg : COLORS.textPrimary}
            />
            <Text style={[styles.filterChipText, activeFilter === 'bus' && styles.activeFilterChipText]}>
              Bus
            </Text>
          </TouchableOpacity>

          {/* Car Chip */}
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'car' && styles.activeFilterChip]}
            onPress={() => setActiveFilter('car')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="car-outline"
              size={16}
              color={activeFilter === 'car' ? COLORS.cardBg : COLORS.textPrimary}
            />
            <Text style={[styles.filterChipText, activeFilter === 'car' && styles.activeFilterChipText]}>
              Car
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Trips Card List */}
        <View style={styles.listSection}>
          {filteredTrips.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tripCard}
              activeOpacity={0.85}
              onPress={() => navigation?.navigate('BookingSuccess', { ticket: item, category: item.type })}
            >
              {/* Header: Company Name & Status */}
              <View style={styles.cardHeader}>
                <Text style={styles.providerName}>{item.providerName}</Text>
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'Completed' ? styles.statusCompleted : styles.statusActive,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              {/* Route Line Details */}
              <View style={styles.routeRow}>
                <View style={styles.locationBlock}>
                  <Text style={styles.locationCode}>({item.originCode})</Text>
                  <Text style={styles.locationCity}>{item.originCity}</Text>
                </View>

                <View style={styles.durationContainer}>
                  <View style={styles.durationLineWrapper}>
                    <View style={styles.durationLine} />
                    {item.type === 'bus' ? (
                      <FontAwesome6 name="bus-simple" size={14} color={COLORS.azure[950]} style={styles.iconMargin} />
                    ) : (
                      <Ionicons name="airplane" size={16} color={COLORS.azure[950]} style={styles.iconMargin} />
                    )}
                    <View style={styles.durationLine} />
                  </View>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>

                <View style={[styles.locationBlock, styles.alignRight]}>
                  <Text style={styles.locationCode}>({item.destinationCode})</Text>
                  <Text style={styles.locationCity}>{item.destinationCity}</Text>
                </View>
              </View>

              {/* Departure & Arrival Times */}
              <View style={styles.timeRow}>
                <View style={styles.timeBlock}>
                  <Text style={styles.timeText}>{item.departureTime}</Text>
                  <Text style={styles.dateText}>{item.departureDate}</Text>
                </View>

                <View style={[styles.timeBlock, styles.alignRight]}>
                  <Text style={styles.timeText}>{item.arrivalTime}</Text>
                  <Text style={styles.dateText}>{item.arrivalDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('Home')}
          activeOpacity={0.7}
        >
          <Ionicons name="home-outline" size={24} color={COLORS.azure[300]} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <MaterialCommunityIcons name="ticket-confirmation" size={24} color={COLORS.cardBg} />
          <Text style={[styles.navText, styles.activeNavText]}>Trips</Text>
          <View style={styles.activeDot} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('Profile')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={24} color={COLORS.azure[300]} />
          <Text style={styles.navText}>Profile</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.azure[950],
    fontWeight: '700',
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 100,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cardBg,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.azure[200],
  },
  activeFilterChip: {
    backgroundColor: COLORS.azure[950],
    borderColor: COLORS.azure[950],
  },
  filterChipText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: COLORS.cardBg,
    fontWeight: '700',
  },
  listSection: {
    gap: SPACING.md,
  },
  tripCard: {
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  providerName: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.azure[950],
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    fontSize: 12,
  },
  statusActive: {
    color: COLORS.azure[700],
  },
  statusCompleted: {
    color: '#34A853',
  },
  routeRow: {
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
  iconMargin: {
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: COLORS.azure[950],
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.azure[300],
    fontSize: 11,
    marginTop: 2,
  },
  activeNavText: {
    color: COLORS.cardBg,
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cardBg,
    marginTop: 2,
  },
});