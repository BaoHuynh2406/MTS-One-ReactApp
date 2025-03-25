import React from 'react';
import { View, ScrollView } from 'react-native';
import { List, Text, Divider, Button, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logoutAsync } from '../../store/authSlice';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <ScrollView>
          <View className="p-4">
            <View className="flex-row items-center mb-6">
              <Avatar.Icon 
                size={60} 
                icon="account-circle" 
                style={{ backgroundColor: '#3b82f6' }}
                color="white" 
              />
              <View className="ml-4">
                <Text className="text-2xl font-bold text-gray-800">Cài đặt</Text>
                <Text className="text-gray-500">
                  {user?.email || 'Người dùng'}
                </Text>
              </View>
            </View>

            <View className="rounded-xl bg-white shadow-sm mb-4 overflow-hidden">
              <List.Section>
                <List.Subheader className="text-base font-bold text-gray-600">Tài khoản</List.Subheader>
                <List.Item
                  title="Email"
                  description={user?.email || 'Chưa đăng nhập'}
                  left={props => <List.Icon {...props} icon="email" color="#3b82f6" />}
                  className="py-2"
                />
                <Divider />
                <List.Item
                  title="Hồ sơ người dùng"
                  left={props => <List.Icon {...props} icon="account" color="#3b82f6" />}
                  right={props => <List.Icon {...props} icon="chevron-right" color="#9ca3af" />}
                  className="py-2"
                  onPress={() => navigation.navigate('UserProfile')}
                />
              </List.Section>
            </View>
          </View>
        </ScrollView>

        <View className="p-4">
          <Button 
            mode="contained" 
            onPress={handleLogout}
            loading={loading}
            disabled={loading}
            className="rounded-lg"
            style={{ backgroundColor: '#ef4444' }}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
            contentStyle={{ height: 50 }}
          >
            {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;