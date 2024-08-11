
import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductManagement from './pages/ProductManagement'
import ProductLayout from './MasterPages/ProductLayout'

//import css
import './assets/styles/index.css';
import CreateProduct from './pages/ProductManagement/CreateProduct'
import Product from './pages/ProductManagement/Product'
import UpdateProduct from './pages/ProductManagement/UpdateProduct';
import EditProduct from './pages/ProductManagement/EditProduct';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='product-management' element={<ProductLayout />}>
          <Route index element={<ProductManagement />}></Route>
          <Route path='create-product' element={<CreateProduct />}></Route>
          <Route path='update-product' element={<UpdateProduct />}></Route>
          <Route path='product' element={<Product />}></Route>
          <Route path='product'>
            <Route path=':id' element={<Product />}></Route>
          </Route>
          <Route path='product-edit'>
            <Route path=':id' element={<EditProduct />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App