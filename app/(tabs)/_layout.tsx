import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#115E59',
      headerTitleAlign: 'left',
      headerTintColor: '#153C39',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Stop Scout',
          tabBarLabel: 'Odjazdy',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>≡</Text>,
        }}
      />
      <Tabs.Screen
        name="legend"
        options={{
          title: 'Legenda',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>ⓘ</Text>,
        }}
      />
    </Tabs>
  );
}
