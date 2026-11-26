import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { DepartureDelay } from '../src/domain/value-objects/DepartureDelay';

interface DelayHighlightProps {
  delayInSeconds: number | null | undefined;
}

export function DelayHighlight({ delayInSeconds }: DelayHighlightProps) {
  const delay = new DepartureDelay(delayInSeconds);
  const opacity = useRef(new Animated.Value(1)).current;
  const shouldAnimate = delay.shouldAnimate;

  useEffect(() => {
    opacity.setValue(1);
    if (!shouldAnimate) return;

    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.35, duration: 700, useNativeDriver: true, isInteraction: false,
      }),
      Animated.timing(opacity, {
        toValue: 1, duration: 700, useNativeDriver: true, isInteraction: false,
      }),
    ]));

    pulse.start();
    return () => pulse.stop();
  }, [opacity, shouldAnimate]);

  return (
    <Animated.Text style={[styles.label, styles[delay.severity], { opacity }]}>
      {delay.formattedText}
    </Animated.Text>
  );
}

export default DelayHighlight;

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', fontVariant: ['tabular-nums'] },
  ON_TIME: { color: '#167046' },
  MINOR: { color: '#886000' },
  MAJOR: { color: '#B12E2A', fontWeight: 'bold' },
});
