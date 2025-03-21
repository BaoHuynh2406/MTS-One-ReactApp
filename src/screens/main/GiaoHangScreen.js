import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const GiaoHangScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6 flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-green-600 mb-4">Giao Hàng</Text>
        <Text className="text-lg text-gray-700 text-center">
          Chào mừng đến với trang quản lý giao hàng.
          Tại đây bạn có thể tạo và quản lý các đơn hàng cần giao.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GiaoHangScreen; 