import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadState<T>(key: string): Promise<T | undefined> {
  try {
    const jsonState = await AsyncStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }
    return JSON.parse(jsonState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function saveState<T>(state: T, key: string) {
  const stringState = JSON.stringify(state);
  await AsyncStorage.setItem(key, stringState);
}
export async function clearState(key: string) {
  await AsyncStorage.removeItem(key);
}

// const token = await AsyncStorage.getItem('jwt');

// await AsyncStorage.setItem('jwt', token);

// await AsyncStorage.removeItem('jwt');
// navigation.reset({
//   index: 0,
//   routes: [{ name: 'Login' }],
// });
