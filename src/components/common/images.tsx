import { Skeleton, styled } from "@mui/material";
import { MEDIA } from "../../constants";
import { SxType, MediaQuery } from "../../types";
import { useLoadedImageSrc } from "../../util";

const StyledImage = styled("img")(() => ({}));
const Svg = styled("svg")(() => ({}));

type ImageVariant =
  | "circle"
  | "square"
  | "rounded"
  | "fixed-width"
  | "fixed-height";
interface BaseImageProps {
  src: string | undefined;
  sx?: SxType;
  mobileSx?: SxType;
  loading?: boolean;
  hideSkeleton?: boolean;
  variant?: ImageVariant;
  mobileWidth?: string;
  mobileHeight?: string;
  query?: MediaQuery;
}
// force user to specify a width and height if illustration, otherwise specify just a size
interface ImageWithSize extends BaseImageProps {
  size: string;
}
interface ImageWithHeight extends BaseImageProps {
  variant: "fixed-height";
  height: string;
  width?: string;
}
interface ImageWithWidth extends BaseImageProps {
  variant: "fixed-width";
  width: string;
  height?: string;
}
type ImageProps = ImageWithSize | ImageWithHeight | ImageWithWidth;

export function Image({
  variant = "rounded",
  sx,
  mobileSx,
  src,
  loading,
  hideSkeleton,
  mobileHeight,
  mobileWidth,
  query = MEDIA.LG,
  ...sizeProps
}: ImageProps) {
  const loadedSrc = useLoadedImageSrc(src);
  let width: string | undefined = undefined;
  let height: string | undefined = undefined;
  let maxWidth: string | undefined = undefined;

  if (variant === "fixed-height") {
    const props = sizeProps as ImageWithHeight;
    height = props.height;
    width = props.width ?? "fit-content";
  } else if (variant === "fixed-width") {
    const props = sizeProps as ImageWithWidth;
    width = props.width;
    height = props.height ?? "fit-content";
    maxWidth = "max-width";
  } else {
    const props = sizeProps as ImageWithSize;
    width = props.size;
    height = props.size;
  }

  if (loading || !src || !loadedSrc) {
    return (
      <Skeleton
        variant={variant === "circle" ? "circular" : "rectangular"}
        sx={{
          opacity: hideSkeleton ? 0 : 1,
          [query.below]: {
            minHeight: mobileHeight,
            height: mobileHeight,
            minWidth: mobileWidth,
            width: mobileWidth,
            ...mobileSx,
          },
          minHeight: height,
          minWidth: width,
          width: width,
          height: height,
          borderRadius: variant === "rounded" ? "5px" : undefined,
          ...sx,
        }}
      />
    );
  }

  return (
    <StyledImage
      src={loadedSrc}
      sx={{
        overflow: "hidden",
        borderRadius:
          variant === "circle"
            ? "100%"
            : variant === "rounded"
            ? "5px"
            : undefined,
        objectFit: ["fixed-height", "fixed-width"].includes(variant)
          ? "contain"
          : "cover",
        width,
        [query.below]: {
          minHeight: mobileHeight,
          height: mobileHeight,
          minWidth: mobileWidth,
          width: mobileWidth,
          ...mobileSx,
        },
        minWidth: width,
        minHeight: height,
        maxWidth,
        height,
        ...sx,
      }}
    />
  );
}

export const BirdEyeIcon = () => {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 497 497"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M386.996 59.5663C376.7 63.4298 362.55 77.07 187.976 251.391C84.6129 354.608 0.0410156 439.853 0.0410156 440.826C0.0410156 441.797 6.6515 442.259 14.7312 441.852C36.5519 440.749 49.7849 433.297 80.4693 404.829C113.405 374.274 124.451 368.546 150.147 368.699C166.706 368.8 169.793 369.477 184.798 376.299C211.689 388.531 228.963 392.291 258.011 392.243C299.022 392.172 332.48 380.588 362.812 355.954C405.185 321.543 423.755 283.781 427.171 225.078C428.83 196.559 428.874 196.369 438.093 177.416C444.564 164.117 449.864 156.237 455.701 151.24C464.833 143.423 478.731 137.828 489.013 137.828C492.631 137.828 496.077 137.038 496.674 136.073C498.329 133.396 492.431 112.736 486.954 102.02C467.691 64.3347 423.878 45.7266 386.996 59.5663ZM361.901 153.447C380.434 176.733 389.038 200.355 388.977 227.803C388.903 261.406 377.77 291.427 357.295 313.248C334.358 337.692 307.443 349.436 270.775 350.996C251.874 351.8 246.062 351.282 234.498 347.761C210.942 340.589 177.396 317.405 177.396 308.298C177.396 303.465 201 280.921 206.062 280.921C207.582 280.921 212.294 284.476 216.536 288.819C220.779 293.164 229.806 299.267 236.596 302.385C247.362 307.324 251.393 308.052 268.088 308.068C284.802 308.084 288.752 307.379 299.186 302.512C312.937 296.095 328.55 284.008 328.55 279.778C328.55 278.19 327.502 276.89 326.22 276.89C321.7 276.89 309.948 266.196 307.175 259.558C298.12 237.884 311.58 215.064 334.733 212.839C343.863 211.962 344.659 211.485 343.458 207.601C340.608 198.386 332.095 183.656 325.225 176.05L318.007 168.063L331.845 155.047C339.455 147.891 347.255 141.994 349.177 141.945C351.102 141.897 356.826 147.075 361.901 153.447Z"
        fill="currentColor"
      />
    </Svg>
  );
};

export const TwitterIcon = () => {
  return (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 1200 1227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
        fill="currentColor"
      />
    </Svg>
  );
};
