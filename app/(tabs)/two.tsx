import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Stack } from 'expo-router';

import CardPrato, { type CardPratoType } from '~/components/CardPrato';

import { getFavs } from '~/services/storage';

export default function Home() {
  const [receitas, setReceitas] = useState<CardPratoType[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchFavoritos() {
        const response = await getFavs();
        setReceitas(response);
      }

      fetchFavoritos();
    }, [])
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Favoritos' }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 20,
          backgroundColor: '#F3F9FF',
          padding: 30,
        }}>
        <FlatList
          style={{ height: '100%', width: '100%', paddingBottom: 6 }}
          data={receitas}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <CardPrato {...item} />}
        />
      </View>
    </>
  );
}
