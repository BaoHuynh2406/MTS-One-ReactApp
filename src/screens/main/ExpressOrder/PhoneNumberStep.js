import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Platform, Dimensions, Alert, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PhoneNumberStep = ({ onComplete, onBack }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isManualInput, setIsManualInput] = useState(false);
    
    // Kích thước khung quét
    const SCAN_FRAME_WIDTH = 300;
    const SCAN_FRAME_HEIGHT = 120;

    useEffect(() => {
        (async () => {
            const { status } = await requestPermission();
            console.log('Camera permission status:', status);
        })();
    }, []);

    const takePicture = async () => {
        if (!camera) {
            Alert.alert('Lỗi', 'Camera chưa sẵn sàng');
            return;
        }

        try {
            setIsLoading(true);
            const photo = await camera.takePictureAsync({
                quality: 0.8,
                base64: true,
                skipProcessing: Platform.OS === 'ios'
            });

            if (photo) {
                setPhoto(photo);
            }
        } catch (error) {
            console.error('Error taking picture:', error);
            Alert.alert('Lỗi', 'Không thể chụp ảnh. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = () => {
        if (!phoneNumber && !photo) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hoặc chụp ảnh');
            return;
        }

        onComplete({
            phoneNumber,
            image: photo
        });
    };

    const handleRetake = () => {
        setPhoto(null);
    };

    const handleToggleInput = () => {
        setIsManualInput(!isManualInput);
    };

    const renderCameraOrPhoto = () => {
        if (photo) {
            return (
                <View className="flex-1 relative">
                    <Image source={{ uri: photo.uri }} className="flex-1" resizeMode="contain" />
                    <View
                        className="absolute bottom-0 left-0 right-0 p-6"
                    >
                        <View className="flex-row justify-center">
                            <Button 
                                mode="contained" 
                                onPress={handleRetake}
                                icon="camera-retake"
                                className="rounded-full"
                                buttonColor="#f43f5e"
                                contentStyle={{ paddingHorizontal: 8 }}
                            >
                                Chụp lại
                            </Button>
                        </View>
                    </View>
                </View>
            );
        }

        if (!permission?.granted) {
            return (
                <View className="flex-1 justify-center items-center p-6 bg-gray-50">
                    <MaterialCommunityIcons name="camera-off" size={80} color="#9ca3af" />
                    <Text className="text-gray-600 text-center text-lg font-medium mt-4 mb-6">
                        Chúng tôi cần quyền truy cập camera để chụp ảnh số điện thoại
                    </Text>
                    <Button 
                        mode="contained" 
                        onPress={requestPermission}
                        className="rounded-full"
                        buttonColor="#3b82f6"
                        contentStyle={{ paddingHorizontal: 16 }}
                    >
                        Cấp quyền camera
                    </Button>
                </View>
            );
        }

        // Calculate scan area dimensions and position
        const scanAreaTop = (SCREEN_HEIGHT * 0.5 - SCAN_FRAME_HEIGHT) / 2;
        const scanAreaLeft = (SCREEN_WIDTH - SCAN_FRAME_WIDTH) / 2;

        return (
            <View className="flex-1">
                <CameraView
                    style={{ flex: 1 }}
                    ref={setCamera}
                    facing="back"
                    autoFocus={'on'}
                    zoom={0.5}
                    onInitialized={() => console.log('Camera initialized')}
                    onMountError={(error) => {
                        console.error('Camera mount error:', error);
                    }}
                >
                    {/* Overlay Sections */}
                    <View style={StyleSheet.absoluteFillObject}>
                        {/* Top Overlay */}
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: scanAreaTop,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                        }} />
                        
                        {/* Bottom Overlay */}
                        <View style={{
                            position: 'absolute',
                            top: scanAreaTop + SCAN_FRAME_HEIGHT,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                        }} />
                        
                        {/* Left Overlay */}
                        <View style={{
                            position: 'absolute',
                            top: scanAreaTop,
                            left: 0,
                            width: scanAreaLeft,
                            height: SCAN_FRAME_HEIGHT,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                        }} />
                        
                        {/* Right Overlay */}
                        <View style={{
                            position: 'absolute',
                            top: scanAreaTop,
                            right: 0,
                            width: scanAreaLeft,
                            height: SCAN_FRAME_HEIGHT,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                        }} />

                        {/* Scan Frame */}
                        <View style={{
                            position: 'absolute',
                            top: scanAreaTop,
                            left: scanAreaLeft,
                            width: SCAN_FRAME_WIDTH,
                            height: SCAN_FRAME_HEIGHT,
                        }}>
                            {/* Frame Border */}
                            <View style={{
                                width: '100%',
                                height: '100%',
                                borderWidth: 2,
                                borderColor: 'rgba(255,255,255,0.8)',
                                borderRadius: 12,
                            }}>
                                {/* Corner Markers */}
                                <View className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
                                <View className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
                                <View className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
                                <View className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
                            </View>
                        </View>
                    </View>

                    {/* Instructions and Capture Button */}
                    <View className="absolute bottom-10 left-0 right-0 p-6">
                       
                        <Button
                            mode="outlined"
                            onPress={takePicture}
                            loading={isLoading}
                            disabled={isLoading}
                            icon="camera"
                            className="rounded-full mx-auto"
                            textColor="white"
                            buttonColor="transparent"
                            style={{ borderColor: 'white' }}
                            contentStyle={{ paddingHorizontal: 16 }}
                        >
                            Chụp ảnh
                        </Button>
                    </View>
                </CameraView>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={onBack}
                    className="m-0"
                />
                <Text className="text-lg font-bold text-gray-900 flex-1 ml-2">
                    Số điện thoại khách hàng
                </Text>
                <IconButton
                    icon={isManualInput ? "camera" : "keyboard"}
                    size={24}
                    onPress={handleToggleInput}
                    className="m-0"
                />
            </View>

            {/* Nội dung */}
            {isManualInput ? (
                <View className="flex-1 p-6 justify-center">
                    <View className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
                        <MaterialCommunityIcons 
                            name="phone" 
                            size={40} 
                            color="#3b82f6" 
                            style={{ alignSelf: 'center', marginBottom: 16 }}
                        />
                        <Text className="text-xl font-bold text-gray-800 text-center mb-6">
                            Nhập số điện thoại khách hàng
                        </Text>
                        <TextInput
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-lg mb-6"
                            placeholder="Nhập số điện thoại"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            maxLength={15}
                        />
                        <TouchableOpacity 
                            onPress={handleToggleInput}
                            className="flex-row items-center justify-center mt-2"
                        >
                            <MaterialCommunityIcons name="camera" size={20} color="#3b82f6" />
                            <Text className="text-blue-500 ml-2 font-medium">
                                Chụp ảnh số điện thoại
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                renderCameraOrPhoto()
            )}

            {/* Footer */}
            <View className="p-4 border-t border-gray-200">
                <Button
                    mode="contained"
                    onPress={handleContinue}
                    disabled={!photo && !phoneNumber}
                    className="rounded-full"
                    icon="arrow-right"
                    contentStyle={{ flexDirection: 'row-reverse', paddingVertical: 6 }}
                    buttonColor={(!photo && !phoneNumber) ? '#9ca3af' : '#3b82f6'}
                >
                    Tiếp tục
                </Button>
            </View>
        </View>
    );
};

export default PhoneNumberStep;