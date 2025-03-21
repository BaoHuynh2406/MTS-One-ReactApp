import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.container} className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="p-4">
          <View style={styles.header} className="mb-6 flex-row items-center">
            <Avatar.Icon 
              size={50} 
              icon="account" 
              style={{ backgroundColor: '#3b82f6' }} 
              color="white" 
            />
            <View className="ml-4">
              <Text style={styles.heading} className="text-2xl font-bold">
                Xin chào, {user?.email || 'Người dùng'}
              </Text>
              <Text style={styles.subheading} className="text-gray-500">
                Chào mừng đến với MTS One
              </Text>
            </View>
          </View>
          
          <Card style={styles.card} className="mb-4 rounded-lg">
            <Card.Content>
              <Text variant="titleLarge" style={styles.cardTitle} className="mb-2">Thông báo mới</Text>
              <Text variant="bodyMedium">Bạn có 5 thông báo mới cần xem.</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                style={styles.button}
                className="mt-2"
              >
                Xem tất cả
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card} className="mb-4 rounded-lg">
            <Card.Content>
              <Text variant="titleLarge" style={styles.cardTitle} className="mb-2">Nhiệm vụ</Text>
              <Text variant="bodyMedium">3 nhiệm vụ cần hoàn thành hôm nay.</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                style={styles.button}
                className="mt-2"
              >
                Xem chi tiết
              </Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card} className="mb-4 rounded-lg">
            <Card.Cover 
              source={{ uri: 'https://picsum.photos/700' }} 
              style={styles.cardCover}
              className="rounded-t-lg"
            />
            <Card.Content className="py-4">
              <Text variant="titleLarge" style={styles.cardTitle} className="mb-2">Thống kê</Text>
              <Text variant="bodyMedium">Tiến độ công việc: 75%</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                style={styles.button}
                className="mt-2"
              >
                Chi tiết
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subheading: {
    fontSize: 16,
    color: '#6b7280',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    color: '#1f2937',
    fontWeight: 'bold',
  },
  cardCover: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
  },
});

export default HomeScreen; 