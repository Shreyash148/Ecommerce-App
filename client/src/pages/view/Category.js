import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { NavLink } from 'react-router-dom';
import "../../styles/allcategories.css"

export const Category = () => {
    const [category, setCategory] = useState();
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get("http://localhost:8080/category/getall");
                if (res.data.success) {
                    setCategory(res.data.category);
                }
            } catch (error) {
                console.log("something went wrong");
            }
        }
        getCategory();
    }, [])
    return (
        <Layout>
            <div>
                <h2 className='heading'>All categories</h2>
                <div className="row cats">
                    {category?.map((e) => <div className='catButton'>
                        <NavLink to={`/category/${e._id}`}><button>{e.name}</button></NavLink>
                    </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}
