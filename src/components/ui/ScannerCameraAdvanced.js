import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { height, width } = Dimensions.get('window');
const SCANNER_HEIGHT = height / 3.33;
const SCAN_AREA_WIDTH = width * 0.7;
const SCAN_AREA_HEIGHT = SCANNER_HEIGHT * 0.5;

const ScannerCameraAdvanced = ({ onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [sound, setSound] = useState(null); // Add state for sound
  const [flash, setFlash] = useState(false); // Add state for flash
  const scanLineAnimation = useState(new Animated.Value(0))[0];

  // Check camera permission and request if not granted
  useEffect(() => {
    setLoading(false);
    startScanLineAnimation();
    return () => {
      // Cleanup sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [permission, sound]); 

  const playTickSound = async () => {
    try {
      // Unload previous sound if exists
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

  const handleBarCodeScanned = async (event) => {
    // Nếu đang trong trạng thái scanned, bỏ qua
    if (scanned) {
      console.log('Already scanned, skipping...');
      return;
    }

    try {
      setScanned(true);
      setScanResult({ type: event.type, data: event.data });
      
      // Phát âm thanh
      await playTickSound();
      
      // Gọi callback
      if (onScan) {
        onScan(event);
      }

      // Tạm dừng quét 1 giây
      setTimeout(() => {
        setScanned(false);
        setScanResult(null);
      }, 1000);
    } catch (error) {
      console.error('Error in handleBarCodeScanned:', error);
      // Reset state in case of error
      setScanned(false);
      setScanResult(null);
    }
  };

  const startScanLineAnimation = () => {
    scanLineAnimation.setValue(0);
    Animated.loop(
      Animated.timing(scanLineAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  if (loading) {
    return (
      <View className="h-[30vh] bg-gray-100 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-2">Đang khởi tạo camera...</Text>
      </View>
    );
  }

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View className="h-[30vh] bg-gray-100 items-center justify-center">
        <Text className="text-gray-600">Đang yêu cầu quyền truy cập camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="h-[30vh] bg-gray-800 items-center justify-center">
        <MaterialCommunityIcons name="camera-off" size={50} color="#ef4444" />
        <Text className="text-white text-center mt-2">
          Không có quyền truy cập camera
        </Text>
        <View className="mt-4">
          <Text 
            className="text-blue-400 font-bold p-2"
            onPress={requestPermission}
          >
            Cấp quyền truy cập
          </Text>
        </View>
      </View>
    );
  }

  // Tính toán vị trí của khung quét để nó nằm giữa
  const scanAreaTop = (SCANNER_HEIGHT - SCAN_AREA_HEIGHT) / 2;
  const scanAreaLeft = (width - SCAN_AREA_WIDTH) / 2;

  const translateY = scanLineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCAN_AREA_HEIGHT],
  });

  return (
    <View className="h-[30vh]  bg-black overflow-hidden">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back" 
        enableTorch={flash} 
        autoFocus={'on'}
        zoom={0.5}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'code128', 'code39', 'ean13', 'ean8', 'upc'],
        }}
        onMountError={(error) => {
          console.error('Camera mount error:', error);
        }}
        onBarcodeScanned={(event) => {
          handleBarCodeScanned(event);
        }}
      />
      
      {/* Flash Toggle Button */}
      <TouchableOpacity 
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50"
        onPress={() => setFlash(!flash)}
      >
        <MaterialCommunityIcons 
          name={flash ? "flash" : "flash-off"} 
          size={24} 
          color={flash ? "#fbbf24" : "white"} 
        />
      </TouchableOpacity>

      {/* Lớp phủ mờ - Tạo 4 phần xung quanh khu vực quét */}
      <View style={[StyleSheet.absoluteFillObject]}>
        {/* Phần trên */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: scanAreaTop,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }} />
        
        {/* Phần dưới - Điều chỉnh vị trí và kích thước */}
        <View style={{
          position: 'absolute',
          top: scanAreaTop + SCAN_AREA_HEIGHT, // Thay đổi từ bottom thành top
          left: 0,
          right: 0,
          bottom: 0, // Thêm bottom: 0 để phủ hết phần còn lại
          backgroundColor: 'rgba(0,0,0,0.7)',
        }} />
        
        {/* Phần trái */}
        <View style={{
          position: 'absolute',
          top: scanAreaTop,
          left: 0,
          width: scanAreaLeft,
          height: SCAN_AREA_HEIGHT,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }} />
        
        {/* Phần phải */}
        <View style={{
          position: 'absolute',
          top: scanAreaTop,
          right: 0,
          width: scanAreaLeft,
          height: SCAN_AREA_HEIGHT,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }} />
      </View>
      
      {/* Khu vực quét (phần trong suốt) */}
      <View style={{
        position: 'absolute',
        top: scanAreaTop,
        left: scanAreaLeft,
        width: SCAN_AREA_WIDTH,
        height: SCAN_AREA_HEIGHT,
      }}>
        {/* Khung quét */}
        <View style={{
          width: '100%',
          height: '100%',
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.8)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* Đường quét với hiệu ứng phát sáng */}
          <Animated.View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: '#3b82f6',
            shadowColor: '#3b82f6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
            transform: [{ translateY }]
          }} />
        </View>
        
        {/* Góc khung đẹp hơn */}
        <View style={{ position: 'absolute', top: -3, left: -3, width: 25, height: 25, borderTopWidth: 5, borderLeftWidth: 5, borderColor: '#3b82f6', borderTopLeftRadius: 12 }} />
        <View style={{ position: 'absolute', top: -3, right: -3, width: 25, height: 25, borderTopWidth: 5, borderRightWidth: 5, borderColor: '#3b82f6', borderTopRightRadius: 12 }} />
        <View style={{ position: 'absolute', bottom: -3, left: -3, width: 25, height: 25, borderBottomWidth: 5, borderLeftWidth: 5, borderColor: '#3b82f6', borderBottomLeftRadius: 12 }} />
        <View style={{ position: 'absolute', bottom: -3, right: -3, width: 25, height: 25, borderBottomWidth: 5, borderRightWidth: 5, borderColor: '#3b82f6', borderBottomRightRadius: 12 }} />
      </View>
      
      {/* Hiển thị kết quả quét */}
      {scanResult && (
        <View style={{
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          backgroundColor: 'rgba(59,130,246,0.9)',
          padding: 15,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <MaterialCommunityIcons name="check-circle" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontSize: 16, flex: 1, textAlign: 'center' }}>
            {scanResult.data}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ScannerCameraAdvanced;