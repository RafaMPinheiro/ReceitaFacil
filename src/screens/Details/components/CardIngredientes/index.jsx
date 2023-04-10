import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../styles/color';

export function CardIngredientes({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text>{data.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.border[1],
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 15,
    marginVertical: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
