import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import LocationSearchModal from '../../components/modals/LocationSearchModal';
import DatePickerModal from '../../components/modals/DatePickerModal';

type CategoryType = 'plane' | 'bus' | 'hotel' | 'car';
type TripType = 'one-way' | 'round-trip';

interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  iconType: 'plane' | 'bus';
}

const OFFERS: OfferItem[] = [
  {
    id: '1',
    title: 'Fly More, Pay Less',
    subtitle: 'Get up to 25% off on your first international flight booking.',
    discount: '25% OFF',
    iconType: 'plane',
  },
  {
    id: '2',
    title: 'Save Travel Costs',
    subtitle: 'Travel while maintaining your budget with exclusive deals.',
    discount: '15% OFF',
    iconType: 'bus',
  },
];

export default function HomeScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('bus');
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeInputType, setActiveInputType] = useState<'from' | 'to'>('from');

  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [activeDateType, setActiveDateType] = useState<'departure' | 'return'>('departure');

  // Kategoriye göre ikon seçimi
  const renderFromIcon = () => {
    switch (selectedCategory) {
      case 'bus':
        return <FontAwesome5 name="bus" size={18} color={COLORS.azure[950]} />;
      case 'hotel':
        return <FontAwesome5 name="bed" size={18} color={COLORS.azure[950]} />;
      case 'car':
        return <Ionicons name="car" size={20} color={COLORS.azure[950]} />;
      case 'plane':
      default:
        return <Ionicons name="airplane-outline" size={20} color={COLORS.azure[950]} />;
    }
  };

  // Kategoriye göre From placeholder metni
  const getFromPlaceholder = () => {
    switch (selectedCategory) {
      case 'bus':
        return 'Enter origin city or bus station';
      case 'hotel':
        return 'Enter destination or hotel name';
      case 'car':
        return 'Enter pick-up location';
      case 'plane':
      default:
        return 'Enter origin city or airport';
    }
  };

  const openSearchModal = (type: 'from' | 'to') => {
    setActiveInputType(type);
    setModalVisible(true);
  };

  const handleSelectLocation = (location: string) => {
    if (activeInputType === 'from') {
      setFromLocation(location);
    } else {
      setToLocation(location);
    }
  };

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const openDatePicker = (type: 'departure' | 'return') => {
    setActiveDateType(type);
    setDateModalVisible(true);
  };

  const handleSelectDate = (date: string) => {
    if (activeDateType === 'departure') {
      setDepartureDate(date);
    } else {
      setReturnDate(date);
    }
  };

  const handleSearch = () => {
    navigation.navigate('SearchResults', {
      category: selectedCategory,
      tripType: tripType,
      fromLocation: fromLocation || (selectedCategory === 'bus' ? 'ISTANBUL (ESENLER)' : 'ISTANBUL (SAW)'),
      toLocation: toLocation || (selectedCategory === 'bus' ? 'ANKARA (AŞTİ)' : 'MUNICH (MUC)'),
      departureDate: departureDate || '13 Sep, 2025',
      returnDate: returnDate,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greetingText}>Good Morning</Text>
              <Text style={styles.userNameText}>Eren Büyüköner</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={20} color={COLORS.azure[700]} />
          </TouchableOpacity>
        </View>

        {/* Search Main Card */}
        <View style={styles.searchCard}>
          {/* Category Selector */}
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[styles.categoryTab, selectedCategory === 'plane' && styles.activeCategoryTab]}
              onPress={() => setSelectedCategory('plane')}
            >
              <Ionicons
                name="airplane"
                size={20}
                color={selectedCategory === 'plane' ? COLORS.azure[950] : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'plane' && styles.activeCategoryText,
                ]}
              >
                Plane
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryTab, selectedCategory === 'bus' && styles.activeCategoryTab]}
              onPress={() => setSelectedCategory('bus')}
            >
              <FontAwesome5
                name="bus"
                size={18}
                color={selectedCategory === 'bus' ? COLORS.azure[950] : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'bus' && styles.activeCategoryText,
                ]}
              >
                Bus
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryTab, selectedCategory === 'hotel' && styles.activeCategoryTab]}
              onPress={() => setSelectedCategory('hotel')}
            >
              <FontAwesome5
                name="bed"
                size={18}
                color={selectedCategory === 'hotel' ? COLORS.azure[950] : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'hotel' && styles.activeCategoryText,
                ]}
              >
                Hotel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryTab, selectedCategory === 'car' && styles.activeCategoryTab]}
              onPress={() => setSelectedCategory('car')}
            >
              <Ionicons
                name="car"
                size={20}
                color={selectedCategory === 'car' ? COLORS.azure[950] : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === 'car' && styles.activeCategoryText,
                ]}
              >
                Car
              </Text>
            </TouchableOpacity>
          </View>

          {/* Location Inputs (From / To) */}
          <View style={styles.inputsWrapper}>
            {/* From Input */}
            <TouchableOpacity style={styles.inputCard} onPress={() => openSearchModal('from')}>
              <View style={styles.iconCircle}>{renderFromIcon()}</View>
              <View style={styles.inputTextContainer}>
                <Text style={styles.inputLabel}>From</Text>
                <Text
                  style={fromLocation ? styles.selectedText : styles.placeholderText}
                  numberOfLines={1}
                >
                  {fromLocation || getFromPlaceholder()}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Swap Button */}
            <TouchableOpacity style={styles.swapButton} onPress={handleSwapLocations}>
              <Ionicons name="swap-vertical" size={18} color={COLORS.azure[950]} />
            </TouchableOpacity>

            {/* To Input */}
            <TouchableOpacity style={styles.inputCard} onPress={() => openSearchModal('to')}>
              <View style={styles.iconCircle}>
                <Ionicons name="location-sharp" size={20} color={COLORS.azure[950]} />
              </View>
              <View style={styles.inputTextContainer}>
                <Text style={styles.inputLabel}>To</Text>
                <Text
                  style={toLocation ? styles.selectedText : styles.placeholderText}
                  numberOfLines={1}
                >
                  {toLocation || 'Where do you want to go?'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Radio Row */}
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={[styles.radioButton, tripType === 'one-way' && styles.activeRadioButton]}
              onPress={() => setTripType('one-way')}
            >
              <Ionicons
                name={tripType === 'one-way' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={COLORS.azure[950]}
              />
              <Text style={styles.radioText}>One-way</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioButton, tripType === 'round-trip' && styles.activeRadioButton]}
              onPress={() => setTripType('round-trip')}
            >
              <Ionicons
                name={tripType === 'round-trip' ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={COLORS.azure[950]}
              />
              <Text style={styles.radioText}>Round-trip</Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Dates Section (One-way vs Round-trip) */}
          {tripType === 'one-way' ? (
            <TouchableOpacity
              style={styles.fullDateCard}
              onPress={() => openDatePicker('departure')}
              activeOpacity={0.8}
            >
              <Text style={styles.inputLabel}>Departure</Text>
              <Text style={departureDate ? styles.selectedText : styles.dateValueText}>
                {departureDate || 'Select Date'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.datesRow}>
              <TouchableOpacity
                style={styles.dateCard}
                onPress={() => openDatePicker('departure')}
                activeOpacity={0.8}
              >
                <Text style={styles.inputLabel}>Departure</Text>
                <Text style={departureDate ? styles.selectedText : styles.dateValueText}>
                  {departureDate || 'Select Date'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateCard}
                onPress={() => openDatePicker('return')}
                activeOpacity={0.8}
              >
                <Text style={styles.inputLabel}>Return</Text>
                <Text style={returnDate ? styles.selectedText : styles.dateValueText}>
                  {returnDate || 'Select Date'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Passengers Selector */}
          <TouchableOpacity style={styles.passengersCard}>
            <View style={styles.passengersLeft}>
              <View style={styles.iconCircleSmall}>
                <Ionicons name="people-outline" size={20} color={COLORS.azure[950]} />
              </View>
              <Text style={styles.passengersText}>Passengers</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={COLORS.azure[950]} />
          </TouchableOpacity>

          {/* Search Action Button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Special Offers Horizontal List */}
        <View style={styles.offersSection}>
          <Text style={styles.offersTitle}>Special Offers</Text>
          <FlatList
            data={OFFERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.offerCard}>
                <View style={styles.offerTextContainer}>
                  <Text style={styles.offerCardTitle}>{item.title}</Text>
                  <Text style={styles.offerCardSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.offerIconBadge}>
                  {item.iconType === 'bus' ? (
                    <FontAwesome5 name="bus" size={18} color={COLORS.cardBg} />
                  ) : (
                    <Ionicons name="airplane" size={22} color={COLORS.cardBg} />
                  )}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color={COLORS.cardBg} />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          <View style={styles.activeDot} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Trips')}
        >
          <MaterialIcons name="confirmation-number" size={24} color={COLORS.azure[300]} />
          <Text style={styles.navText}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-outline" size={24} color={COLORS.azure[300]} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Modallar */}
      <LocationSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectLocation={handleSelectLocation}
        placeholder={
          activeInputType === 'from' ? getFromPlaceholder() : 'Where do you want to go?'
        }
      />

      <DatePickerModal
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onSelectDate={handleSelectDate}
        title={activeDateType === 'departure' ? 'Select Departure Date' : 'Select Return Date'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
  },
  greetingText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  userNameText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCard: {
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  categoryTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  activeCategoryTab: {
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: COLORS.azure[950],
    fontWeight: '700',
  },
  inputsWrapper: {
    position: 'relative',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    height: 60,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  inputTextContainer: {
    flex: 1,
  },
  inputLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  selectedText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginTop: 2,
  },
  placeholderText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  swapButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -18,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBg,
  },
  radioRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBg,
    height: 48,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  activeRadioButton: {
    borderWidth: 1,
    borderColor: COLORS.azure[300],
  },
  radioText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  fullDateCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    height: 60,
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  datesRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  dateCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    height: 60,
    justifyContent: 'center',
  },
  dateValueText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  passengersCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 56,
    marginBottom: SPACING.md,
  },
  passengersLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconCircleSmall: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  passengersText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: COLORS.azure[900],
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBg,
    fontWeight: '700',
  },
  offersSection: {
    marginBottom: SPACING.lg,
  },
  offersTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  offerCard: {
    width: 260,
    backgroundColor: COLORS.azure[200],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginRight: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  offerTextContainer: {
    flex: 1,
    paddingRight: SPACING.xs,
  },
  offerCardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  offerCardSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  offerIconBadge: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[800],
    justifyContent: 'center',
    alignItems: 'center',
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