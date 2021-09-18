import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserContext } from './hooks/UserContext';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './style.css'
import Home from './pages/Home';
import Nav from './layout/Nav';

const Citra = () => {
    const [load, setLoad] = useState(true)
    const [user,setUser] = useState([])
    const [level, setLevel] = useState('')
    const getUser = async() => {
        try {
            let res = await axios.get('/me')
            setUser(res.data)
            setLevel(res.data.map((item)=> item.level))
        } catch (error) {
            error.message
        }
    }
    useEffect(()=>{
        if(load){
            getUser()
            setLoad(false)
        }
    })
    return (
        <UserContext.Provider value={{
            user: user
        }}>
            <BrowserRouter>
                <div className="body">
                    <div id="left-side" className="left-side bg-dark" style={{ width:'0px' }}>
                        <div id="list" className="text-center" style={{display:'none'}}>
                            <div className="py-2">
                                <Link to="/home" className="nav-link text-light">
                                    <h2>P T C T</h2>
                                </Link>
                            </div>
                            <div className="ui-list">
                                <div className="item list">
                                    <Link to="/home" className="nav-link text-light">HOME</Link>
                                    <Link to="/profile" className="nav-link text-light">PROFILE</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid content-panel">
                        <div className="d-flex justify-content-between">
                            <img className="" src={`/allicon/menu.svg`} alt="toggle" onClick={()=>{
                                let x = document.getElementById('left-side')
                                let y = document.getElementById('list')
                                if(x.style.width === '300px' && y.style.display === 'block'){
                                    x.style.width = '0px'
                                    x.style.transition = "all 2s"
                                    y.style.display = 'none'
                                }else{
                                    x.style.width = '300px'
                                    x.style.transition = "all 2s"
                                    y.style.display = 'block'
                                }
                            }}/>
                            <Nav/>
                        </div><hr />
                        <div className="py-2">
                            <Switch>
                                <Route exact path="/home" component={Home}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default Citra
if(document.getElementById('citra')){
    ReactDOM.render(<Citra/>,document.getElementById('citra'))
}
