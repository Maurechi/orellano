import { connectSearchBox } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCHING_ACTIVE } from '../constants/searchConstants';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const SearchBox = ({ currentRefinement, isSearchStalled, refine, history }) => {
  const dispatch = useDispatch();

  const searching = useSelector((state) => state.searching);
  !searching && refine('');
  const searchHandler = (e) => {
    e.length === 1 && dispatch({ type: SEARCHING_ACTIVE });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <Form noValidate action="" role="search" inline onSubmit={submitHandler}>
      <input
        className="form-control"
        type="search"
        value={searching ? currentRefinement : ''}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="search"
        onInput={(e) => searchHandler(e.target.value)}
      />
      <Button type="submit" variant="outline-dark" className="p-2">
        Search
      </Button>
      {/* <button onClick={() => refine('')}>Reset query</button> */}
      {/* {isSearchStalled ? 'My search is stalled' : ''} */}
    </Form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default withRouter(CustomSearchBox);
