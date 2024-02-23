import React from "react";
import ThemeProvider from "@mui/system/ThemeProvider";
import { theme } from "./theme";
import { HomeScrollContextProvider } from "../contexts/HomeScrollContext";
import WalletProvider from "./WalletProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <HomeScrollContextProvider>{children} </HomeScrollContextProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
