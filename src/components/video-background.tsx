'use client';

export function VideoBackground() {
  const vimeoEmbedUrl = "https://player.vimeo.com/video/1095753167?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0";

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
       <iframe
        src={vimeoEmbedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] w-[177.77vh] min-h-screen min-w-[100vw] -translate-x-1/2 -translate-y-1/2"
        title="Vimeo Background Video"
        data-ai-hint="abstract tech"
      />
      <div className="absolute inset-0 h-full w-full bg-background/70 backdrop-blur-[2px]" />
    </div>
  );
}
