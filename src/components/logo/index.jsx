import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/color';

export function Logo() {
  return (
    <View style={styles.logoArea}>
      <Text style={styles.logoTitle}>Larica fácil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoArea: {
    backgroundColor: colors.primary[1],
    alignSelf: 'flex-start',
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderBottomRightRadius: 32,
    marginBottom: 10,
  },
  logoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
    color: '#FFF',
  },
});
