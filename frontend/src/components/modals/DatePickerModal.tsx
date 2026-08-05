import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (dateString: string) => void;
  title?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DatePickerModal({
  visible,
  onClose,
  onSelectDate,
  title = 'Select Date',
}: DatePickerModalProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleConfirm = () => {
    if (selectedDay) {
      onSelectDate(`${selectedDay} Sep, 2026`);
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        
        <View style={styles.modalContent}>
          <View style={styles.handleBar} />
          <Text style={styles.modalTitle}>{title}</Text>

          {/* Month Header */}
          <View style={styles.monthHeader}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.monthText}>September 2026</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Days Header */}
          <View style={styles.daysRow}>
            {DAYS.map((day, idx) => (
              <Text key={idx} style={styles.dayHeaderText}>{day}</Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <ScrollView contentContainerStyle={styles.calendarGrid}>
            {dates.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Date</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: RADIUS.lg * 1.5,
    borderTopRightRadius: RADIUS.lg * 1.5,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    maxHeight: '70%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.grey[200],
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  monthText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.sm,
  },
  dayHeaderText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    width: 36,
    textAlign: 'center',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayCell: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  selectedDayCell: {
    backgroundColor: COLORS.azure[900],
  },
  dayText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
  },
  selectedDayText: {
    color: COLORS.cardBg,
    fontWeight: '700',
  },
  confirmButton: {
    backgroundColor: COLORS.azure[900],
    height: 50,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  confirmButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBg,
    fontWeight: '700',
  },
});