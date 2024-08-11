import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
const EditProduct = () => {
  const params = useParams(); //Lấy tham số id trên url 
  const {id} = params;
  const navigate = useNavigate();
  const prodEditForm = useFormik({
    initialValues:{
      id:'',
      name:'',
      price:'',
      description:'',
      img:'',
      type:'APPLE',
      delete:false
    },
    onSubmit: async (value) => {
      console.log(value);
      //Gọi api update 
      const res = await axios.put(`https://apitraining.cybersoft.edu.vn/api/ProductApi/update/${value.id}`, value);
      //Sau khi chỉnh sửa xong thì dùng navigate chuyển trang quản lí
      alert('update thành công');
      navigate('../../productmanagement')
    }
  })
  const getProductById = async () => {
    const res = await axios.get(`https://apitraining.cybersoft.edu.vn/api/ProductApi/get/${id}`);
    console.log(res.data);
    //Lấy dữ liệu về thành công => Đưa lên form
    // prodEditForm.setFieldValue('name',res.data.description) //set value tuỳ biến
    prodEditForm.setValues(res.data)
  }

  useEffect(()=>{
    getProductById();
  },[id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              Edit Product
            </div>
            <div className="card-body">
              <form onSubmit={prodEditForm.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">ID</label>
                  <input value={prodEditForm.values.id} onChange={prodEditForm.handleChange} type="text" className="form-control" name="id" disabled />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input value={prodEditForm.values.name}  onChange={prodEditForm.handleChange} type="text" className="form-control" name="name" />
                </div>
                <div className="mb-3">
                  <label  htmlFor="price" className="form-label">Price</label>
                  <input value={prodEditForm.values.price}  onChange={prodEditForm.handleChange} type="text" className="form-control" name="price" />
                </div>
                <div className="mb-3">
                  <label htmlFor="img" className="form-label">Image URL</label>
                  <input value={prodEditForm.values.img}  onChange={prodEditForm.handleChange} type="text" className="form-control" name="img" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input value={prodEditForm.values.description}  onChange={prodEditForm.handleChange} type="text" className="form-control" name="description" />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Type</label>
                  <select value={prodEditForm.values.type}  onChange={prodEditForm.handleChange} className='form-control' name="type">
                    <option value={'SONY'}>SONY</option>
                    <option value={'APPLE'}>APPLE</option>
                    <option value={'SAMSUNG'}>SAMSUNG</option>
                    <option value={'XIAOMI'}>XIAOMI</option>
                  </select>
                </div>
                <div className="mb-3 form-check">
                  <input value={prodEditForm.values.id}  onChange={prodEditForm.handleChange} type="checkbox" className="form-check-input" name="deleted" />
                  <label className="form-check-label" htmlFor="deleted">Deleted</label>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditProduct