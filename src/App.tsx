import { Box } from "@chakra-ui/react";
import { RootLayout } from "./layout/RootLayout";
import { Theme } from "@chakra-ui/react";
export const App = () => {
  return (
    <>
      <Box margin="0" padding="0">
        <Theme appearance="light" colorPalette="teal">
          <RootLayout />
        </Theme>
      </Box>
    </>
  );
};
