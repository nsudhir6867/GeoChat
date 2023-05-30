import React, { useEffect, useRef } from "react";

const Video = ({ stream, muted }) => {
  const videoEl = useRef();
  useEffect(() => {
    const video = videoEl.current;
    console.log("video", video);
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);
  return (
    <div className="map_page_v_rooms_video_container">
      <video
        ref={videoEl}
        width="98%"
        height="98%"
        playsInline
        autoPlay
        muted={muted}
      />
    </div>
  );
};

export default Video;
