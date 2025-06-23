'use client';

export function VideoBackground() {
  const videoUrl = "https://drive.google.com/uc?export=download&id=1dMJPmyPXTNCkJU3-6yIqBoHoFl94sOza";

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        src={videoUrl}
        data-ai-hint="abstract tech"
      />
      <div className="absolute inset-0 h-full w-full bg-background/80 backdrop-blur-sm" />
    </div>
  );
}
