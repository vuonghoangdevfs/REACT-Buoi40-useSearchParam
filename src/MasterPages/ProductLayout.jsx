import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const ProductLayout = () => {
    const location = useLocation();
    
  return (
    <>
        <div className='d-flex' style={{minHeight:'100vh'}}>
            <div className='w-25 bg-white text-white'>
                <nav className='nav p-2 mt-3'>
                    <ul style={{listStyle: 'none'}} className='p-0 w-100'>
                        <li className='nav-item'>
                            <span>
                                <i className="fa-solid fa-home"></i>
                            </span>
                            <NavLink className={'nav-link'} to={'/home'}>Home Page</NavLink>
                        </li>
                        <li className={location.pathname === '/product-management' ? 'active nav-item' : 'nav-item'}>
                            <NavLink className={'nav-link'} to={'/product-management'}>Products</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='w-75' style={{background: '#f3f4f6'}}>
                <Outlet />
            </div>
        </div>
    </>
  )
}

export default ProductLayout