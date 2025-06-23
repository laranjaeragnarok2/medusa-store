'use client';

export function VideoBackground() {
  const videoUrl = "https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4";

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        src={videoUrl}
        data-ai-hint="abstract animation"
      />
      <div className="absolute inset-0 h-full w-full bg-background/80 backdrop-blur-sm" />
    </div>
  );
}
