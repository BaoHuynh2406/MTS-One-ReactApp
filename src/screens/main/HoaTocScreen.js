import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ScannerCameraAdvanced from '@/components/ui/ScannerCameraAdvanced';
import ProductsCard from '@/components/ui/ProductsCard';
import CustomInputPopup from '@/components/ui/CustomInputPopup';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const HoaTocScreen = () => {
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

  return (
    <SafeAreaWrapper>
      <ScannerCameraAdvanced
        onScan={({ type, data }) => {
          console.log('Loại mã:', type);
          console.log('Dữ liệu:', data);
        }}
      />

      <View className="absolute top-[25vh] right-4 z-50">
        <CustomInputPopup
          onSelect={handleSelect}
          onSearch={handleSearch}
          placeholder="Nhập tên sản phẩm hoặc SKU"
          buttonSize={20}
          buttonColor="#3b82f6"
        />
      </View>
      <ProductsCard />
      <View className="flex-1 p-6">
        <Button 
          mode="contained"
          // onPress={handleConfirm}
          // disabled={!selectedItem}
          className={"rounded-xl py-2"}
          contentStyle={{ height: 48 }}
          labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          style={{
            backgroundColor: '#3b82f6',
          }}
        >
          Tiếp tục
        </Button>
      </View>
    </SafeAreaWrapper>
  );
};

export default HoaTocScreen;