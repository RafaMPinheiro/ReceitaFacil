import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CardPratoType } from '~/components/CardPrato';

const storageKey = 'Favorites';

export const getFavs = async () => {
  const favs = await AsyncStorage.getItem(storageKey);
  if (favs) return JSON.parse(favs);
  return [];
};

export async function saveFav(newItem: CardPratoType) {
  const myFavs = await getFavs();

  const hasItem = myFavs.some((item: CardPratoType) => item.id === newItem.id);

  if (hasItem) {
    await removeFav(newItem.id);
    return;
  }

  myFavs.push(newItem);
  await AsyncStorage.setItem(storageKey, JSON.stringify(myFavs));
}

export async function removeFav(id: string) {
  let myFavs = await getFavs();

  myFavs = myFavs.filter((item: CardPratoType) => item.id !== id);

  await AsyncStorage.setItem(storageKey, JSON.stringify(myFavs));
}

export async function isFav(id: string) {
  const myFavs = await getFavs();

  const isFavorite = myFavs.find((item: CardPratoType) => item.id === id);

  if (isFavorite) {
    return true;
  }
  return false;
}
