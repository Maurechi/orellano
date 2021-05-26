import { connectPagination } from 'react-instantsearch-dom';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
  <BootstrapPagination>
    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1;
      const style = {
        color: currentRefinement === page ? '#BFA33F' : '',
        scale: '2',
      };

      return (
        <BootstrapPagination.Item key={index}>
          <a
            href={createURL(page)}
            style={style}
            onClick={(event) => {
              event.preventDefault();
              refine(page);
            }}
          >
            {page}
          </a>
        </BootstrapPagination.Item>
      );
    })}
  </BootstrapPagination>
);

const CustomPagination = connectPagination(Pagination);

export default CustomPagination;
