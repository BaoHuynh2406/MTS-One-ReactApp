import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    // Reset state khi màn hình được mở
    return () => {
      setOrderData(null);
      setScannedProducts([]);
      setDeliveryImage(null);
      setPhoneNumberImage(null);
      setPhoneNumber('');
    };
  }, []);

  // Xử lý lưu đơn hoả tốc
  const saveExpressOrder = async () => {
    try {
      // Gọi API để lưu đơn hàng
      // await orderService.saveExpressOrder({
      //   orderData,
      //   scannedProducts,
      //   deliveryImage,
      //   phoneNumberImage,
      //   phoneNumber
      // });
      
      // Hiển thị thông báo thành công
      alert('Đơn hàng hoả tốc đã được lưu thành công!');
      
      // Quay về màn hình chính
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi lưu đơn hàng:', error);
      alert('Đã xảy ra lỗi khi lưu đơn hàng!');
    }
  };

  // Render theo bước hiện tại
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
                // Nếu là cập nhật toàn bộ danh sách (từ QuantityInput)
                setScannedProducts(product);
              } else {
                // Thêm một sản phẩm mới vào danh sách
                setScannedProducts(prev => [...prev, product]);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="arrow-left" 
          size={24} 
          color="#333" 
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Đơn hàng hoả tốc</Text>
        <View style={{width: 24}} />
      </View>

      <StepIndicator 
        currentStep={currentStep} 
        steps={[
          { key: 'SCAN_ORDER', label: 'Quét đơn' },
          { key: 'SCAN_PRODUCTS', label: 'Quét sản phẩm' },
          { key: 'PHONE_NUMBER', label: 'SĐT' },
          { key: 'TAKE_PHOTO', label: 'Ảnh giao' }
        ]} 
      />
      
      <View style={styles.content}>
        {renderStepContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
});

export default ExpressOrderScreen; 