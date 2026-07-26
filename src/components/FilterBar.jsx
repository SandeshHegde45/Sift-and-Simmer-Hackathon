import { useDispatch, useSelector } from "react-redux";
import { setSearch, setCategory, setSort, clearFilters } from "../store/filtersSlice";
import { selectCategoryCounts } from "../store/selectors";

function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const categoryCounts = useSelector(selectCategoryCounts);

  const hasActiveFilter =
    filters.search !== "" || filters.category !== "All" || filters.sort !== "az";

  return (
    <div className="min-w-0 space-y-4">
      <div className="relative">
        <input
          type="text"
          value={filters.search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          placeholder="Search a dish, e.g. paneer tikka..."
          className="w-full rounded-full border border-line bg-paper px-5 py-3 font-body text-sm text-ink placeholder:text-ink-soft focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => dispatch(setCategory("All"))}
          className={`shrink-0 rounded-full border px-4 py-1.5 font-body text-xs font-medium transition-colors ${filters.category === "All"
              ? "border-forest bg-forest text-cream"
              : "border-line bg-paper text-ink-soft hover:border-forest hover:text-forest"
            }`}
        >
          All
        </button>
        {categoryCounts.map(({ category, count }) => (
          <button
            key={category}
            onClick={() => dispatch(setCategory(category))}
            className={`shrink-0 rounded-full border px-4 py-1.5 font-body text-xs font-medium transition-colors ${filters.category === category
                ? "border-forest bg-forest text-cream"
                : "border-line bg-paper text-ink-soft hover:border-forest hover:text-forest"
              }`}
          >
            {category} ({count})
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.sort}
          onChange={(event) => dispatch(setSort(event.target.value))}
          className="rounded-full border border-line bg-paper px-4 py-1.5 font-body text-xs font-medium text-ink-soft focus:border-forest focus:outline-none"
        >
          <option value="az">Name: A to Z</option>
          <option value="za">Name: Z to A</option>
        </select>

        {hasActiveFilter && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="font-mono text-xs uppercase tracking-widest text-wine hover:underline"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;