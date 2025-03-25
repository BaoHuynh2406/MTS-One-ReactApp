import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Avatar, List, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

const UserProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View className="p-4">
          {/* Header Profile */}
          <View className="items-center mb-6">
            <Avatar.Icon 
              size={80} 
              icon="account-circle"
              style={{ backgroundColor: '#3b82f6' }}
              color="white"
            />
            <Text className="text-2xl font-bold text-gray-800 mt-4">
              {user?.fullName || 'Chưa cập nhật'}
            </Text>
            <Text className="text-gray-500">
              {user?.email}
            </Text>
          </View>

          {/* User Information */}
          <View className="rounded-xl bg-white shadow-sm mb-4 overflow-hidden">
            <List.Section>
              <List.Subheader className="text-base font-bold text-gray-600">
                Thông tin cá nhân
              </List.Subheader>
              
              <List.Item
                title="Tên đăng nhập"
                description={user?.username}
                left={props => <List.Icon {...props} icon="account" color="#3b82f6" />}
              />
              <Divider />
              
              <List.Item
                title="Số điện thoại"
                description={user?.phone || 'Chưa cập nhật'}
                left={props => <List.Icon {...props} icon="phone" color="#3b82f6" />}
              />
              <Divider />
              
              <List.Item
                title="Giới tính"
                description={user?.gender === 'male' ? 'Nam' : user?.gender === 'female' ? 'Nữ' : 'Khác'}
                left={props => <List.Icon {...props} icon="gender-male-female" color="#3b82f6" />}
              />
              <Divider />
              
              <List.Item
                title="Ngày sinh"
                description={formatDate(user?.dateOfBirth)}
                left={props => <List.Icon {...props} icon="calendar" color="#3b82f6" />}
              />
            </List.Section>
          </View>

          {/* Account Information */}
          <View className="rounded-xl bg-white shadow-sm mb-4 overflow-hidden">
            <List.Section>
              <List.Subheader className="text-base font-bold text-gray-600">
                Thông tin tài khoản
              </List.Subheader>
              
              <List.Item
                title="Vai trò"
                description={user?.roles?.join(', ')}
                left={props => <List.Icon {...props} icon="shield-account" color="#3b82f6" />}
              />
              <Divider />
              
              <List.Item
                title="Ngày tạo tài khoản"
                description={formatDate(user?.createdAt)}
                left={props => <List.Icon {...props} icon="clock-outline" color="#3b82f6" />}
              />
              <Divider />
              
              <List.Item
                title="Đăng nhập lần cuối"
                description={formatDate(user?.lastLoginAt)}
                left={props => <List.Icon {...props} icon="login" color="#3b82f6" />}
              />
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default UserProfileScreen;