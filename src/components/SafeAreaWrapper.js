import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children, style }) => {
  return (
    <SafeAreaView edges={['right', 'left']} className="flex-1 bg-gray-50">
      <View style={style} className="flex-1">
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;