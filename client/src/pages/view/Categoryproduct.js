import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import "../../styles/allcategories.css"

export const Categoryproduct = () => {
  const params = useParams();
  const [productData, setProductData] = useState([])
  const [category, setCategory] = useState({})

  useEffect(() => {
    const handleSimilar = async (req, res) => {
      try {
        const res = await axios.post(`http://localhost:8080/filter/category-product/${params.id}`)
        if (res.data.success) {
          setProductData(res.data.products)
          setCategory(res.data.category)
        }
      } catch (error) {
        console.log("something went wrong ");
      }
    }
    handleSimilar();
  }, [params]);
  return (
    <Layout>
      <h1 className='heading'>{category.name}</h1>
      <div className='cats margin'>
      <Card item={productData}/>
      </div>
    </Layout>
  )
}
