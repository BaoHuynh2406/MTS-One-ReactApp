import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Trang chủ');
      } else {
        navigation.replace('Login');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-3xl font-bold mb-4">MTS One</Text>
      <Text className="text-white text-lg">All in one</Text>
    </View>
  );
};

export default SplashScreen;