import React, { useState } from 'react'
import PageHeader from '../components/PageHeader';
import Data from "../products.json";
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import Search from './Search';
import ShopCategory from './ShopCategory';
import PopulerPost from './PopulerPost';
import Tags from './Tags';

const showResult = "Showing 01 - 12 of 139 Results";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState(Data);

  //   category active colors
const [selectedCategory, setSelectedCategory] = useState("All");

  // pagination
  // Get current products to display
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // category based filtering
  const menuItems = [...new Set(Data.map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setSelectedCategory(curcat); 
    setProducts(newItem);
    // console.log(selectedCategory)
  };
  
  return (
    <div>
      <PageHeader title="Our Shop Page" curPage="Shop" />
      <div className='shop-page padding-tb'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResult}</p>
                  <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                    <a className='grid' onClick={() => setGridList(!GridList)}>
                      <i className='icofont-ghost'></i>
                    </a>
                    <a className='list' onClick={() => setGridList(!GridList)}>
                      <i className='icofont-listine-dots'></i>
                    </a>

                  </div>


                </div>
                <div>
                  <ProductCard GridList={GridList} products={currentProducts} />
                  <Pagination productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                  />
                </div>
              </article>

            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList}/>
                <ShopCategory filterItem={filterItem}
                 setItem={setProducts} 
                  menuItems={menuItems}
                  setProducts={setProducts}
                  selectedCategory={selectedCategory}
                  />
                  <PopulerPost/>
                  <Tags/>
              </aside>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Shop