import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm() {
  return (
    <div>
      <SearchFormContainer>
        <input type="text"  placeholder="Search for transations"/>
        <button type="submit">
          <MagnifyingGlass size={20}/>
          Search
        </button>
      </SearchFormContainer>
    </div>
  )
}
