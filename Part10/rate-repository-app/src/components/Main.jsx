//import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignInForm from "./SigninForm";
import SingleRepository from "./RepositoryDetails";
import CreateReviewForm from "./CreateReviewForm";
import SignupForm from "./SignupForm";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
  flexContainer: {
    flexGrow: 0,
    flexShrink: 1,
  },
  mainBackground: {
    backgroundColor: theme.colors.backgroundLight,
  },
});

const Main = () => {
  return (
    <>
      <View>
        <AppBar />
      </View>
      <View style={styles.mainBackground}>
        <Routes>
          <Route exact path="/repositories" element={<RepositoryList />} />

          <Route path="/repositories/:id" element={<SingleRepository />} />
          <Route exact path="/review" element={<CreateReviewForm />} />

          <Route exact path="/login" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignupForm />} />

          <Route exact path="/user/reviews" element={<UserReviews />} />

          <Route path="*" element={<Navigate to="/repositories" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
