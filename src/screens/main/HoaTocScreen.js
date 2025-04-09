import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const recentActivities = [
  { id: '1', title: 'Đơn hàng #12345', timestamp: '10:30 AM' },
  { id: '2', title: 'Đơn hàng #12346', timestamp: '9:45 AM' },
  { id: '3', title: 'Đơn hàng #12347', timestamp: '9:00 AM' },
];

const HoaTocScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaWrapper>
      <View className="flex-1 bg-gray-100">
       

        <View className="p-6">
          {/* Action Buttons Section */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              className="bg-orange-400 flex-1 rounded-xl p-5 flex-row items-center justify-center mr-3 shadow-md"
              onPress={() => navigation.navigate('ExpressOrder')}
            >
              <MaterialCommunityIcons name="flash" size={30} color="white" />
              <Text style={{color: "white"}} className="text-white font-bold text-lg ml-3">Quét Hoả Tốc</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 flex-1 rounded-xl p-5 flex-row items-center justify-center shadow-md"
              onPress={() => navigation.navigate('History')}
            >
              <MaterialCommunityIcons name="history" size={30} color="#4b5563" />
              <Text className="text-gray-800 font-bold text-lg ml-3">Xem Lịch Sử</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity Section */}
          <View className="bg-white rounded-xl p-4 shadow-md mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Hoạt động gần đây</Text>
            <FlatList
              data={recentActivities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="flex-row justify-between items-center bg-gray-50 p-4 mb-2 rounded-lg shadow-sm">
                  <Text className="text-gray-800 font-medium">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">{item.timestamp}</Text>
                </View>
              )}
            />
          </View>

          {/* Statistics Section */}
          <View className="bg-white rounded-xl p-4 shadow-md">
            <Text className="text-lg font-bold text-gray-800 mb-4">Thống kê</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Đơn hàng hôm nay:</Text>
              <Text className="text-gray-800 font-bold">15</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Sản phẩm đã quét:</Text>
              <Text className="text-gray-800 font-bold">120</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default HoaTocScreen;