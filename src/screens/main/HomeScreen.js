import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const HomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaWrapper>
      <ScrollView className="bg-white px-4" contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header Section */}
        <View>
          <View>
            <Text style={{ color: '#3b82f6', fontWeight: 'bold' }} className="text-2xl font-bold">
              Chào, {user?.fullName || 'User'}!
            </Text>
            <Text style={{ color: '#3339', fontSize: 12, fontStyle: 'italic' }} className="text-gray-600">
              Hôm nay là {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Search Bar Section */}
        <View className="my-5">
          <View
            style={{
              backgroundColor: '#f3f4f6',
              height: 60,
              borderRadius: 20,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name="magnify" size={24} color="#3b82f6" />
            <TextInput
              placeholder="Tìm kiếm đơn hàng..."
              placeholderTextColor="#3b82f6"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                marginLeft: 10,
                color: '#3b82f6',
                fontSize: 16,
              }}
            />
          </View>
        </View>

        {/* Sàn Thương Mại Điện Tử Section */}
        <View className="mt-4">
          <Text style={{color: '#3b82f6'}} className="text-lg font-bold mb-4">Sàn TMDT</Text>
          <View className="flex-row justify-between ">
            <TouchableOpacity
                className="me-1 bg-red-100 flex-1 rounded-3xl p-5 items-center justify-center shadow-sm"
                onPress={() => navigation.navigate('HoaToc-main')}
              >
                <View className="bg-red-200 p-3 rounded-full mb-2">
                  <MaterialCommunityIcons name="flash" size={30} color="#ef4444" />
                </View>
                <Text className="text-gray-800 font-medium">Hoả tốc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="ms-1 bg-blue-50 flex-1 rounded-3xl p-5 items-center justify-center shadow-sm"
              onPress={() => navigation.navigate('DonSan')}
            >
              <View className="bg-blue-100 p-3 rounded-full mb-2">
                <MaterialCommunityIcons name="shopping" size={30} color="#3b82f6" />
              </View>
              <Text className="text-gray-800 font-medium">Đơn sàn</Text>
            </TouchableOpacity>
           
          </View>
        </View>

        {/* Test Section */}
        <View className="mt-4">
          <Text style={{ color: '#3b82f6' }} className="text-lg font-bold mb-4">Test</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="me-1 bg-green-100 flex-1 rounded-3xl p-5 items-center justify-center shadow-sm"
              onPress={() => navigation.navigate('UserProfile')}
            >
              <View className="bg-green-200 p-3 rounded-full mb-2">
                <MaterialCommunityIcons name="account-circle" size={30} color="#10b981" />
              </View>
              <Text className="text-gray-800 font-medium">Test A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="ms-1 bg-purple-100 flex-1 rounded-3xl p-5 items-center justify-center shadow-sm"
              onPress={() => navigation.navigate('ThongKeGiaoHang')}
            >
              <View className="bg-purple-200 p-3 rounded-full mb-2">
                <MaterialCommunityIcons name="chart-bar" size={30} color="#8b5cf6" />
              </View>
              <Text className="text-gray-800 font-medium">Test B</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;