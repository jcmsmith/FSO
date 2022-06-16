import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    fullName
    watchersCount
    openIssuesCount
    createdAt
    name
    id
    language
    userHasReviewed
  }
`;

export const USER = gql`
  fragment User on User {
    id
    username
    createdAt
    reviewCount
  }
`;

export const REVIEW = gql`
  fragment Review on ReviewEdge {
    node {
      id
      text
      rating
      createdAt
      user {
        ...User
      }
      repository {
        name
        id
      }
    }
  }
  ${USER}
`;

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    startCursor
    endCursor
    hasPreviousPage
    hasNextPage
  }
`;

export const REVIEWS = gql`
  fragment Reviews on ReviewConnection {
    totalCount
    edges {
      ...Review
      cursor
    }
    pageInfo {
      ...PageInfo
    }
  }
  ${REVIEW}
  ${PAGE_INFO}
`;
