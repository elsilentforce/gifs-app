import type { FC } from "react";

interface Props {
  placeholder: string;
  searchText: string;
}

export const SearchBar: FC<Props> = ({ placeholder, searchText }) => {
  return (
    <div className="search-container">
      <input type="text" placeholder={placeholder} />
      <button>{searchText}</button>
    </div>
  )
}
