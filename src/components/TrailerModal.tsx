import { useEffect } from "react";

const VIMEO_ID = "905410003";

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
}

export function TrailerModal({ open, onClose }: TrailerModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Trailer player"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "48rem",
          aspectRatio: "16 / 9",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            color: "#fff",
            fontSize: "1.875rem",
            fontWeight: 700,
            zIndex: 10,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <iframe
          src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1`}
          title="Chase Padgett: 6 String Christmas - Sizzle Reel"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0.5rem",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}

export { VIMEO_ID };
