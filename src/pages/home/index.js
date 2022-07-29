import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { removeToken } from "../../store";

export default function Home({ navigation }) {
  const handleLogout = async () => {
    await removeToken();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity style={styles.Btn} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Btn: {
    width: 200,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#adbac7",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
