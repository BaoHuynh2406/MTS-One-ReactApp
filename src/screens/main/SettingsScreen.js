import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Switch, Text, Divider, Button, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../../store/authSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container} className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          <View style={styles.header} className="flex-row items-center mb-6">
            <Avatar.Icon 
              size={60} 
              icon="account-circle" 
              style={{ backgroundColor: '#3b82f6' }}
              color="white" 
            />
            <View className="ml-4">
              <Text style={styles.title} className="text-2xl font-bold">Cài đặt</Text>
              <Text style={styles.subtitle} className="text-gray-500">
                {user?.email || 'Người dùng'}
              </Text>
            </View>
          </View>

          <View style={styles.card} className="rounded-xl bg-white shadow-sm mb-4">
            <List.Section>
              <List.Subheader style={styles.sectionTitle}>Tài khoản</List.Subheader>
              <List.Item
                title="Email"
                description={user?.email || 'Chưa đăng nhập'}
                left={props => <List.Icon {...props} icon="email" color="#3b82f6" />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Hồ sơ người dùng"
                left={props => <List.Icon {...props} icon="account" color="#3b82f6" />}
                right={props => <List.Icon {...props} icon="chevron-right" color="#9ca3af" />}
                style={styles.listItem}
              />
              <Divider />
            </List.Section>
          </View>

          <View style={styles.card} className="rounded-xl bg-white shadow-sm mb-4">
            <List.Section>
              <List.Subheader style={styles.sectionTitle}>Ứng dụng</List.Subheader>
              <List.Item
                title="Chế độ tối"
                left={props => <List.Icon {...props} icon="theme-light-dark" color="#3b82f6" />}
                right={props => <Switch 
                  value={darkMode} 
                  onValueChange={setDarkMode} 
                  color="#3b82f6"
                />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Thông báo"
                left={props => <List.Icon {...props} icon="bell" color="#3b82f6" />}
                right={props => <Switch 
                  value={notifications} 
                  onValueChange={setNotifications} 
                  color="#3b82f6"
                />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Ngôn ngữ"
                description="Tiếng Việt"
                left={props => <List.Icon {...props} icon="translate" color="#3b82f6" />}
                right={props => <List.Icon {...props} icon="chevron-right" color="#9ca3af" />}
                style={styles.listItem}
              />
            </List.Section>
          </View>

          <Button 
            mode="contained" 
            onPress={handleLogout}
            style={styles.logoutButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            className="mt-4 rounded-lg"
          >
            Đăng xuất
          </Button>

          <Text style={styles.version} className="text-center text-gray-400 mt-6">
            MTS One - Phiên bản 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  listItem: {
    paddingVertical: 8,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    marginTop: 24,
    textAlign: 'center',
    color: '#9ca3af',
  },
});

export default SettingsScreen; 