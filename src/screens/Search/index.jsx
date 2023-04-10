import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { colors } from '../../styles/color';
import api from '../../services/api';
import { CardPrato } from '../../components/cardPrato';

export function Search() {
  const route = useRoute();
  const navigation = useNavigation();
  const [pratosFiltred, setPratosFiltred] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await api.get(
        `/foods?name_like=${route.params?.textSearch}`
      );
      setPratosFiltred(response.data);
    }

    fetchRecipes();
  }, [route.params?.textSearch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pratosFiltred}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CardPrato data={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.text}>
            Não encontramos o que está buscando...
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background[1],
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  text: {
    fontSize: 18,
  },
});
