import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text, IconButton, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuantityInput = ({ value, onChange, expectedValue }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value.toString());

    const handleSubmit = () => {
        const newValue = parseInt(tempValue, 10);
        if (!isNaN(newValue) && newValue >= 0) {
            onChange(newValue);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                onBlur={handleSubmit}
                onSubmitEditing={handleSubmit}
                keyboardType="numeric"
                autoFocus
                className="w-12 text-center border border-blue-300 rounded-md py-1"
            />
        );
    }

    return (
        <View className="flex-row items-center">
            <IconButton
                icon="minus"
                size={20}
                mode="contained"
                containerColor="#f3f4f6"
                iconColor="#3b82f6"
                onPress={() => onChange(Math.max(0, value - 1))}
                disabled={value <= 0}
            />
            <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className={`w-12 text-center font-bold ${value > expectedValue ? "text-orange-500" : ""}`}>
                    {value}/{expectedValue}
                </Text>
            </TouchableOpacity>
            <IconButton
                icon="plus"
                size={20}
                mode="contained"
                containerColor="#f3f4f6"
                iconColor="#3b82f6"
                onPress={() => onChange(value + 1)}
            />
        </View>
    );
}

const ProductsCard = ({ 
    expectedProducts = [], 
    scannedProducts = [], 
    onUpdateScannedProduct,
    orderCode,
    title = "Danh sách sản phẩm",
    subtitle = ""
}) => {
    // State để lưu trữ các sản phẩm đã quét (với số lượng)
    const [productCounts, setProductCounts] = useState({});

    // Khởi tạo state khi component mount hoặc khi scannedProducts thay đổi
    useEffect(() => {
        const counts = {};
        scannedProducts.forEach(product => {
            counts[product.id] = (counts[product.id] || 0) + 1;
        });
        setProductCounts(counts);
    }, [scannedProducts]);

    // Xử lý khi thay đổi số lượng sản phẩm
    const handleQuantityChange = (productId, newQuantity) => {
        if (onUpdateScannedProduct) {
            onUpdateScannedProduct(productId, newQuantity);
        }
    };

    // Tính tổng số lượng sản phẩm đã quét
    const totalScanned = Object.values(productCounts).reduce((sum, count) => sum + count, 0);
    
    // Tính tổng số lượng sản phẩm mong muốn
    const totalExpected = expectedProducts.reduce((sum, product) => sum + product.quantity, 0);

    // Lấy danh sách các sản phẩm không có trong đơn
    const unexpectedProducts = scannedProducts.filter(product => 
        !expectedProducts.some(expected => expected.id === product.id)
    );

    return (
        <View className="flex-1 bg-white rounded-t-2xl overflow-hidden">
            {/* Header với tiêu đề và tổng số */}
            <View className="bg-gray-100 px-4 py-3 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="shopping" size={24} color="#123123" />
                    <Text style={{ color: '#000' }} className="font-bold text-lg ml-2">
                        {title}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="package-variant" size={20} color="#123123" />
                    <Text style={{ color: '#000' }} className="font-bold ml-1">
                        {subtitle || `${totalScanned}/${totalExpected} SP`}
                    </Text>
                </View>
            </View>

            {/* Danh sách sản phẩm */}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* Hiển thị sản phẩm trong đơn */}
                {expectedProducts.map((product, index) => {
                    const scannedCount = productCounts[product.id] || 0;
                    const isComplete = scannedCount >= product.quantity;
                    const isExceeded = scannedCount > product.quantity;
                    
                    return (
                        <View
                            key={product.id}
                            style={{ 
                                backgroundColor: isExceeded ? '#fff1f1' : (isComplete ? '#f0fdf4' : '#f3f4f6'),
                                borderLeftWidth: 4,
                                borderLeftColor: isExceeded ? '#ef4444' : (isComplete ? '#10b981' : '#f3f4f6')
                            }}
                            elevation={1}
                        >
                            <View className="flex-row items-center p-2">
                                {/* Số thứ tự */}
                                <View className="w-8 items-center justify-center">
                                    <Text className="text-gray-500 font-medium">
                                        {index + 1}
                                    </Text>
                                </View>

                                {/* Hình ảnh sản phẩm */}
                                <Image
                                    source={product.imageUrl ? { uri: product.imageUrl } : require('@assets/mockup-image.png')}
                                    className="w-16 h-16 rounded-md"
                                    resizeMode="cover"
                                />

                                {/* Thông tin sản phẩm */}
                                <View className="flex-1 py-2 px-3">
                                    <Text className="font-bold text-gray-800 mb-1" numberOfLines={1}>
                                        {product.name}
                                    </Text>
                                    <Text className="text-gray-500 text-sm mb-1">
                                        Mã: {product.code || product.sku || 'N/A'}
                                    </Text>
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons 
                                                name={isExceeded ? "alert-circle" : (isComplete ? "check-circle" : "clock-outline")} 
                                                size={16} 
                                                color={isExceeded ? "#ef4444" : (isComplete ? "#10b981" : "#9ca3af")} 
                                            />
                                            <Text className={`ml-1 text-sm ${isExceeded ? "text-red-600" : (isComplete ? "text-green-600" : "text-gray-500")}`}>
                                                {isExceeded ? "Vượt quá" : (isComplete ? "Đã đủ" : "Chưa đủ")}
                                            </Text>
                                        </View>
                                        <QuantityInput
                                            value={scannedCount}
                                            expectedValue={product.quantity}
                                            onChange={(newValue) => handleQuantityChange(product.id, newValue)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}

                {/* Hiển thị sản phẩm không có trong đơn */}
                {unexpectedProducts.length > 0 && (
                    <View className="mt-4 px-4">
                        <Text className="text-red-600 font-bold mb-2">Sản phẩm không có trong đơn</Text>
                        {unexpectedProducts.map((product, index) => {
                            const scannedCount = productCounts[product.id] || 0;
                            return (
                                <View
                                    key={product.id}
                                    style={{ 
                                        backgroundColor: '#fff1f1',
                                        borderLeftWidth: 4,
                                        borderLeftColor: '#ef4444'
                                    }}
                                    elevation={1}
                                >
                                    <View className="flex-row items-center p-2">
                                        <View className="w-8 items-center justify-center">
                                            <Text className="text-gray-500 font-medium">
                                                {index + 1}
                                            </Text>
                                        </View>

                                        <Image
                                            source={product.imageUrl ? { uri: product.imageUrl } : require('@assets/mockup-image.png')}
                                            className="w-16 h-16 rounded-md"
                                            resizeMode="cover"
                                        />

                                        <View className="flex-1 py-2 px-3">
                                            <Text className="font-bold text-gray-800 mb-1" numberOfLines={1}>
                                                {product.name}
                                            </Text>
                                            <Text className="text-gray-500 text-sm mb-1">
                                                SKU: {product.code || product.sku || 'N/A'}
                                            </Text>
                                            <View className="flex-row justify-between items-center">
                                                <View className="flex-row items-center">
                                                    <MaterialCommunityIcons 
                                                        name="alert-circle" 
                                                        size={16} 
                                                        color="#ef4444" 
                                                    />
                                                    <Text className="ml-1 text-sm text-red-600">
                                                        Không có trong đơn
                                                    </Text>
                                                </View>
                                                <QuantityInput
                                                    value={scannedCount}
                                                    expectedValue={0}
                                                    onChange={(newValue) => handleQuantityChange(product.id, newValue)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ProductsCard;