import { usePageMeta } from "../utils/usePageMeta";

const stack = [
  { name: "React", role: "UI components and rendering" },
  { name: "Redux Toolkit", role: "Global state — recipes, filters, favorites, messages" },
  { name: "React Router", role: "Client-side routing between pages" },
  { name: "Supabase", role: "Recipe database and queries" },
  { name: "Tailwind CSS", role: "Styling, layout, and responsiveness" },
];

function About() {
  usePageMeta(
    "About",
    "About Sift & Simmer — an Indian vegetarian recipe browser built with React and Redux Toolkit."
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-wine">Our story</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        About Sift &amp; Simmer
      </h1>

      <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
        Sift &amp; Simmer is a small collection of Indian vegetarian recipes —
        the kind of dishes that get passed down on index cards and typed-up
        family group chats. Every dish here skips meat, fish, and eggs, so
        you can browse without checking each ingredient list twice.
      </p>

      <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
        Recipe data lives in a Supabase database — real descriptions, prep
        time, servings, calories, and difficulty for every dish, not just a
        name and a photo.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">Built with</h2>
        <ul className="mt-4 divide-y divide-line">
          {stack.map((item) => (
            <li key={item.name} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-body text-sm font-semibold text-ink">{item.name}</span>
              <span className="font-body text-sm text-ink-soft">{item.role}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full bg-forest/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-forest">
          100% Vegetarian
        </span>
        <span className="rounded-full bg-mustard/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink">
          Indian Cuisine
        </span>
        <span className="rounded-full bg-wine/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-wine">
          Data via Supabase
        </span>
      </div>
    </div>
  );
}

export default About;
