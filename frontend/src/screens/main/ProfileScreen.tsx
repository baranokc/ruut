import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';

export default function ProfileScreen({ navigation }: any) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((previousState) => !previousState);

  const handleLogOut = () => {
    // Giriş sayfasına yönlendirme
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info Section */}
        <View style={styles.userSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Eren Büyüköner</Text>
          <Text style={styles.userEmail}>eren.buyukoner@outlook.com</Text>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuList}>
          {/* My Account */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Ionicons name="person" size={20} color={COLORS.azure[950]} />
              <Text style={styles.menuText}>My Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.azure[950]} />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Ionicons name="settings" size={20} color={COLORS.azure[950]} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.azure[950]} />
          </TouchableOpacity>

          {/* Help Center */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle" size={20} color={COLORS.azure[950]} />
              <Text style={styles.menuText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.azure[950]} />
          </TouchableOpacity>

          {/* Dark Theme Switch Item */}
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="moon" size={20} color={COLORS.azure[950]} />
              <Text style={styles.menuText}>Dark Theme</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.azure[200], true: COLORS.azure[800] }}
              thumbColor={COLORS.cardBg}
              ios_backgroundColor={COLORS.azure[200]}
              onValueChange={toggleTheme}
              value={isDarkTheme}
            />
          </View>

          {/* Log Out */}
          <TouchableOpacity style={styles.menuItem} onPress={handleLogOut} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.azure[950]} />
              <Text style={styles.menuText}>Log Out</Text>
            </View>
          </TouchableOpacity>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate('Trips')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color={COLORS.azure[300]} />
          <Text style={styles.navText}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Ionicons name="person" size={24} color={COLORS.cardBg} />
          <Text style={[styles.navText, styles.activeNavText]}>Profile</Text>
          <View style={styles.activeDot} />
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
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
  },
  userSection: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
  },
  userName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.azure[950],
    fontWeight: '700',
    marginBottom: 2,
  },
  userEmail: {
    ...TYPOGRAPHY.caption,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  menuList: {
    gap: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.azure[100],
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.azure[200],
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  menuText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.azure[950],
    fontWeight: '600',
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