import { Image, View, StyleSheet } from "react-native";
import { Subheading, TextPrimary, Text, TextBold } from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.backgroundMed,
  },
  headerBox: {
    flexDirection: "row",
  },
  avatarImage: {
    marginTop: 15,
    width: 50,
    height: 50,
  },
  headerText: {
    flexGrow: 1,
    alignSelf: "center",
    paddingLeft: 10,
  },
  subheaderText: {
    flexGrow: 1,
    flexWrap: "wrap",
    flex: 1,
  },
  languageBox: {
    backgroundColor: theme.colors.emphasis,
    flexBasis: 50,
    flexGrow: 0,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 60,
    width: 100,
  },
  languageText: {
    color: theme.colors.textWhite,
    alignSelf: "center",
  },
  statLabels: {
    marginLeft: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
    flexWrap: "wrap",
  },
  stats: {
    alignSelf: "center",
    marginTop: 10,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <>
      <View style={styles.background} testID="repositoryItem">
        <HeaderBox
          image={item.ownerAvatarUrl}
          name={`${item.fullName}`}
          description={`${item.description}`}
        />

        <LanguageBox text={item.language} />

        <Details
          totalStars={item.stargazersCount}
          totalForks={item.forksCount}
          totalReviews={item.reviewCount}
          rating={item.ratingAverage}
        />
      </View>
    </>
  );
};

const Details = ({ totalStars, totalForks, totalReviews, rating }) => {
  const convertToK = (value) => {
    const total = parseInt(value);
    if (total < 1000) {
      return value;
    }

    if (total >= 1000 && total <= 9999) {
      const toK = Math.round((total + Number.EPSILON) * 100) / 100000;
      const result = toK.toFixed(1);
      return `${result}K`;
    }

    if (total >= 10000) {
      const toK = Math.round((total + Number.EPSILON) * 100) / 100000;
      const result = toK.toFixed(1);
      return `${result}K`;
    } else {
      return "A lot!";
    }
  };

  const stars = convertToK(totalStars);
  const forks = convertToK(totalForks);
  const reviews = convertToK(totalReviews);

  return (
    <View
      style={{ flexDirection: "row" }}
      accessibilityLabel="repositoryDetails"
    >
      <Statistic
        number={forks}
        label={"Forks"}
        accessibilityLabel="repositoryForks"
      />
      <Statistic
        number={stars}
        label={"Stars"}
        accessibilityLabel="repositoryStars"
      />
      <Statistic
        number={reviews}
        label={"Reviews"}
        accessibilityLabel="repositoryReviews"
        testID="repositoryReviews"
      />
      <Statistic
        number={rating}
        label={"Rating"}
        accessibilityLabel="repositoryRating"
      />
    </View>
  );
};

const Statistic = ({ number, label }) => {
  return (
    <View style={styles.statLabels}>
      <TextPrimary text={number} style={styles.stats} />
      <TextBold text={label} />
    </View>
  );
};

const LanguageBox = ({ text }) => {
  return (
    <View style={styles.languageBox}>
      <Text style={styles.languageText}>{text}</Text>
    </View>
  );
};

const HeaderBox = ({ image, name, description }) => {
  return (
    <View style={styles.headerBox}>
      <Avatar image={image} />
      <View style={styles.headerText}>
        <Subheading text={name} />
        <View>
          <TextPrimary text={description} style={styles.subheaderText} />
        </View>
      </View>
    </View>
  );
};

const Avatar = ({ image }) => {
  return <Image source={{ uri: image }} style={styles.avatarImage} />;
};

export default RepositoryItem;
