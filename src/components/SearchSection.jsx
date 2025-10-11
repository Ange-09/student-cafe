import "../styles/searchsection.css";
import LocationSearch from "../components/LocationSearch";
import CafeSearch from "./CafeSearch";
import AmenitiesFilter from "./AmenitiesFilter";
import SearchButton from "./SearchButton";

function SearchSection() {
  return (
    <div className="searchsection">
      <div>
        <CafeSearch />
      </div>
      <div>
        <LocationSearch />
      </div>
      <div>
        <AmenitiesFilter />
      </div>
      <div>
        <SearchButton />
      </div>
    </div>
  );
}

export default SearchSection;
