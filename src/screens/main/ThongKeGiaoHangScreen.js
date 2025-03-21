import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThongKeGiaoHangScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6 flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-purple-600 mb-4">Thống kê giao hàng</Text>
        <Text className="text-lg text-gray-700 text-center">
          Chào mừng đến với trang thống kê giao hàng.
          Tại đây bạn có thể theo dõi và phân tích các dữ liệu về việc giao hàng.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ThongKeGiaoHangScreen; 