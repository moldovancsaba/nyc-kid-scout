import logo from "@/assets/logo.png";

export function Logo({ size = 64, withWordmark = true, className = "" }: { size?: number; withWordmark?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="Class Scout NY logo" width={size} height={size} className="rounded-full" />
      {withWordmark && (
        <div className="leading-tight">
          <div className="font-display text-xl font-bold tracking-tight text-sidebar-foreground">Class Scout</div>
          <div className="font-display text-[12px] font-semibold tracking-[0.2em] text-teal">NEW YORK</div>
        </div>
      )}
    </div>
  );
}
