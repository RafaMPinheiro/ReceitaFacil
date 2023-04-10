import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

export function CardPrato({ data }) {
  const navigation = useNavigation();

  const handleDetails = () => {
    navigation.navigate('Details', { data });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleDetails}
    >
      <Image style={styles.cover} source={{ uri: data.cover }} />
      <View style={styles.info}>
        <Text style={styles.textName}>{data.name}</Text>
        <Text style={styles.textDescription}>
          {data.total_ingredients} ingredientes | {data.time} min
        </Text>
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    marginTop: 34,
    marginBottom: 14,
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  info: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    zIndex: 99,
  },
  textName: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },
  textDescription: {
    color: '#FFF',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    borderRadius: 14,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
});
