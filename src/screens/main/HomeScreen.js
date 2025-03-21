import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="px-4">
          {/* Nhóm icon điều hướng */}
          <View className="mb-6">
            {/* Nhóm 1: Sàn Thương mại điện tử */}
            <View className="mb-4">
              <Text className="text-lg font-bold text-gray-800 mb-3">Sàn Thương mại điện tử</Text>
              <View className="flex-row justify-between">
                <TouchableOpacity 
                  className="bg-white rounded-xl p-4 items-center justify-center w-[48%] shadow-sm"
                  onPress={() => navigation.navigate('DonSan')}
                >
                  <View className="bg-blue-100 p-3 rounded-full mb-2">
                    <MaterialCommunityIcons name="shopping" size={30} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-800 font-medium">Đơn sàn</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-white rounded-xl p-4 items-center justify-center w-[48%] shadow-sm"
                  onPress={() => navigation.navigate('HoaToc')}
                >
                  <View className="bg-red-100 p-3 rounded-full mb-2">
                    <MaterialCommunityIcons name="flash" size={30} color="#ef4444" />
                  </View>
                  <Text className="text-gray-800 font-medium">Hoả tốc</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Nhóm 2: Tem Giao Hàng */}
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-3">Tem Giao Hàng</Text>
              <View className="flex-row justify-between">
                <TouchableOpacity 
                  className="bg-white rounded-xl p-4 items-center justify-center w-[48%] shadow-sm"
                  onPress={() => navigation.navigate('GiaoHang')}
                >
                  <View className="bg-green-100 p-3 rounded-full mb-2">
                    <MaterialCommunityIcons name="truck-delivery" size={30} color="#10b981" />
                  </View>
                  <Text className="text-gray-800 font-medium">Giao Hàng</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-white rounded-xl p-4 items-center justify-center w-[48%] shadow-sm"
                  onPress={() => navigation.navigate('ThongKeGiaoHang')}
                >
                  <View className="bg-purple-100 p-3 rounded-full mb-2">
                    <MaterialCommunityIcons name="chart-bar" size={30} color="#8b5cf6" />
                  </View>
                  <Text className="text-gray-800 font-medium">Thống kê giao hàng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen; 