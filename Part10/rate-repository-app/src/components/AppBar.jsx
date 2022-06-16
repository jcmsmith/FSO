import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";

import { AppBarText } from "./Text";
import theme from "../theme";
import { GET_CURRENTUSER } from "../graphql/queries";
import useAuth from "../hooks/useAuth";
import Linker from "./Link";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
  },
  tab: {
    marginRight: 8,
  },
});

const AppBar = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal>
          <View style={styles.tab}>
            <Linker text="Repositories" url="/repositories" />
          </View>
          <AuthTabs />
        </ScrollView>
      </View>
    </>
  );
};

const AuthTabs = () => {
  const [user, setUser] = useState(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useQuery(GET_CURRENTUSER, {
    onError: (error) => console.log("userquery error", error),
    onCompleted: (data) => {
      if (data && data.me !== null) {
        setUser(data.me.id);
      }
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate("/repositories");
  };

  return (
    <>
      {user ? (
        <>
          <View style={styles.tab}>
            <Linker text="Create a review" url="/review" />
          </View>
          <View style={styles.tab}>
            <Linker text="My reviews" url="/user/reviews" />
          </View>
          <View style={styles.tab}>
            <Pressable onPressOut={handleLogout}>
              <AppBarText text={"Logout"} />
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={styles.tab}>
            <Linker text={"Login"} url={"/login"} />
          </View>
          <View style={styles.tab}>
            <Linker text={"Signup"} url={"/signup"} />
          </View>
        </>
      )}
    </>
  );
};

export default AppBar;
