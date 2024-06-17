// product-list-frontend/app/components/ProductList.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../app/store/slices/productSlice'; 
import Pagination from './Pagination'; 
import '../app/globals.css'; 

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const count = useSelector((state) => state.products.totalCount);
  const status = useSelector((state) => state.products.status);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [sortCategory, setSortCategory] = useState('');

  const productsPerPage = 9;
  const totalPages = Math.ceil(count / productsPerPage);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, query: searchQuery, sortPrice, sortCategory }));
  }, [dispatch, currentPage, searchQuery, sortPrice, sortCategory]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortPriceChange = (selectedSortPrice) => {
    setSortPrice(selectedSortPrice);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortCategoryChange = (selectedSortCategory) => {
    setSortCategory(selectedSortCategory);
    setCurrentPage(1); // Reset to first page on sort change
  };

  return (
    <div className="container">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="sort-dropdowns">
          <select className="sort-dropdown" value={sortCategory} onChange={(e) => handleSortCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Movies">Movies</option>
            <option value="Beauty">Beauty</option>
            <option value="Toys">Toys</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Health">Health</option>
            <option value="Clothing">Clothing</option>
            <option value="Games">Games</option>
            <option value="Computers">Computers</option>
            <option value="Garden">Garden</option>
            <option value="Sports">Sports</option>
            <option value="Tools">Tools</option>
            <option value="Baby">Baby</option>
            <option value="Shoes">Shoes</option>
            <option value="Home">Home</option>
            <option value="Books">Books</option>
            <option value="Grocery">Grocery</option>
            <option value="Music">Music</option>
            <option value="Industrial">Industrial</option>
            <option value="Kids">Kids</option>
            <option value="Automotive">Automotive</option>
          </select>
          <select className="sort-dropdown" value={sortPrice} onChange={(e) => handleSortPriceChange(e.target.value)}>
            <option value="">Sort by price</option>
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
          </select>
        </div>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product product-border">
            <p>Category: <strong>{product.category}</strong></p>
            <img src={product.image} alt={product.name} />
            <p><strong>{product.name}</strong></p>
            <p>Price: <strong>${product.price}</strong></p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;

