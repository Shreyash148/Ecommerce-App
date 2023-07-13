import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../styles/detail.css"
import { Card } from '../../components/Card';

export const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [item, setitem] = useState([]);
  const params = useParams();

  useEffect(() => {
    const handleProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/products/getone/${params.id}`);
        if (res.data.success) {
          setProduct(res.data.product)
        }
      }
      catch (error) {
        console.log("something went wrong ");
      }
    }
    handleProduct();
  }, [params]);

  useEffect(() => {
    const handleSimilar = async (req, res) => {
      try {
        const res = await axios.post(`http://localhost:8080/filter/suggestion/${product.category}`,{id:product._id})
        if (res.data.success) {
          setitem(res.data.similar)
        }
      } catch (error) {
        console.log("something went wrong ");
      }
    }
    handleSimilar();
  }, [product]);

  return (
    <Layout>
      <div className="area">
        <div className='detail-area'>
          <div className="detailBox">
            <img alt="x" src={`http://localhost:8080/products/getphoto/${product._id}`} />
            <div className="descBox">
              <h2 style={{textAlign:"center"}}>Product Details</h2>
              <hr />
              <table>
                <tr>
                  <td style={{padding:"0.5rem"}}>Name </td>
                  <td>:</td>
                  <td style={{padding:"0.5rem"}}>{product.name}</td>
                </tr>
                <tr>
                  <td style={{padding:"0.5rem"}}>Desription </td>
                  <td>:</td>
                  <td style={{padding:"0.5rem"}}>{product.description}</td>
                </tr>
                <tr>
                  <td style={{padding:"0.5rem"}}>Price:</td>
                  <td>:</td>
                  <td style={{padding:"0.5rem"}}>Rs.{product.price}</td>
                </tr>
              </table>
              <div className='buttons'>
                <button className='add-cart-button'>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="suggestion-box">
          <h3>Similar Products :</h3>
          <Card item={item} />
        </div>
      </div>
    </Layout>
  )
}
