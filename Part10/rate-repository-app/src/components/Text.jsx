import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.textWhite,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

export const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "secondary" && styles.colorTextSecondary.color,
    color === "white" && styles.colorWhite.color,
    color === "primary" && styles.colorPrimary.color,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const TextPrimary = ({ text, style }) => {
  return (
    <Text color="primary" style={style}>
      {text}
    </Text>
  );
};

export const TextSecondary = ({ text, style }) => {
  return (
    <Text color="secondary" style={style}>
      {text}
    </Text>
  );
};

export const TextBold = ({ text, style, color = "primary" }) => {
  return (
    <Text fontWeight="bold" color={color} style={style}>
      {text}
    </Text>
  );
};

export const Subheading = ({ text, style, color = "primary" }) => {
  return (
    <Text fontWeight="bold" color={color} fontSize="subheading" style={style}>
      {text}
    </Text>
  );
};

export const AppBarText = ({ text, style, color = "white" }) => {
  return (
    <Text fontWeight="bold" fontSize="subheading" color={color} style={style}>
      {text}
    </Text>
  );
};

export const LoadingText = ({ text = "Loading..." }) => {
  return <Text fontSize="subheading">{text}</Text>;
};

export default Text;
