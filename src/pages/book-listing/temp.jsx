<div className="product-list" key={index}>
  <div className="product-list-inner" style={{ backgroundColor: '#F9F9F9' }}>
    <em>
      <img src={book.base64image} className="image" alt="dummyimage" />
    </em>
    <div className="content-wrapper">
      <Typography variant="h3" style={{ textAlign: 'center' }}>
        {book.name}
      </Typography>
      <span
        className="category"
        style={{ textAlign: 'center', marginTop: '1rem' }}
      >
        {book.category}
      </span>
      <p className="description" style={{ textAlign: 'center' }}>
        {book.description}
      </p>
      <p className="price">
        <span className="discount-price" style={{ textAlign: 'center' }}>
          MRP &#8377; {book.price}
        </span>
      </p>
      <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
        <span className="MuiButton-label" onClick={() => addToCart(book)}>
          ADD TO CART
        </span>
        <span className="MuiTouchRipple-root"></span>
      </button>
    </div>
  </div>
</div>;
