import "../styles/herosection.css";
import LocationSearch from "../components/LocationSearch";

function HeroSection() {
  return (
    <div className="herosection">
      <div>
        <h1 className="hero-title">Website Name/Tagline</h1>
        <p className="hero-description">
          sample description sample description sample description sample
          description sample description sample description
        </p>
        <p className="search-title">Find a student cafe/lounge near you</p>
      </div>
      <LocationSearch />
    </div>
  );
}

export default HeroSection;
