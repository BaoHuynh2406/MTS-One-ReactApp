import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TakePhotoStep = ({ onComplete, onBack }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
                onComplete(photo);
            }
        } catch (error) {
            console.error('Error taking picture:', error);
            Alert.alert('Lỗi', 'Không thể chụp ảnh. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Đang yêu cầu quyền truy cập camera...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Không có quyền truy cập camera</Text>
                <Button 
                    mode="contained" 
                    onPress={requestPermission}
                    style={styles.button}
                >
                    Cấp quyền truy cập
                </Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={onBack}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Chụp ảnh bàn giao</Text>
            </View>

            <View style={styles.cameraContainer}>
                <CameraView
                    ref={ref => setCamera(ref)}
                    style={styles.camera}
                    facing="back"
                >
                    <View style={styles.overlay}>
                        <View style={styles.scanFrame}>
                            <View style={styles.cornerTopLeft} />
                            <View style={styles.cornerTopRight} />
                            <View style={styles.cornerBottomLeft} />
                            <View style={styles.cornerBottomRight} />
                        </View>
                        <Text style={styles.instruction}>
                            Đặt sản phẩm trong khung để chụp ảnh
                        </Text>
                    </View>
                </CameraView>
            </View>

            <View style={styles.controls}>
                <Button
                    mode="contained"
                    onPress={takePicture}
                    loading={isLoading}
                    disabled={isLoading}
                    style={styles.captureButton}
                    icon="camera"
                >
                    Chụp ảnh
                </Button>
            </View>
        </View>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    backButton: {
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    cameraContainer: {
        flex: 1,
        position: 'relative',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 300,
        height: 300,
        position: 'relative',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 12,
    },
    cornerTopLeft: {
        position: 'absolute',
        top: -2,
        left: -2,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#fff',
        borderTopLeftRadius: 12,
    },
    cornerTopRight: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#fff',
        borderTopRightRadius: 12,
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: -2,
        left: -2,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#fff',
        borderBottomLeftRadius: 12,
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#fff',
        borderBottomRightRadius: 12,
    },
    instruction: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    controls: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    captureButton: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
    },
    button: {
        marginTop: 16,
    },
});

export default TakePhotoStep;