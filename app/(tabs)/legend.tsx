import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DelayHighlight from '../../components/DelayHighlight';

const examples = [
  { seconds: 0, description: 'Pojazd jedzie zgodnie z planem, jest przed czasem lub brakuje pomiaru.' },
  { seconds: 90, description: 'Opóźnienie poniżej dwóch minut. Liczba oznacza sekundy.' },
  { seconds: 120, description: 'Od dwóch minut napis pulsuje. Liczba oznacza pełne minuty opóźnienia.' },
];

export default function LegendScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Oznaczenia opóźnień</Text>
      {examples.map((example) => (
        <View key={example.seconds} style={styles.example}>
          <DelayHighlight delayInSeconds={example.seconds} />
          <Text style={styles.description}>{example.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F7F6' },
  content: { padding: 16 },
  title: { marginTop: 6, marginBottom: 20, fontSize: 26, fontWeight: '800', color: '#143A37' },
  example: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#D3E1DE' },
  description: { marginTop: 6, fontSize: 16, lineHeight: 23, color: '#304E4B' },
});
