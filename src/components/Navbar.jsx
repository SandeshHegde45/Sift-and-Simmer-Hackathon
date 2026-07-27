import { useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/authSlice";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/categories", label: "Categories" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const dispatch = useDispatch();
  const favoriteCount = useSelector((state) => state.favorites.items.length);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-1 py-1 font-body text-sm font-medium tracking-wide transition-colors ${isActive ? "text-forest" : "text-ink-soft hover:text-forest"
    }`;

  function handleSignOut() {
    setMenuOpen(false);
    dispatch(signOut());
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-display text-lg font-semibold text-mustard-light">
            S
          </span>
          <span className="font-display text-xl font-semibold text-ink">
            Sift &amp; Simmer
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.end}>
              <span className="flex items-center gap-1.5">
                {link.label}
                {link.label === "Favorites" && favoriteCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-wine px-1 font-mono text-[11px] font-bold text-cream">
                    {favoriteCount}
                  </span>
                )}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {userEmail && (
            <span className="max-w-40 truncate font-mono text-xs text-ink-soft" title={userEmail}>
              {userEmail}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="rounded-full border border-line px-4 py-1.5 font-body text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
          >
            Sign out
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
        >
          <span className="font-body text-lg">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3 py-2.5 font-body text-sm font-medium ${isActive ? "bg-forest/10 text-forest" : "text-ink-soft"
                }`
              }
            >
              <span>{link.label}</span>
              {link.label === "Favorites" && favoriteCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-wine px-1 font-mono text-[11px] font-bold text-cream">
                  {favoriteCount}
                </span>
              )}
            </NavLink>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-line px-3 pt-3">
            {userEmail && (
              <span className="truncate font-mono text-xs text-ink-soft">{userEmail}</span>
            )}
            <button
              onClick={handleSignOut}
              className="rounded-full border border-line px-4 py-1.5 font-body text-xs font-semibold text-ink-soft"
            >
              Sign out
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;