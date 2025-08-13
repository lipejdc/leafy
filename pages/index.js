import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import PlantExplorer from "@/components/PlantExplorer/PlantExplorer";

export default function HomePage({ toggleOwned }) {
  // Search input state
  const [searchQuery, setSearchQuery] = useState("");
  // Debounced value for SWR
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounce search input for smooth UX
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <>
      <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
      <PlantExplorer search={debouncedSearch} toggleOwned={toggleOwned} />
    </>
  );
}
