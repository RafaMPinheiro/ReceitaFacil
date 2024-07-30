import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import type { CardPratoType } from '~/components/CardPrato';
import api from '~/services/api';
import { FontAwesome } from '@expo/vector-icons';

export default function Receita() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const [receita, setReceita] = useState<CardPratoType | null>(null);

  useEffect(() => {
    async function fetchApi() {
      const reponse = await api.get(`/foods/${id}`);
      setReceita(reponse.data);
    }

    fetchApi();
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <View
              style={{
                height: 110,
                paddingHorizontal: 20,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Link href={{ pathname: '(tabs)' }} asChild>
                <FontAwesome size={20} name="arrow-left" />
              </Link>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{name ? name : 'carregando'}</Text>
              </View>
              <TouchableOpacity>
                <FontAwesome size={20} name="heart" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView style={{ backgroundColor: '#F3F9FF', flex: 1, width: '100%' }}>
          {receita ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                padding: 20,
                paddingBottom: 32,
                alignItems: 'flex-start',
                gap: 14,
              }}>
              <Image source={{ uri: receita.cover }} style={{ height: 200, width: '100%' }} />
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{receita.name}</Text>
                <Text>Ingredientes: {receita.total_ingredients}</Text>
              </View>
              {receita.ingredients.map((ingredient) => (
                <View
                  key={ingredient.id}
                  style={{
                    backgroundColor: '#FFF',
                    height: 50,
                    width: '100%',
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: '#ECECEC',
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{ingredient.name}</Text>
                  <Text style={{ fontSize: 16 }}>{ingredient.amount}</Text>
                </View>
              ))}
              <View
                style={{
                  backgroundColor: '#4CBE6C',
                  height: 40,
                  width: '100%',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
                  Modo de preparo
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingLeft: 10,
                  paddingRight: 20,
                  gap: 8,
                }}>
                {receita.instructions.map((instruction) => (
                  <View key={instruction.id} style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{instruction.id} - </Text>
                    <Text style={{ fontSize: 16 }}>{instruction.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text>Carregando...</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
