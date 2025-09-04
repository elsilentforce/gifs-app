import type { FC } from "react";

interface Props {
  previousSearches: string[];
  title: string;
  onItemClicked: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ previousSearches, title, onItemClicked }) => {
  return (
    <div className="previous-searches">
      {previousSearches.length > 0 && <h2>{title}</h2>}
      <ul className="previous-searches-list">
        {
          previousSearches.map(term =>
            <li
              key={term}
              onClick={() => onItemClicked(term)}
            >{term}</li>)
        }
      </ul>
    </div>
  );
};
