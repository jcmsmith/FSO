import { Pressable, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import * as Linking from "expo-linking";

import { AppBarText } from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    flexBasis: 50,
    flexGrow: 0,
    flexShrink: 1,
    borderBottomWidth: 1,
    margin: 5,
  },
  link: {
    alignSelf: "center",
    padding: 2,
  },
});

export const Linker = ({ text, url, color = "white" }) => {
  return (
    <Pressable>
      <Link to={url}>
        <AppBarText text={text} color={color} />
      </Link>
    </Pressable>
  );
};

export const Linky = ({ text, url }) => {
  if (!Linking.canOpenURL(url)) {
    console.error("Linky - url is unable to be opened", url);
    return null;
  }

  return (
    <View style={styles.linkContainer}>
      <Pressable onPress={() => Linking.openURL(url)} style={styles.link}>
        <AppBarText text={text} color={theme.colors.emphasis} />
      </Pressable>
    </View>
  );
};

export default Linker;
