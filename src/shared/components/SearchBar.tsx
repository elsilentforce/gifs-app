interface SearchBarProps {
  placeholder: string;
  searchText: string;
}

export const SearchBar = ({ placeholder, searchText }: SearchBarProps) => {
  return (
    <div className="search-container">
      <input type="text" placeholder={placeholder} />
      <button>{searchText}</button>
    </div>
  )
}
