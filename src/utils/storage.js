import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "tasks:v1";

export async function loadStorage(key = STORAGE_KEY) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("loadStorage failed", e);
    return null;
  }
}

export async function saveStorage(data, key = STORAGE_KEY) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("saveStorage failed", e);
  }
}
