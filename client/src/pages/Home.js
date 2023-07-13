import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import "../styles/home.css"
import { filterPrices } from "../data/price"
import { Card } from '../components/Card'
import { FcFilledFilter } from 'react-icons/fc'
import banner from '../data/shopping Banner.jpg'


export default function Home() {
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products/getall");
      if (res.data.success) {
        setProductData(res.data.products);
      }
    }
    catch (error) {
      console.log("something went wrong ");
    }
  }
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
  const handleFilter = (check, id) => {
    let all = [...checked]
    if (check) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }
  const handleSearch=async()=>{
    try {
      console.log(search);
      const res = await axios.post("http://localhost:8080/filter/getsearched", { search:search });
      if (res.data.success) {
          setProductData(res.data.searched);
      }
  } catch (error) {
      console.log("something wrong");
  }
  }
  useEffect(() => {
    getCategory();
    if ((checked.length === 0 && radio.length === 0)) {
      getProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    const getFiltered = async () => {
      try {
        const res = await axios.post("http://localhost:8080/filter/getproducts", { checked, radio });
        if (res.data.success) {
          setProductData(res.data.filters);
        }
      } catch (error) {
        console.log("something wrong")
      }
    }
    if (checked.length || radio.length) getFiltered();
  }, [checked, radio]);

  return (
    <>
      <Layout>
        <div className='banner'><img alt="x" src={banner}/></div>
        <div className="home">
          {filter ?
            <div className="filter-box">
              <form>
                <h2 className='filterHead'>Filter By Category</h2>
                <hr/>
                <div className="filter-elements">
                  {category.map((ele) => <div key={ele._id}>
                    <input type='checkbox' name='category' id={ele._id} onChange={(e) => handleFilter(e.target.checked, ele._id)} />
                    <label htmlFor={ele._id}>{ele.name}</label>
                  </div>
                  )
                  }
                </div>
                <h2 className='filterHead'>Filter By Price</h2>
                <hr/>
                <div className="filter-elements">
                  {filterPrices.map((ele) => <div key={ele._id}>
                    <input type='radio' name="prices" id={ele._id} onChange={(e) => setRadio(ele.range)} />
                    <label htmlFor={ele._id}>{ele.name}</label><br />
                  </div>
                  )}
                </div>
                <div className='reset'>
                  <button type='reset' onClick={() => { setRadio([]); setChecked([]) }} > Reset Filters</button>
                </div>
              </form>
            </div> : ""}
          <div className="all-products">
        <div className='filter-icon' onClick={() => setFilter(!filter)}><FcFilledFilter size={30} /></div>
              <div className="search">
                <input type="search" onChange={(e) => setSearch(e.target.value)} />
                <button type='submit' onClick={() => handleSearch()} >Search</button>
              </div>
            <div className='product-box'>
              {productData.length===0?<div className='head'>No Products Found</div>:
              <Card item={productData} />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
