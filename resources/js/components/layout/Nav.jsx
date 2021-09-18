import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../hooks/UserContext'

const Nav = () => {
    const {user} = useContext(UserContext)
    const logout = () => {
        axios.post('/logout').then(()=>{
            window.location.href="/"
        })
    }
    return (
        <div>
            {user.map((item,i)=>(
                <ul className="nav jusify-content-end" key={i}>
                    <li className="nav-item">
                        <div id="navbarDropdown" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {item.name}
                        </div>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" onClick={logout}>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default Nav
