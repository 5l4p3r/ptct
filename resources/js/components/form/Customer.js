import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Customer = () => {
    const [name,setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [progress, setProgress] = useState(100)
    const [search, setSearch] = useState('')
    const [customer, setCustomer] = useState([])

    const getCustomer = async() => {
        try {
            let res = await axios.get('/api/customer')
            setCustomer(res.data)
        } catch (error) {
            error.message
        }
    }

    const filtered = (all) => {
        return all.name.toUpperCase().indexOf(search.toUpperCase()) > -1 || all.phone.toUpperCase().indexOf(search.toUpperCase()) > -1
    }

    useEffect(()=>{
        getCustomer()
    },[])

    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-default" onClick={()=>{
                    let x = document.getElementById('form-customer')
                    if(x.style.display === 'none'){
                        x.style.display = 'block'
                    }else{
                        x.style.display = 'none'
                    }
                }}>
                    <img src={`/allicon/add.svg`} alt="Add" />
                </button>
                <h5>Data Customer</h5>
                <div>
                    <input type="text" name="" id="" className="form-control" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </div><hr />
            <div id="form-customer" className="py-2" style={{ display:'none' }}>
                <div className="d-flex justify-content-center">
                    <div className="col-md-8">
                        <h4>Form Customer</h4>
                        <div className="form-group">
                            <label htmlFor="name">Customer Name</label>
                            <input required type="text" name="name" id="name" className="form-control" placeholder="Customer Name" onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input required type="tel" name="" id="" className="form-control" onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea required name="address" id="address" cols="30" rows="5" className="form-control" onChange={(e)=>setAddress(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" onClick={(e)=>{
                                e.preventDefault()
                                const config = {
                                    onUploadProgress: progressEvent =>{
                                        setProgress((100 * progressEvent.loaded)/progressEvent.total)
                                    }
                                }
                                const data = {
                                    key: "elbicnivni",
                                    name: name,
                                    phone: phone,
                                    address: address
                                }
                                console.log(data);
                                axios.post('/api/customer',data,config).then(()=>{
                                    if(progress >= 100){
                                        window.location.href = "/customer"
                                    }
                                })
                                
                            }}>
                                <img src={`/allicon/save.svg`} alt="" />
                            </button>
                        </div>
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
                <div className="list-group">
                    {customer.filter(filtered).map((item,i)=>(
                        <div className="list-group-item" key={i}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{item.name}</h5>
                                <small>{item.phone}</small>
                            </div>
                            <p className="mb-1" style={{textAlign:'justify', textJustify:'inter-word'}}>{item.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Customer
