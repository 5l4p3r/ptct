import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../sub/Banner'

const Home = () => {
    const [customer,setCustomer] = useState([])
    const [search, setSearch] = useState('')
    
    const filtered = (all) => {
        return all.name.toUpperCase().indexOf(search.toUpperCase()) > -1 || all.phone.toUpperCase().indexOf(search.toUpperCase()) > -1
    }

    const getCustomer = async() => {
        try {
            let res = await axios.get('/api/customer')
            setCustomer(res.data)
        } catch (error) {
            error.message
        }
    }

    useEffect(()=>{
        getCustomer()
    },[])
    return (
        <div>
            <Banner/>
            <hr/>
            <div className="py-2">
                <div className="d-flex justify-content-between">
                    <h4 className="px-2">List Sales By Customer</h4>
                    <div>
                        <input type="text" name="" id="" className="form-control" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="list-group py-2">
                    {customer.filter(filtered).map((item,i)=>(
                        <Link to={`/sales/${item.id}`} className="list-group-item text-dark" key={i} style={{textDecoration:'none'}}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{item.name}</h5>
                                <small>{item.phone}</small>
                            </div>
                            <p className="mb-1" style={{textAlign:'justify', textJustify:'inter-word'}}>{item.address}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
