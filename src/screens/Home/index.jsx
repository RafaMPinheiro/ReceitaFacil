import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Text as MotiText } from 'moti';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';

import { colors } from '../../styles/color';
import { Logo } from '../../components/logo';
import { CardPrato } from '../../components/cardPrato';

export function Home() {
  const navigation = useNavigation();
  const [textSearch, setTextSearch] = useState('');
  const [pratos, setPratos] = useState([]);

  function handleSearch() {
    navigation.navigate('Search', { textSearch });
    setTextSearch('');
  }

  useEffect(() => {
    async function fetchApi() {
      const reponse = await api.get('/foods');
      setPratos(reponse.data);
    }

    fetchApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <View style={styles.header}>
        <MotiText
          style={styles.headerTitle}
          from={{
            opacity: 0,
            translateY: 15,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            delay: 100,
            type: 'timing',
            duration: 650,
          }}
        >
          Encontre a receita
        </MotiText>
        <MotiText style={styles.headerTitle}>que combina com você!</MotiText>
      </View>

      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setTextSearch(text)}
          value={textSearch}
          placeholder="Digite o nome da comida"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color={colors.primary[1]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={pratos}
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
    paddingTop: 36,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 17,
    marginBottom: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border[1],
  },
  searchInput: {
    width: 'auto',
  },
});
