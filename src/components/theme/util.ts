export function colorToAlpha(color: string, alpha?: number) {
  const alphaVal = alpha ?? 1;

  if (color.includes("rgba")) {
    const rgb = color
      .replace("(", "")
      .replace(")", "")
      .split("rgba")[1]
      .split(",");
    return `rgba(${rgb[0].trim()}, ${rgb[1].trim()}, ${rgb[2].trim()}, ${alphaVal})`;
  }

  if (color.includes("rgb")) {
    const rgb = color
      .replace("(", "")
      .replace(")", "")
      .split("rgb")[1]
      .split(",");
    return `rgba(${rgb[0].trim()}, ${rgb[1].trim()}, ${rgb[2].trim()}, ${alphaVal})`;
  }

  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alphaVal})`;
  }

  return color;
}

export function formatAddress(address: string | undefined | null, size = 6) {
  if (!address) return "--";
  return (
    address.toString().slice(0, size) + "…" + address.toString().slice(-size)
  );
}
