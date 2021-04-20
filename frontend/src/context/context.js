import React, {createContext, useReducer} from 'react'
import userLoginReducers from '../context/reducers'

export const userContext = createContext()
    const userLocalStorage =localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
const initialState = {
    user: userLocalStorage,
}


const reducers = userLoginReducers

const UserProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducers, initialState)

    return (
        <userContext.Provider value={{state,dispatch}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider
