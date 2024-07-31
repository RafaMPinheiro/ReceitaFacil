import React, { useCallback, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import CardPrato, { type CardPratoType } from '~/components/CardPrato';

import api from '~/services/api';

export default function Home() {
  const [receitas, setReceitas] = useState<CardPratoType[]>([]);
  const [filtredReceitas, setFiltredReceitas] = useState<CardPratoType[]>([]);
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function fetchApi() {
        const reponse = await api.get('/foods');
        setReceitas(reponse.data);
      }

      fetchApi();
    }, [])
  );
  const updateReceitas = (text: string) => {
    setSearch(text);
    if (text === '') {
      setFiltredReceitas(receitas);
    } else {
      setFiltredReceitas(
        receitas.filter((receita) => receita.name.toLowerCase().includes(text.toLowerCase()))
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 20,
          backgroundColor: '#F3F9FF',
          paddingHorizontal: 30,
          paddingTop: 80,
        }}>
        <View
          style={{
            borderRadius: 10,
            borderBottomRightRadius: 30,
            backgroundColor: '#4CBE6C',
            paddingVertical: 8,
            paddingLeft: 10,
            paddingRight: 30,
          }}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            Receita Fácil
          </Text>
        </View>
        <View style={{ flexDirection: 'column', gap: 2 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Encontre a receita</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>que combina com você</Text>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            style={{
              width: '100%',
              borderRadius: 10,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 16,
              fontSize: 18,
            }}
            onChange={(e) => updateReceitas(e.nativeEvent.text)}
            value={search}
            placeholder="Digite o nome da comida"
          />
          <View style={{ position: 'absolute', right: 20, top: 16 }}>
            <FontAwesome size={22} name="search" color="#4CBE6C" />
          </View>
        </View>
        <FlatList
          style={{ height: '100%', width: '100%', paddingBottom: 6 }}
          data={search.length > 0 ? filtredReceitas : receitas}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <CardPrato {...item} />}
        />
      </View>
    </>
  );
}
