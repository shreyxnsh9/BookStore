import React, { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { headerStyle } from './style';
import {
  List,
  AppBar,
  ListItem,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
  Button,
  Badge,
} from '@mui/material';
import { ShoppingCart, LocalLibrary } from '@mui/icons-material';
import siteLogo from '../../assets/images/site-logo.svg';
import cartIcon from '../../assets/images/cart.png';
import Shared from '../../utils/shared';
import { useAuthContext } from '../../context/auth';
import { RoutePaths } from '../../utils/enum';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bookService from '../../service/book.service';
import { useCartContext } from '../../context/cart';

const Header = () => {
  const classes = headerStyle();
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  console.log(authContext.user);
  // const [open, setOpen] = useState(false);
  const [query, setquery] = useState('');
  const [BookList, setbookList] = useState([]);
  const [setOpenSearchResult] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  // for mobile menu
  const openMenu = () => {
    document.body.classList.toggle('open-menu');
  };

  const items = useMemo(() => {
    return Shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);

  const logOut = () => {
    authContext.signOut();
    cartContext.emptyCart();
  };

  const addToCart = (book) => {
    if (!authContext.user.id) {
      navigate(RoutePaths.Login);
      toast.error('Please login before adding books to cart');
    } else {
      Shared.addToCart(book, authContext.user.id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Item added in cart');
          cartContext.updateCart();
        }
      });
    }
  };

  return (
    <div className={classes.headerWrapper}>
      <AppBar
        className="site-header"
        id="header"
        position="static"
        sx={{ bgcolor: 'gray' }}
      >
        <div className="bottom-header">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo-wrapper">
                <Link to="/" className="site-logo" title="logo">
                  <img
                    src={siteLogo}
                    alt="logo"
                    width={'120px'}
                    height={'40px'}
                  />
                </Link>
              </div>
              <div className="nav-wrapper">
                <div className="top-right-bar">
                  <List className="top-nav-bar">
                    {!authContext.user.id && (
                      <>
                        <ListItem>
                          <NavLink to={RoutePaths.Login} title="Login">
                            Login
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <Link to={RoutePaths.Register} title="Register">
                            Register
                          </Link>
                        </ListItem>
                      </>
                    )}
                    {items.length >= 2 ? (
                      items.map((item, index) => (
                        <ListItem key={index}>
                          <Link to={item.route} title={item.name}>
                            {item.name}
                          </Link>
                        </ListItem>
                      ))
                    ) : (
                      <Link to="/book" title="Book">
                        <LocalLibrary
                          sx={{
                            color: 'black',
                            width: '27px',
                            height: '27px',
                            margin: '0 5px',
                          }}
                        />
                      </Link>
                    )}
                  </List>
                  <List>
                    <ListItem>
                      <Link to="/cart" title="Cart" margin={'0 5px'}>
                        <Badge
                          badgeContent={cartContext.cartData.length}
                          color="warning"
                          sx={{ margin: '2px 0px 0px 20px' }}
                        >
                          <ShoppingCart
                            sx={{
                              color: 'black',
                              width: '26px',
                              height: '26px',
                            }}
                            fontSize="medium"
                          />
                        </Badge>
                      </Link>
                    </ListItem>
                    <ListItem className="hamburger" onClick={openMenu}>
                      <span></span>
                    </ListItem>
                  </List>

                  {authContext.user.id && (
                    <>
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                          '&:hover': {
                            bgColor: 'none',
                          },
                        }}
                      >
                        <Avatar sx={{ color: 'white', bgcolor: 'gray' }}>
                          {authContext.user.firstName.substring(0, 1) +
                            '' +
                            authContext.user.lastName.substring(0, 1)}
                        </Avatar>
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link to={'/update-profile'} title={'Update Profile'}>
                            {'Update Profile'}
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={() => logOut()}>Logout</MenuItem>
                      </Menu>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
