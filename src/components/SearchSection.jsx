import "../styles/searchsection.css";
import LocationSearch from "../components/LocationSearch";
import CafeSearch from "./CafeSearch";

function SearchSection() {
  return (
    <div className="searchsection">
      <div>
        <CafeSearch />
      </div>
      <div>
        <LocationSearch />
      </div>
    </div>
  );
}

export default SearchSection;
