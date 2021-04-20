import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from '../context/context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const{state} = useContext(UserContext)
    const {user} = state
    return (
        <Route
            {...rest}
            render={props => {
                return user ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}

export default PrivateRoute
