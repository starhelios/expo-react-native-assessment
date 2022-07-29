import * as SecureStore from "expo-secure-store";

export async function saveToken(value) {
  await SecureStore.setItemAsync("token", value);
}

export async function getToken() {
  let token = await SecureStore.getItemAsync("token");
  return token;
}

export async function removeToken() {
  await SecureStore.deleteItemAsync("token");
}
