import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS, REVIEWS, PAGE_INFO } from "./fragments";

export const GET_ALLREPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        cursor
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO}
`;

export const GET_CURRENTUSER = gql`
  query getCurrentUser(
    $after: String
    $first: Int
    $includeReviews: Boolean = false
  ) {
    me {
      id
      username
      reviewCount
      reviews(after: $after, first: $first) @include(if: $includeReviews) {
        ...Reviews
      }
    }
  }
  ${REVIEWS}
`;

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews(after: $after, first: $first) {
        ...Reviews
      }
    }
  }
  ${REVIEWS}
  ${REPOSITORY_DETAILS}
`;
