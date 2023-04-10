import { StyleSheet, Text, View } from 'react-native';

export function Intrucoes({ data, index }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.index}>{index} - </Text>
        {data.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  text: {
    fontSize: 20,
  },
  index: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
