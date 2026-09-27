import { useEffect, useRef, useState } from "react";
import type { VideoHTMLAttributes } from "react";

type LazyAutoplayVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "preload" | "src"
> & {
  src: string;
};

export default function LazyAutoplayVideo({
  src,
  ...videoProps
}: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "150px 0px", threshold: 0.01 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isVisible) {
      void video.play().catch(() => {
        // Muted autoplay can still be blocked by browser or user preferences.
      });
    } else {
      video.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <video
      {...videoProps}
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad ? "metadata" : "none"}
      autoPlay={isVisible}
    />
  );
}
