function Loader({ label = "Simmering results..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-line border-t-forest" />
        <div className="absolute inset-3 rounded-full bg-mustard" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
        {label}
      </p>
    </div>
  );
}

export default Loader;
