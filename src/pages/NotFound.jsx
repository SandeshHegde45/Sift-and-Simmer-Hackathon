import { Link } from "react-router";
import { usePageMeta } from "../utils/usePageMeta";

function NotFound() {
  usePageMeta("Page Not Found", "This page doesn't exist on Sift & Simmer.");

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-8">
      <p className="font-display text-7xl font-semibold text-mustard">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
        This page fell off the menu
      </h1>
      <p className="mt-2 max-w-sm font-body text-sm text-ink-soft">
        The page you're looking for doesn't exist. Let's get you back to the kitchen.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-forest px-5 py-2.5 font-body text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
      >
        Back to browsing
      </Link>
    </div>
  );
}

export default NotFound;
