export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "#0A0A0A" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo mark placeholder */}
        <div className="relative">
          <div
            className="h-14 w-14 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #004E8F, #0076D1)",
              boxShadow: "0 0 30px rgba(0, 118, 209, 0.4)",
            }}
          />
          {/* Spinning ring */}
          <div
            className="absolute -inset-2 animate-spin rounded-2xl border-2 border-transparent"
            style={{ borderTopColor: "#0076D1", animationDuration: "1s" }}
          />
        </div>
        {/* Pulsing dots */}
        <div className="flex items-center gap-1.5">
          {[0, 0.15, 0.3].map((delay, i) => (
            <span
              key={i}
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{
                background: "rgba(0, 118, 209, 0.7)",
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
