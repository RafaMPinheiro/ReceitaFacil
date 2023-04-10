import { useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Image,
  View,
  Modal,
  Share,
  TouchableOpacity,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { isFav, removeFav, saveFav } from '../../utils/storage';

import { colors } from '../../styles/color';
import { CardIngredientes } from './components/CardIngredientes';
import { Intrucoes } from './components/Intrucoes';
import { Video } from '../../components/Video';

export function Details() {
  const route = useRoute();
  const navigation = useNavigation();

  const [showVideo, setShowVideo] = useState(false);
  const [fav, setFav] = useState(false);

  useLayoutEffect(() => {
    async function getStatusFav() {
      const recipeFav = await isFav(route.params?.data);
      setFav(recipeFav);
    }

    getStatusFav();

    navigation.setOptions({
      title: route.params?.data
        ? route.params?.data.name
        : 'Detalhes da receita',
      headerRight: () => (
        <TouchableOpacity onPress={() => handleFavRecipe(route.params?.data)}>
          {fav ? (
            <Ionicons name="heart" color={colors.favorite[1]} size={28} />
          ) : (
            <Ionicons
              name="heart-outline"
              color={colors.favorite[1]}
              size={28}
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [fav, navigation, route.params?.data]);

  const handleFavRecipe = async (recipe) => {
    if (fav) {
      await removeFav(recipe.id);
      setFav(false);
    } else {
      await saveFav('@receita', recipe);
      setFav(true);
    }
  };

  const handleOpenVideo = () => {
    setShowVideo(true);
  };

  async function shareRecipe() {
    try {
      await Share.share({
        url: 'Larica Facil',
        message: `
        Nome ${route.params?.data.name}\n
        Tempo aproximado: ${route.params?.data.time}\n
        Youtube: ${route.params?.data.video}\n
        Ingredientes:\n
        ${route.params?.data.ingredients.map(
          (item) => `${item.name} - ${item.amount}\n`
        )}
        Modo de preparo:\n
        ${route.params?.data.instructions.map(
          (item) => `${item.id} - ${item.text}\n`
        )}
        `,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable onPress={handleOpenVideo}>
        <View style={styles.icon}>
          <AntDesign name="playcircleo" size={44} color="white" />
        </View>

        <Image
          style={styles.image}
          source={{ uri: route.params?.data.cover }}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.headerTitle}>{route.params?.data.name}</Text>
          <Text style={styles.headerSubTitle}>
            Ingredientes ({route.params?.data.total_ingredients})
          </Text>
        </View>
        <Pressable onPress={shareRecipe}>
          <AntDesign name="sharealt" size={30} color="black" />
        </Pressable>
      </View>

      {route.params?.data.ingredients.map((item) => (
        <CardIngredientes key={item.id} data={item} />
      ))}

      <View style={styles.modoDePreparo}>
        <Text style={styles.modoDePreparoText}>Modo de preparo</Text>
      </View>

      <View style={styles.instructions}>
        {route.params?.data.instructions.map((item) => (
          <Intrucoes key={item.id} data={item} index={item.id} />
        ))}
      </View>

      <Modal visible={showVideo} animationType="slide">
        <Video
          handleClose={() => setShowVideo(false)}
          videoUrl={route.params?.data.video}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background[1],
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 14,
  },
  headerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubTitle: {
    fontSize: 18,
  },
  modoDePreparo: {
    backgroundColor: colors.primary[1],
    paddingVertical: 8,
    paddingStart: 12,
    marginVertical: 16,
    borderRadius: 8,
  },
  modoDePreparoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  instructions: {
    marginBottom: 20,
  },
});
