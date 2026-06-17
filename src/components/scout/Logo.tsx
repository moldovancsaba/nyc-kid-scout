import logoAsset from "@/assets/class-scout-logo.png.asset.json";

/**
 * Class Scout brand logo.
 *
 * Per brand guidelines the navy pin-mark must never sit directly on a dark
 * or similarly-toned surface. The `tone` prop controls the badge container:
 *  - "light"  → no badge, subtle navy ring on warm-ivory / white surfaces
 *  - "dark"   → warm-ivory rounded badge with a hairline navy ring, so the
 *               navy outline of the pin always reads against dark backgrounds
 *  - "accent" → warm-ivory badge on terracotta / sage colored fields
 *
 * Clearspace: the badge enforces ~12% padding around the mark on every side.
 */
type LogoTone = "light" | "dark" | "accent";

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  /** Surface the logo sits on. Defaults to "dark" (sidebar usage). */
  tone?: LogoTone;
  /** Override wordmark color (defaults match the surface tone). */
  wordmarkClassName?: string;
}

export function Logo({
  size = 128,
  withWordmark = true,
  className = "",
  tone = "dark",
  wordmarkClassName,
}: LogoProps) {
  // Clearspace ~14% of the mark on every side. Badge is a fixed square so the
  // mark always optically centers regardless of its intrinsic aspect ratio.
  const pad = Math.max(6, Math.round(size * 0.14));
  const badgeSize = size + pad * 2;

  // Tone-driven badge appearance. Inner surface is always Warm Ivory so the
  // navy pin outline always has separation from the page background.
  const badgeClasses =
    tone === "light"
      ? "bg-transparent ring-1 ring-navy/10"
      : tone === "accent"
        ? "bg-ivory ring-2 ring-navy/15 shadow-[0_2px_8px_-2px_rgba(11,34,62,0.18)]"
        : "bg-ivory ring-1 ring-navy/10 shadow-[0_2px_8px_-2px_rgba(11,34,62,0.25)]";

  const defaultWordmark =
    tone === "dark"
      ? "text-sidebar-foreground"
      : "text-navy";
  const subWordmark =
    tone === "dark"
      ? "text-sidebar-foreground/78"
      : "text-navy/60";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-2xl ${badgeClasses}`}
        style={{ width: badgeSize, height: badgeSize }}
      >
        <img
          src={logoAsset.url}
          alt="Class Scout NY logo"
          className="block object-contain"
          style={{ width: size, height: size }}
        />
      </div>
      {withWordmark && (
        <div className="leading-tight">
          <div
            className={`font-display text-2xl font-bold tracking-tight ${
              wordmarkClassName ?? defaultWordmark
            }`}
          >
            Class Scout
          </div>
          <div className={`text-[11px] font-medium tracking-[0.02em] ${subWordmark}`}>
            New York
          </div>
        </div>
      )}
    </div>
  );
}
