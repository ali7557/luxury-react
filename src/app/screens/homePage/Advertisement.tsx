import React from "react";
import LazyAutoplayVideo from "../../components/video/LazyAutoplayVideo";

export default function Advertisement() {
  return (
    <section className="advertisement-frame">
      <div className="ads-container">
        <div className="ads-editorial-label">CRAFTSMANSHIP IN MOTION</div>
        <div className="ads-video-frame">
          <LazyAutoplayVideo
            className="ads-video"
            src="/video/craftsmanship.mp4"
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
