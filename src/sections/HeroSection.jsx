import "../styles/herosection.css";
import LocationSearch from "../components/LocationSearch";

function HeroSection() {
  return (
    <div className="herosection">
      <div>
        <h1 className="hero-title">Study Spot</h1>
      </div>
      <div>
        <p className="hero-description">
          Find Your Perfect Study Space
          <br />
          Anytime, Anywhere
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
