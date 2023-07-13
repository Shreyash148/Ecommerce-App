import React from 'react'
import Layout from './Layout'
import {GiSpinningRibbons} from 'react-icons/gi'

export const Spinner = () => {
  return (
    <Layout>
    <div style={{textAlign:"center",height:"50%"}}><GiSpinningRibbons size={40}/></div>
    </Layout>
  )
}
