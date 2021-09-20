import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Sales = () => {
    const {id} = useParams()
    const [sales,setSales] = useState([])
    const [salesname, setSalesname] = useState([])
    const getSales = async() => {
        try {
            let res = await axios.get(`/api/sales/${id}`)
            setSales(res.data)
            setSalesname(res.data.name)
            res.data.map((names)=>{
                setSalesname(names.name)
            })
        } catch (error) {
            error.message
        }
    }
    useEffect(()=>{
        getSales()
    },[])
    return (
        <div className="py-2">
            <h4 className="px-2">{salesname}</h4>
            <div className="list-desktop">
                <table className="table">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th style={{width:'5%'}}>No</th>
                            <th style={{width:'15%'}}>Date</th>
                            <th style={{width:'15%'}}>Po Number</th>
                            <th>Items</th>
                            <th style={{width:'15%'}}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((item,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.date}</td>
                                <td>{item.po}</td>
                                <td>{item.goods}</td>
                                <td>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="list-mobile">
                <div className="list-group">
                    {sales.map((items,i)=>(
                        <div className="list-group-item" key={i}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{items.po}</h5>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-1">{items.goods}</p>
                                <small>$ {items.price}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sales
