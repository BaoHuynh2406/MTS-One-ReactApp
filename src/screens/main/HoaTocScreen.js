import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScannerCameraAdvanced from '@/components/ui/ScannerCameraAdvanced';
import ProductsCard from '@/components/ui/ProductsCard';
import CustomInputPopup from '@/components/ui/CustomInputPopup';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const HoaTocScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Example search function - replace with your API call
  const handleSearch = async (searchText) => {
    try {
      const data = [{
        id: 1,
        name: 'Đơn hàng 1',
        description: 'Mô tả đơn hàng 1',
      },
      {
        id: 2,
        name: 'Đơn hàng 2',
        description: 'Mô tả đơn hàng 2',
      },
      {
        id: 3,
        name: 'Đơn hàng 3',
        description: 'Mô tả đơn hàng 3',
      }]
      return data;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    // Do something with the selected item
    console.log('Selected:', item);
  };

  const handleStartExpressOrder = () => {
    navigation.navigate('ExpressOrder');
  };

  return (
    <SafeAreaWrapper>
      <View className="flex-1 p-6 space-y-4">
      
        <TouchableOpacity 
          className="flex-row items-center justify-center bg-green-600 rounded-xl py-3 mt-4"
          onPress={handleStartExpressOrder}
        >
          <MaterialCommunityIcons name="lightning-bolt" size={24} color="white" />
          <Text className="text-white font-bold text-base ml-2">
            Quy trình Hoả tốc mới
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default HoaTocScreen;