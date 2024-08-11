import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import * as yup from 'yup';

const Product = () => {
    const match = useMatch('/admin/product/:id');
    const navigate = useNavigate();
    console.log(match);
    const isEdit = !!match; 
    const prodForm = useFormik({
        initialValues: {
            id: '',
            name: '',
            price: '',
            description: '',
            img: '',
            type: 'APPLE',
            delete: false
        },
        validationSchema:yup.object().shape({
        }),
        onSubmit: async (data) => {
            let url = 'https://apitraining.cybersoft.edu.vn/api/ProductApi/create';
            let method = 'POST';
            if(isEdit){
                url = `https://apitraining.cybersoft.edu.vn/api/ProductApi/update/${match.params.id}`;
                method = 'PUT';
            };
            {
            }
            
             const res = await axios({
                url,
                method,
                data
            });
            navigate('/admin/productmanagement',{state:'abc'});
        }
    });
    const getProductById = async () => {
        const res = await axios.get(`https://apitraining.cybersoft.edu.vn/api/ProductApi/get/${match.params.id}`);
        prodForm.setValues(res.data)
    }
    useEffect(() => {
        if (isEdit) {
            getProductById();
        }
    }, [isEdit])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            {isEdit ? 'Edit product' : 'Add new product'}
                        </div>
                        <div className="card-body">
                            <form onSubmit={prodForm.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label">ID</label>
                                    <input value={prodForm.values.id} onChange={prodForm.handleChange} type="text" className="form-control" name="id" disabled={isEdit} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input value={prodForm.values.name} onChange={prodForm.handleChange} type="text" className="form-control" name="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input value={prodForm.values.price} onChange={prodForm.handleChange} type="text" className="form-control" name="price" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img" className="form-label">Image URL</label>
                                    <input value={prodForm.values.img} onChange={prodForm.handleChange} type="text" className="form-control" name="img" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input value={prodForm.values.description} onChange={prodForm.handleChange} type="text" className="form-control" name="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select value={prodForm.values.type} onChange={prodForm.handleChange} className='form-control' name="type">
                                        <option value={'SONY'}>SONY</option>
                                        <option value={'APPLE'}>APPLE</option>
                                        <option value={'SAMSUNG'}>SAMSUNG</option>
                                        <option value={'XIAOMI'}>XIAOMI</option>
                                    </select>
                                </div>
                                <div className="mb-3 form-check">
                                    <input value={prodForm.values.id} onChange={prodForm.handleChange} type="checkbox" className="form-check-input" name="deleted" />
                                    <label className="form-check-label" htmlFor="deleted">Deleted</label>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {isEdit ? 'Update' : 'Add new'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product