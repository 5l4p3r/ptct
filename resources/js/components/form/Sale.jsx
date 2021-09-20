import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Sale = () => {
    const [search,setSearch] = useState('')
    const [date, setDate] = useState('')
    const [po, setPo] = useState('')
    const [goods, setGoods] = useState('')
    const [price, setPrice] = useState(0)
    const [custid, setCustid] = useState(0)
    const [customer, setCustomer] = useState([])
    const [sale, setSale] = useState([])
    const [progress, setProgress] = useState(100)

    const getCustomer = async() => {
        try {
            let res = await axios.get('/api/customer')
            setCustomer(res.data)
        } catch (error) {
            error.message
        }
    }
    const getSale = async() => {
        let res = await axios.get('/api/sale')
        setSale(res.data)
    }

    const filtered = (all) => {
        return all.po.toUpperCase().indexOf(search.toUpperCase()) > -1 || all.name.toUpperCase().indexOf(search.toUpperCase()) > -1
    }

    useEffect(()=>{
        getCustomer()
        getSale()
    },[])
    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-default" onClick={()=>{
                    let x = document.getElementById('form-sale')
                    if(x.style.display === 'none'){
                        x.style.display = 'block'
                    }else{
                        x.style.display = 'none'
                    }
                }}>
                    <img src={`/allicon/add.svg`} alt="Add" />
                </button>
                <h5>Data Sale</h5>
                <div>
                    <input type="text" name="" id="" className="form-control" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </div><hr />
            <div id="form-sale" className="py-2" style={{ display:'none' }}>
                <div className="d-flex justify-content-center">
                    <div className="col-md-8">
                        <h4>Form Sale</h4>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" name="" id="" className="d-block btn border-secondary" onChange={(e)=>setDate(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="custid">Customer</label>
                            <select name="" id="" className="d-block" onChange={(e)=>setCustid(e.target.value)}>
                                <option value="">Select</option>
                                {customer.map((cust,i)=>(
                                    <option value={cust.id} key={i}>{cust.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="po">PO Number</label>
                            <input type="text" name="" id="" className="form-control" onChange={(e)=>setPo(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="goods">Finish Goods</label>
                            <input type="text" name="" id="" className="form-control" onChange={(e)=>setGoods(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="goods">Price</label>
                            <input type="number" name="" id="" className="form-control" onChange={(e)=>setPrice(e.target.value)}/>
                        </div>
                        <button className="d-block btn btn-primary" onClick={(e)=>{
                            e.preventDefault()
                            const data = {
                                key: "elbicnivni",
                                customer_id: custid,
                                date: date,
                                po: po,
                                goods: goods,
                                price: price
                            }
                            const config = {
                                onUploadProgress: progressEvent =>{
                                    setProgress((100 * progressEvent.loaded)/progressEvent.total)
                                }
                            }
                            console.log(data);
                            axios.post('/api/sale',data,config).then(()=>{
                                if(progress >= 100){
                                    window.location.href="/sale"
                                }
                            })
                            
                        }}>
                            <img src={`/allicon/save.svg`} alt="" />
                        </button>
                    </div>
                </div>
            </div>
            {progress < 100 &&
                <div className="d-flex justify-content-start">
                    <div className="spinner-border spinner-border-sm" role="status"></div> &nbsp;
                    <div className="spinner-grow spinner-grow-sm" role="status"></div> &nbsp;
                    <span className="visually-hidden">Uploading...</span>
                </div>
            }
            <div className="py-2">
                <div className="list-desktop">
                    <table className="table">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Po Number</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.filter(filtered).map((sales,i)=>(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{sales.date}</td>
                                    <td>{sales.po}</td>
                                    <td>{sales.name}</td>
                                    <td>{sales.goods}</td>
                                    <td>${sales.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="list-mobile">
                    <div className="list-group">
                        {sale.filter(filtered).map((items,i)=>(
                            <div className="list-group-item" key={i}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{items.name}</h5>
                                    <small>{items.po}</small>
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
        </div>
    )
}

export default Sale
