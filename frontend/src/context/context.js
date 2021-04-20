import React, {createContext, useReducer} from 'react'
import userLoginReducers from '../context/reducers'

export const UserContext = createContext()

    const userLocalStorage =localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    
    const initialState = {
    user: userLocalStorage,
}


const reducers = userLoginReducers

const UserProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducers, initialState)

    return (
        <UserContext.Provider value={{state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
