import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

interface LocationSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  placeholder?: string;
}

const RECENT_SEARCHES = [
  'BERLIN (BER)',
  'LONDON (LHR)',
  'NEW YORK (JFK)',
  'PARIS (CDG)',
  'MUNICH (MUC)',
  'DUBAI (DXB)',
  'TOKYO (HND)',
];

export default function LocationSearchModal({
  visible,
  onClose,
  onSelectLocation,
  placeholder = 'Enter origin city or airport',
}: LocationSearchModalProps) {
  const [query, setQuery] = useState('');

  const handleSelect = (location: string) => {
    onSelectLocation(location);
    setQuery('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlayContainer}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        
        <View style={styles.modalContent}>
          {/* Top Drag Handle */}
          <View style={styles.handleBar} />

          {/* Search Input Bar */}
          <View style={styles.searchBarContainer}>
            <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textSecondary}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color={COLORS.azure[950]} />
              </TouchableOpacity>
            )}
          </View>

          {/* Instant Match Result (overlay2'deki ISTANBUL (SAW) kartı) */}
          {query.trim().length > 0 && (
            <TouchableOpacity
              style={styles.activeQueryItem}
              onPress={() => handleSelect(query.toUpperCase())}
            >
              <Text style={styles.activeQueryText}>{query.toUpperCase()}</Text>
            </TouchableOpacity>
          )}

          {/* Section Header */}
          <Text style={styles.sectionHeader}>Recent Searchs</Text>

          {/* Recent Searches List */}
          <FlatList
            data={RECENT_SEARCHES}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem} onPress={() => handleSelect(item)}>
                <Text style={styles.listItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '85%',
    minHeight: '60%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.grey[200],
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.azure[200],
    marginBottom: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
  },
  clearButton: {
    padding: 4,
  },
  activeQueryItem: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.azure[100],
    marginBottom: SPACING.xs,
  },
  activeQueryText: {
    ...TYPOGRAPHY.body2,
    fontWeight: '700',
    color: COLORS.azure[900],
  },
  sectionHeader: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.azure[950],
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  listItem: {
    paddingVertical: SPACING.md,
  },
  listItemText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.azure[100],
  },
});