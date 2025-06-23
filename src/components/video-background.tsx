'use client';

export function VideoBackground() {
  // ATENÇÃO: Links do Vimeo como o que você forneceu não funcionam diretamente
  // aqui porque são para a página do player, não para o arquivo de vídeo.
  //
  // Para funcionar, você precisa de um "Link direto" para o arquivo .mp4.
  // No Vimeo, com uma conta paga, você encontra essa opção nas configurações de
  // distribuição do seu vídeo.
  //
  // Voltei para um vídeo temporário que funciona. Quando tiver o link .mp4,
  // é só colar no lugar do videoUrl abaixo.
  const videoUrl = "https://videos.pexels.com/video-files/4434242/4434242-hd_1920_1080_30fps.mp4";

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
