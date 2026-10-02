export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-aurora absolute -top-1/3 -left-1/4 size-[70vmax] rounded-full bg-signal/[0.05] blur-[120px]" />
      <div
        className="animate-aurora absolute -right-1/4 -bottom-1/3 size-[60vmax] rounded-full bg-aether/[0.07] blur-[140px]"
        style={{ animationDelay: '-9s' }}
      />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
    </div>
  )
}
