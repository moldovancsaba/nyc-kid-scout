import logo from "@/assets/class-scout-logo.png.asset.json";

export function Logo({ size = 128, withWordmark = true, className = "" }: { size?: number; withWordmark?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo.url} alt="Class Scout NY logo" width={size} height={size} className="h-auto w-auto object-contain" />
      {withWordmark && (
        <div className="leading-tight">
          <div className="font-display text-2xl font-bold tracking-tight text-sidebar-foreground">Class Scout</div>
          <div className="text-[11px] font-medium tracking-[0.02em] text-sidebar-foreground/78">New York</div>
        </div>
      )}
    </div>
  );
}
