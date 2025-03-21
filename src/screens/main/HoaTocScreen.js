import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HoaTocScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6 flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-red-600 mb-4">Hoả tốc</Text>
        <Text className="text-lg text-gray-700 text-center">
          Chào mừng đến với trang quản lý đơn hàng hoả tốc.
          Các đơn hàng ưu tiên và cần xử lý nhanh sẽ được hiển thị tại đây.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HoaTocScreen; 