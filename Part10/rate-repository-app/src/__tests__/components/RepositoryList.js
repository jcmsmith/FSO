import { render, within } from "@testing-library/react-native";

import { RepositoryListContainer } from "../../components/RepositoryList";
// import RepositoryItem from "../../components/RepositoryItem";

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

describe("RepositoryListContainer", () => {
  it("exists", () => {
    const { getByTestId } = render(
      <RepositoryListContainer repositories={repositories} />
    );
    const list = getByTestId("repositoryList");

    expect(list).toBeDefined();
  });

  describe("RepositoryListItem", () => {
    it("displays name and description", () => {
      const { getByText } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const title1 = getByText("jaredpalmer/formik");
      const desc1 = getByText("Build forms in React, without the tears");
      const title2 = getByText("async-library/react-async");
      const desc2 = getByText("Flexible promise-based React data loader");

      expect(title1).toBeDefined();
      expect(desc1).toBeDefined();
      expect(title2).toBeDefined();
      expect(desc2).toBeDefined();
    });

    it("displays the proper language", () => {
      const { getByText } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const lang1 = getByText("TypeScript");
      const lang2 = getByText("JavaScript");

      expect(lang1).toBeDefined();
      expect(lang2).toBeDefined();
    });

    it("displays accurate counts, with the K suffix, for forks and stars", () => {
      const { getByText } = render(
        <>
          <RepositoryListContainer repositories={repositories} />
        </>
      );

      const forks1 = getByText("1.6K");
      const forks2 = getByText("69");
      const stars1 = getByText("21.9K");
      const stars2 = getByText("1.8K");

      expect(forks1).toBeDefined();
      expect(forks2).toBeDefined();
      expect(stars1).toBeDefined();
      expect(stars2).toBeDefined();
    });

    it("displays accurate counts for reviews", () => {
      const { getAllByLabelText } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const reviews = getAllByLabelText("repositoryDetails");

      const reviewCount1 = within(reviews[0]).getByText("3");
      const reviewCount2 = within(reviews[1]).getByText("3");

      expect(reviewCount1).toBeDefined();
      expect(reviewCount2).toBeDefined();
    });

    it("displays the average rating", () => {
      const { getByText } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const ratings1 = getByText("88");
      const ratings2 = getByText("72");

      expect(ratings1).toBeDefined();
      expect(ratings2).toBeDefined();
    });
  });
});
