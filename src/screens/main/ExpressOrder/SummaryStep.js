import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SummaryStep = ({ orderData, scannedProducts, deliveryImage, onComplete, onBack }) => {
  // Tính tổng số lượng sản phẩm
  const totalQuantity = scannedProducts.reduce((sum, product) => sum + product.quantity, 0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>Xác nhận đơn hàng</Text>
      
      <ScrollView style={styles.content}>
        {/* Thông tin đơn hàng */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="file-document-outline" size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mã đơn hàng:</Text>
            <Text style={styles.infoValue}>{orderData.orderNumber}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Khách hàng:</Text>
            <Text style={styles.infoValue}>{orderData.customerName}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>{orderData.customerPhone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoValue}>{orderData.address}</Text>
          </View>
        </View>
        
        {/* Danh sách sản phẩm */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="package-variant" size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Sản phẩm đã quét ({scannedProducts.length})</Text>
          </View>
          
          {scannedProducts.map((product, index) => (
            <View key={product.id} style={styles.productItem}>
              <View style={styles.productIndex}>
                <Text style={styles.productIndexText}>{index + 1}</Text>
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCode}>Mã: {product.code}</Text>
                <Text style={styles.productQuantity}>Số lượng: {product.quantity}</Text>
              </View>
              
              <MaterialCommunityIcons name="check-circle" size={24} color="#10b981" />
            </View>
          ))}
          
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Tổng số lượng:</Text>
            <Text style={styles.totalValue}>{totalQuantity}</Text>
          </View>
        </View>
        
        {/* Hình ảnh bàn giao */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="image" size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Hình ảnh bàn giao</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: deliveryImage.uri }} 
              style={styles.deliveryImage} 
              resizeMode="cover"
            />
          </View>
        </View>
        
        {/* Ghi chú */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="note-text-outline" size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Ghi chú</Text>
          </View>
          
          <Text style={styles.noteText}>
            Đơn hàng đã được xác nhận và sẵn sàng giao cho khách hàng. 
            Tất cả sản phẩm đã được kiểm tra và xác nhận đầy đủ.
          </Text>
        </View>
        
        {/* Khoảng trống cuối cùng để tránh bị che bởi nút */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Nút quay lại và hoàn tất */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#3b82f6" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={onComplete}
        >
          <Text style={styles.completeButtonText}>Hoàn tất</Text>
          <MaterialCommunityIcons name="check" size={24} color="white" />
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
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 120,
    color: '#757575',
    fontSize: 14,
  },
  infoValue: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  productIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  productIndexText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  productCode: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  productQuantity: {
    fontSize: 14,
    color: '#757575',
  },
  totalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  deliveryImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  noteText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 4,
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
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
});

export default SummaryStep; 