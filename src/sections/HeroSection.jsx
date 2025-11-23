import "../styles/herosection.css";
import LocationSearch from "../components/LocationSearch";

function HeroSection() {
  return (
    <div className="herosection">
      <div>
        <h1 className="hero-title">Study Spot</h1>
        <p className="hero-description">
          Find Your Perfect Study Space, Anytime
        </p>
        <p className="search-title">Find a student cafe/lounge near you</p>
      </div>
      <LocationSearch />
    </div>
  );
}

export default HeroSection;
