import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/main/HomeScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
          position: 'absolute',    // Để xử lý bo tròn
          left: 10,                // Tùy chỉnh khoảng cách
          right: 10,
          bottom: 0,
          borderTopLeftRadius: 20, // Bo tròn góc trên bên trái
          borderTopRightRadius: 20, // Bo tròn góc trên bên phải
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
        },
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 0, 
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#3b82f6',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: 'Trang Chủ',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Thông báo')} style={{marginRight: 15}}>
              <MaterialCommunityIcons name="bell" size={24} color="#3b82f6" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          title: 'Cài đặt',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 