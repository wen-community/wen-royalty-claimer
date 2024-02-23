import { Stack, StackProps } from "@mui/material";
import { MEDIA } from "../../constants";
import { MediaQuery, SxType } from "../../types";
import { ReactNode } from "react";

interface RowProps extends StackProps {
  spaceBetween?: boolean;
  wrap?: boolean;
}

export function Column({ spacing, sx, ...props }: StackProps) {
  const negativeSpacing = spacing && typeof spacing === "number" && spacing < 0;
  return (
    <Stack
      spacing={negativeSpacing ? spacing : undefined}
      id="column"
      sx={{ gap: negativeSpacing ? undefined : spacing, ...sx }}
      {...props}
    />
  );
}

export function Row({ spaceBetween, wrap, sx, spacing, ...props }: RowProps) {
  return (
    <Stack
      id="row"
      sx={{
        gap: spacing,
        justifyContent: spaceBetween ? "space-between" : undefined,
        alignItems: props.alignItems ?? "center",
        flexWrap: wrap ? "wrap" : undefined,
        ...sx,
      }}
      direction="row"
      {...props}
    />
  );
}

interface MediaStackProps extends StackProps {
  query?: MediaQuery;
  spacing?: number;
  mobileSpacing?: number;
  spaceBetweenRow?: boolean;
  sxAbove?: SxType;
  sxBelow?: SxType;
}
export function MediaStack({
  query = MEDIA.LG,
  children,
  spacing = 1,
  mobileSpacing,
  spaceBetweenRow,
  sxAbove,
  sxBelow,
  sx,
  ...otherProps
}: MediaStackProps) {
  return (
    <Stack
      sx={{
        [query.below]: {
          flexDirection: "column",
          gap: `${10 * (mobileSpacing ?? (spacing || 0))}px`,
          ...sxBelow,
        },
        [query.above]: {
          justifyContent: spaceBetweenRow ? "space-between" : undefined,
          alignItems: "center",
          flexDirection: "row",
          gap: `${10 * (spacing || 0)}px`,
          ...sxAbove,
        },

        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Stack>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
