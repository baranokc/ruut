import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

interface SeatSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedSeat: number) => void;
}

// Görseldeki koltuk dizilim matrisi (Sol 2 koltuk - Sağ 2 koltuk)
const SEAT_ROWS = [
  { left: [1, 2], right: [15, 16] },
  { left: [3, 4], right: [17, 18] },
  { left: [5, 6], right: [19, 20] },
  { left: [7, 8], right: [21, 22] },
  { left: [9, 10], right: [23, 24] },
  { left: [11, 12], right: [25, 26] },
  { left: [13, 14], right: [27, 28] },
];

// Görseldeki dolu (Occupied) koltuk numaraları
const OCCUPIED_SEATS = [2, 4, 5, 7, 10, 14, 16, 18, 19, 21, 22, 26, 28];

export default function SeatSelectionModal({
  visible,
  onClose,
  onConfirm,
}: SeatSelectionModalProps) {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const handleSeatPress = (seatNumber: number) => {
    if (OCCUPIED_SEATS.includes(seatNumber)) return; // Dolu koltuğa tıklanamaz
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null); // Tekrar tıklanırsa seçimi kaldır
    } else {
      setSelectedSeat(seatNumber);
    }
  };

  const handleContinue = () => {
    if (selectedSeat !== null) {
      onConfirm(selectedSeat);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalContent}>
          {/* Sheet Handle */}
          <View style={styles.handleBar} />

          {/* Legend Section (Lejant) */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.azure[500] }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.azure[950] }]} />
              <Text style={styles.legendText}>Occupied</Text>
            </View>
          </View>

          {/* Seats Layout Grid */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.seatsGridContainer}
          >
            {SEAT_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.seatRow}>
                {/* Sol Taraf (2 Koltuk) */}
                <View style={styles.seatPair}>
                  {row.left.map((seatNum) => {
                    const isOccupied = OCCUPIED_SEATS.includes(seatNum);
                    const isSelected = selectedSeat === seatNum;

                    return (
                      <TouchableOpacity
                        key={seatNum}
                        activeOpacity={isOccupied ? 1 : 0.7}
                        onPress={() => handleSeatPress(seatNum)}
                        style={[
                          styles.seatBox,
                          isOccupied && styles.occupiedSeat,
                          !isOccupied && styles.availableSeat,
                          isSelected && styles.selectedSeat,
                        ]}
                      >
                        <Text style={styles.seatText}>{seatNum}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Koridor Boşluğu (Aisle) */}
                <View style={styles.aisleGap} />

                {/* Sağ Taraf (2 Koltuk) */}
                <View style={styles.seatPair}>
                  {row.right.map((seatNum) => {
                    const isOccupied = OCCUPIED_SEATS.includes(seatNum);
                    const isSelected = selectedSeat === seatNum;

                    return (
                      <TouchableOpacity
                        key={seatNum}
                        activeOpacity={isOccupied ? 1 : 0.7}
                        onPress={() => handleSeatPress(seatNum)}
                        style={[
                          styles.seatBox,
                          isOccupied && styles.occupiedSeat,
                          !isOccupied && styles.availableSeat,
                          isSelected && styles.selectedSeat,
                        ]}
                      >
                        <Text style={styles.seatText}>{seatNum}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Action Button (Selected seat yoksa disabled gri, seçilirse aktif mavi) */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedSeat !== null ? styles.activeButton : styles.disabledButton,
            ]}
            disabled={selectedSeat === null}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.azure[50], // Figma'daki açık mavi modal kartı
    borderTopLeftRadius: RADIUS.lg * 1.5,
    borderTopRightRadius: RADIUS.lg * 1.5,
    maxHeight: '85%',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.grey[300],
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: RADIUS.full,
  },
  legendText: {
    ...TYPOGRAPHY.body2,
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  seatsGridContainer: {
    paddingVertical: SPACING.xs,
    gap: SPACING.sm,
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatPair: {
    flexDirection: 'row',
    gap: SPACING.xs + 2,
  },
  aisleGap: {
    width: 32, // Koridor boşluğu
  },
  seatBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableSeat: {
    backgroundColor: COLORS.azure[500], // Mavi koltuk
  },
  occupiedSeat: {
    backgroundColor: COLORS.azure[950], // Koyu lacivert dolu koltuk
  },
  selectedSeat: {
    backgroundColor: COLORS.state.mid, // Turuncu seçili koltuk (#FF8E1B)
  },
  seatText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
  continueButton: {
    height: 52,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  disabledButton: {
    backgroundColor: COLORS.grey[400], // Seçim yokken gri
  },
  activeButton: {
    backgroundColor: COLORS.azure[800], // Seçim yapıldığında aktif lacivert
  },
  continueButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.cardBg,
  },
});