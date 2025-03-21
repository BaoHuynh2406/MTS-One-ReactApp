import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children, style }) => {
  return (
    <SafeAreaView 
      style={style} 
      className="flex-1"
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper; 