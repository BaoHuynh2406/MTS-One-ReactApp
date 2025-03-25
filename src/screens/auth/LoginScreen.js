import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { loginAsync, clearError } from '@/store/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async () => {
    try {
      await dispatch(loginAsync({ username, password })).unwrap();
    } catch (error) {
      // Error handling is managed by the slice
      console.log('Login failed:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="items-center mb-12 mt-8">
        <Image 
          source={require('@assets/splash.png')}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
        <Text className="text-blue-950 font-bold text-3xl mt-4">Đăng nhập</Text>
      </View>

      <View className="px-8 py-10 rounded-3xl bg-white shadow-lg mx-6 elevation-3">
        <View className="mb-8">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons 
              name="account-outline" 
              size={24} 
              color="#3b82f6"
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-700 font-semibold">Tên đăng nhập</Text>
          </View>
          <TextInput
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            outlineColor="#e5e7eb"
            activeOutlineColor="#3b82f6"
            autoCapitalize="none"
            style={{ backgroundColor: '#fff' }}
          />
        </View>

        <View className="mb-8">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons 
              name="lock-outline" 
              size={24} 
              color="#3b82f6"
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-700 font-semibold">Mật khẩu</Text>
          </View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            outlineColor="#e5e7eb"
            activeOutlineColor="#3b82f6"
            style={{ backgroundColor: '#fff' }}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                color="#3b82f6"
              />
            }
          />
        </View>

        {error && (
          <Text className="text-red-500 text-center font-medium mb-6 -mt-4">
            {error}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          className="rounded-xl"
          contentStyle={{ height: 56 }}
          labelStyle={{ fontSize: 18, fontFamily: 'Poppins', fontWeight: 'bold' }}
          style={{ backgroundColor: '#3b82f6' }}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>

        <TouchableOpacity className="mt-8">
          <Text className="text-blue-600 text-center font-bold text-base">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-auto mb-8 mx-4">
        <Text className="text-center text-gray-500 font-medium">
          Phiên bản 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;