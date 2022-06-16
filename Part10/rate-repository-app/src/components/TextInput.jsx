import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const shared = {
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
  margin: 5,
};

const styles = StyleSheet.create({
  normal: {
    ...shared,
  },
  error: {
    borderColor: theme.colors.error,
    ...shared,
  },
});

const TextInput = ({ error, ...props }) => {
  const textInputStyle = error ? styles.error : styles.normal;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
