import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Sau 2 giây chuyển đến màn hình Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View  className="flex-1 justify-center items-center bg-blue-500">
      <Text  className="text-white text-3xl font-bold mb-4">MTS One</Text>
      <Text className="text-white text-lg">Chào mừng đến với ứng dụng</Text>
    </View>
  );
};


export default SplashScreen; 