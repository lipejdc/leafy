import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import FilterBar from "@/components/FilterBar/FilterBar";
import PlantExplorer from "@/components/PlantExplorer/PlantExplorer";

export default function HomePage({ toggleOwned }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Filter state
  const [lightFilter, setLightFilter] = useState("All");
  const [waterFilter, setWaterFilter] = useState("All");

  // Filter options state (populated by PlantExplorer)
  const [lightNeedsOptions, setLightNeedsOptions] = useState(["All"]);
  const [waterNeedsOptions, setWaterNeedsOptions] = useState(["All"]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <>
      <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
      <FilterBar
        lightNeeds={lightNeedsOptions}
        waterNeeds={waterNeedsOptions}
        lightFilter={lightFilter}
        waterFilter={waterFilter}
        setLightFilter={setLightFilter}
        setWaterFilter={setWaterFilter}
      />
      <PlantExplorer
        search={debouncedSearch}
        toggleOwned={toggleOwned}
        lightFilter={lightFilter}
        waterFilter={waterFilter}
        setLightNeedsOptions={setLightNeedsOptions}
        setWaterNeedsOptions={setWaterNeedsOptions}
      />
    </>
  );
}
