import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { AnimatePresence, motion } from 'framer-motion';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  /* location.search is gonna look like "?qty=1" 
  so we split it by the "=" creating an array. index 0 is gonna be "?qty" 
  and index 1 is gonna be the number after the equal*/
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <motion.div
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // transition={{ duration: 0.6 }}
    >
      <Row>
        <Col md={8}>
          <h1>Shoping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <AnimatePresence>
              <ListGroup variant="flush">
                {cartItems.map((item, i) => (
                  <motion.div
                    custom={i}
                    variants={{
                      hidden: (i) => ({
                        opacity: 0,
                        y: -50 * i,
                      }),
                      visible: (i) => ({
                        y: 0,
                        opacity: 1,
                        transition: {
                          delay: i * 0.1,
                        },
                      }),
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key={item.product}
                  >
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </motion.div>
                ))}
              </ListGroup>
            </AnimatePresence>
          )}
        </Col>
        <Col md={4}>
          <Card>
            {/* SubTotal */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* Reducing amount of items */}
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </h2>
                {/* Reducing amount of items and multiplying that for their prices */}
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  {' '}
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

export default CartScreen;
