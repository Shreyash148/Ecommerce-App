import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { AdminMenu } from '../../components/AdminMenu'
import '../../styles/createCategory.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { EditModal } from '../../components/EditModal'

export const CreateCategory = () => {

  const [categories, setCategories] = useState([]);
  const [Categoryname, setName] = useState();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:8080/category/create", {
      name: Categoryname
    })
    if (res.data.success) {
      toast.success(res.data.message);
    }
    else {
      toast.error(res.data.message);
    }
  }
  const handleDelete =async () => {
    const res = await axios.delete(`http://localhost:8080/category/delete/${id}`)
    if (res.data.success) {
      toast.success(res.data.message);
    }
    else {
      toast.error(res.data.message);
    }
  }
    useEffect(() => {
      const getCategories = async () => {
        try {
          const res = await axios.get("http://localhost:8080/category/getall");
          if (res.data.success) {
            setCategories(res.data.category);
          }
        } catch (error) {
          console.log("something went wrong");
        }
      }
      getCategories();
    }, [])

  return (
    <>
      <Layout>
        <div className='dashboard'>
          <AdminMenu />
          <div className='category-box'>
            <form onSubmit={handleSubmit}>
              <h2>Manage Category</h2>
              <input type='text' className='input' value={Categoryname} onChange={(e) => setName(e.target.value)} placeholder='Enter category Name' />
              <div className='submit'><button type='submit'>+ Add</button></div></form>
            <table className='table'>
              <tbody>
                <tr className='rows'>
                  <th className='col col-color'>#</th>
                  <th className='col col-color'>Name</th>
                  <th className='col col-color'>Action</th>
                  <th className='col col-color'></th>
                </tr>
                {categories.map((cat, i) =>
                  <tr className='rows' key={cat._id}>
                    <td className='col'>{i + 1}</td>
                    <td className='col'>{cat.slug}</td>
                    <td className='col edit'><button onClick={()=>{setShow(true); setId(cat._id)}}>Edit</button></td>
                    <td className='col delete'>
                      <button onClick={()=>{setId(cat._id); return handleDelete();}}>
                      Delete</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {show && <EditModal id={id} mode="category" close={()=>setShow(false)}/>}
      </Layout>
    </>
  )
}
