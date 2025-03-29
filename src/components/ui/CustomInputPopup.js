import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, FlatList, ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, IconButton, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { debounce } from 'lodash';

const CustomInputPopup = ({
    onSelect,                 // Callback when an item is selected
    onSearch,                // Async function for fetching suggestions
    placeholder = "Tìm kiếm", // Placeholder text for input
    buttonSize = 24,         // Size of the edit button
    buttonColor = "#3b82f6",  // Color of the edit button
    debounceMs = 300         // Debounce delay for search
}) => {
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Debounced search function
    const debouncedSearch = React.useCallback(
        debounce(async (text) => {
            if (!text.trim()) {
                setSuggestions([]);
                return;
            }

            try {
                setLoading(true);
                const results = await onSearch(text);
                setSuggestions(results);
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, debounceMs),
        [onSearch]
    );

    // Handle text input changes
    const handleSearchChange = (text) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    // Handle suggestion selection
    const handleSelect = (item) => {
        setSelectedItem(item);
        setSearchText(item.name || item.title || item.label || '');
    };

    // Handle confirm button press
    const handleConfirm = () => {
        if (selectedItem) {
            onSelect(selectedItem);
        }
        setVisible(false);
        setSearchText('');
        setSelectedItem(null);
        setSuggestions([]);
    };

    // Reset state when modal closes
    const handleClose = () => {
        setVisible(false);
        setSearchText('');
        setSelectedItem(null);
        setSuggestions([]);
    };

    return (
        <>
            {/* Edit Button */}
            <TouchableOpacity
                className="p-2 rounded-full bg-black/50"
                onPress={() => setVisible(true)}>
                <MaterialCommunityIcons
                    name="pencil"
                    size={buttonSize}
                    color={"#fff"}
                />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={handleClose}
            >
                <View className="flex-1 bg-black/50">
                    <View className="flex-1 mt-8 bg-white rounded-t-3xl">
                        {/* Header */}
                        <View className="bg-white-500 p-2 flex-row justify-end items-center rounded-t-3xl">
                            <IconButton
                                icon="close"
                                iconColor="red"
                                size={24}
                                onPress={handleClose}
                            />
                        </View>

                        {/* Content Container */}
                        <View className="flex-1">
                            {/* Suggestions List */}
                            {suggestions.length > 0 && (
                                <FlatList
                                    data={suggestions}
                                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleSelect(item);
                                                Keyboard.dismiss();
                                            }}
                                            className={`p-4 border-b border-gray-200 ${selectedItem?.id === item.id ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <Text className="text-gray-800 font-medium">
                                                {item.name || item.title || item.label}
                                            </Text>
                                            {item.description && (
                                                <Text className="text-gray-500 text-sm mt-1">
                                                    {item.description}
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    className="flex-1"
                                />
                            )}

                            {/* Loading Indicator */}
                            {loading && (
                                <View className="p-4 items-center">
                                    <ActivityIndicator size="large" color="#3b82f6" />
                                </View>
                            )}
                        </View>

                        {/* Bottom Fixed Container */}
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            className="pb-4"
                        >
                            <View className="border-t border-gray-200 bg-white px-4 pt-4">
                                {/* Search Input with Search Icon */}
                                <View className="mb-3">
                                    <TextInput
                                        value={searchText}
                                        onChangeText={handleSearchChange}
                                        placeholder={placeholder}
                                        mode="outlined"
                                        autoFocus
                                        className="rounded-xl bg-gray-50"
                                        outlineStyle={{ borderRadius: 12 }}
                                        contentStyle={{ paddingLeft: 8 }}
                                        right={loading &&
                                            <TextInput.Icon
                                                icon={() => <ActivityIndicator size={20} color="#3b82f6" />}
                                            />
                                        }
                                    />
                                </View>

                                {/* Modern Confirm Button */}
                                <Button
                                    mode="contained"
                                    onPress={handleConfirm}
                                    disabled={!selectedItem}
                                    className={`rounded-xl py-2 ${!selectedItem ? 'opacity-50' : ''}`}
                                    contentStyle={{ height: 48 }}
                                    labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                                    style={{
                                        backgroundColor: selectedItem ? '#3b82f6' : '#9ca3af',
                                    }}
                                >
                                    {selectedItem ? 'Xác nhận' : 'Chọn một mục'}
                                </Button>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default CustomInputPopup;