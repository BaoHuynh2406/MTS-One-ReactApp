import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { login } from '../../store/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Xử lý đăng nhập - trong thực tế sẽ gọi API
    // Ở đây chỉ giả lập đăng nhập thành công
    dispatch(login({ email }));
  };

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      <View style={styles.header} className="items-center mb-10 mt-10">
        <Avatar.Icon 
          size={80} 
          icon="account-circle" 
          color="#fff" 
          style={{ backgroundColor: '#3b82f6' }} 
        />
        <Text style={styles.title} className="text-3xl font-bold mt-4 text-blue-600">MTS One</Text>
        <Text style={styles.subtitle} className="text-lg text-gray-500 mt-2">Đăng nhập vào tài khoản</Text>
      </View>

      <View style={styles.formContainer} className="p-6 rounded-xl bg-white shadow-md mx-4">
        <View style={styles.inputContainer} className="mb-4">
          <MaterialCommunityIcons name="email-outline" size={24} color="#9ca3af" style={styles.inputIcon} />
          <TextInput
            label="Email hoặc tên đăng nhập"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            className="flex-1"
            outlineColor="#e5e7eb"
            activeOutlineColor="#3b82f6"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer} className="mb-6">
          <MaterialCommunityIcons name="lock-outline" size={24} color="#9ca3af" style={styles.inputIcon} />
          <TextInput
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={styles.input}
            className="flex-1"
            outlineColor="#e5e7eb"
            activeOutlineColor="#3b82f6"
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye" : "eye-off"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                color="#9ca3af"
              />
            }
          />
        </View>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          className="rounded-lg"
        >
          Đăng nhập
        </Button>

        <TouchableOpacity style={styles.forgotPassword} className="mt-4">
          <Text style={styles.forgotPasswordText} className="text-blue-500 text-center">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer} className="mt-6 mx-4">
        <Text style={styles.footerText} className="text-center text-gray-500">
          Phiên bản 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#3b82f6',
  },
  footer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#9ca3af',
  },
});

export default LoginScreen; 