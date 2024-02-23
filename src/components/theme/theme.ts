import { ThemeOptions, Shadows, createTheme } from "@mui/material";
import { LIGHT_SHADOW, LIGHT_SMALL_SHADOW, SPACING_PX_VAL } from "./constants";
import palette from "./palette";
import typography from "./typography";
import components from "./components";

const themeOptions: ThemeOptions = {
  shadows: [
    "none",
    LIGHT_SMALL_SHADOW,
    ...Array(24).fill(LIGHT_SHADOW),
  ] as Shadows,
  spacing: SPACING_PX_VAL,
  palette,
  typography,
  components,
};

export default createTheme(themeOptions);
