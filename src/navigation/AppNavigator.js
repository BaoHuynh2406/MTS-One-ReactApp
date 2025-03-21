import React from 'react';
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

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isAuthenticated ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: true, 
              headerStyle: { backgroundColor: '#3b82f6' }, 
              headerTintColor: '#fff',
              headerRight: () => (
                <TouchableOpacity onPress={() => alert('Thông báo')}>
                  <MaterialCommunityIcons name="bell" size={24} color="white" style={{marginRight: 15}} />
                </TouchableOpacity>
              )
            }}
          >
            <Stack.Screen 
              name="Trang chủ" 
              component={TabNavigator} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="DonSan" 
              component={DonSanScreen} 
              options={{ 
                title: 'Đơn sàn'
              }}
            />
            <Stack.Screen 
              name="HoaToc" 
              component={HoaTocScreen} 
              options={{ title: 'Hoả tốc' }}
            />
            <Stack.Screen 
              name="GiaoHang" 
              component={GiaoHangScreen} 
              options={{ title: 'Giao Hàng' }}
            />
            <Stack.Screen 
              name="ThongKeGiaoHang" 
              component={ThongKeGiaoHangScreen} 
              options={{ title: 'Thống kê giao hàng' }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator; 