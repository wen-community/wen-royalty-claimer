import { ReactNode } from "react";
import { Navbar } from "./containers";
import { Stack } from "@mui/material";
import {
  APP_MAX_WIDTH,
  APP_PADDING,
  NAV_BREAKPOINT,
  NAV_HEIGHT_PX,
} from "../constants/app";
import { SxType } from "../types";
import { SPACING_PX_VAL } from "./theme";

export function Page({
  children,
  spacing,
}: {
  children: ReactNode;
  spacing?: number;
}) {
  return (
    <>
      <Navbar />
      <Stack
        spacing={spacing}
        component="main"
        sx={{
          pt: NAV_HEIGHT_PX,
          background: ({ palette: { background } }) => background.default,
          display: "flex",
          width: "100vw",
          maxWidth: "100vw",
          overflowX: "hidden",
          alignItems: "center",
        }}
      >
        {children}
      </Stack>
    </>
  );
}

export function MaxWidthWrapper({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxType;
}) {
  return (
    <Stack
      id="max-width-wrapper"
      sx={{
        width: `calc(100% - ${APP_PADDING.desktop * 2 * SPACING_PX_VAL}px)`,
        p: APP_PADDING.desktop,
        [NAV_BREAKPOINT.below]: {
          p: APP_PADDING.mobile,
          width: `calc(100% - ${APP_PADDING.mobile * 2 * SPACING_PX_VAL}px)`,
        },
        maxWidth: APP_MAX_WIDTH,
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
}
