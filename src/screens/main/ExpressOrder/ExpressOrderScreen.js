import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScanOrderStep from './ScanOrderStep';
import ScanProductsStep from './ScanProductsStep';
import PhoneNumberStep from './PhoneNumberStep';
import TakePhotoStep from './TakePhotoStep';
import StepIndicator from './StepIndicator';

const ExpressOrderScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState('SCAN_ORDER');
  const [orderData, setOrderData] = useState(null);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [deliveryImage, setDeliveryImage] = useState(null);
  const [phoneNumberImage, setPhoneNumberImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Reset state when the screen is opened
    return () => {
      setOrderData(null);
      setScannedProducts([]);
      setDeliveryImage(null);
      setPhoneNumberImage(null);
      setPhoneNumber('');
    };
  }, []);

  // Handle saving the express order
  const saveExpressOrder = async () => {
    try {
      // Simulate API call to save the order
      // await orderService.saveExpressOrder({
      //   orderData,
      //   scannedProducts,
      //   deliveryImage,
      //   phoneNumberImage,
      //   phoneNumber
      // });

      // Navigate back to the main screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving express order:', error);
      alert('Đã xảy ra lỗi khi lưu đơn hàng!');
    }
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'SCAN_ORDER':
        return (
          <ScanOrderStep
            onOrderScanned={(order) => {
              setOrderData(order);
              setCurrentStep('SCAN_PRODUCTS');
            }}
          />
        );

      case 'SCAN_PRODUCTS':
        return (
          <ScanProductsStep
            orderData={orderData}
            scannedProducts={scannedProducts}
            onProductScanned={(product, isFullUpdate) => {
              if (isFullUpdate && Array.isArray(product)) {
                // Update the entire list (from QuantityInput)
                setScannedProducts(product);
              } else {
                // Add a new product to the list
                setScannedProducts((prev) => [...prev, product]);
              }
            }}
            onComplete={() => setCurrentStep('PHONE_NUMBER')}
            navigation={navigation}
          />
        );

      case 'PHONE_NUMBER':
        return (
          <PhoneNumberStep
            onComplete={(data) => {
              setPhoneNumberImage(data.image);
              setPhoneNumber(data.phoneNumber);
              setCurrentStep('TAKE_PHOTO');
            }}
            onBack={() => setCurrentStep('SCAN_PRODUCTS')}
          />
        );

      case 'TAKE_PHOTO':
        return (
          <TakePhotoStep
            onComplete={(image) => {
              setDeliveryImage(image);
              saveExpressOrder();
            }}
            onBack={() => setCurrentStep('PHONE_NUMBER')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="#333"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-lg font-bold text-gray-900">Đơn hàng hoả tốc</Text>
        <View className="w-6" />
      </View>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        steps={[
          { key: 'SCAN_ORDER', label: 'Quét đơn' },
          { key: 'SCAN_PRODUCTS', label: 'Quét sản phẩm' },
          { key: 'PHONE_NUMBER', label: 'SĐT' },
          { key: 'TAKE_PHOTO', label: 'Ảnh giao' },
        ]}
      />

      {/* Content */}
      <View className="flex-1">{renderStepContent()}</View>
    </SafeAreaView>
  );
};

export default ExpressOrderScreen;