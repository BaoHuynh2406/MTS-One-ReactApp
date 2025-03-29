import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text, Card, IconButton, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuantityInput = ({ value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value.toString());

    const handleSubmit = () => {
        const newValue = parseInt(tempValue, 10);
        if (!isNaN(newValue) && newValue >= 1) {
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
                onPress={() => onChange(Math.max(1, value - 1))}
            />
            <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="w-8 text-center font-bold">{value}</Text>
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
};

const ProductCard = ({ orderCode, products, onQuantityChange }) => {
    // Calculate total quantity
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <Card className="h-[50vh] mx-1 my-1 rounded-xl overflow-hidden elevation-2">
            {/* Header with Order Code and Total */}
            <View className="bg-blue-500 px-4 py-3 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="shopping" size={24} color="white" />
                    <Text style={{ color: '#fff' }} className="text-white font-bold text-lg ml-2">
                        {orderCode}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="package-variant" size={20} color="white" />
                    <Text style={{ color: '#fff' }} className="text-white font-bold ml-1">
                        {totalQuantity} SP
                    </Text>
                </View>
            </View>

            {/* Products List */}
            <ScrollView
                contentContainerStyle={{ padding: 0 }}
                showsVerticalScrollIndicator={false}
            >
                {products.map((product, index) => (
                    <Surface
                        key={product.id}
                        className={`rounded-xl overflow-hidden bg-white`}
                        elevation={1}
                    >
                        <View className="flex-row items-center">
                            {/* Sequence Number */}
                            <View className="w-8 items-center justify-center">
                                <Text className="text-gray-500 font-medium">
                                    {index + 1}
                                </Text>
                            </View>

                            {/* Product Image */}
                            <Image
                                source={product.imageUrl ? { uri: product.imageUrl } : require('@assets/mockup-image.png')}
                                className="w-20 h-20"
                                resizeMode="cover"
                            />

                            {/* Product Details */}
                            <View className="flex-1 py-2 px-3">
                                <Text className="font-bold text-gray-800 mb-1" numberOfLines={1}>
                                    {product.name}
                                </Text>
                                <Text className="text-gray-500 text-sm mb-1">
                                    SKU: {product.sku}
                                </Text>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-blue-500 font-bold">
                                        SL:
                                    </Text>
                                    <QuantityInput
                                        value={product.quantity}
                                        onChange={(newValue) => onQuantityChange(product.id, newValue)}
                                    />
                                </View>
                            </View>
                        </View>
                    </Surface>
                ))}
            </ScrollView>
        </Card>
    );
};

// Example usage
export default function ProductsCardExample() {
    const [products, setProducts] = useState([
        {
            id: '1',
            name: 'Nike Air Max 270',
            sku: 'NK-AM270-001',
            imageUrl: false,
            quantity: 1
        },
        {
            id: '2',
            name: 'Adidas Ultra Boost',
            sku: 'AD-UB-002',
            imageUrl: false,
            quantity: 2
        },
        {
            id: '3',
            name: 'Adidas Ultra Boost',
            sku: 'AD-UB-002',
            imageUrl: false,
            quantity: 2
        },
        {
            id: '4',
            name: 'Adidas Ultra Boost',
            sku: 'AD-UB-002',
            imageUrl: false,
            quantity: 2
        },
        // Add more products as needed
    ]);

    const handleQuantityChange = (productId, newQuantity) => {
        setProducts(products.map(product =>
            product.id === productId
                ? { ...product, quantity: newQuantity }
                : product
        ));
    };

    return (
        <ProductCard
            orderCode="ORD-123456"
            products={products}
            onQuantityChange={handleQuantityChange}
        />
    );
}