import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import './global.css';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}
