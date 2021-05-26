import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connectHits } from 'react-instantsearch-dom';
import { motion } from 'framer-motion';

const Hits = ({ hits }) => (
  <>
    {hits.map((hit, i) => (
      <Col key={hit._id.$oid} sm={12} md={6} lg={4} xl={3}>
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
          <HitCard product={hit} />
        </motion.div>
      </Col>
    ))}
  </>
);

const HitCard = ({ product }) => {
  <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }} />;
  return (
    <div className="grow">
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id.$oid}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id.$oid}`}>
            <Card.Title as="div">
              <h4>{product.name}</h4>{' '}
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <p>{product.category}</p>
          </Card.Text>

          <Card.Text as="h5">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
