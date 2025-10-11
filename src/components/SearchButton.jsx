import "../styles/searchbutton.css";

export default function SearchButton({
  onClick,
  text = "Search",
  disabled = false,
}) {
  return (
    <button onClick={onClick} disabled={disabled} className="search-button">
      <span className="button-icon">🔍</span>
      {text}
    </button>
  );
}
