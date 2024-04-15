import { useState, useEffect, createContext } from 'react';
import {jwtDecode} from "jwt-decode"
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [tokens, setTokens] = useState(()=>
        localStorage.getItem("tokens")
            ? JSON.parse(localStorage.getItem("tokens"))
            : null
    )

    const [user, setUser] = useState(()=>
        localStorage.getItem("tokens")
        ? jwtDecode(localStorage.getItem("tokens"))
        : null
    )

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const login = async (email, password) => {
        const res = await fetch("http://127.0.0.1:8000/api/token/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await res.json()

        if(res.ok) {
            console.log("logged in")
            setTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("tokens", JSON.stringify(data))
            navigate("/")
        } else {
            console.log(res.status)
            console.log("Server error")
        }
    }

    const register = async (email, username, password, password2) => {
        const res = await fetch("http://127.0.0.1:8000/api/register/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })

        if (res.ok){
            navigate("/login")
        } else{
            console.log("Register error")
        }
    }

    const logout = () => {
        setTokens(null)
        setUser(null)
        localStorage.removeItem("tokens")
        navigate("/login")
    }

    const authData = {
        user,
        setUser,
        tokens,
        setTokens,
        register,
        login,
        logout
    }

    useEffect(()=>{
        if(tokens) setUser(jwtDecode(tokens.access))
        setLoading(false)
    }, [tokens])

    return (
        <AuthContext.Provider value={authData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}