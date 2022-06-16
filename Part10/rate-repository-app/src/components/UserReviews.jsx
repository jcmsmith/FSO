import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { View, StyleSheet, FlatList, Button, Alert } from "react-native";

import { GET_CURRENTUSER } from "../graphql/queries";
import { LoadingText, Subheading, TextPrimary } from "./Text";
import { ReviewItem } from "./RepositoryDetails";
import ItemSeparator from "./ItemSeparator";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    margin: 20,
  },
  infoText: {
    margin: 5,
  },
});

const UserInfo = ({ username, reviewCount }) => {
  const singular = reviewCount === 1;
  const countText = singular ? "review" : "reviews";

  return (
    <View style={styles.userInfoContainer}>
      <Subheading text={`Hello, ${username}!`} style={styles.infoText} />
      <TextPrimary
        text={`You currently have ${reviewCount} ${countText}`}
        style={styles.infoText}
      />
    </View>
  );
};

const UserReview = ({ item, handleViewButton, handleDeleteButton }) => {
  return (
    <>
      <ReviewItem review={item} title={item.repository.name} />
      <Button
        onPress={() => handleViewButton(item.repository.id)}
        title="View repository"
      />
      <Button
        onPress={() => handleDeleteButton(item.id)}
        title="Delete review"
        color={theme.colors.error}
      />
    </>
  );
};

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.error("delete review", error);
    },
  });

  const navigate = useNavigate();

  const handleDeleteButton = async (id) => {
    console.log(id);

    Alert.alert(
      "Delete review",
      "Do you wish to delete this review?",
      [
        { text: "Cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            const { errors } = await deleteReview({
              variables: { deleteReviewId: id },
            });

            if (!errors) {
              const reviewsNow = reviews.filter((review) => {
                if (review.id !== id) {
                  return review;
                }
              });

              console.log("reviewsNow", reviewsNow);

              setReviews(reviewsNow);
            }
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleViewButton = (id) => {
    navigate(`/repositories/${id}`);
  };

  const { data, loading, fetchMore } = useQuery(GET_CURRENTUSER, {
    variables: { first: 10, includeReviews: true },
    onError: (error) => {
      console.error("Get my reviews", error);
    },
    onCompleted: (data) => {
      if (data.me?.reviews?.totalCount > 0) {
        const returnedReviews = data.me.reviews.edges.map((edge) => edge.node);
        setReviews(returnedReviews);
      }
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.me?.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        first: 10,
        includeReviews: true,
      },
    });
  };

  if (loading) {
    return <LoadingText />;
  }

  if (!data || !data.me) {
    return <LoadingText text="Something went wrong!" />;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <UserReview
          item={item}
          handleDeleteButton={handleDeleteButton}
          handleViewButton={handleViewButton}
        />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <UserInfo
          username={data.me.username}
          reviewCount={data.me.reviewCount}
        />
      )}
      ListEmptyComponent={() => <LoadingText text={"No reviews yet!"} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
      onEndReached={() => handleFetchMore()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default UserReviews;
