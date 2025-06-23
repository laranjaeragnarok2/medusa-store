'use client';

export function VideoBackground() {
  // ATENÇÃO: Para que o vídeo do Vimeo funcione como fundo, o ideal é usar
  // um link direto para o arquivo .mp4, que geralmente está disponível
  // nas configurações de distribuição de contas pagas do Vimeo (Pro, etc.).
  const videoUrl = "https://vimeo.com/1095753167/023b1b0cd1";

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
