import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
    //this.identifier = `${this.namespace}:token`;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    return token ? JSON.parse(token) : null;
  }

  async setAccessToken(accessToken) {
    const currentToken = await this.getAccessToken();
    if (currentToken) {
      this.removeAccessToken();
    }

    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
