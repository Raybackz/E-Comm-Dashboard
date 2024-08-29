import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result)
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts()
        }

    }

    const searchHandle = async (e) => {
        let key = e.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }


    }

    return (
        <div>
            <div className='product-list'>
                <h1>Product List</h1>
                <input type='text' placeholder='Search Product' className='search' onChange={searchHandle} />
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Operation</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.length > 0 ? products.map((item, index) =>
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.company}</td>
                                    <td><MdDelete onClick={() => deleteProduct(item._id)} style={{ cursor: 'pointer' }} />
                                        <Link to={`update/${item._id}`}><FaPencil className='update-button' /></Link>
                                    </td>
                                </tr>) :
                                <h1>No Product Found</h1>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList
