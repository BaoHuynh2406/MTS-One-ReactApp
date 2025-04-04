import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
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
      ],
    };
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-lg font-bold text-gray-800 mx-4 my-3">
        Quét mã đơn hàng
      </Text>

      <View className="flex-1">
        <ScannerCameraAdvanced onScan={handleScan} />
      </View>

      <View className="p-4 bg-white border-t border-gray-300">
        <Text className="text-base text-center text-gray-800 mb-1">
          Đặt mã QR đơn hàng vào khung để quét
        </Text>
        <Text className="text-sm text-center text-gray-500">
          Vui lòng giữ điện thoại ổn định trong quá trình quét
        </Text>
      </View>
    </View>
  );
};

export default ScanOrderStep;