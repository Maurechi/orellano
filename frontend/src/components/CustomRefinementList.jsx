import { Highlight, connectRefinementList } from 'react-instantsearch-dom';

const RefinementList = ({ items, isFromSearch, refine, createURL }) => (
  <ul className="no-deco inline">
    {items.map((item) => (
      <li key={item.label}>
        <a
          className="btn btn-light scale"
          href={createURL(item.value)}
          style={{ color: item.isRefined ? '#BFA33F' : '' }}
          onClick={(event) => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {isFromSearch ? (
            <Highlight attribute="label" hit={item} />
          ) : (
            item.label
          )}
          {'  | '}
          {item.count}
        </a>
      </li>
    ))}
  </ul>
);

const CustomRefinementList = connectRefinementList(RefinementList);
export default CustomRefinementList;
