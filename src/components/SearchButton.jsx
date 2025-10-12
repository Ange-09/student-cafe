import "../styles/searchbutton.css";

const SearchButton = ({ onClick, disabled = false }) => {
  return (
    <button className="search-button" onClick={onClick} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="search-icon"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <span className="search-text">Search</span>
    </button>
  );
};

export default SearchButton;
