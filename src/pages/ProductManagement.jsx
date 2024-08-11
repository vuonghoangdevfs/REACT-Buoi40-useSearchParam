import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'

const ProductManagement = () => {
  const [arrProduct, setArrProduct] = useState([]);
  const location = useLocation();

  const [search, setSearch] = useSearchParams();

  const kw = search.get('prodName');
  const handleChange = (e) => {
    setSearch({
      prodName: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  const getAllProductApi = async () => {
    let url = '';
    if (kw) {
      url = `https://apitraining.cybersoft.edu.vn/api/ProductApi/getall?keyword=${kw}`
    } else {
      url = `https://apitraining.cybersoft.edu.vn/api/ProductApi/getall`;
    }
    const res = await fetch(url);
    const data = await res.json();
    
    setArrProduct(data);

  }
  useEffect(() => {
    getAllProductApi();
  }, [kw]);

  return (
    <div className="container my-4">
      <div className='breadcrumbs mb-2'>{'Product > List'}</div>
      <button className='p-1' style={{background: '#f06e15', border: 'none'}}>
          <NavLink to="../add-product" className="btn btn-sm text-white float-end">New product</NavLink>
      </button>
      <div className="card mt-4" style={{border: 'none', background: 'none'}}>
        <div className="card-body p-0">
          <form className="input-group mb-3" style={{maxWidth: '300px'}} onSubmit={handleSubmit}>
            <input type="text" className="form-control" placeholder="Search products..." onInput={handleChange} />
            <button type={'submit'} style={{background:'#ff9219', border: 'none'}} className="btn btn-primary" >Search</button>
          </form>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th />
                  <th>NAME</th>
                  <th>IMG</th>
                  <th>PRICE</th>
                  <th>TYPE</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {arrProduct.map((item) => {
                  return <tr key={item.id}>
                    <td><input type="checkbox" /></td>
                    <td>{item.name}</td>
                    <td><img src={item.img} className="product-img" width={50} /></td>
                    <td>{item.price}</td>
                    <td>{item.type}</td>
                    <td className='actions text-end'>
                      <NavLink to={`../product-edit/${item.id}`} className="btn btn-sm btn-primary me-1">Edit</NavLink>

                      <NavLink to={`/admin/product/${item.id}`} className="btn btn-sm btn-success me-1">Edit</NavLink>

                      <button onClick={async (e) => {
                        if (window.confirm('Bạn có muốn xoá không ?')) {
                          const res = await axios.delete(`https://apitraining.cybersoft.edu.vn/api/ProductApi/delete/${item.id}`);
                          getAllProductApi();
                        }
                      }} className="btn btn-sm btn-danger me-1">Delete</button>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
          <div className='d-flex align-items-center justify-content-between p-3 bg-white' style={{
            border: "1px solid #dedede"
          }}>
            <span>Showing 1 to 3 of 3 results</span>
            <div className='d-flex align-items-center justify-content-end w-50' style={{gap: '10px'}}>
              <span>Per page:</span>
              <select className="form-select" style={{ maxWidth: '80px'}}>
                <option value="1">10</option>
                <option value="2">20</option>
                <option value="3">50</option>
              </select>
            </div>  
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductManagement