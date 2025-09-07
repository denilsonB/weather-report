// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: "linear(to-b, orange.500, yellow.400)",
        color: "white",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
