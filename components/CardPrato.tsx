import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export type CardPratoType = {
  id: string;
  name: string;
  total_ingredients: string;
  time: number;
  cover: string;
  video: string;
  ingredients: {
    id: string;
    name: string;
    amount: string;
  }[];
  instructions: {
    id: string;
    text: string;
  }[];
};

export default function CardPrato(item: CardPratoType) {
  return (
    <Link href={{ pathname: `receita/${item.id}?name=${item.name}` }} asChild>
      <TouchableOpacity
        style={{ height: 176, borderRadius: 12, overflow: 'hidden' }}
        activeOpacity={0.7}>
        {item && (
          <>
            <Image source={{ uri: item.cover }} style={{ height: '100%', width: '100%' }} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '70%',
                borderRadius: 12,
                zIndex: 1,
              }}
            />
            <View style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 2 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>
                {item.total_ingredients} ingredientes | {item.time} min
              </Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    </Link>
  );
}
