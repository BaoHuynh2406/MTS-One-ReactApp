import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ScannerCameraAdvanced from '../../../components/ui/ScannerCameraAdvanced';

const ScanOrderStep = ({ onOrderScanned }) => {
  const [loading, setLoading] = useState(false);

  const handleScan = async (scanData) => {
      setLoading(true);
      // Phân tích dữ liệu mã QR đơn hàng
      console.log('Scan data:', scanData);
      // Giả lập dữ liệu đơn hàng từ QR code
      // Trong thực tế, bạn sẽ gọi API để kiểm tra mã đơn hàng
      const orderInfo = parseOrderQRCode(scanData.data);
      onOrderScanned(orderInfo);
      setLoading(false); 
  };

  // Hàm mô phỏng phân tích mã QR đơn hàng
  const parseOrderQRCode = (qrData) => {
    // Trong thực tế, dữ liệu QR sẽ có định dạng cụ thể và cần phân tích
    // Đây chỉ là mô phỏng
    return {
      id: 'ORD-' + Math.floor(Math.random() * 10000),
      orderNumber: 'HD' + Math.floor(Math.random() * 100000),
      customerName: 'Nguyễn Văn A',
      customerPhone: '098765432' + Math.floor(Math.random() * 10),
      address: '123 Đường ABC, Quận XYZ, TP. HCM',
      products: [
        { id: 'P001', name: 'Sản phẩm 1', quantity: 2, code: 'CODE001' },
        { id: 'P002', name: 'Sản phẩm 2', quantity: 1, code: 'CODE002' },
        { id: 'P003', name: 'Sản phẩm 3', quantity: 3, code: 'CODE003' },
      ]
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>Quét mã đơn hàng</Text>
      
      <View style={styles.scannerContainer}>
        <ScannerCameraAdvanced onScan={handleScan} />
      </View>
      
      <View style={styles.instructionContainer}>
        <Text style={styles.instruction}>
          Đặt mã QR đơn hàng vào khung để quét
        </Text>
        <Text style={styles.subInstruction}>
          Vui lòng giữ điện thoại ổn định trong quá trình quét
        </Text>
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
  scannerContainer: {
    flex: 1,
  },
  instructionContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  subInstruction: {
    fontSize: 14,
    textAlign: 'center',
    color: '#757575',
  },
});

export default ScanOrderStep; 