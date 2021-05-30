import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import SearchBox from './SearchBox';
// Algolia
// import { SearchBox } from 'react-instantsearch-dom';
import CustomSearchBox from '../components/CustomSearchBox'
import algoliasearch from 'algoliasearch/lite'

//
import { logout } from '../actions/userActions'
import { SEARCHING_ACTIVE, SEARCHING_RESET } from '../constants/searchConstants'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  const searching = useSelector((state) => state.searching)

  return (
    <header>
      <Navbar
        className='black-marble'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer
            to='/'
            onClick={() => dispatch({ type: SEARCHING_RESET })}
          >
            <Navbar.Brand className='black'>Macellaio</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <SearchBox onChange={(e) => searchHandler(e.target.value)} /> */}
            <CustomSearchBox />
            <LinkContainer
              to=''
              onClick={() => dispatch({ type: SEARCHING_ACTIVE })}
            >
              <Nav.Link className='black scale ml-auto'>
                <strong>Browse the Collection</strong>
              </Nav.Link>
            </LinkContainer>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link className='black grow'>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  className='black grow front'
                  title={userInfo.name}
                  id='user'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='black'>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className='black' onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='black grow'>
                    <i className='fas fa-user'></i>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='admin' id='adminmenu' className='front'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
