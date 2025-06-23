'use client';

export function VideoBackground() {
  const vimeoEmbedUrl = "https://player.vimeo.com/video/1095753167?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0";

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
       <iframe
        src={vimeoEmbedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        className="absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        title="Vimeo Background Video"
        data-ai-hint="abstract tech"
      />
      <div className="absolute inset-0 h-full w-full bg-background/70 backdrop-blur-[2px]" />
    </div>
  );
}
