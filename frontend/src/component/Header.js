import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../context/context'
import {Navbar, Nav} from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom'

const Header = () => {
    const{state,dispatch} = useContext(UserContext)
    const{user} = state

    const history = useHistory()

    console.log('From userContext-HEADER', user)
    const handleLogout = () =>{
      dispatch({type:'LOGOUT'})
      history.push('/login')
    }
    return (
    <Navbar bg="light" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          Authentification App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {user ? (
              <>
              <h5 className='mx-4'>{user.displayName}</h5>
              <Link onClick={handleLogout}>Logout</Link>             
              </>
            ) : (
              <>
              <NavLink to='/login' exact={true} style={{fontSize:'1.4rem', textDecoration:'none'}} activeStyle={{ color: 'teal', fontWeight:"bold", fontSize:'1.4rem', textDecoration:'none' }} className='mx-4'>Login</NavLink>
              <NavLink to='/register' style={{fontSize:'1.4rem', textDecoration:'none'}} activeStyle={{ color: 'teal', fontWeight:"bold",fontSize:'1.4rem',textDecoration:'none'  }} className='mx-4'>Register</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
     </Navbar>
    )
}

export default Header
