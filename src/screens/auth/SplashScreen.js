import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUserAsync } from '@/store/authSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for existing token
        const accessToken = await AsyncStorage.getItem('access_token');
        
        if (!accessToken) {
          // No token found, navigate to login
          navigation.replace('Login');
          return;
        }

        // Token exists, verify it by getting current user
        const resultAction = await dispatch(getCurrentUserAsync()).unwrap();
        
        if (resultAction) {
          // Token is valid and user info retrieved successfully
          navigation.replace('Trang chủ');
        } else {
          // Token validation failed
          await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
          navigation.replace('Login');
        }
      } catch (error) {
        // Error occurred, clear tokens and redirect to login
        console.log('Auth check failed:', error);
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        navigation.replace('Login');
      }
    };

    // Add a small delay for splash screen visibility
    const timer = setTimeout(() => {
      checkAuth();
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation, dispatch]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image 
        source={require('@assets/splash.png')}
        style={{ width: 120, height: 120 }}
        resizeMode="contain"
      />
      <Text className="text-blue-500 text-3xl font-bold mt-4">MTS One</Text>
      <Text className="text-blue-500 text-lg mt-2">All in one</Text>
    </View>
  );
};

export default SplashScreen;