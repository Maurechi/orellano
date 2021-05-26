import { connectSearchBox } from 'react-instantsearch-dom';
import { useDispatch } from 'react-redux';
import { SEARCHING_ACTIVE } from '../constants/searchConstants';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.length > 0 && dispatch({ type: SEARCHING_ACTIVE });
  };
  return (
    <form noValidate action="" role="search">
      <input
        className="form-control"
        type="search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="search"
        onInput={(e) => searchHandler(e.target.value)}
      />
      {/* <button onClick={() => refine('')}>Reset query</button> */}
      {isSearchStalled ? 'My search is stalled' : ''}
    </form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
