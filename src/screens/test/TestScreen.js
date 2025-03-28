import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { getCurrentUserAsync } from '@/store/authSlice';

const TestScreen = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [tokens, setTokens] = useState({ access: '', refresh: '' });
  const [showTokens, setShowTokens] = useState(false);

  const fetchTokens = async () => {
    try {
      const [accessToken, refreshToken] = await AsyncStorage.multiGet([
        'access_token',
        'refresh_token'
      ]);
      setTokens({
        access: accessToken[1] || 'Không có',
        refresh: refreshToken[1] || 'Không có'
      });
      setShowTokens(true);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const handleGetUserInfo = async () => {
    try {
      await dispatch(getCurrentUserAsync()).unwrap();
    } catch (error) {
      // không thì thôi, không cần xử lý lỗi ở đây
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View className="p-4 space-y-4">
          <Text className="text-2xl font-bold text-blue-600 mb-4">Testing Area</Text>

          {/* Get User Info Button */}
          <Button
            mode="contained"
            onPress={handleGetUserInfo}
            loading={loading}
            className="mb-4"
            style={{ backgroundColor: '#3b82f6' }}
          >
            {loading ? 'Đang lấy thông tin...' : 'Lấy thông tin người dùng'}
          </Button>

          {/* User Info Card */}
          {user && (
            <Card className="mb-4">
              <Card.Content>
                <Text className="text-lg font-bold mb-2">Thông tin người dùng:</Text>
                <Text>ID: {user.id}</Text>
                <Text>Username: {user.username}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Họ tên: {user.fullName}</Text>
                <Text>Vai trò: {user.roles?.join(', ')}</Text>
              </Card.Content>
            </Card>
          )}

          {/* Get Tokens Button */}
          <Button
            mode="outlined"
            onPress={fetchTokens}
            className="mb-4"
            style={{ borderColor: '#3b82f6' }}
          >
            Xem Tokens
          </Button>

          {/* Tokens Card */}
          {showTokens && (
            <Card className="mb-4">
              <Card.Content>
                <Text className="text-lg font-bold mb-2">Tokens:</Text>
                <Text className="font-bold mt-2">Access Token:</Text>
                <Text className="mb-2" numberOfLines={2}>
                  {tokens.access}
                </Text>
                <Text className="font-bold mt-2">Refresh Token:</Text>
                <Text className="mb-2" numberOfLines={2}>
                  {tokens.refresh}
                </Text>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default TestScreen; 