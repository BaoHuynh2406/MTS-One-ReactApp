import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScannerCameraAdvanced from '../../../components/ui/ScannerCameraAdvanced';
import ProductsCard from '../../../components/ui/ProductsCard';
import CustomInputPopup from '../../../components/ui/CustomInputPopup';
import { Audio } from 'expo-av';

const ScanProductsStep = ({ orderData, scannedProducts, onProductScanned, onComplete, navigation }) => {
  const [sound, setSound] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);
  
  useEffect(() => {
    // Sử dụng scannedProducts từ props nếu có
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
      // Unload previous sound if exists
      if (sound) {
        await sound.unloadAsync();
      }
      
      // TODO: Thay đường dẫn file âm thanh thực tế
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('@assets/beep.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playErrorSound = async () => {
    try {
      // Unload previous sound if exists
      if (sound) {
        await sound.unloadAsync();
      }
      
      // TODO: Thay đường dẫn file âm thanh thực tế
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('@assets/beep.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing error sound:', error);
    }
  };

  // Xử lý khi quét được mã barcode
  const handleScan = async (scanData) => {
    console.log('Product scan data:', scanData);
    
    // Giả lập phân tích mã sản phẩm
    const productInfo = parseProductBarcode(scanData.data);
    
    // Kiểm tra sản phẩm có thuộc đơn hàng không
    const productInOrder = orderData.products.find(p => p.id === productInfo.id);
    
    if (productInOrder) {
      // Đếm số lần sản phẩm đã được quét
      const scannedCount = scannedItems.filter(p => p.id === productInfo.id).length;
      
      // Thông báo nếu đã vượt quá số lượng mong muốn (nhưng vẫn cho phép quét)
      if (scannedCount >= productInOrder.quantity) {
        playSuccessSound(); // Vẫn sử dụng success sound
        Alert.alert('Thông báo', `Sản phẩm "${productInfo.name}" đã vượt quá số lượng yêu cầu (${productInOrder.quantity}). Hiện tại: ${scannedCount + 1}.`);
      }
      
      // Thêm vào danh sách đã quét (không giới hạn số lượng)
      const updatedScannedItems = [...scannedItems, productInfo];
      setScannedItems(updatedScannedItems);
      
      // Gọi callback từ props
      if (onProductScanned) {
        onProductScanned(productInfo);
      }
      
      // Phát âm thanh và hiển thị thông báo nếu chưa vượt quá số lượng
      if (scannedCount < productInOrder.quantity) {
        playSuccessSound();
        Alert.alert('Quét thành công', `Đã quét: ${productInfo.name}`);
      }
      
      // Kiểm tra xem đã quét đủ số lượng của tất cả sản phẩm chưa
      const productCounts = {};
      updatedScannedItems.forEach(item => {
        productCounts[item.id] = (productCounts[item.id] || 0) + 1;
      });
      
      const allProductsComplete = orderData.products.every(product => 
        (productCounts[product.id] || 0) >= product.quantity
      );
      
      if (allProductsComplete && !scannedItems.some(item => 
        scannedItems.filter(p => p.id === item.id).length > orderData.products.find(p => p.id === item.id)?.quantity
      )) {
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
      // Nếu sản phẩm không nằm trong danh sách cần quét, vẫn thêm vào
      const updatedScannedItems = [...scannedItems, productInfo];
      setScannedItems(updatedScannedItems);
      
      // Gọi callback từ props
      if (onProductScanned) {
        onProductScanned(productInfo);
      }
      
      // Phát âm thanh và hiển thị thông báo
      playSuccessSound();
      Alert.alert('Quét thành công', `Đã thêm sản phẩm mới: ${productInfo.name}`);
    }
  };

  // Hàm mô phỏng phân tích mã barcode sản phẩm
  const parseProductBarcode = (barcodeData) => {
    // Trong thực tế, dữ liệu barcode sẽ có định dạng cụ thể và cần phân tích
    // Đây chỉ là mô phỏng, giả lập một sản phẩm từ danh sách đơn hàng
    
    // Chọn ngẫu nhiên một sản phẩm từ danh sách đơn hàng
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

  // Xử lý khi sử dụng CustomInputPopup để nhập mã sản phẩm thủ công
  const handleManualCodeInput = (item) => {
    if (!item || !item.code) return;
    
    // Mô phỏng quét mã từ nhập liệu thủ công
    handleScan({ type: 'manual', data: item.code });
  };

  // Hàm tìm kiếm sản phẩm cho CustomInputPopup
  const handleProductSearch = async (searchText) => {
    // Trong thực tế, đây sẽ là API call để tìm kiếm sản phẩm
    // Mô phỏng tìm kiếm từ danh sách sản phẩm trong đơn hàng
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

  // Xử lý khi cập nhật số lượng sản phẩm từ ProductsCard
  const handleUpdateScannedProduct = (productId, newQuantity) => {
    // Lọc ra các sản phẩm không phải productId
    const otherProducts = scannedItems.filter(p => p.id !== productId);
    
    // Tìm sản phẩm trong danh sách sản phẩm cần quét
    const productInfo = orderData.products.find(p => p.id === productId);
    
    if (!productInfo) return;
    
    // Tạo mảng mới với số lượng đã cập nhật
    const updatedScannedItems = [
      ...otherProducts,
      ...Array(newQuantity).fill(productInfo)
    ];
    
    // Cập nhật state và gọi callback
    setScannedItems(updatedScannedItems);
    
    // Thông báo cho component cha về thay đổi
    if (onProductScanned) {
      // Thông báo thay đổi toàn bộ danh sách
      onProductScanned(updatedScannedItems, true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <ScannerCameraAdvanced onScan={handleScan} />
        <View style={styles.manualInputContainer}>
          <CustomInputPopup
            onSelect={handleManualCodeInput}
            onSearch={handleProductSearch}
            placeholder="Nhập mã sản phẩm hoặc tên"
            buttonSize={20}
            buttonColor="#3b82f6"
          />
        </View>
      </View>
      
      <View style={styles.productsCardContainer}>
        <ProductsCard 
          expectedProducts={orderData.products}
          scannedProducts={scannedItems}
          onUpdateScannedProduct={handleUpdateScannedProduct}
          title="Danh sách sản phẩm"
          subtitle={`Đã quét: ${scannedItems.length}/${orderData.products.reduce((sum, p) => sum + p.quantity, 0)}`}
        />
      </View>
      
      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color="#3b82f6" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.nextButton,
            scannedItems.length === 0 ? styles.disabledButton : {}
          ]}
          onPress={onComplete}
          disabled={scannedItems.length === 0}
        >
          <Text style={styles.nextButtonText}>Tiếp tục</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scannerContainer: {
    height: 220,
    position: 'relative',
  },
  manualInputContainer: {
    position: 'absolute',
    top: 64,
    right: 16,
    zIndex: 100,
  },
  productsCardContainer: {
    flex: 1,
    marginTop: 0,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backButtonText: {
    color: '#3b82f6',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
});

export default ScanProductsStep;