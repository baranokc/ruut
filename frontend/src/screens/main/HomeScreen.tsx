import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  Bus,
  Plane,
  Train,
  MapPin,
  ArrowRightLeft,
  Calendar,
  Users,
  Search,
  Sparkles,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [transportType, setTransportType] = useState<'bus' | 'flight' | 'train'>('bus');
  const [fromCity, setFromCity] = useState('İstanbul');
  const [toCity, setToCity] = useState('Ankara');
  const [date, setDate] = useState('Yarın, 6 Ağu');
  const [passengers, setPassengers] = useState('1 Yolcu');

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    // Navigation to search results or booking flow
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Header Banner */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Hoş Geldiniz 👋</Text>
            <Text style={styles.userName}>Baran Öncüoğlu</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
            <ShieldCheck size={24} color={COLORS.cardBg} />
          </TouchableOpacity>
        </View>

        {/* Transport Type Selector */}
        <View style={styles.transportSelector}>
          <TouchableOpacity
            style={[styles.transportTab, transportType === 'bus' && styles.activeTransportTab]}
            onPress={() => setTransportType('bus')}
            activeOpacity={0.9}
          >
            <Bus size={20} color={transportType === 'bus' ? COLORS.primary : COLORS.cardBg} />
            <Text style={[styles.transportText, transportType === 'bus' && styles.activeTransportText]}>
              Otobüs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.transportTab, transportType === 'flight' && styles.activeTransportTab]}
            onPress={() => setTransportType('flight')}
            activeOpacity={0.9}
          >
            <Plane size={20} color={transportType === 'flight' ? COLORS.primary : COLORS.cardBg} />
            <Text style={[styles.transportText, transportType === 'flight' && styles.activeTransportText]}>
              Uçak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.transportTab, transportType === 'train' && styles.activeTransportTab]}
            onPress={() => setTransportType('train')}
            activeOpacity={0.9}
          >
            <Train size={20} color={transportType === 'train' ? COLORS.primary : COLORS.cardBg} />
            <Text style={[styles.transportText, transportType === 'train' && styles.activeTransportText]}>
              Tren
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Card */}
        <View style={styles.searchCard}>
          {/* From City */}
          <TouchableOpacity style={styles.inputRow} activeOpacity={0.8}>
            <View style={styles.inputIconContainer}>
              <MapPin size={20} color={COLORS.primary} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Nereden</Text>
              <Text style={styles.inputValue}>{fromCity}</Text>
            </View>
          </TouchableOpacity>

          {/* Swap Button */}
          <View style={styles.swapContainer}>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.swapButton} onPress={handleSwapCities} activeOpacity={0.8}>
              <ArrowRightLeft size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* To City */}
          <TouchableOpacity style={styles.inputRow} activeOpacity={0.8}>
            <View style={styles.inputIconContainer}>
              <MapPin size={20} color={COLORS.state.high} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Nereye</Text>
              <Text style={styles.inputValue}>{toCity}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.fullDivider} />

          {/* Date & Passengers Row */}
          <View style={styles.rowInputs}>
            <TouchableOpacity style={[styles.inputRow, styles.halfInput]} activeOpacity={0.8}>
              <View style={styles.inputIconContainer}>
                <Calendar size={20} color={COLORS.primary} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Tarih</Text>
                <Text style={styles.inputValue}>{date}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity style={[styles.inputRow, styles.halfInput]} activeOpacity={0.8}>
              <View style={styles.inputIconContainer}>
                <Users size={20} color={COLORS.primary} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Yolcu</Text>
                <Text style={styles.inputValue}>{passengers}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.9}>
            <Search size={20} color={COLORS.cardBg} />
            <Text style={styles.searchButtonText}>Bilet Bul</Text>
          </TouchableOpacity>
        </View>

        {/* Campaigns Banner Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Sparkles size={20} color={COLORS.state.mid} />
            <Text style={styles.sectionTitle}>Kampanyalar ve Fırsatlar</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Tümü</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.campaignsScroll}>
          <TouchableOpacity style={styles.campaignCard} activeOpacity={0.9}>
            <View style={styles.campaignBadge}>
              <Text style={styles.campaignBadgeText}>%20 İndirim</Text>
            </View>
            <Text style={styles.campaignTitle}>Yaz Dönüşü Kampanyası</Text>
            <Text style={styles.campaignSubtitle}>Tüm otobüs seferlerinde geçerli.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.campaignCard, { backgroundColor: COLORS.azure[800] }]} activeOpacity={0.9}>
            <View style={[styles.campaignBadge, { backgroundColor: COLORS.state.mid }]}>
              <Text style={styles.campaignBadgeText}>150 TL Bonus</Text>
            </View>
            <Text style={styles.campaignTitle}>İlk Uçuşuna Özel</Text>
            <Text style={styles.campaignSubtitle}>RuutPay ile öde, anında kazan.</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Recent Searches */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Clock size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Son Aramalar</Text>
          </View>
        </View>

        <View style={styles.recentSearchCard}>
          <View style={styles.recentInfo}>
            <Text style={styles.recentCityText}>İstanbul → Ankara</Text>
            <Text style={styles.recentDateText}>5 Ağustos • 1 Yolcu • Otobüs</Text>
          </View>
          <TouchableOpacity style={styles.recentArrow}>
            <ChevronRight size={20} color={COLORS.textSecondary} />
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
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl * 1.5,
    borderBottomLeftRadius: RADIUS.lg * 1.5,
    borderBottomRightRadius: RADIUS.lg * 1.5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  welcomeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.azure[200],
  },
  userName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.cardBg,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transportSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.md,
    padding: 4,
  },
  transportTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
    gap: SPACING.xs,
  },
  activeTransportTab: {
    backgroundColor: COLORS.cardBg,
  },
  transportText: {
    ...TYPOGRAPHY.body2,
    fontFamily: TYPOGRAPHY.h4.fontFamily,
    color: COLORS.cardBg,
  },
  activeTransportText: {
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl * 2,
    marginTop: -SPACING.xl,
  },
  searchCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    shadowColor: COLORS.grey[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  halfInput: {
    flex: 1,
  },
  inputIconContainer: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.azure[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  inputValue: {
    ...TYPOGRAPHY.body2,
    fontFamily: TYPOGRAPHY.h4.fontFamily,
    color: COLORS.textPrimary,
  },
  swapContainer: {
    height: 1,
    backgroundColor: COLORS.grey[100],
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: SPACING.xs,
  },
  divider: {
    position: 'absolute',
    left: 45,
    right: 0,
    height: 1,
    backgroundColor: COLORS.grey[100],
  },
  swapButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.azure[50],
    borderWidth: 1,
    borderColor: COLORS.azure[100],
    justifyContent: 'center',
    alignItems: 'center',
    right: SPACING.md,
  },
  fullDivider: {
    height: 1,
    backgroundColor: COLORS.grey[100],
    marginVertical: SPACING.sm,
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.grey[100],
    marginHorizontal: SPACING.sm,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  searchButtonText: {
    ...TYPOGRAPHY.body,
    fontFamily: TYPOGRAPHY.h4.fontFamily,
    color: COLORS.cardBg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  seeAllText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.h4.fontFamily,
  },
  campaignsScroll: {
    gap: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  campaignCard: {
    width: width * 0.75,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    justifyContent: 'space-between',
    height: 130,
  },
  campaignBadge: {
    backgroundColor: COLORS.cardBg,
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  campaignBadgeText: {
    ...TYPOGRAPHY.caption,
    fontFamily: TYPOGRAPHY.h4.fontFamily,
    color: COLORS.primary,
  },
  campaignTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.cardBg,
  },
  campaignSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.azure[100],
  },
  recentSearchCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  recentInfo: {
    gap: 2,
  },
  recentCityText: {
    ...TYPOGRAPHY.body2,
    fontFamily: TYPOGRAPHY.h4.fontFamily,
    color: COLORS.textPrimary,
  },
  recentDateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  recentArrow: {
    padding: SPACING.xs,
  },
});


