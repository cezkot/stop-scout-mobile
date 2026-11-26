import { StyleSheet, Text, View } from 'react-native';
import { RouteNumber } from '../src/domain/value-objects/RouteNumber';
import DelayHighlight from './DelayHighlight';

export interface DepartureCardProps {
  routeId: number | string;
  headsign: string;
  theoreticalTime: string;
  delayInSeconds: number | null | undefined;
}

export function DepartureCard({ routeId, headsign, theoreticalTime, delayInSeconds }: DepartureCardProps) {
  const route = new RouteNumber(routeId);

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.route}>{route.value}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.destination}>{headsign || 'Brak kierunku'}</Text>
        <View style={styles.timeRow}>
          <Text style={styles.time}>Plan: {theoreticalTime || '--:--'}</Text>
          <DelayHighlight delayInSeconds={delayInSeconds} />
        </View>
      </View>
    </View>
  );
}

export default DepartureCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10,
    padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#D9E6E3',
  },
  badge: {
    minWidth: 54, paddingHorizontal: 7, paddingVertical: 9,
    alignItems: 'center', borderRadius: 8, backgroundColor: '#D9EFEB',
  },
  route: { fontSize: 18, fontWeight: '800', color: '#0D504B' },
  details: { flex: 1 },
  destination: { fontSize: 17, fontWeight: '700', color: '#143A37' },
  timeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'baseline', marginTop: 5 },
  time: { color: '#536866', fontSize: 14, fontVariant: ['tabular-nums'] },
});
