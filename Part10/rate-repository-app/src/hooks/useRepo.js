import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepo = (id, first) => {
  const [repo, setRepo] = useState(null);
  const [reviews, setReviews] = useState([]);

  const variables = { repositoryId: id, first };

  const { loading, fetchMore, data } = useQuery(GET_REPOSITORY, {
    variables,
    onError: (error) => {
      console.error("Get repo", error);
    },
    onCompleted: (data) => {
      if (data && data.repository) {
        if (data.repository !== repo) {
          setRepo(data.repository);
        }

        const receivedReviews = data.repository.reviews?.edges?.map(
          (edge) => edge.node
        );

        setReviews(receivedReviews);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data.repository?.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repo,
    reviews,
    loading,
    fetchMore: handleFetchMore,
  };
};

export default useRepo;
