import React from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

import { searchList } from "../actions";

import { SearchBar } from "../styles";

const Search = () => {
  const { criteria } = useMappedState(mapState);
  const dispatch = useDispatch();

  return (
    <SearchBar
      type="text"
      name="searchText"
      onChange={e => dispatch(searchList(e.target.value))}
      value={criteria}
      placeholder="Search"
    />
  );
};

const mapState = ({ criteria }) => ({
  criteria
});

export default Search;
