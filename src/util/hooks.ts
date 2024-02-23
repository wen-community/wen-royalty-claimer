import { useState, useEffect, useRef } from "react";

export function useLoadedImageSrc(src: string | undefined) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    setLoadedSrc(null);
    if (!src) return;
    const handleLoad = () => {
      if (src === "") return;
      setLoadedSrc(src);
    };
    const image = new Image();
    image.addEventListener("load", handleLoad);
    image.src = src;

    return () => {
      image.removeEventListener("load", handleLoad);
    };
  }, [src]);

  return loadedSrc;
}

export function useOutsideAlerter(onOutsideClick: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // since popover overrides screen, need to target it using menu item
        const isSelect = (event.target as Element).className?.includes?.(
          "MuiMenuItem-root"
        );
        if (!isSelect) {
          onOutsideClick();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick, ref]);

  return ref;
}
