import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonSanScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6 flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-blue-600 mb-4">Đơn sàn</Text>
        <Text className="text-lg text-gray-700 text-center">
          Chào mừng đến với trang quản lý đơn hàng từ các sàn thương mại điện tử.
          Tính năng này sẽ được phát triển trong tương lai.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DonSanScreen; 