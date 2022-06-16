import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALLREPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState();

  const { error, loading, fetchMore } = useQuery(GET_ALLREPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRepositories(data.repositories);
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && repositories?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (error) return [`Error! ${error.message}`];

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
  };
};

export default useRepositories;
