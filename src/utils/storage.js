import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFav = async (key) => {
  const favs = await AsyncStorage.getItem(key);
  return JSON.parse(favs) || [];
};

export const saveFav = async (key, newItem) => {
  const myFavs = await getFav(key);

  const hasItem = myFavs.some((item) => item.id === newItem.id);

  if (hasItem) {
    return;
  }
  myFavs.push(newItem);
  await AsyncStorage.setItem(key, JSON.stringify(myFavs));
};

export const removeFav = async (id) => {
  const recipes = await getFav('@receita');

  const myFavs = recipes.filter((item) => item.id !== id);
  await AsyncStorage.setItem('@receita', JSON.stringify(myFavs));
  return myFavs;
};

export const isFav = async (recipes) => {
  const myRecipes = await getFav('@receita');

  const favorites = myRecipes.find((item) => item.id === recipes.id);

  if (favorites) {
    return true;
  }
  return false;
};
