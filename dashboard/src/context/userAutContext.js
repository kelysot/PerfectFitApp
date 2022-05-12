
import {createContext,useReducer } from "react";
import UserAutReducer from "./userAutReducer";

const INITIAL = {
    login :false
}

export const UserAutContext = createContext(INITIAL);
export const UserAutContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(UserAutReducer, INITIAL);
    return (
        <UserAutContext.Provider value={{login: state.login , dispatch}}>
            {children}
        </UserAutContext.Provider>
    )
};