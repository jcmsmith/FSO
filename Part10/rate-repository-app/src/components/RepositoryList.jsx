import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import TextInput from "./TextInput";
import { LoadingText } from "./Text";

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [filter, setFilter] = useState("");
  const { repositories, loading, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    filter,
    first: 10,
  });

  const handleFilterChange = (event) => {
    const value = event.nativeEvent.text;
    setFilter(value);
  };

  const onEndReached = () => {
    fetchMore();
  };

  const listHeader = () => {
    return (
      <>
        <TextInput
          onEndEditing={handleFilterChange}
          placeholder="Filter repositories"
        />
        <Picker
          selectedValue={orderBy}
          onValueChange={(itemValue, _itemIndex) => setOrderBy(itemValue)}
          prompt="Order repositories by"
        >
          <Picker.Item label="Latest review" value="CREATED_AT" />
          <Picker.Item label="Average rating" value="RATING_AVERAGE" />
        </Picker>
        <Picker
          selectedValue={orderDirection}
          onValueChange={(itemValue, _itemIndex) =>
            setOrderDirection(itemValue)
          }
        >
          <Picker.Item label="Descending" value="DESC" />
          <Picker.Item label="Ascending" value="ASC" />
        </Picker>
      </>
    );
  };

  if (loading) {
    return <LoadingText />;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      header={listHeader}
      onEndReached={onEndReached}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  header,
  onEndReached,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges?.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID="repositoryList"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item, _index, _separators }) => {
        return (
          <>
            <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
              <RepositoryItem key={item.id} item={item} />
            </Pressable>
          </>
        );
      }}
    />
  );
};

export default RepositoryList;
