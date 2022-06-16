import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";

import useRepo from "../hooks/useRepo";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import theme from "../theme";
import { Linky } from "./Link";
import {
  LoadingText,
  TextBold,
  Subheading,
  TextPrimary,
  TextSecondary,
} from "./Text";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.backgroundMed,
    flexDirection: "row",
  },
  scoreColumn: {
    marginTop: 10,
    width: 50,
    flex: 1,
  },
  score: {
    alignSelf: "center",
    width: 50,
    height: 50,
    borderColor: theme.colors.emphasis,
    borderWidth: 2,
    borderRadius: 25,
    padding: 8,
  },
  scoreText: {
    alignSelf: "center",
    paddingTop: 5,
  },
  reviewColumn: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    flex: 5,
  },
  reviewText: {
    marginTop: 2,
    marginBottom: 2,
  },
});

const RepositoryInfo = ({ repo }) => {
  return (
    <>
      <RepositoryItem item={repo} />
      <Linky text="Open repo" url={repo.url} />
    </>
  );
};

export const ReviewItem = ({ review, title = "" }) => {
  let titleText = review.user.username;
  if (title) {
    titleText = title;
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.scoreColumn}>
        <View style={styles.score}>
          <TextBold
            text={parseInt(review.rating)}
            color={theme.colors.emphasis}
            style={styles.scoreText}
          />
        </View>
      </View>

      <View style={styles.reviewColumn}>
        <Subheading text={titleText} style={styles.reviewText} />
        <TextSecondary
          text={review.createdAt.substring(0, 10)}
          style={styles.reviewText}
        />
        <TextPrimary text={review.text} style={styles.reviewText} />
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const param = useParams();
  const { repo, reviews, fetchMore } = useRepo(param.id, 10);

  // Navigating to this page from UserReviews DOES NOT WORK CORRECTLY without this console.log... It just stays blank until tapped.
  // I tried different things, but this is what works for some reason
  console.log();

  return repo ? (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repo={repo} />}
      ListEmptyComponent={() => <LoadingText text={"No reviews yet!"} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.5}
    />
  ) : null;
};

export default SingleRepository;
