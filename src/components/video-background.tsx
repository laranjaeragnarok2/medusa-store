'use client';

export function VideoBackground() {
  // ATENÇÃO: Links do Vimeo como o que você forneceu não funcionam diretamente
  // aqui porque são para a página do player, não para o arquivo de vídeo.
  //
  // Para funcionar, você precisa de um "Link direto" para o arquivo .mp4.
  // No Vimeo, com uma conta paga, você encontra essa opção nas configurações de
  // distribuição do seu vídeo.
  //
  // A pedido, estou usando a incorporação via iframe, adaptada para background.
  const vimeoEmbedUrl = "https://player.vimeo.com/video/1095753167?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0";

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
       <iframe
        src={vimeoEmbedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        className="absolute left-0 top-0 h-full w-full"
        title="Vimeo Background Video"
        data-ai-hint="abstract tech"
      />
      <div className="absolute inset-0 h-full w-full bg-background/80 backdrop-blur-sm" />
    </div>
  );
}
