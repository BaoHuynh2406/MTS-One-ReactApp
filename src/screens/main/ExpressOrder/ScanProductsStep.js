import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScannerCameraAdvanced from '../../../components/ui/ScannerCameraAdvanced';
import ProductsCard from '../../../components/ui/ProductsCard';
import CustomInputPopup from '../../../components/ui/CustomInputPopup';
import { Audio } from 'expo-av';

const ScanProductsStep = ({ orderData, scannedProducts, onProductScanned, onComplete, navigation }) => {
  const [sound, setSound] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);

  useEffect(() => {
    // Use scannedProducts from props if available
    if (scannedProducts && scannedProducts.length > 0) {
      setScannedItems(scannedProducts);
    }

    return () => {
      // Cleanup sound
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSuccessSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('@assets/beep.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleScan = async (scanData) => {
    console.log('Product scan data:', scanData);
    const productInfo = parseProductBarcode(scanData.data);
    const productInOrder = orderData.products.find(p => p.id === productInfo.id);

    if (productInOrder) {
      const scannedCount = scannedItems.filter(p => p.id === productInfo.id).length;

      if (scannedCount >= productInOrder.quantity) {
        playSuccessSound();
      }

      const updatedScannedItems = [...scannedItems, productInfo];
      setScannedItems(updatedScannedItems);

      if (onProductScanned) {
        onProductScanned(productInfo);
      }

      if (scannedCount < productInOrder.quantity) {
        playSuccessSound();
      }

      const productCounts = {};
      updatedScannedItems.forEach(item => {
        productCounts[item.id] = (productCounts[item.id] || 0) + 1;
      });

      const allProductsComplete = orderData.products.every(product =>
        (productCounts[product.id] || 0) >= product.quantity
      );

      if (allProductsComplete) {
        setTimeout(() => {
          Alert.alert(
            "Đã quét đủ sản phẩm",
            "Bạn có muốn tiếp tục chụp ảnh bàn giao?",
            [
              { text: "Tiếp tục quét", style: "cancel" },
              { text: "Tiếp tục", onPress: onComplete }
            ]
          );
        }, 800);
      }
    } else {
      const updatedScannedItems = [...scannedItems, productInfo];
      setScannedItems(updatedScannedItems);

      if (onProductScanned) {
        onProductScanned(productInfo);
      }

      playSuccessSound();
      Alert.alert('Quét thành công', `Đã thêm sản phẩm mới: ${productInfo.name}`);
    }
  };

  const parseProductBarcode = (barcodeData) => {
    if (orderData && orderData.products && orderData.products.length > 0) {
      const randomIndex = Math.floor(Math.random() * orderData.products.length);
      return orderData.products[randomIndex];
    }

    return {
      id: 'P00' + Math.floor(Math.random() * 10),
      name: 'Sản phẩm mô phỏng',
      quantity: 1,
      code: barcodeData,
    };
  };

  const handleManualCodeInput = (item) => {
    if (!item || !item.code) return;
    handleScan({ type: 'manual', data: item.code });
  };

  const handleProductSearch = async (searchText) => {
    if (!searchText || !orderData || !orderData.products) return [];

    const searchLower = searchText.toLowerCase();
    return orderData.products
      .filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.code.toLowerCase().includes(searchLower)
      )
      .map(p => ({
        id: p.id,
        name: p.name,
        description: `Mã: ${p.code}`,
        code: p.code
      }));
  };

  const handleUpdateScannedProduct = (productId, newQuantity) => {
    const otherProducts = scannedItems.filter(p => p.id !== productId);
    const productInfo = orderData.products.find(p => p.id === productId);

    if (!productInfo) return;

    const updatedScannedItems = [
      ...otherProducts,
      ...Array(newQuantity).fill(productInfo)
    ];

    setScannedItems(updatedScannedItems);

    if (onProductScanned) {
      onProductScanned(updatedScannedItems, true);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="h-[220px] relative">
        <ScannerCameraAdvanced onScan={handleScan} />
        <View className="absolute top-16 right-4 z-10">
          <CustomInputPopup
            onSelect={handleManualCodeInput}
            onSearch={handleProductSearch}
            placeholder="Nhập mã sản phẩm hoặc tên"
            buttonSize={20}
            buttonColor="#3b82f6"
          />
        </View>
      </View>

      <View className="flex-1 mt-0">
        <ProductsCard
          expectedProducts={orderData.products}
          scannedProducts={scannedItems}
          onUpdateScannedProduct={handleUpdateScannedProduct}
          title="Danh sách sản phẩm"
          subtitle={`Đã quét: ${scannedItems.length}/${orderData.products.reduce((sum, p) => sum + p.quantity, 0)}`}
        />
      </View>

      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-t border-gray-300">
        <TouchableOpacity
          className="flex-row items-center px-2"
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color="#3b82f6" />
          <Text className="text-blue-500 font-bold ml-1">Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center rounded-lg px-5 py-3 ${
            scannedItems.length === 0 ? 'bg-gray-400' : 'bg-blue-500'
          }`}
          onPress={onComplete}
          disabled={scannedItems.length === 0}
        >
          <Text className="text-white font-bold text-base mr-2">Tiếp tục</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanProductsStep;