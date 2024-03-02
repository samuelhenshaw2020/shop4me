import { FC, PropsWithChildren, createContext } from "react";


type Props = PropsWithChildren<{

}>

export const AuthContext = createContext({name: ""});

const AuthProvider: FC<Props> = ({children}) => {
    return (
        <AuthContext.Provider value={{name: ""}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;