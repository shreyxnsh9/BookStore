import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { productListingStyle } from './style';
import { materialCommonStyles } from '../../utils/materialCommonStyles';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Box,
  Paper,
  InputAdornment,
} from '@mui/material';

import { useAuthContext } from '../../context/auth';
import { toast } from 'react-toastify';
import Shared from '../../utils/shared';
import { useCartContext } from '../../context/cart';
import { defaultFilter } from '../../constant/constant';
import bookService from '../../service/book.service';
import categoryService from '../../service/category.service';
import SearchIcon from '@mui/icons-material/Search';
import Book from '../book';

const BookList = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 8,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('a-z');
  const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === '') delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    // console.log(bookList);
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  const addToCart = (book) => {
    Shared.addToCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === 'a-z' ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === 'a-z' ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };
  // console.log(bookResponse, books);
  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h2" mb={3}>
          Book List
        </Typography>
        <Grid container className="title-wrapper">
          <Grid item>
            <Typography variant="h4">
              Total
              <span> - {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <Grid item>
            <div className="dropdown-wrapper">
              <TextField
                id="text"
                className="dropdown-wrapper"
                name="text"
                placeholder="Search..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ className: 'small' }}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    keyword: e.target.value,
                    pageIndex: 1,
                  });
                }}
              />
            </div>
          </Grid>
          <Grid item>
            <FormControl className="dropdown-wrapper" variant="outlined">
              <InputLabel htmlFor="select">Sort By</InputLabel>
              <Select
                className={materialClasses.customSelect}
                MenuProps={{
                  classes: { paper: materialClasses.customSelect },
                }}
                onChange={sortBooks}
                value={sortBy}
              >
                <MenuItem value="a-z">a - z</MenuItem>
                <MenuItem value="z-a">z - a</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            <Grid container spacing={2}>
              {books.map((book, index) => (
                // <div className="product-list" key={index}>
                <Grid item xs={10} sm={6} md={4} lg={3} key={index}>
                  <Card
                    style={{
                      padding: '20px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={book.base64image}
                      sx={{ height: '200px' }}
                    />
                    <CardContent style={{ flexGrow: 1 }}>
                      <Box>
                        <Box width={'100%'} my={2}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            display={'inline'}
                          >
                            {book.name}
                          </Typography>
                          <Chip
                            size="small"
                            label={book.category}
                            sx={{
                              margin: '0px 0px 8px 10px',
                              bgcolor: '#6883bc',
                              color: 'white',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {book.description.substring(0, 100) + '......'}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions
                      mt={2}
                      sx={{ marginTop: 'auto', justifyContent: 'start' }}
                    >
                      <Box
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        mx={2}
                      >
                        <Typography>₹ {book.price}</Typography>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: '#8a307f' }}
                          onClick={() => addToCart(book)}
                        >
                          Add To cart
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookList;
