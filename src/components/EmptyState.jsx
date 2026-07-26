function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-line bg-paper px-8 py-20 text-center">
      <span className="font-display text-4xl text-mustard">·</span>
      <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="max-w-sm font-body text-sm text-ink-soft">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 rounded-full bg-forest px-5 py-2 font-body text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
