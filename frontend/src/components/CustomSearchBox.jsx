import { connectSearchBox } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCHING_ACTIVE } from '../constants/searchConstants';
import React, { useState } from 'react';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const dispatch = useDispatch();

  const searching = useSelector((state) => state.searching);
  !searching && refine('');
  const searchHandler = (e) => {
    e.length === 1 && dispatch({ type: SEARCHING_ACTIVE });
  };
  return (
    <form noValidate action="" role="search">
      <input
        className="form-control"
        type="search"
        value={searching ? currentRefinement : ''}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="search"
        onInput={(e) => searchHandler(e.target.value)}
      />
      {/* <button onClick={() => refine('')}>Reset query</button> */}
      {/* {isSearchStalled ? 'My search is stalled' : ''} */}
    </form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
