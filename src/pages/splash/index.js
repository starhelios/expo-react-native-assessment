import { StyleSheet, View, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.SplashScreen_RootView}>
      <View style={styles.SplashScreen_ChildView}>
        <Image
          source={{
            uri: "https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png",
          }}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    flex: 1,
  },
});
