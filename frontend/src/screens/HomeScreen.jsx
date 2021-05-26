import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
// import Product from '../components/Product';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
// import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
// import PicturesCarousel from '../components/PicturesCarousel';
import { listProducts } from '../actions/productActions';
import { AnimatePresence, motion } from 'framer-motion';
import CustomHits from '../components/Hit';
import {
  // connectHits,
  InstantSearch,
  SearchBox,
  // Hits,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { SEARCHING_RESET } from '../constants/searchConstants';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const searching = useSelector((state) => state.searching);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Meta />
      <AnimatePresence>
        {!searching ? (
          <motion.div
            key="productCarousel"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCarousel />
          </motion.div>
        ) : (
          <motion.div
            key="backLink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="btn btn-light grow"
              onClick={() => dispatch({ type: SEARCHING_RESET })}
            >
              Back to Home
            </Link>
          </motion.div>
        )}
        {!searching && (
          <motion.div
            className="latest"
            key="latest"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-center white mt-auto">Latest Collection</h1>
          </motion.div>
        )}
      </AnimatePresence>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {/* <InstantSearch searchClient={searchClient} indexName="Macellaio"> */}
            {/* <SearchBox /> */}

            {/* {products.map((product, i) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                      },
                      visible: (i) => ({
                        opacity: 1,
                        transition: {
                          delay: i * 0.09,
                        },
                      }),
                    }}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.6 }}
                  >
                    <Product product={product} />
                  </motion.div>
                </Col>
              ))} */}
            <CustomHits />
            {/* </InstantSearch> */}
          </Row>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </motion.div>
  );
};

export default HomeScreen;
