import React, { useState } from "react";
import Loader from "./Loader";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false)


    const handleAddProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }

        console.log(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id
        setLoader(true);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.log(result)
        alert('Product Added')
        setLoader(false)


        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setError(false);
    }

    return (
        <div className="add-product">
            <div >
                {
                    loader ?
                        <Loader /> : null
                }

                <h1>Add Product</h1>
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    className="inputBox"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />{error && !name ?
                    <span className="error">Enter Valid Name</span> : null}
                <input
                    type="text"
                    placeholder="Enter Product Price"
                    className="inputBox"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                {error && !price ?
                    <span className="error">Enter Valid Price</span> : null}

                <input
                    type="text"
                    placeholder="Enter Product Category"
                    className="inputBox"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
                {error && !category ?
                    <span className="error">Enter Valid Category</span> : null}

                <input
                    type="text"
                    placeholder="Enter Product Company"
                    className="inputBox"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                />
                {error && !company ?
                    <span className="error">Enter Valid Company</span> : null}

                <button onClick={handleAddProduct} className="app-button">Add Product</button>

            </div>
        </div>

    );
};

export default AddProduct;
