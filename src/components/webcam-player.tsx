"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "online" | "offline";

// O player só existe depois do clique: a biblioteca de vídeo (hls.js) e o
// stream não pesam para quem não pediu para ver a câmera.
export function WebcamPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<{ destroy(): void } | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, []);

  const start = async () => {
    const video = videoRef.current;
    if (!video) return;

    setStatus("loading");
    hlsRef.current?.destroy();
    hlsRef.current = null;

    // Safari reproduz HLS sem biblioteca.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play().catch(() => {});
      return;
    }

    try {
      const { default: Hls } = await import("hls.js");
      if (!Hls.isSupported()) {
        setStatus("offline");
        return;
      }

      const hls = new Hls({ lowLatencyMode: true });
      hlsRef.current = hls;
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setStatus("offline");
          hls.destroy();
          hlsRef.current = null;
        }
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } catch {
      setStatus("offline");
    }
  };

  return (
    <div className="relative aspect-video w-full bg-ink text-white">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        controls={status === "online"}
        muted
        playsInline
        onPlaying={() => setStatus("online")}
        onError={() => setStatus("offline")}
      />

      {status !== "online" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          {status === "idle" && (
            <>
              <button type="button" onClick={start} className="btn">
                Ver a rampa ao vivo
              </button>
              <p className="t-small text-white/70">
                O vídeo consome dados; no celular, prefira o Wi-Fi.
              </p>
            </>
          )}
          {status === "loading" && (
            <p className="t-label" role="status">
              Conectando à câmera…
            </p>
          )}
          {status === "offline" && (
            <>
              <p className="t-h3" role="status">
                Câmera fora do ar no momento
              </p>
              <button type="button" onClick={start} className="btn">
                Tentar de novo
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
