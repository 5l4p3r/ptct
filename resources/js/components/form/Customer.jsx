import React from 'react'

const Customer = () => {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-default" onClick={()=>{
                    let x = document.getElementById('form-customer')
                    if(x.style.display === 'none'){
                        x.style.transition = "all 2s"
                        x.style.display = 'block'
                    }else{
                        x.style.transition = "all 2s"
                        x.style.display = 'none'
                    }
                }}>
                    <img src={`/allicon/add.svg`} alt="Add" />
                </button>
                <h5>List Customer</h5>
                <div>
                    <input type="text" name="" id="" className="form-control" placeholder="Search..."/>
                </div>
            </div><hr />
            <div id="form-customer" className="py-2" style={{ display:'none' }}>
                <div className="d-flex justify-content-center">
                    <div className="col-md-8" style={{border:'grey 1px solid'}}>
                        <div className="form-group">
                            <label htmlFor="name">Customer Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Customer Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="" id="" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea name="address" id="address" cols="30" rows="10" className="form-control"></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">
                                <img src={`/allicon/save.svg`} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                
            </div>
        </div>
    )
}

export default Customer
