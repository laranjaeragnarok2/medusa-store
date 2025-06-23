'use client';

export function VideoBackground() {
  // O link do Google Drive pode ser instável. É melhor hospedar seu vídeo em um
  // serviço como Vimeo (Pro), Mux, ou Cloudinary e usar o link direto do MP4.
  // Eu adicionei um vídeo placeholder que funciona para você ver o efeito.
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-futuristic-scrolling-data-codes-34228-large.mp4";

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
