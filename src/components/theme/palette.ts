import { PaletteOptions } from "@mui/material";
import { PRIMARY_COLOR, BACKGROUND_COLOR } from "./constants";
import { colorToAlpha } from "./util";

const palette: PaletteOptions = {
  primary: {
    main: colorToAlpha(PRIMARY_COLOR, 0.95),
  },
  secondary: {
    main: colorToAlpha(PRIMARY_COLOR, 0.8),
  },

  background: {
    default: BACKGROUND_COLOR,
    paper: "#0F0F0F",
  },
  success: {
    main: "#009D05",
  },
  error: {
    main: "#E12D2D",
  },
  warning: {
    main: "#F4DC00",
  },
  info: {
    main: "#4A88FF",
  },
  divider: "#F3F3F3",
  text: {
    primary: colorToAlpha(PRIMARY_COLOR, 0.95),
    secondary: colorToAlpha(PRIMARY_COLOR, 0.6),
    disabled: colorToAlpha(PRIMARY_COLOR, 0.4),
  },
};
export default palette;
