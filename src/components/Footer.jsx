function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-display text-sm text-ink-soft">
            Sift &amp; Simmer — recipes worth bookmarking.
          </p>
          <p className="font-mono text-xs text-ink-soft">
            Recipe data via My Recipe Database
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
