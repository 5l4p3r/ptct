import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Banner = () => {
    const [totalsale, setTotalsale] = useState([])
    const [totalcustomer, setTotalcustomer] = useState([])

    const getTotalsale = async() => {
        try {
            let res = await axios.get('/api/totalsales')
            setTotalsale(res.data)
        } catch (error) {
            error.message
        }
    }
    const getTotalcustomer = async() => {
        try {
            let res = await axios.get('/api/totalcustomer')
            setTotalcustomer(res.data)
        } catch (error) {
            error.message
        }
    }
    useEffect(()=>{
        getTotalsale()
        getTotalcustomer()
    },[])

    return (
        <div className="row banner-parent">
            <div className="col img-thumbnail banner bg-info">
                <p className="text-banner">Total Sales</p> &nbsp;
                {totalsale.map((item,i)=>(
                    <p className="text-banner" key={i}>$ {item.total}</p>
                ))}
            </div>
            <div className="col img-thumbnail banner bg-warning">
                <p className="text-banner">Total Customer</p>  &nbsp;
                {totalcustomer.map((item,i)=>(
                    <p className="text-banner" key={i}>{item.total} Active</p>
                ))}
            </div>
        </div>
    )
}

export default Banner