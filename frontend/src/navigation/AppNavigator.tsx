import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import SearchResultsScreen, { TicketItem } from '../screens/main/SearchResultsScreen';
import BusDetailsScreen from '../screens/main/BusDetailsScreen';
import FlightDetailsScreen from '../screens/main/FlightDetailsScreen';
import HotelDetailsScreen from '../screens/main/HotelDetailsScreen';
import PaymentScreen from '../screens/main/PaymentScreen';
import BookingSuccessScreen from '../screens/main/BookingSuccessScreen';
import TripsScreen from '../screens/main/TripsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  SearchResults: {
    category?: 'plane' | 'bus' | 'hotel' | 'car';
    tripType?: 'one-way' | 'round-trip';
    fromLocation?: string;
    toLocation?: string;
    departureDate?: string;
    returnDate?: string;
  } | undefined;
  BusDetails: {
    ticket?: TicketItem | null;
    seatNumber?: number | null;
  } | undefined;
  FlightDetails: {
    ticket?: TicketItem | null;
    fare?: any;
  } | undefined;
  HotelDetails: {
    hotel?: any;
  } | undefined;
  Payment: {
    ticket?: TicketItem | null;
    category?: string;
    seatNumber?: number | null;
    passengerInfo?: any;
  } | undefined;
  BookingSuccess: {
    category?: string;
    ticket?: TicketItem | null;
  } | undefined;
  Trips: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
      <Stack.Screen name="FlightDetails" component={FlightDetailsScreen} />
      <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
      <Stack.Screen name="Trips" component={TripsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}