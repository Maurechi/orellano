import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
// import Rating from './Rating';

const Product = ({ product }) => {
  <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }} />;
  return (
    <div className="grow">
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <h4>{product.name}</h4>{' '}
            </Card.Title>
          </Link>

          <Card.Text as="div">
            {/* <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          /> */}
            <p>{product.category}</p>
          </Card.Text>

          <Card.Text as="h5">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
