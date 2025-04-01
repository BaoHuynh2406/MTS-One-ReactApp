import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import TabNavigator from './TabNavigator';
import DonSanScreen from '../screens/main/DonSanScreen';
import HoaTocScreen from '../screens/main/HoaTocScreen';
import GiaoHangScreen from '../screens/main/GiaoHangScreen';
import ThongKeGiaoHangScreen from '../screens/main/ThongKeGiaoHangScreen';
import UserProfileScreen from '../screens/main/UserProfileScreen';
import TestScreen from '@/screens/test/TestScreen';
import ExpressOrderScreen from '../screens/main/ExpressOrder/ExpressOrderScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <>
              <Stack.Screen 
                name="Splash" 
                component={SplashScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="Trang chủ" 
                component={TabNavigator} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="DonSan" 
                component={DonSanScreen} 
                options={{ 
                  title: 'Đơn sàn',
                  headerStyle: { backgroundColor: '#3b82f6' }, 
                  headerTintColor: '#fff',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => alert('Thông báo')}>
                      <MaterialCommunityIcons name="bell" size={24} color="white" style={{marginRight: 15}} />
                    </TouchableOpacity>
                  )
                }}
              />
              <Stack.Screen 
                name="HoaToc" 
                component={HoaTocScreen} 
                options={{ 
                  title: 'Hoả tốc',
                  headerStyle: { backgroundColor: '#3b82f6' }, 
                  headerTintColor: '#fff',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => alert('Thông báo')}>
                      <MaterialCommunityIcons name="bell" size={24} color="white" style={{marginRight: 15}} />
                    </TouchableOpacity>
                  )
                }}
              />
              <Stack.Screen 
                name="ExpressOrder" 
                component={ExpressOrderScreen} 
                options={{ 
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="GiaoHang" 
                component={GiaoHangScreen} 
                options={{ 
                  title: 'Giao Hàng',
                  headerStyle: { backgroundColor: '#3b82f6' }, 
                  headerTintColor: '#fff',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => alert('Thông báo')}>
                      <MaterialCommunityIcons name="bell" size={24} color="white" style={{marginRight: 15}} />
                    </TouchableOpacity>
                  )
                }}
              />
              <Stack.Screen 
                name="ThongKeGiaoHang" 
                component={ThongKeGiaoHangScreen} 
                options={{ 
                  title: 'Thống kê giao hàng',
                  headerStyle: { backgroundColor: '#3b82f6' }, 
                  headerTintColor: '#fff',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => alert('Thông báo')}>
                      <MaterialCommunityIcons name="bell" size={24} color="white" style={{marginRight: 15}} />
                    </TouchableOpacity>
                  )
                }}
              />
              <Stack.Screen 
                name="UserProfile" 
                component={UserProfileScreen} 
                options={{ 
                  title: 'Hồ sơ người dùng',
                  headerStyle: { backgroundColor: '#3b82f6' }, 
                  headerTintColor: '#fff',
                }}
              />
               <Stack.Screen 
                name="TestScreen" 
                component={TestScreen} 
                options={{ 
                  title: 'Màn Hình Test',
                  headerStyle: { backgroundColor: '#3b82f6' }, 
                  headerTintColor: '#fff',
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;