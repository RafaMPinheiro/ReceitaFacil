import { useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { getFav } from '../../utils/storage';

import { CardPrato } from '../../components/cardPrato';
import { colors } from '../../styles/color';

export function Favoritos() {
  const [listFavs, setListFavs] = useState([]);

  useLayoutEffect(() => {
    async function getFavs() {
      const recipeFav = await getFav('@receita');
      setListFavs(recipeFav);
    }

    getFavs();
  }, [listFavs]);

  return (
    <SafeAreaView style={styles.container}>
      {listFavs.length === 0 && (
        <Text style={styles.text}>
          Você ainda não tem nenhuma receita salva.
        </Text>
      )}

      <FlatList
        data={listFavs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CardPrato data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    paddingHorizontal: 14,
    fontSize: 18,
  },
});
