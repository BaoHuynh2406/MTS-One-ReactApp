import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const TakePhotoStep = ({ onComplete, onBack }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        requestPermission();
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
                exif: true,
                skipProcessing: true
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

    const handleConfirm = () => {
        if (photo) {
            onComplete(photo);
        }
    };

    const handleRetake = () => {
        setPhoto(null);
    };

    if (!permission) {
        return (
            <View className="flex-1 justify-center items-center p-6 bg-gray-50">
                <Text className="text-gray-600 text-lg">
                    Đang yêu cầu quyền truy cập camera...
                </Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center p-6 bg-gray-50">
                <MaterialCommunityIcons name="camera-off" size={80} color="#9ca3af" />
                <Text className="text-gray-600 text-center text-lg font-medium mt-4 mb-6">
                    Chúng tôi cần quyền truy cập camera để chụp ảnh bàn giao
                </Text>
                <Button 
                    mode="contained" 
                    onPress={requestPermission}
                    className="rounded-full"
                    buttonColor="#3b82f6"
                >
                    Cấp quyền camera
                </Button>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, height: SCREEN_HEIGHT }} className="bg-white">
            {/* Header */}
            <View className="flex-row items-center p-4 ">
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={onBack}
                    className="m-0"
                    iconColor="black"
                />
                <Text className="text-lg font-bold text-white ml-2">
                    Chụp ảnh bàn giao
                </Text>
            </View>

            {/* Camera or Photo Preview */}
            <View style={{ flex: 1, height: SCREEN_HEIGHT * 0.75 }}>
                {photo ? (
                    <View className="flex-1 relative bg-white">
                        <Image 
                            source={{ uri: photo.uri }} 
                            style={{ flex: 1, height: '100%' }}
                            resizeMode="contain" 
                        />
                        <View className="absolute bottom-0 left-0 right-0 p-6 bg-black/50">
                            <View className="flex-row justify-center space-x-4">
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
                ) : (
                    <CameraView
                        ref={ref => setCamera(ref)}
                        style={StyleSheet.absoluteFillObject}
                        facing="back"
                        autoFocus="on"
                    >
                        <View className="flex-1 justify-end p-6">
                            <Text style={{color: '#fff', textAlign: 'center'}} className="text-white text-center text-lg mb-6">
                                Đặt phiếu bàn giao vào giữa khung hình để chụp ảnh
                            </Text>
                            <Button
                                mode="outlined"
                                onPress={takePicture}
                                loading={isLoading}
                                disabled={isLoading}
                                icon="camera"
                                className="rounded-full mb-6 mx-auto w-40"
                                textColor="white"
                                buttonColor="transparent"
                                style={{ borderColor: 'white' }}
                                contentStyle={{ paddingHorizontal: 16 }}
                            >
                                Chụp ảnh
                            </Button>
                        </View>
                    </CameraView>
                )}
            </View>

            {/* Footer */}
            {photo && (
                <View className="p-4 ">
                    <Button
                        mode="contained"
                        onPress={handleConfirm}
                        className="rounded-full"
                        icon="arrow-right"
                        contentStyle={{ flexDirection: 'row-reverse', paddingVertical: 6 }}
                        buttonColor="#3b82f6"
                    >
                        Tiếp tục
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    absoluteFillObject: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default TakePhotoStep;