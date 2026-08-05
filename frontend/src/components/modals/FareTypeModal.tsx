import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export interface FarePackage {
  id: string;
  name: string;
  personalItem: string;
  cabinBaggage: string;
  checkedBaggage: string;
  isRefundable: boolean;
  refundText: string;
  isChangeable: boolean;
  changeText: string;
}

interface FareTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectFare?: (fare: FarePackage) => void;
}

const FARE_PACKAGES: FarePackage[] = [
  {
    id: 'eco',
    name: 'Eco',
    personalItem: 'Personal Item\n(40x30x15 cm)',
    cabinBaggage: 'Cabin Baggage\n(1x8 kg)',
    checkedBaggage: 'Checked Baggage\n(1x15 kg)',
    isRefundable: false,
    refundText: 'No Refund',
    isChangeable: false,
    changeText: 'No Changes',
  },
  {
    id: 'flex',
    name: 'Flex',
    personalItem: 'Personal Item\n(40x30x15 cm)',
    cabinBaggage: 'Cabin Baggage\n(1x8 kg)',
    checkedBaggage: 'Checked Baggage\n(1x20 kg)',
    isRefundable: false,
    refundText: 'No Refund',
    isChangeable: true,
    changeText: 'Free Changes',
  },
  {
    id: 'premium',
    name: 'Premium',
    personalItem: 'Personal Item\n(40x30x15 cm)',
    cabinBaggage: 'Cabin Baggage\n(2x8 kg)',
    checkedBaggage: 'Checked Baggage\n(1x30 kg)',
    isRefundable: true,
    refundText: 'Full Refund',
    isChangeable: true,
    changeText: 'Free Changes',
  },
];

export default function FareTypeModal({
  visible,
  onClose,
  onSelectFare,
}: FareTypeModalProps) {
  const [selectedId, setSelectedId] = useState<string>('eco');
  const navigation = useNavigation<any>();

  const handleContinue = () => {
    const selectedPkg = FARE_PACKAGES.find((p) => p.id === selectedId);
    if (selectedPkg && onSelectFare) {
      onSelectFare(selectedPkg);
    }
    onClose();
    navigation.navigate('FlightDetails');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.modalContent}>
          <View style={styles.handleBar} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {FARE_PACKAGES.map((pkg) => {
              const isSelected = selectedId === pkg.id;

              return (
                <TouchableOpacity
                  key={pkg.id}
                  activeOpacity={0.9}
                  style={[styles.card, isSelected && styles.selectedCard]}
                  onPress={() => setSelectedId(pkg.id)}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={[styles.badge, isSelected ? styles.selectedBadge : styles.unselectedBadge]}>
                      <Text style={[styles.badgeText, isSelected ? styles.selectedBadgeText : styles.unselectedBadgeText]}>
                        {pkg.name}
                      </Text>
                    </View>

                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color={COLORS.azure[600]} />
                    )}
                  </View>

                  <View style={styles.featureList}>
                    <View style={styles.featureRow}>
                      <FontAwesome5 name="shopping-bag" size={16} color={COLORS.azure[950]} style={styles.featureIcon} />
                      <Text style={styles.featureText}>{pkg.personalItem}</Text>
                    </View>

                    <View style={styles.featureRow}>
                      <FontAwesome5 name="suitcase-rolling" size={16} color={COLORS.azure[950]} style={styles.featureIcon} />
                      <Text style={styles.featureText}>{pkg.cabinBaggage}</Text>
                    </View>

                    <View style={styles.featureRow}>
                      <FontAwesome5 name="suitcase" size={16} color={COLORS.azure[950]} style={styles.featureIcon} />
                      <Text style={styles.featureText}>{pkg.checkedBaggage}</Text>
                    </View>

                    <View style={styles.featureRow}>
                      <Ionicons
                        name={pkg.isRefundable ? 'checkmark-circle' : 'close-circle'}
                        size={18}
                        color={pkg.isRefundable ? COLORS.state.completed : COLORS.state.high}
                        style={styles.featureIcon}
                      />
                      <Text style={styles.featureText}>{pkg.refundText}</Text>
                    </View>

                    <View style={styles.featureRow}>
                      <Ionicons
                        name={pkg.isChangeable ? 'checkmark-circle' : 'close-circle'}
                        size={18}
                        color={pkg.isChangeable ? COLORS.state.completed : COLORS.state.high}
                        style={styles.featureIcon}
                      />
                      <Text style={styles.featureText}>{pkg.changeText}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: COLORS.azure[950],
    borderTopLeftRadius: RADIUS.lg * 1.5,
    borderTopRightRadius: RADIUS.lg * 1.5,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl + 10,
    paddingHorizontal: SPACING.md,
  },
  handleBar: {
    width: 48,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
    opacity: 0.8,
  },
  cardsContainer: {
    paddingHorizontal: SPACING.xs,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },
  card: {
    width: 175,
    backgroundColor: '#F2F6FC',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: COLORS.azure[500],
    backgroundColor: '#F2F6FC',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32,
    marginBottom: SPACING.sm,
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  selectedBadge: {
    backgroundColor: COLORS.azure[100],
  },
  unselectedBadge: {
    backgroundColor: COLORS.azure[500],
  },
  badgeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    fontSize: 13,
  },
  selectedBadgeText: {
    color: COLORS.azure[950],
  },
  unselectedBadgeText: {
    color: COLORS.cardBg,
  },
  featureList: {
    gap: SPACING.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xs,
  },
  featureIcon: {
    marginTop: 2,
    width: 20,
    textAlign: 'center',
  },
  featureText: {
    ...TYPOGRAPHY.caption,
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '600',
    lineHeight: 16,
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#445CAC',
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  continueButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBg,
    fontWeight: '700',
  },
});