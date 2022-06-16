import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#708090",
    textSecondary: "#586069",
    textWhite: "#F8F8FF",
    primary: "#0366d6",
    backgroundDark: "#24292e",
    backgroundLight: "#F0FFFF",
    backgroundMed: "#B0C4DE",
    emphasis: "#4682B4",
    error: "#DC143C",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
