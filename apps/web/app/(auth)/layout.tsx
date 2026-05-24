import ThreeBackground from "@/components/shared/three-background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark relative min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4 overflow-hidden selection:bg-indigo-500/30">
      <ThreeBackground />
      {/* Decorative top gradient glow */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent pointer-events-none z-[2]" />
      
      {/* Radial glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-[2]" />

      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
