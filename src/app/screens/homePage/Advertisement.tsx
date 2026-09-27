import React from "react";
import LazyAutoplayVideo from "../../components/video/LazyAutoplayVideo";

export default function Advertisement() {
  return (
    <section className="ads-restaurant-frame">
      <div className="ads-container">
        <div className="ads-editorial-label">CRAFTSMANSHIP IN MOTION</div>
        <div className="ads-video-frame">
          <LazyAutoplayVideo
            className="ads-video"
            src="/video/burak-ads.mp4"
            loop
            muted
            playsInline
            data-video-media=""
          />
        </div>
      </div>
    </section>
  );
}
