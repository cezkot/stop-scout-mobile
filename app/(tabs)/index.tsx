import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DepartureCard from '../../components/DepartureCard';
import { mockDepartures } from '../../src/infrastructure/mock/departures';

export default function DeparturesScreen() {
  const [departures] = useState(mockDepartures);

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={departures}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Najbliższe odjazdy</Text>
          <Text style={styles.subtitle}>Gdańsk · Dane przykładowe</Text>
        </View>
      }
      renderItem={({ item }) => <DepartureCard {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F7F6' },
  content: { padding: 16, paddingBottom: 24 },
  header: { marginTop: 6, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#143A37' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#526B68' },
});
